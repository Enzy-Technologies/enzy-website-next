const fs = require('fs');
const path = require('path');
const https = require('https');

const COUNTRIES = [
  { id: "CA", label: "Canada", lat: 56.1, lng: -106.3, pct: 5.0 },
  { id: "PH", label: "Philippines", lat: 12.9, lng: 121.8, pct: 2.0 },
  { id: "ID", label: "Indonesia", lat: -2.5, lng: 118.0, pct: 1.5 },
  { id: "SG", label: "Singapore", lat: 1.35, lng: 103.82, pct: 1.0 },
  { id: "FR", label: "France", lat: 46.2, lng: 2.2, pct: 2.0 },
  { id: "IN", label: "India", lat: 22.5, lng: 79.0, pct: 3.0 },
  { id: "NL", label: "Netherlands", lat: 52.2, lng: 5.3, pct: 1.0 },
  { id: "DE", label: "Germany", lat: 51.2, lng: 10.45, pct: 2.0 },
  { id: "JP", label: "Japan", lat: 36.2, lng: 138.25, pct: 1.5 },
  { id: "PR", label: "Puerto Rico", lat: 18.25, lng: -66.5, pct: 0.5 },
  { id: "GT", label: "Guatemala", lat: 15.5, lng: -90.25, pct: 0.5 },
  { id: "CL", label: "Chile", lat: -35.7, lng: -71.3, pct: 0.5 },
  { id: "MX", label: "Mexico", lat: 23.6, lng: -102.5, pct: 3.0 },
  { id: "NZ", label: "New Zealand", lat: -41.5, lng: 172.0, pct: 1.0 },
  { id: "BR", label: "Brazil", lat: -14.2, lng: -51.9, pct: 2.0 },
  { id: "BG", label: "Bulgaria", lat: 42.7, lng: 25.5, pct: 0.5 },
  { id: "ES", label: "Spain", lat: 40.4, lng: -3.7, pct: 1.0 },
  { id: "SE", label: "Sweden", lat: 62.0, lng: 15.0, pct: 0.5 },
  { id: "AE", label: "United Arab Emirates", lat: 24.3, lng: 54.4, pct: 0.5 },
  { id: "BZ", label: "Belize", lat: 17.2, lng: -88.5, pct: 0.2 },
  { id: "GB", label: "United Kingdom", lat: 54.7, lng: -3.4, pct: 4.0 },
];

