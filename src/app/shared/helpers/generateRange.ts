export default function generateRange(start: number, end: number): number[] {
  if (start === end) return [start];
  return [start, ...generateRange(start + 1, end)];
}
