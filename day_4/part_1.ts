import { readInputLines } from '../utils/readInput';

export function solvePart1() {
  const lines = readInputLines(4);
  const matrix = lines.map((line) => line.split('').map(String));
  let accessiblePaper = 0;

  // transform matrix into weighted matrix
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      let surroundingPaper = 0;

      if (matrix[x][y] === '.') continue;

      // check surrounding blocks
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // skip self
          if (i === 0 && j === 0) continue;

          const currentBlock = matrix[x + i]?.[y + j];
          // if current block is not a dot, add to surrounding paper
          if (currentBlock !== '.' && currentBlock !== undefined) {
            surroundingPaper++;
          }
        }
      }

      matrix[x][y] = surroundingPaper.toString();

      if (surroundingPaper < 4) accessiblePaper++;
    }
  }

  console.log('Part 1: Accessible paper ', accessiblePaper);
}
