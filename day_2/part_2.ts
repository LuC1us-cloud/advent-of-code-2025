import { readInputLines } from '../utils/readInput';

export function solvePart2() {
  let sum_total = 0;
  const lines = readInputLines(2);
  const parsedInput = lines[0]
    .split(',')
    .map((range) =>
      range
        .split('-')
        .map(Number)
        .sort((a, b) => a - b)
    )
    .sort((a, b) => a[0] - b[0]);

  for (const input of parsedInput) {
    const rangeMin = input[0];
    const rangeMax = input[1];

    for (let index = rangeMin; index <= rangeMax; index++) {
      if (!isValidNumber(index)) sum_total += index;
    }
  }

  console.log('Total of all invalid IDS: ', sum_total);
}

function isValidNumber(number: number): boolean {
  const digitCount = number.toString().length;
  const halfCount = Math.floor(digitCount / 2);

  for (let digitIndex = 1; digitIndex <= halfCount; digitIndex++) {
    const digitSequence = number.toString().slice(0, digitIndex);

    // Check if sequence can be combined to form original number
    if (number.toString().length % digitSequence.length === 0) {
      const multiplier = number.toString().length / digitSequence.length;
      const possibleVariant = Number.parseInt(digitSequence.repeat(multiplier));

      if (possibleVariant === number) {
        return false;
      }
    }
  }

  return true;
}
