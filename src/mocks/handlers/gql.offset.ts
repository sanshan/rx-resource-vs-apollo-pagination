import { delay, graphql, HttpResponse } from 'msw';
import { getItems } from '../lib/dataset';
import { page } from '../lib/paginate';
import { GRAPHQL_HTTP_URI } from '../../app/apollo/apollo.links';

const gql = graphql.link(GRAPHQL_HTTP_URI);

export const gqlOffsetHandlers = [
  gql.query('GetOffsetPaginationData', async ({ variables }) => {
    const {
      limit = 10,
      offset = 0,
    }: {
      limit?: number;
      offset?: number;
    } = variables;

    const list = getItems();

    const { items, total } = page(list, { limit, offset });

    await delay(800);

    return HttpResponse.json({
      data: {
        FindAllItems: { items, total },
      },
    });
  }),
];