// Provide US state coordinates
const STATES = [
  {"state":"Alabama","lat":32.806671,"lng":-86.791130,"pct":1.5},
  {"state":"Alaska","lat":61.370716,"lng":-152.404419,"pct":0.5},
  {"state":"Arizona","lat":33.729759,"lng":-111.431221,"pct":2.0},
  {"state":"Arkansas","lat":34.969704,"lng":-92.373123,"pct":1.0},
  {"state":"California","lat":36.116203,"lng":-119.681564,"pct":12.0},
  {"state":"Colorado","lat":39.059811,"lng":-105.311104,"pct":2.0},
  {"state":"Connecticut","lat":41.597782,"lng":-72.755371,"pct":1.0},
  {"state":"Delaware","lat":39.318523,"lng":-75.507141,"pct":0.5},
  {"state":"District of Columbia","lat":38.897438,"lng":-77.026817,"pct":0.5},
  {"state":"Florida","lat":27.766279,"lng":-81.686783,"pct":6.0},
  {"state":"Georgia","lat":33.040619,"lng":-83.643074,"pct":3.0},
  {"state":"Hawaii","lat":21.094318,"lng":-157.498337,"pct":0.5},
  {"state":"Idaho","lat":44.240459,"lng":-114.478828,"pct":1.0},
  {"state":"Illinois","lat":40.349457,"lng":-88.986137,"pct":3.5},
  {"state":"Indiana","lat":39.849426,"lng":-86.258278,"pct":2.0},
  {"state":"Iowa","lat":42.011539,"lng":-93.210526,"pct":1.0},
  {"state":"Kansas","lat":38.526600,"lng":-96.726486,"pct":1.0},
  {"state":"Kentucky","lat":37.668140,"lng":-84.670067,"pct":1.5},
  {"state":"Louisiana","lat":31.169546,"lng":-91.867805,"pct":1.5},
  {"state":"Maine","lat":44.693947,"lng":-69.381927,"pct":0.5},
  {"state":"Maryland","lat":39.063946,"lng":-76.802101,"pct":1.0},
  {"state":"Massachusetts","lat":42.230171,"lng":-71.530106,"pct":2.0},
  {"state":"Michigan","lat":43.326618,"lng":-84.536095,"pct":3.0},
  {"state":"Minnesota","lat":45.694454,"lng":-93.900192,"pct":1.5},
  {"state":"Mississippi","lat":32.741646,"lng":-89.678696,"pct":1.0},
  {"state":"Missouri","lat":38.456085,"lng":-92.288368,"pct":1.5},
  {"state":"Montana","lat":46.921925,"lng":-110.454353,"pct":0.5},
  {"state":"Nebraska","lat":41.125370,"lng":-98.268082,"pct":1.0},
  {"state":"Nevada","lat":38.313515,"lng":-117.055374,"pct":1.0},
  {"state":"New Hampshire","lat":43.452492,"lng":-71.563896,"pct":0.5},
  {"state":"New Jersey","lat":40.298904,"lng":-74.521011,"pct":1.5},
  {"state":"New Mexico","lat":34.5199,"lng":-105.8701,"pct":1.0},
  {"state":"New York","lat":42.165726,"lng":-74.948051,"pct":6.0},
  {"state":"North Carolina","lat":35.630066,"lng":-79.806419,"pct":3.0},
  {"state":"North Dakota","lat":47.528912,"lng":-99.784012,"pct":0.5},
  {"state":"Ohio","lat":40.388783,"lng":-82.764915,"pct":3.0},
  {"state":"Oklahoma","lat":35.565342,"lng":-96.928917,"pct":1.0},
  {"state":"Oregon","lat":44.572021,"lng":-122.070938,"pct":1.5},
  {"state":"Pennsylvania","lat":40.590752,"lng":-77.209755,"pct":4.0},
  {"state":"Rhode Island","lat":41.680893,"lng":-71.511780,"pct":0.5},
  {"state":"South Carolina","lat":33.856892,"lng":-80.945007,"pct":2.0},
  {"state":"South Dakota","lat":44.299782,"lng":-99.438828,"pct":0.5},
  {"state":"Tennessee","lat":35.747845,"lng":-86.692345,"pct":2.0},
  {"state":"Texas","lat":31.054487,"lng":-97.563461,"pct":8.0},
  {"state":"Utah","lat":40.150032,"lng":-111.862434,"pct":1.5},
  {"state":"Vermont","lat":44.045876,"lng":-72.710686,"pct":0.5},
  {"state":"Virginia","lat":37.769337,"lng":-78.169968,"pct":2.5},
  {"state":"Washington","lat":47.382679,"lng":-120.662804,"pct":2.5},
  {"state":"West Virginia","lat":38.491226,"lng":-80.954453,"pct":1.0},
  {"state":"Wisconsin","lat":44.268543,"lng":-89.616508,"pct":1.5},
  {"state":"Wyoming","lat":44.040722,"lng":-105.352150,"pct":0.5},
];

const allRegions = [...COUNTRIES, ...STATES];
const finalHotspots = [];

// Apply user's rule: .01% -> 1, 1% -> 10. 
// count = sqrt(pct * 100)
allRegions.forEach(region => {
  // Add base points
  const count = Math.max(1, Math.round(Math.sqrt(region.pct * 100)));
  
  for (let i = 0; i < count; i++) {
    // We spread them across the state. Larger states (higher pct) get a slightly wider spread
    // so it fills the area instead of completely clustering tightly.
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    // Spread the origins just enough to not be a single pixel, but keep them safely inside borders
    const spreadFactor = 0.35;
    
    const lat = region.lat + z0 * spreadFactor;
    const lng = region.lng + z1 * spreadFactor;
    
    // FAN OUT (Bouquet Effect): Pass along a strong unique splay angle (tilt) so they expand outward 
    // from the origin like a bouquet, filling the visual space above the state without leaving the borders!
    const splayX = z0 * 0.25; 
    const splayY = z1 * 0.25;
    
    finalHotspots.push({
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      delay: parseFloat((Math.random() * 2).toFixed(3)),
      splayX: parseFloat(splayX.toFixed(3)),
      splayY: parseFloat(splayY.toFixed(3))
    });
  }
});

const fileContent = `export const GLOBE_HOTSPOTS = [\n` + 
  finalHotspots.map(h => `  { lat: ${h.lat}, lng: ${h.lng}, delay: ${h.delay}, splayX: ${h.splayX}, splayY: ${h.splayY} }`).join(',\n') + 
  `\n];\n`;

const outPath = path.join(__dirname, 'src/app/components/GlobeHotspotsData.ts');
fs.writeFileSync(outPath, fileContent);
console.log(`Generated ${finalHotspots.length} perfectly aligned hotspots based on logarithmic scale.`);
