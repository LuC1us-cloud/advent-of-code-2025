import { readInputLines } from '../utils/readInput';

const STARTING_DIAL = 50;
const COUNT_ONLY_END_OF_ROTATION = true;

export function solve() {
  const lines = readInputLines(1);

  let dial = STARTING_DIAL;
  let zeroCount = 0;

  for (const line of lines) {
    const movement = parseInput(line);

    for (let i = 0; i < Math.abs(movement); i++) {
      dial = moveDial(dial, movement > 0 ? 1 : -1);

      if (dial === 0 && !COUNT_ONLY_END_OF_ROTATION) zeroCount++;
    }

    if (dial === 0 && COUNT_ONLY_END_OF_ROTATION) zeroCount++;
  }

  console.log('Zero count:', zeroCount);
}

function parseInput(input: string) {
  const directions = input.charAt(0);
  const number = parseInt(input.slice(1));
  if (directions === 'L') return -number;
  return number;
}

function moveDial(dial: number, movement: -1 | 1): number {
  if (dial === 99 && movement === 1) return 0;
  if (dial === 0 && movement === -1) return 99;
  return dial + movement;
}
