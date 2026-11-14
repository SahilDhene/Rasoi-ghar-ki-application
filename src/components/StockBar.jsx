import s from './StockBar.module.css'

export default function StockBar({ quantity, maxQuantity }) {
  const pct = maxQuantity > 0 ? Math.min((quantity / maxQuantity) * 100, 100) : 0
  const color = pct === 0 ? s.red : pct <= 25 ? s.amber : s.green
  return (
    <div className={s.track}>
      <div className={`${s.fill} ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
