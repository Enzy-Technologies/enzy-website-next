"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { DESKTOP_MIN } from "@/app/lib/breakpoints";

/**
 * Variant B hero for /lp/meta: the product video. Two cuts, switched at the
 * site's single structural breakpoint (1024 — see lib/breakpoints):
 *   - touch (< 1024): the portrait cut, with the browser's NATIVE controls
 *     (standard mobile protocol)
 *   - desktop (>= 1024): the landscape (16:9) cut, with a custom control bar
 *     (center play-with-sound, scrubber, volume, fullscreen) that auto-hides
 *
 * Why JS and not just CSS show/hide: a `display:none` <video> with `autoplay`
 * still autoplays and downloads in Chrome, so CSS alone would pull BOTH files
 * (and the wrong one — e.g. the 4.8MB landscape on a phone). Instead we mount
 * exactly ONE <video> for the active breakpoint. Before mount (and on the
 * inactive side) we show the matching poster — tiny (~6KB), so no blank frame
 * and no layout shift when the video swaps in.
 *
 * Both cuts autoplay muted + looped (browsers block autoplay WITH sound).
 */

const FRAME =
  "relative overflow-hidden border border-black/10 dark:border-white/[0.08]";

// Green-tinted glow: a box-shadow with NO offset (0 0) so it radiates evenly on
// all sides rather than dropping downward, soft alpha so it reads as an ambient
// halo. The blur is SCALED per cut (the landscape is ~3x wider than the portrait)
// so the halo looks the same SIZE relative to each video — otherwise a fixed blur
// reads as a much bigger halo on the small portrait than on the wide landscape.
const GLOW_LANDSCAPE =
  "shadow-[0_0_100px_rgba(25,173,125,0.30),0_0_48px_rgba(25,173,125,0.20)]";
const GLOW_PORTRAIT =
  "shadow-[0_0_40px_rgba(25,173,125,0.30),0_0_20px_rgba(25,173,125,0.20)]";

const HIDE_DELAY_MS = 2800;
// Shorter grace period after the cursor leaves the video — lingers, doesn't snap away.
const LEAVE_HIDE_MS = 1400;

