/**
 * Single source of truth for responsive breakpoints.
 *
 * These mirror Tailwind's DEFAULT screens (sm/md/lg) so CSS (Tailwind `lg:`,
 * raw `@media`) and JS agree by construction — there is no `tailwind.config`
 * overriding them.
 *
 * THE RULE: every *structural* mobile-vs-desktop decision (layout, visibility,
 * behavior, nav, animation tier) uses the single line `DESKTOP_MIN` (1024).
 *   - `< 1024` = the touch experience (phone AND tablet share it)
 *   - `>= 1024` = desktop
 *
 * `sm`/`md` survive only as cosmetic refinement *within* the touch tier (type
 * scale, spacing, graphic fit) — never to make a structural decision. The one
 * deliberate phone-vs-tablet split is `PHONE_MAX`, used ONLY for the iOS-Safari
 * bottom-bar clip (an iPhone Safari quirk iPadOS doesn't have).
 */
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 } as const;

/** The one structural line: `< DESKTOP_MIN` = touch, `>= DESKTOP_MIN` = desktop. */
export const DESKTOP_MIN = BREAKPOINTS.lg; // 1024

/** Phone vs tablet — used ONLY for the iOS-Safari clip (Rule 3). */
export const PHONE_MAX = BREAKPOINTS.md - 1; // 767

export const MEDIA = {
  desktop: `(min-width: ${DESKTOP_MIN}px)`, // >= 1024
  touch: `(max-width: ${DESKTOP_MIN - 1}px)`, // <= 1023
  phone: `(max-width: ${PHONE_MAX}px)`, // <= 767 (iOS clip only)
} as const;
