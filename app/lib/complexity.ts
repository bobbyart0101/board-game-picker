export const COMPLEXITY_RANGES: Record<string, [number, number]> = {
  "Light":         [1.0, 2.0],
  "Medium Light":  [2.0, 2.5],
  "Medium":        [2.5, 3.0],
  "Medium Heavy":  [3.0, 3.5],
  "Heavy":         [3.5, 5.0],
};

export function getComplexityLabel(averageweight: string): string {
  const weight = parseFloat(averageweight);
  for (const [label, [min, max]] of Object.entries(COMPLEXITY_RANGES)) {
    if (weight >= min && weight < max) return label;
  }
  return "Unknown";
}
