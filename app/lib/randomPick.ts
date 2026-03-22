interface PickResult<T> {
  primary: T;
  alternatives: T[];
}

export function randomPick<T>(items: T[]): PickResult<T> | null {
  if (items.length === 0) return null;

  const index = Math.floor(Math.random() * items.length);
  const primary = items[index];
  const alternatives = items.filter((_, i) => i !== index);

  return { primary, alternatives };
}
