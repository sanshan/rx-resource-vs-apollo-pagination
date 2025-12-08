export type ItemType = 'post' | 'comment' | 'task';

export interface Item {
  id: string; // e.g. "itm-000123"
  title: string; // e.g. "Some title"
  createdAt: string; // ISO string (UTC)
  type: ItemType; // post/comment/task
  userId: string; // e.g. "usr-000042"
  score: number; // 0..100
}
