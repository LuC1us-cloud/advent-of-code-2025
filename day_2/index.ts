import { readInputLines } from '../utils/readInput';

export function solve() {
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
    const rangeMax = input[1];
    let currentNum = input[0];

    // loop through invalid id's until the current_num is larger than the max range value
    while (currentNum <= rangeMax) {
      // check if currentNumber is invalid and if so, add it to sum
      if (!isValidNumber(currentNum)) sum_total += currentNum;
      // move to next invalid ID
      currentNum = getNextInvalidNumber(currentNum);
    }
  }

  console.log('Total of all invalid IDS: ', sum_total);
}

function isValidNumber(number: number): boolean {
  // if number has odd amount of digits, return valid
  if (number.toString().length % 2 !== 0) return true;
  const firstHalf = number.toString().slice(0, number.toString().length / 2);
  const secondHalf = number.toString().slice(number.toString().length / 2);

  // if first half is equal to second half, return invalid
  if (firstHalf === secondHalf) return false;

  // if first half is not equal to second half, return valid
  return true;
}

function getNextInvalidNumber(number: number): number {
  const digitCount = number.toString().length;

  // if odd amount of digits, skip to closest not odd, tendem repeat number
  if (digitCount % 2 !== 0) {
    const roundUp = Math.pow(10, digitCount);
    const firstHalf = roundUp
      .toString()
      .slice(0, roundUp.toString().length / 2);
    const compositeNumber = Number.parseInt(`${firstHalf}${firstHalf}`);

    return compositeNumber;
  }

  // if number is even, we need to check if number is lower than current first digit tendem repeat
  const firstHalf = number.toString().slice(0, number.toString().length / 2);
  const compositeNumber = Number.parseInt(`${firstHalf}${firstHalf}`);
  if (number < compositeNumber) {
    return compositeNumber;
  }

  // if number is larger, then take first half and increment by one, then combine back together.
  const incremented = Number.parseInt(firstHalf) + 1;
  const incrementedCompositeNumber = Number.parseInt(
    `${incremented}${incremented}`
  );

  return incrementedCompositeNumber;
}
