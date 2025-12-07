import { readInputLines } from '../utils/readInput';

export function solve() {
  const lines = readInputLines(5);
  // an empty line seperates the id ranges and actual ids
  const idRanges = lines.slice(0, lines.indexOf(''));
  const ingredientIds = lines.slice(lines.indexOf('') + 1);

  // since the ranges overlap, let's build an array of final id ranges
  const finalIdRanges = idRanges.map((idRange) => {
    const [start, end] = idRange.split('-').map(Number);
    return { start, end };
  });
  // sort the final id ranges by start
  finalIdRanges.sort((a, b) => a.start - b.start);
  // reduce overlapping ranges
  const reducedFinalIdRanges = finalIdRanges.reduce(
    (acc: { start: number; end: number }[], curr) => {
      if (acc.length === 0) {
        acc.push(curr);
      } else {
        const lastRange = acc[acc.length - 1];
        if (curr.start <= lastRange.end) {
          lastRange.end = Math.max(lastRange.end, curr.end);
        } else {
          acc.push(curr);
        }
      }
      return acc;
    },
    []
  );

  let validIds = 0;
  for (const ingredientId of ingredientIds) {
    const id = Number(ingredientId);
    let isValid = false;

    for (const finalIdRange of reducedFinalIdRanges) {
      if (id < finalIdRange.start) {
        break;
      }
      if (id >= finalIdRange.start && id <= finalIdRange.end) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      validIds++;
    }
  }

  console.log('Valid IDs: ', validIds);

  let sumOfValidIds = 0;
  for (const finalIdRange of reducedFinalIdRanges) {
    sumOfValidIds += finalIdRange.end - finalIdRange.start + 1;
  }
  console.log('Sum of valid IDs: ', sumOfValidIds);
}
