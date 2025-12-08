import { delay, http, HttpResponse } from 'msw';
import { getItems } from '../lib/dataset';
import { page } from '../lib/paginate';

export const httpOffsetHandlers = [
  http.get('/api/items', async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? '10');
    const offset = Number(url.searchParams.get('offset') ?? '0');

    const { items, total } = page(getItems(), { limit, offset });

    await delay(800);

    return HttpResponse.json({ items, total });
  }),
];
