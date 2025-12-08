export interface PageArgs {
  /** Number of items to return (default: 10, max: 100) */
  limit?: number;
  /** Offset from the start of the list (default: 0) */
  offset?: number;
}

/**
 * Returns a stable paginated slice of an array with total count.
 * The source array is treated as readonly and never mutated.
 */
export function page<T>(
  list: readonly T[],
  { limit = 10, offset = 0 }: PageArgs,
): { items: T[]; total: number } {
  const total = list.length;
  const start = Math.max(0, offset);
  const end = Math.min(total, start + Math.max(1, Math.min(limit, 100)));

  // slice() already returns a new mutable array, so no readonly issues
  const items = list.slice(start, end);

  return { items, total };
}
