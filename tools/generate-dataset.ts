/*
  Notes:
  - GraphQL Codegen mapping example:
      mappers: { Item: './src/mocks/datasets/generate#Item' }
*/

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { faker } from '@faker-js/faker';

// ---------- Types ----------
export type ItemType = 'post' | 'comment' | 'task';

export interface Item {
  id: string; // e.g., "itm-000123"
  title: string; // e.g., "Post #123"
  createdAt: string; // ISO string (UTC)
  type: ItemType; // post/comment/task
  userId: string; // e.g., "usr-000042"
  score: number; // 0..100
}

// ---------- Seed faker for deterministic output ----------
faker.seed(2025);

// ---------- Core generator ----------
export function generateDataset(count: number): Item[] {
  const items: Item[] = Array.from({ length: count }, (_, i) => {
    const tempId = i + 1;
    const createdAt = faker.date.recent({ days: 365 }).toISOString();
    const type = faker.helpers.arrayElement(['post', 'comment', 'task']);
    const userNum = faker.number.int({ min: 1, max: 80 });
    const title = faker.hacker.phrase();
    const score = faker.number.int({ min: 0, max: 100 });

    return {
      id: String(tempId),
      title: `${title} #${tempId}`,
      createdAt,
      type,
      userId: `usr-${String(userNum).padStart(6, '0')}`,
      score,
    } satisfies Item;
  });

  items.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return Number(b.id) - Number(a.id);
  });

  const width = String(items.length).length;
  for (let i = 0; i < items.length; i++) {
    items[i].id = `itm-${String(i + 1).padStart(Math.max(6, width), '0')}`;
  }

  return items;
}

// ---------- CLI ----------
function parseArgs(argv: readonly string[]): { count: number; out: string } {
  let count = 500;
  let out = 'src/mocks/datasets/items.json';

  const args = [...argv];
  const first = args.find((a) => !a.startsWith('--'));
  if (first) count = Number(first);

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--out' && args[i + 1] && !args[i + 1].startsWith('--')) {
      out = args[++i];
    }
  }

  if (!Number.isFinite(count) || count <= 0) throw new Error('Invalid count');
  return { count, out };
}

function ensureDir(filePath: string): void {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
}

function main(): void {
  const { count, out } = parseArgs(process.argv.slice(2));
  const data = generateDataset(count);
  ensureDir(out);
  writeFileSync(out, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
  console.log(`\n✅ Generated ${data.length} items → ${out}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (err: unknown) {
    console.error('❌ Generation failed:', err);
    process.exit(1);
  }
}
