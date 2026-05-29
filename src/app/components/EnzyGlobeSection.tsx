"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/app/components/ThemeProvider";
import * as d3Geo from "d3-geo";
import { GLOBE_HOTSPOTS } from "./GlobeHotspotsData";
import { BlurReveal } from "./BlurReveal";

function polar2Cartesian(lat: number, lng: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 90) * Math.PI) / 180;
  return new THREE.Vector3().setFromSpherical(new THREE.Spherical(r, phi, theta));
}

function createOutlineTexture(geojson: any, themeColors: any, isLightMode: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = '#' + themeColors.core.toString(16).padStart(6, '0');
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!geojson) return new THREE.CanvasTexture(canvas);

  const projection = d3Geo
    .geoEquirectangular()
    .scale(canvas.width / (2 * Math.PI))
    .translate([canvas.width / 2, canvas.height / 2]);

  const path = d3Geo.geoPath(projection, ctx);

  // Subtle, definite lines around the land bits
  const hex = themeColors.hotspot.toString(16).padStart(6, '0');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.8)`;
  ctx.lineWidth = 0.5;
  
  ctx.beginPath();
  path(geojson);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

function createDotMatrixGlobe(geojson: any, themeColors: any, isLightMode: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (geojson) {
    const projection = d3Geo
      .geoEquirectangular()
      .scale(canvas.width / (2 * Math.PI))
      .translate([canvas.width / 2, canvas.height / 2]);

    const path = d3Geo.geoPath(projection, ctx);
    
    // Draw filled land for the dot matrix
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    path(geojson);
    ctx.fill();
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const numPoints = 60000;
  const points = [];
  const colors = [];
  
  const colorLand = new THREE.Color(themeColors.landDots);
  const colorOcean = new THREE.Color(isLightMode ? 0xaaaaaa : 0x555555); // Brighter grey in dark mode
  const bgColor = new THREE.Color(themeColors.core);

  for (let i = 0; i < numPoints; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    
    const vec = new THREE.Vector3().setFromSpherical(new THREE.Spherical(0.96, phi, theta));
    points.push(vec.x, vec.y, vec.z);

    let lat = 90 - (phi * 180 / Math.PI);
    let lng = (theta * 180 / Math.PI) - 90;
    lng = ((lng + 180) % 360 + 360) % 360 - 180;

    const cx = Math.floor((lng + 180) / 360 * canvas.width);
    const cy = Math.floor((90 - lat) / 180 * canvas.height);
    
    const scx = Math.max(0, Math.min(canvas.width - 1, cx));
    const scy = Math.max(0, Math.min(canvas.height - 1, cy));

    const index = (scy * canvas.width + scx) * 4;
    const isLand = imageData[index] > 128;

    const c = isLand ? colorLand : colorOcean;
    const alpha = isLand ? 1.0 : (isLightMode ? 0.3 : 0.15); 
    const finalColor = c.clone().lerp(bgColor, 1.0 - alpha);

    colors.push(finalColor.r, finalColor.g, finalColor.b);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const dotCanvas = document.createElement('canvas');
  dotCanvas.width = 16;
  dotCanvas.height = 16;
  const dotCtx = dotCanvas.getContext('2d');
  if(dotCtx) {
      dotCtx.beginPath();
      dotCtx.arc(8, 8, 8, 0, Math.PI * 2);
      dotCtx.fillStyle = '#fff';
      dotCtx.fill();
  }
  const dotTexture = new THREE.CanvasTexture(dotCanvas);

  const material = new THREE.PointsMaterial({
    size: 0.007,
    vertexColors: true,
    map: dotTexture,
    transparent: true,
    opacity: 0.9,
    alphaTest: 0.1,
    sizeAttenuation: true
  });

  return new THREE.Points(geometry, material);
}

function EnzyGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isLightMode } = useTheme();

  const themeColors = useMemo(() => {
    return {
      core: isLightMode ? 0xfaf9f6 : 0x05070a, // Slightly darker than the page background (0x0b0f14)
      hotspot: 0x19ad7d, // Always green
      landDots: isLightMode ? 0x0b0f14 : 0x19ad7d, // Dark in light mode, green in dark mode
    };
  }, [isLightMode]);

  useEffect(() => {
    if (!mountRef.current) return;

    const el = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 10);
    
    // Dynamically set camera Z so it always perfectly fits the screen regardless of mobile/desktop aspect ratio
    const updateCameraDistance = (aspect: number) => {
      const baseDistance = 2.9; // Pulled back safely so the longest beams never exceed the 3D canvas bounds
      if (aspect < 1) {
        // On tall/narrow mobile screens, pull camera back so the sides don't clip
        camera.position.set(0, 0.2, baseDistance / aspect);
      } else {
        camera.position.set(0, 0.2, baseDistance);
      }
    };
    
    updateCameraDistance(el.clientWidth / el.clientHeight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const globeGroup = new THREE.Group();
    // US is roughly at -98 longitude. polar2Cartesian adds 90 to lng, meaning theta is -8 degrees.
    // We add a slight positive Y rotation (0.15 rad ~ 8.5 degrees) to center the US initially.
    globeGroup.rotation.y = 0.15; 
    globeGroup.position.y = -0.1; // Push globe down slightly (less than before to remove top padding)
    scene.add(globeGroup);

    // Solid core to block the backside points from blowing out the front
    const coreGeom = new THREE.SphereGeometry(0.958, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ 
      color: themeColors.core,
      transparent: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    
    // Add subtle grid/topographic lines to define the sphere shape
    const wireframeGeom = new THREE.WireframeGeometry(new THREE.SphereGeometry(0.961, 32, 32));
    const wireframeMat = new THREE.LineBasicMaterial({
      color: themeColors.hotspot,
      transparent: true,
      opacity: 0.15, // Defined enough to show globe curvature in empty areas
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeom, wireframeMat);
    
    globeGroup.add(coreMesh);
    globeGroup.add(wireframeMesh);

    // Instanced Beams & Bases Setup
    const beamH = 0.22;
    const beamR = 0.0025;
    const beamGeom = new THREE.ConeGeometry(beamR, beamH, 6, 1, false);
    
    const count = beamGeom.attributes.position.count;
    const colors = new Float32Array(count * 4);
    const colorTop = new THREE.Color(themeColors.hotspot); 
    const colorBottom = new THREE.Color(isLightMode ? themeColors.hotspot : 0xffffff); 
    
    for (let i = 0; i < count; i++) {
      const y = beamGeom.attributes.position.getY(i);
      const t = (y + beamH / 2) / beamH; 
      const MathPow = Math.pow(t, 2.0); 
      const c = colorBottom.clone().lerp(colorTop, MathPow);
      colors[i * 4] = c.r;
      colors[i * 4 + 1] = c.g;
      colors[i * 4 + 2] = c.b;
      colors[i * 4 + 3] = isLightMode ? MathPow : 1.0;
    }
    beamGeom.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    
    beamGeom.translate(0, beamH / 2, 0);
    beamGeom.rotateX(-Math.PI / 2);

    const baseGeom = new THREE.CircleGeometry(0.006, 8);

    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: true,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    
    const baseMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? themeColors.hotspot : 0xffffff, 
      transparent: true,
      opacity: isLightMode ? 0.8 : 1,
      depthWrite: false,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const instances = GLOBE_HOTSPOTS.length;
    const beamInstancedMesh = new THREE.InstancedMesh(beamGeom, beamMat, instances);
    const baseInstancedMesh = new THREE.InstancedMesh(baseGeom, baseMat, instances);
    
    const dummy = new THREE.Object3D();
    
    GLOBE_HOTSPOTS.forEach((hs, i) => {
      const pos = polar2Cartesian(hs.lat, hs.lng, 0.96); // Anchor directly to the surface
      dummy.position.copy(pos);
      dummy.lookAt(new THREE.Vector3(0, 0, 0));
      dummy.updateMatrix();
      
      beamInstancedMesh.setMatrixAt(i, dummy.matrix);
      baseInstancedMesh.setMatrixAt(i, dummy.matrix);
      
      const c = new THREE.Color(0xffffff);
      beamInstancedMesh.setColorAt(i, c);
      baseInstancedMesh.setColorAt(i, c);
    });

    globeGroup.add(beamInstancedMesh);
    globeGroup.add(baseInstancedMesh);

    const abort = new AbortController();
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", {
      signal: abort.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        
        const dotGlobe = createDotMatrixGlobe(data, themeColors, isLightMode);
        if (dotGlobe) {
          globeGroup.add(dotGlobe);
        }
        
        const outlineTexture = createOutlineTexture(data, themeColors, isLightMode);
        if (outlineTexture) {
          coreMat.map = outlineTexture;
          coreMat.color.setHex(0xffffff);
          coreMat.needsUpdate = true;
        }
      })
      .catch(() => {});

    let animationFrameId = 0;
    let lastTime = performance.now();

    // Interaction and scroll logic
    let manualRotationOffsetY = 0;
    let manualRotationOffsetX = 0;
    let targetRotationY = 0.15; // Initial US center
    let targetRotationX = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        manualRotationOffsetY += deltaX * 0.005; // Drag sensitivity
        manualRotationOffsetX += deltaY * 0.005;
        // Clamp X rotation so it doesn't flip completely upside down (optional, but good UX)
        manualRotationOffsetX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, manualRotationOffsetX));
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const render = () => {
      const currentTime = performance.now();
      const delta = (currentTime - lastTime) / 1000;
      const t = currentTime / 1000;
      lastTime = currentTime;

      // Map scroll to rotation relative to the viewport center so the US is centered on arrival
      const rect = el.getBoundingClientRect();
      const distFromCenter = (window.innerHeight / 2) - (rect.top + rect.height / 2);
      const scrollRotation = distFromCenter * 0.0015;
      targetRotationY = 0.15 + scrollRotation + manualRotationOffsetY;
      targetRotationX = manualRotationOffsetX;

      // Smoothly interpolate current rotation to target rotation
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.1;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.1;
      
      
      const worldPos = new THREE.Vector3();
      const instanceColor = new THREE.Color();
      const whiteColor = new THREE.Color(0xffffff);
      const globeCenter = new THREE.Vector3(0, -0.1, 0);

      GLOBE_HOTSPOTS.forEach((hs, i) => {
        const randomOffset = parseFloat(hs.delay as any);
        
        const pos = polar2Cartesian(hs.lat, hs.lng, 0.96); // Anchor directly to surface
        dummy.position.copy(pos);
        dummy.lookAt(new THREE.Vector3(0, 0, 0));
        
        // Tilt the beams slightly outward like a bouquet so they don't perfectly overlap
        const splayX = (hs as any).splayX || 0;
        const splayY = (hs as any).splayY || 0;
        dummy.rotateX(splayX);
        dummy.rotateY(splayY);
        
        worldPos.copy(dummy.position);
        worldPos.applyEuler(globeGroup.rotation);
        worldPos.add(globeCenter); // Add group offset since dummy was relative to group
        
        // Horizon culling based on view angle dot product
        const normal = worldPos.clone().sub(globeCenter).normalize();
        const viewDir = camera.position.clone().sub(worldPos).normalize();
        const dotProduct = normal.dot(viewDir);
        
        // Starts fading as it approaches the edge (dot < 0.3), completely gone by 0.1
        const frontFade = Math.max(0, Math.min(1, (dotProduct - 0.1) * 5));
        
        // SPATIAL REVEAL: Starts revealing when x < 0.7, fully revealed when x < 0.2
        const revealProgress = Math.max(0, Math.min(1, (0.7 - worldPos.x) * 2.0));
        
        const basePop = Math.max(0, Math.min(1, revealProgress * 3));
        const beamPop = Math.max(0, Math.min(1, (revealProgress - 0.3) * 1.5));
        
        const pulse = Math.sin(t * 5 + randomOffset * 10) * 0.2 + 0.8;
        const heightMultiplier = 0.5 + (randomOffset % 1) * 1.5;
        
        // Because NormalBlending turns darkened colors black instead of transparent,
        // we use scaling to physically shrink them to 0 as they approach the horizon
        const finalBaseScale = basePop * pulse * frontFade;
        const finalBeamScale = beamPop * pulse * frontFade;
        
        // Keep colors purely white so they multiply cleanly with the vertex shader gradients
        instanceColor.copy(whiteColor);
        baseInstancedMesh.setColorAt(i, instanceColor);
        beamInstancedMesh.setColorAt(i, instanceColor);
        
        const zScale = finalBeamScale * heightMultiplier;
        const xyScale = finalBeamScale;
        
        dummy.scale.set(xyScale, xyScale, zScale);
        dummy.updateMatrix();
        beamInstancedMesh.setMatrixAt(i, dummy.matrix);
        
        dummy.scale.setScalar(finalBaseScale);
        dummy.updateMatrix();
        baseInstancedMesh.setMatrixAt(i, dummy.matrix);
      });
      
      beamInstancedMesh.instanceMatrix.needsUpdate = true;
      if (beamInstancedMesh.instanceColor) beamInstancedMesh.instanceColor.needsUpdate = true;
      baseInstancedMesh.instanceMatrix.needsUpdate = true;
      if (baseInstancedMesh.instanceColor) baseInstancedMesh.instanceColor.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateCameraDistance(aspect);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      abort.abort();
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
      coreGeom.dispose();
      coreMat.dispose();
      beamGeom.dispose();
      baseGeom.dispose();
    };
  }, [themeColors, isLightMode]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto" style={{ touchAction: 'none' }} />;
}

export function EnzyGlobeSection() {
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full overflow-hidden pt-20 md:pt-28 pb-12 md:pb-16 flex flex-col items-center">
      <div className="relative z-10 w-full px-4 text-center max-w-3xl mx-auto mb-2 md:mb-3 flex flex-col items-center">
        <p className="font-inter text-[12px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-[#19ad7d] mb-6">
          Global Impact
        </p>
        <h2
          className={`font-ivyora font-medium tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] leading-[1.05] text-[28px] sm:text-[40px] md:text-[56px] lg:text-[68px] transition-colors duration-500 drop-shadow-sm ${
            isLightMode ? "text-brand-dark" : "text-brand-light"
          }`}
        >
          <BlurReveal as="span" delay={0.1} className="block">
            50 States &amp; Territories.
          </BlurReveal>
          <BlurReveal as="span" delay={0.4} className="block">
            22 Countries.
          </BlurReveal>
        </h2>
      </div>

      {/* Break out of the max-w-7xl container so the canvas can be completely unrestricted horizontally */}
      <div className="flex items-center justify-center relative w-full">
        <div
          className="w-[120vw] h-[100vw] sm:h-[80vw] max-h-[1000px] relative"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 95%)",
          }}
        >
          <EnzyGlobe />
        </div>
      </div>
    </section>
  );
}
