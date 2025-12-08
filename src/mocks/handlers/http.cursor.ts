import { http, HttpResponse } from 'msw';
import { getItems } from '../lib/dataset';
import { toConnection } from '../lib/cursors';

/**
 * REST (cursor-based) endpoint.
 * GET /api/items-connection?first&after&last&before&userId&type&q&sort
 *
 * Response shape matches a typical Relay-style connection:
 * {
 *   edges: [{ cursor, node }, ...],
 *   pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
 *   totalCount
 * }
 */
export const httpCursorHandlers = [
  http.get('/api/items-connection', ({ request }) => {
    const url = new URL(request.url);
    const first = url.searchParams.get('first');
    const after = url.searchParams.get('after');
    const last = url.searchParams.get('last');
    const before = url.searchParams.get('before');

    const list = getItems();

    const connection = toConnection(list, {
      first: first ? Number(first) : undefined,
      after: after ?? null,
      last: last ? Number(last) : undefined,
      before: before ?? null,
    });

    return HttpResponse.json(connection);
  }),
];
