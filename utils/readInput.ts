import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function readInput(day: number): string {
  const path = join(__dirname, '..', `day_${day}`, 'input.txt');
  return readFileSync(path, 'utf-8').trim();
}

export function readInputLines(day: number): string[] {
  return readInput(day)
    .split('\n')
    .map((line) => line.trim());
}
