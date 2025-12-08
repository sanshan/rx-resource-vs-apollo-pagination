// Comments: GraphQL handlers for cursor-based pagination (ItemsConnection)
import { graphql, HttpResponse } from 'msw';
import { getItems } from '../lib/dataset';
import { toConnection } from '../lib/cursors';
import { GRAPHQL_HTTP_URI } from '../../app/apollo/apollo.links';

const gql = graphql.link(GRAPHQL_HTTP_URI);

export const gqlCursorHandlers = [
  gql.query('ItemsConnection', ({ variables }) => {
    const {
      first,
      after,
      last,
      before,
    }: {
      first?: number | null;
      after?: string | null;
      last?: number | null;
      before?: string | null;
    } = variables;

    const list = getItems();

    const connection = toConnection(list, {
      first: first ?? undefined,
      after: after ?? null,
      last: last ?? undefined,
      before: before ?? null,
    });

    return HttpResponse.json({
      data: {
        ItemsConnection: connection,
      },
    });
  }),
];
