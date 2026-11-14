import { CartIcon, CookingPotIcon, CupIcon, DropletIcon, FlameIcon, HomeIcon, LayersIcon, LeafIcon, PackageIcon } from './Icons'
import s from './NotFound.module.css'

const FLOATERS = [
  { Icon: LeafIcon, cls: s.f1 },
  { Icon: DropletIcon, cls: s.f2 },
  { Icon: LayersIcon, cls: s.f3 },
  { Icon: CupIcon, cls: s.f4 },
  { Icon: PackageIcon, cls: s.f5 },
  { Icon: CartIcon, cls: s.f6 },
]

export default function NotFound() {
  return (
    <div className={s.page}>
      {FLOATERS.map(({ Icon, cls }, i) => (
        <span key={i} className={`${s.floater} ${cls}`} aria-hidden="true">
          <Icon size={28} />
        </span>
      ))}

      <div className={s.scene}>
        <div className={s.steams} aria-hidden="true">
          <span className={`${s.steam} ${s.s1}`} />
          <span className={`${s.steam} ${s.s2}`} />
          <span className={`${s.steam} ${s.s3}`} />
        </div>
        <div className={s.pot}>
          <CookingPotIcon size={88} className={s.potIcon} />
        </div>
        <div className={s.flame}>
          <FlameIcon size={38} className={s.flameIcon} />
        </div>
      </div>

      <div className={s.content}>
        <h1 className={s.code}>404</h1>
        <p className={s.title}>This dish flew off the menu!</p>
        <p className={s.sub}>The page you're looking for doesn't exist in our kitchen.</p>
        <button className={s.homeBtn} onClick={() => (window.location.href = '/')}>
          <HomeIcon size={16} className={s.homeBtnIcon} />
          Back to Kitchen
        </button>
      </div>
    </div>
  )
}
