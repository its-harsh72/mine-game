import { TOTAL_TILES } from "./constants";

export const calculateMultiplier = (mines, revealedGems) => {
  if (revealedGems === 0) return "1.00";

  const totalGems = TOTAL_TILES - mines;
  let multiplier = 1;

  for (let i = 0; i < revealedGems; i++) {
    multiplier *= (TOTAL_TILES - i) / (totalGems - i);
  }

  return Math.max(1.0, multiplier).toFixed(2);
};
