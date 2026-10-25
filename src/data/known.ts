/** The ID from `known` that equals `id`; a reference to an entry that does not exist fails when the data loads. */
export function knownId<I extends string>(known: readonly I[], id: string, what: string): I {
  const found = known.find((k) => k === id);
  if (found === undefined) throw new Error(`${what}: unknown ID ${id}`);
  return found;
}
