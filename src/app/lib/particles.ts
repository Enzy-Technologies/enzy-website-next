/**
 * Site-wide on/off state for the interactive pixel-canvas background.
 *
 * The "magic wand" turns the canvas off for the whole site. That needs to be a
 * persisted, shared flag (not an in-memory ref inside one PixelCanvas instance),
 * so the canvas stays off across route changes and page reloads — mirroring how
 * the theme preference is persisted via a cookie.
 */

export const PARTICLES_COOKIE = "enzy-particles";
/** Fired (client-side) whenever the flag changes, so SiteShell can react live. */
export const PARTICLES_EVENT = "enzy-particles-changed";

/** Persist the off/on state and broadcast the change. Client-side only. */
export function writeParticlesDisabled(disabled: boolean) {
  const value = disabled ? "off" : "on";
  try {
    document.cookie = `${PARTICLES_COOKIE}=${value};path=/;max-age=31536000;samesite=lax`;
    localStorage.setItem(PARTICLES_COOKIE, value);
  } catch {}
  try {
    window.dispatchEvent(
      new CustomEvent(PARTICLES_EVENT, { detail: { disabled } })
    );
  } catch {}
}

/** Event the PixelCanvas listens for to run its gather/consume animation. */
export const PIXEL_SPHERE_EVENT = "enzy-pixel-sphere";

/**
 * Toggle the pixel canvas from the magic wand, following the persisted cookie
 * state both ways (like the theme button):
 *  - If currently ON  → play the gather/consume animation, which persists OFF
 *    once it finishes (see PixelCanvas).
 *  - If currently OFF → turn it back ON, which re-mounts the canvas and brings
 *    all the pixels back.
 * `x`/`y` are the wand's screen position, used as the gather point.
 */
export function requestParticlesToggle(x: number, y: number) {
  if (readParticlesDisabled()) {
    writeParticlesDisabled(false);
  } else {
    try {
      window.dispatchEvent(
        new CustomEvent(PIXEL_SPHERE_EVENT, {
          detail: { triggerClick: true, x, y, force: true },
        })
      );
    } catch {}
  }
}

/** Read the current state on the client (cookie first, then localStorage). */
export function readParticlesDisabled(): boolean {
  try {
    const m = document.cookie.match(/(?:^|; )enzy-particles=([^;]*)/);
    const c = m ? decodeURIComponent(m[1]) : null;
    if (c) return c === "off";
    return localStorage.getItem(PARTICLES_COOKIE) === "off";
  } catch {
    return false;
  }
}
