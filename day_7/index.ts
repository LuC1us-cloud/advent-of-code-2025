import { readInputLines } from '../utils/readInput';

const locations: { x: number; y: number }[] = [];
const beamSplits: { x: number; y: number }[] = [];
let alternateTimelines = 0;

export function solve() {
  const lines = readInputLines(7);
  let x = lines[0].indexOf('S');
  let y = 0;

  let currentLevel = new Map<number, number>();
  currentLevel.set(x, 1);
  let rayCount = 0;

  for (let row = y; row < lines.length; row++) {
    const nextLevel = new Map<number, number>();

    for (const [xPos, paths] of currentLevel.entries()) {
      const line = lines[row + 1]?.trim();

      // line undefined means we've hit the bottom of the map
      if (line === undefined) {
        locations.push({ x: xPos, y: row });
        rayCount += paths;
        continue;
      }

      // if x is out of bounds, skip
      if (xPos < 0 || xPos >= line.length) continue;

      const symbol = line[xPos];

      if (symbol === '.') {
        nextLevel.set(xPos, (nextLevel.get(xPos) || 0) + paths);
      }
      if (symbol === '^') {
        beamSplits.push({ x: xPos, y: row });
        alternateTimelines++;
        nextLevel.set(xPos - 1, (nextLevel.get(xPos - 1) || 0) + paths);
        nextLevel.set(xPos + 1, (nextLevel.get(xPos + 1) || 0) + paths);
      }
    }

    currentLevel = nextLevel;
    if (currentLevel.size === 0) break;
  }

  const uniqueLocations = [...new Set(locations.map((location) => location.x))];
  const uniqueBeamSplits = [
    ...new Set(beamSplits.map((beamSplit) => `${beamSplit.x},${beamSplit.y}`)),
  ];
  console.log('Unique location count:', uniqueLocations.length);
  console.log('Unique beam split count:', uniqueBeamSplits.length);
  console.log('Ray count:', rayCount);
  console.log('Alternate timelines:', alternateTimelines);
}
