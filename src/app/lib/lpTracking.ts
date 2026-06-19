import { LP_VARIANT_PARAM, type LpVariant } from "@/app/lib/lpExperiment";

/**
 * Fire a variant-tagged GA4 event for the /lp/meta A/B test. Client-only —
 * call from event handlers / effects. No-ops when GA4 isn't loaded.
 *
 * `lp_variant` is also set as a default param on page load (see lp/meta/page),
 * so it rides along automatically; we pass it explicitly here for robustness.
 */
type Gtag = (...args: unknown[]) => void;

function gtagEvent(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, params);
}

export function trackLpConversion(event: "lp_form_submit" | "lp_booking", variant: LpVariant) {
  gtagEvent(event, { [LP_VARIANT_PARAM]: variant });
}

/**
 * Hero-video engagement events for GA4. We use GA4's STANDARD video event names
 * and param names (video_start / video_progress / video_complete, with
 * video_provider/title/url/duration/current_time/percent) so they light up GA4's
 * built-in video dimensions automatically — no custom-dimension setup needed.
 *
 * `lp_variant` rides along as a default param (set via gtag('set') on page load),
 * so every event is sliceable by A/B variant without passing it here.
 *
 * Note: the hero autoplays MUTED, so `video_start` fires for ~every visitor —
 * treat it as an impression, not intent. The intent signal is the custom
 * `video_play_with_sound` (the viewer clicked the center play-with-sound button).
 */
type VideoEvent = "video_start" | "video_progress" | "video_complete" | "video_play_with_sound";

export function trackVideo(
  event: VideoEvent,
  data: { title: string; url: string; duration: number; currentTime: number; percent?: number },
) {
  gtagEvent(event, {
    video_provider: "self",
    video_title: data.title,
    video_url: data.url,
    video_duration: Math.round(data.duration),
    video_current_time: Math.round(data.currentTime),
    ...(data.percent != null ? { video_percent: data.percent } : {}),
  });
}
