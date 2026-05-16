/**
 * Pure helpers for the swipe-to-close gesture on the Calculator drawer.
 *
 * Kept side-effect-free so the logic can be unit-tested without simulating
 * touch events in a DOM environment.
 */

export const SWIPE_CLOSE_DX = 80
export const SWIPE_MAX_DY = 50

/** Should we close the drawer for the given finger delta? */
export function shouldCloseOnSwipe(dx: number, dy: number): boolean {
  return dx > SWIPE_CLOSE_DX && Math.abs(dy) < SWIPE_MAX_DY
}

/**
 * How much to translate the drawer on `touchmove`. We only follow the finger
 * to the right (positive dx) and never push the drawer past the screen edge
 * on the left. Returns 0 when the gesture is mostly vertical.
 */
export function dragTranslate(dx: number, dy: number): number {
  if (Math.abs(dy) > SWIPE_MAX_DY) return 0
  if (dx <= 0) return 0
  return dx
}
