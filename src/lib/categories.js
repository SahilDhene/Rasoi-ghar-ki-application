// Category keys are what's stored in grocery_items.category.
// The original 7 keys (Vegetables, Dairy, Grains, Spices, Beverages, Snacks, Other) are kept as-is
// so existing items keep working; their labels are now Indian-style (see cat_* in translations.js).
export const CATEGORIES = [
  { key: 'Vegetables', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  { key: 'Fruits', color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
  { key: 'Dairy', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  { key: 'Grains', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  { key: 'Pulses', color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
  { key: 'Spices', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { key: 'Oil', color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  { key: 'Snacks', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  { key: 'Beverages', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { key: 'Pooja', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { key: 'Cleaning', color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  { key: 'Other', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
]

export const UNITS = ['kg', 'g', 'litre', 'ml', 'pcs', 'packet', 'dozen']

const FALLBACK = { key: 'Other', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' }

export function getCategory(key) {
  return CATEGORIES.find((c) => c.key === key) ?? FALLBACK
}

// Translated label; unknown keys (e.g. typed in by an older app version) show as-is.
export function categoryLabel(t, key) {
  const k = `cat_${key}`
  const label = t(k)
  return label === k ? key : label
}
