/** Encode zero-based index into a cursor string */
export function encodeCursor(i: number): string {
  // Base64 "idx:<number>" keeps it readable and stable
  return btoa(`idx:${i}`);
}

/** Decode cursor into zero-based index (returns -1 if invalid) */
export function decodeCursor(cursor: string | null | undefined): number {
  if (!cursor) return -1;
  try {
    const raw = atob(cursor);
    const [, sIdx] = raw.split(':');
    const i = Number(sIdx);
    return Number.isFinite(i) && i >= 0 ? i : -1;
  } catch {
    return -1;
  }
}

export interface ConnectionArgs {
  // Relay-like
  first?: number;
  after?: string | null;
  last?: number;
  before?: string | null;
}

export interface Connection<T> {
  edges: { cursor: string; node: T }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  totalCount?: number;
}

/** Build a forward/backward connection over an already filtered+sorted list */
export function toConnection<T>(list: readonly T[], args: ConnectionArgs): Connection<T> {
  // Forward pagination
  if (args.first !== undefined) {
    const afterIndex = decodeCursor(args.after) ?? -1;
    const start = afterIndex + 1;
    const size = Math.max(1, Math.min(100, args.first));
    const slice = list.slice(start, start + size);

    const edges = slice.map((node, k) => {
      const i = start + k;
      return { cursor: encodeCursor(i), node };
    });

    const endIndex = start + slice.length - 1;
    return {
      edges,
      pageInfo: {
        hasNextPage: endIndex < list.length - 1,
        hasPreviousPage: start > 0,
        startCursor: edges[0]?.cursor ?? null,
        endCursor: edges[edges.length - 1]?.cursor ?? null,
      },
      totalCount: list.length,
    };
  }

  // Backward pagination
  if (args.last !== undefined) {
    const beforeIndex = decodeCursor(args.before);
    const end = beforeIndex >= 0 ? beforeIndex : list.length;
    const size = Math.max(1, Math.min(100, args.last));
    const start = Math.max(0, end - size);
    const slice = list.slice(start, end);

    const edges = slice.map((node, k) => {
      const i = start + k;
      return { cursor: encodeCursor(i), node };
    });

    return {
      edges,
      pageInfo: {
        hasNextPage: end < list.length,
        hasPreviousPage: start > 0,
        startCursor: edges[0]?.cursor ?? null,
        endCursor: edges[edges.length - 1]?.cursor ?? null,
      },
      totalCount: list.length,
    };
  }

  // Default (no args) — first page
  return toConnection(list, { first: 10, after: null });
}
