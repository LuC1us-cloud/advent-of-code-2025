import { readInputLines } from '../utils/readInput';

const ACTIVE_BATTERIES_PER_BANK = 12;

export function solve() {
  const banks = readInputLines(3);
  let totalJoltage = 0;

  for (const bank of banks) {
    const bankLength = bank.trim().length;
    const batteries = Array.from(
      { length: ACTIVE_BATTERIES_PER_BANK },
      () => 0
    );

    for (let battery = 0; battery < bankLength; battery++) {
      const currentBatteryPower = Number.parseInt(bank[battery]);
      const batteriesLeftInTheBank = bankLength - battery;

      for (
        let i = Math.max(0, ACTIVE_BATTERIES_PER_BANK - batteriesLeftInTheBank);
        i < ACTIVE_BATTERIES_PER_BANK;
        i++
      ) {
        if (currentBatteryPower > batteries[i]) {
          batteries[i] = currentBatteryPower;
          for (let j = i + 1; j < ACTIVE_BATTERIES_PER_BANK; j++) {
            batteries[j] = 0;
          }
          break;
        }
      }
    }
    const totalBankPower = Number.parseInt(batteries.join(''));

    totalJoltage += totalBankPower;
  }

  console.log('Total joltage in all banks: ', totalJoltage);
}
