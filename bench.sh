#!/usr/bin/env bash

# Usage: ./bench.sh <N>
# <N> is the day number, e.g. 1
# Build and benchmark the program in ./dayN using https://github.com/Stogas/aoc-bench-script

set -euo pipefail

if [ "$#" -ne 1 ]; then
	echo "Usage: $0 <N>  (where N is the day number, e.g. 1)"
	exit 2
fi

DAY="$1"

if ! [[ "$DAY" =~ ^[0-9]+$ ]]; then
	echo "Day must be a single integer"
	exit 2
fi

DAY_DIR="day_${DAY}"
if [ ! -d "$DAY_DIR" ]; then
	echo "Directory '$DAY_DIR' does not exist"
	exit 1
fi

# location to store the downloaded bench script (ignored by git)
DOWNLOAD_DIR=".aoc-bench-script"
DOWNLOAD_SCRIPT="$DOWNLOAD_DIR/bench.sh"
mkdir -p "$DOWNLOAD_DIR"

if [ -f "$DOWNLOAD_SCRIPT" ]; then
	echo "Bench script already exists at $DOWNLOAD_SCRIPT."
	echo "If you need to update it, delete the file and re-run this script."
else
	echo "Downloading bench script to $DOWNLOAD_SCRIPT..."
	curl -sSL https://raw.githubusercontent.com/Stogas/aoc-bench-script/refs/heads/main/bench.sh -o "$DOWNLOAD_SCRIPT"
	chmod +x "$DOWNLOAD_SCRIPT"
fi
echo

OUTPUT_FILE="${DAY_DIR}/bench.md"
echo "# Day ${DAY} - bench run: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$OUTPUT_FILE"
echo "Benchmarked using https://github.com/Stogas/aoc-bench-script" > "$OUTPUT_FILE"

COMMAND="run day"

for ENGINE in "npm" "bun"; do
	if [[ "${ENGINE}" = "bun" ]]; then
		VERSION=$(bun --version)
	else
		VERSION=$(node --version)
	fi
	# add a readable section header with a blank line before it
	printf '\n%s\n\n' "# Day ${DAY} engine ${ENGINE} ${VERSION}" >> "$OUTPUT_FILE"
	echo "Running bench with engine ${ENGINE} ${VERSION} as \"$DOWNLOAD_SCRIPT\" -q 20 3 \"${ENGINE} ${COMMAND} ${DAY}\"..."
	# the bench script expects a single string command to run; pass the binary with -part
	# run the downloaded script with iterations=100 and warmups=2
	"$DOWNLOAD_SCRIPT" -q 20 3 "${ENGINE} ${COMMAND} ${DAY}" >> "$OUTPUT_FILE" 2>&1
done

echo
echo "Benchmark complete. Output written to $OUTPUT_FILE"
