// Sanity checks: kirana catalog, translations, stock rule, save queue. Run: npm run check
import assert from 'node:assert/strict'
import { CATALOG, KIRANA_EMOJIS, searchCatalog } from '../src/lib/catalog.js'
import { CATEGORIES, UNITS } from '../src/lib/categories.js'
import { translations } from '../src/lib/translations.js'

const catKeys = new Set(CATEGORIES.map((c) => c.key))
const seen = new Set()
for (const item of CATALOG) {
  const label = item.names.en
  assert(catKeys.has(item.category), `${label}: unknown category ${item.category}`)
  assert(UNITS.includes(item.unit), `${label}: unknown unit ${item.unit}`)
  assert(Number.isInteger(item.max) && item.max > 0, `${label}: bad max ${item.max}`)
  assert(item.emoji && item.names.hi && item.names.mr, `${label}: missing emoji or translation`)
  assert(!seen.has(label.toLowerCase()), `duplicate item ${label}`)
  seen.add(label.toLowerCase())
}

// every language has the same keys, including a label for each category
const enKeys = Object.keys(translations.en).sort()
for (const lang of ['hi', 'mr']) assert.deepEqual(Object.keys(translations[lang]).sort(), enKeys, `${lang} keys differ from en`)
for (const c of CATEGORIES) assert(translations.en[`cat_${c.key}`], `no label for category ${c.key}`)

// search: English, Hinglish alias, Hindi, Marathi
const names = (q, opts) => searchCatalog(q, opts).map((i) => i.names.en)
assert(names('toor').includes('Toor Dal'))
assert(names('arhar').includes('Toor Dal'))
assert(names('दाल').includes('Moong Dal'))
assert(names('हळद').includes('Haldi'))
assert(names('TURMERIC').includes('Haldi'))
// empty query → selected category only; existing items hidden (in any language)
assert(names('', { category: 'Pulses' }).every((n) => CATALOG.find((i) => i.names.en === n).category === 'Pulses'))
assert(!names('dal', { exclude: ['तूर डाळ'] }).includes('Toor Dal'))
assert(KIRANA_EMOJIS.length === new Set(CATALOG.map((i) => i.emoji)).size)

console.log(`catalog OK: ${CATALOG.length} items, ${KIRANA_EMOJIS.length} emojis, ${CATEGORIES.length} categories`)

// stock rule shared by cards, filters, sorting and notifications
import { stockStatus } from '../src/lib/stock.js'
assert.equal(stockStatus(0, 10), 'empty')
assert.equal(stockStatus(2, 10), 'low')
assert.equal(stockStatus(2.5, 10), 'low')
assert.equal(stockStatus(3, 10), 'stocked')
assert.equal(stockStatus(1, 1), 'stocked')
console.log('stock rule OK')

// save queue: rapid taps collapse to the latest value, one request at a time
import { createLatestWriter } from '../src/lib/latestWriter.js'
{
  const sent = []
  const done = []
  let inFlight = 0
  const w = createLatestWriter(
    async (_k, v) => {
      assert.equal(++inFlight, 1, 'only one request per item at a time')
      sent.push(v)
      await new Promise((r) => setTimeout(r, 10))
      inFlight--
    },
    (_k, v) => done.push(v),
  )
  const results = await Promise.all([w.write('a', 1), w.write('a', 2), w.write('a', 3)])
  assert.deepEqual(sent, [1, 3]) // 2 was superseded before it was sent
  assert.deepEqual(results, [3, 3, 3])
  assert.deepEqual(done, [3])
  assert.equal(w.isBusy('a'), false)

  const failing = createLatestWriter(async () => {
    throw new Error('offline')
  })
  await assert.rejects(failing.write('a', 1), /offline/)
  assert.equal(failing.isBusy('a'), false) // next tap starts a fresh save
  console.log('save queue OK')
}
