import { httpCursorHandlers } from './http.cursor';
import { httpOffsetHandlers } from './http.offset';
import { gqlOffsetHandlers } from './gql.offset';
import { gqlCursorHandlers } from './gql.cursor';

export const handlers = [
  ...httpCursorHandlers,
  ...httpOffsetHandlers,
  ...gqlOffsetHandlers,
  ...gqlCursorHandlers,
];
