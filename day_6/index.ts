import { readInputLines } from '../utils/readInput';

export function solve() {
  part1();
  part2();
}

function part2() {
  const lines = readInputLines(6);

  // the - + * symbols are the start of the column, so we can split the columns by these symbols
  const symbolLine = lines[lines.length - 1];
  const maxLineLength = lines.reduce(
    (max, line) => Math.max(max, line.length),
    0
  );
  const symbolIndices = [];
  for (let i = 0; i < symbolLine.length; i++) {
    if (
      symbolLine[i] === '-' ||
      symbolLine[i] === '+' ||
      symbolLine[i] === '*'
    ) {
      symbolIndices.push(i);
    }
  }

  let sum = 0;
  // we can then read all lines from the indice to next indice - 1, then combining the numbers into full numbers and reversing the order since we need them read from right to left
  for (let i = 0; i < symbolIndices.length; i++) {
    const symbol = symbolLine[symbolIndices[i]];
    const startIndex = symbolIndices[i];
    const endIndex = symbolIndices[i + 1]
      ? symbolIndices[i + 1]
      : maxLineLength;

    const columnNumbers = [];
    for (let j = startIndex; j < endIndex - 1; j++) {
      let lineNumber = '';
      for (let k = 0; k <= lines.length - 1; k++) {
        const number = lines[k][j];
        if (!Number.isNaN(Number(number))) {
          lineNumber += number;
        }
      }

      columnNumbers.push(Number(lineNumber));
    }
    columnNumbers.reverse();

    let columnSum = columnNumbers[0];
    for (let j = 1; j < columnNumbers.length; j++) {
      if (symbol === '-') {
        columnSum -= columnNumbers[j];
      }
      if (symbol === '+') {
        columnSum += columnNumbers[j];
      }
      if (symbol === '*') {
        columnSum *= columnNumbers[j];
      }
    }
    sum += columnSum;
  }
  console.log('Sum Part 2: ', sum);
}

function part1() {
  const lines = readInputLines(6);
  const grid = lines.map((line) =>
    line
      .split(' ')
      .filter((char) => char.trim())
      .map((char) => char.toString())
  );

  let sum = 0;
  for (let i = 0; i < grid[0].length; i++) {
    const symbol = grid[grid.length - 1][i];
    let sumOfColumn = Number(grid[0][i]);

    for (let j = 1; j < grid.length - 1; j++) {
      if (symbol === '-') {
        sumOfColumn -= Number(grid[j][i]);
      }
      if (symbol === '+') {
        sumOfColumn += Number(grid[j][i]);
      }
      if (symbol === '*') {
        sumOfColumn *= Number(grid[j][i]);
      }
    }

    sum += sumOfColumn;
  }
  console.log('Sum Part 1: ', sum);
}
