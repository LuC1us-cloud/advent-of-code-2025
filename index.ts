const day = process.argv[2];

if (!day) {
  console.error('Usage: npx ts-node index.ts <day>');
  process.exit(1);
}

import(`./day_${day}/index.ts`)
  .then((module) => {
    module.default?.() ?? module.solve?.();
  })
  .catch((err) => {
    console.error(`Failed to run day ${day}:`, err.message);
  });