function fmtTime(s: number) {
  const t = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

type CutProps = {
  webm: string;
  mp4: string;
  poster: string;
  radius: string;
  glow: string;
  /** Touch: tap toggles the control bar (vs hover-to-reveal on desktop). */
  touch?: boolean;
};

/**
 * Custom control bar with center play-with-sound + auto-hide. On desktop the bar
 * reveals on hover; on touch it toggles on tap (standard mobile behavior).
 */
function VideoCutCustom({ webm, mp4, poster, radius, glow, touch = false }: CutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  const [started, setStarted] = useState(false); // center play clicked yet
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.muted = true; // pin for autoplay
  }, []);

  // Mirror the <video>'s own state into React (covers keyboard, native events).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onDur = () => setDuration(Number.isFinite(v.duration) ? v.duration : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVol = () => {
      setMuted(v.muted);
      setVolume(v.volume);
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("durationchange", onDur);
    v.addEventListener("loadedmetadata", onDur);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("durationchange", onDur);
      v.removeEventListener("loadedmetadata", onDur);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  useEffect(() => {
    const onFs = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setIsFs(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  // Hide after `delay` of inactivity — unless paused (then controls stay).
  const scheduleHide = (delay = HIDE_DELAY_MS) => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (ref.current && !ref.current.paused) setControlsVisible(false);
    }, delay);
  };

  // Reveal controls, then start the auto-hide countdown.
  const revealControls = () => {
    setControlsVisible(true);
    scheduleHide();
  };

  const startWithSound = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    if (v.volume === 0) v.volume = 1;
    setStarted(true);
    void v.play().catch(() => {});
    revealControls();
  };

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
    revealControls();
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 1;
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) ref.current.currentTime = Number(e.target.value);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = ref.current;
    if (!v) return;
    const vol = Number(e.target.value);
    v.volume = vol;
    v.muted = vol === 0;
  };

  const toggleFullscreen = () => {
    const el = containerRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => void;
    };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
    } else if (el) {
      (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
    }
  };

  const remaining = duration ? duration - current : 0;
  const btn =
    "flex items-center justify-center text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded";

  return (
    <div
      ref={containerRef}
      className={`${FRAME} ${glow} ${radius} ${isFs ? "flex items-center justify-center bg-black" : ""}`}
      onMouseEnter={!touch && started ? revealControls : undefined}
      onMouseMove={!touch && started ? revealControls : undefined}
      onMouseLeave={!touch ? () => started && scheduleHide(LEAVE_HIDE_MS) : undefined}
    >
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label="Enzy product overview"
        onClick={started ? togglePlay : undefined}
        className={`block w-full ${isFs ? "h-auto max-h-full" : "h-auto"}`}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      {/* Center play — starts the video over WITH sound (initial state only). */}
      {!started && (
        <button
          type="button"
          onClick={startWithSound}
          aria-label="Play with sound"
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition hover:bg-black/10"
        >
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-black/70">
            <Play className="ml-1" size={30} fill="currentColor" aria-hidden />
          </span>
        </button>
      )}

      {/* Auto-hiding control bar (after the video has been started with sound). */}
      {started && (
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className={`${btn} h-8 w-8 shrink-0`}>
            {playing ? <Pause size={18} aria-hidden /> : <Play size={18} fill="currentColor" aria-hidden />}
          </button>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={onSeek}
            aria-label="Seek"
            className="h-1 min-w-0 flex-1 cursor-pointer accent-[#19ad7d]"
          />

          <span className="shrink-0 font-inter text-[12px] tabular-nums text-white/90">
            -{fmtTime(remaining)}
          </span>

          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={`${btn} h-8 w-8 shrink-0`}>
            {muted || volume === 0 ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
          </button>
          {/* Volume slider only on desktop — it doesn't fit the narrow portrait
              bar and isn't usable on touch (phones use the hardware volume). */}
          {!touch && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={onVolume}
              aria-label="Volume"
              className="h-1 w-16 shrink-0 cursor-pointer accent-[#19ad7d]"
            />
          )}

          <button type="button" onClick={toggleFullscreen} aria-label={isFs ? "Exit fullscreen" : "Enter fullscreen"} className={`${btn} h-8 w-8 shrink-0`}>
            {isFs ? <Minimize size={18} aria-hidden /> : <Maximize size={18} aria-hidden />}
          </button>
        </div>
      )}
    </div>
  );
}

export function LpHeroVideo() {
  // null until mounted — render posters only, so SSR ships no <video> and
  // exactly one mounts client-side once we know the viewport.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* Touch (< 1024): portrait cut, custom controls (tap to toggle) */}
      <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:hidden">
        {isDesktop === false ? (
          <VideoCutCustom
            touch
            webm="/lp/hero-video-portrait.webm"
            mp4="/lp/hero-video-portrait.mp4"
            poster="/lp/hero-video-portrait-poster.jpg"
            radius="rounded-[36px]"
            glow={GLOW_PORTRAIT}
          />
        ) : (
          <div className={`${FRAME} ${GLOW_PORTRAIT} rounded-[36px]`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lp/hero-video-portrait-poster.jpg" alt="" className="block h-auto w-full" />
          </div>
        )}
      </div>

      {/* Desktop (>= 1024): landscape cut, custom controls */}
      <div className="mx-auto hidden w-full max-w-[960px] lg:block">
        {isDesktop === true ? (
          <VideoCutCustom
            webm="/lp/hero-video-landscape.webm"
            mp4="/lp/hero-video-landscape.mp4"
            poster="/lp/hero-video-landscape-poster.jpg"
            radius="rounded-[24px]"
            glow={GLOW_LANDSCAPE}
          />
        ) : (
          <div className={`${FRAME} ${GLOW_LANDSCAPE} rounded-[24px]`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lp/hero-video-landscape-poster.jpg" alt="" className="block h-auto w-full" />
          </div>
        )}
      </div>
    </>
  );
}
