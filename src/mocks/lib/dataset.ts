import type { Item } from './types';
import items from '../datasets/items.json';

export const DATA: readonly Item[] = items as readonly Item[];

/**
 * Returns an immutable view of the dataset.
 * Consumers must not mutate it. Use [...getItems()] if a mutable copy is needed.
 */
export function getItems(): readonly Item[] {
  return DATA;
}

/**
 * Finds a single item by ID.
 * Returns undefined if not found.
 */
export function getItemById(id: string): Item | undefined {
  return DATA.find((i) => i.id === id);
}
