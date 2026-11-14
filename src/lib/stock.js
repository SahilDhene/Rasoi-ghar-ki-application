// Single source of truth for stock levels: empty (0), low (≤ 25% of max), stocked.
export function stockStatus(quantity, max) {
  if (quantity <= 0) return 'empty'
  return max > 0 && quantity / max <= 0.25 ? 'low' : 'stocked'
}

export const STATUS_RANK = { empty: 0, low: 1, stocked: 2 } // most urgent first
