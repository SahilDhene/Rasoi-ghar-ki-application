// Microsoft Fluent System Icons (MIT) — each icon renders its Regular + Filled variant;
// CSS in index.css cross-fades to Filled on hover/focus or when given className "fi-on".
import {
  Add24Filled, Add24Regular, ArrowSortDownLines24Filled, ArrowSortDownLines24Regular,
  BowlSalad24Filled, BowlSalad24Regular, Box24Filled, Box24Regular, Cart24Filled, Cart24Regular,
  CheckmarkCircle24Filled, CheckmarkCircle24Regular, Cookies24Filled, Cookies24Regular,
  Delete24Filled, Delete24Regular, Dismiss24Filled, Dismiss24Regular, DismissCircle24Filled,
  DismissCircle24Regular, Drop24Filled, Drop24Regular, DrinkCoffee24Filled, DrinkCoffee24Regular,
  Edit24Filled, Edit24Regular, ErrorCircle24Filled, ErrorCircle24Regular, Fire24Filled, Fire24Regular,
  FoodApple24Filled, FoodApple24Regular, FoodCarrot24Filled, FoodCarrot24Regular, FoodEgg24Filled,
  FoodEgg24Regular, FoodGrains24Filled, FoodGrains24Regular, Home24Filled, Home24Regular,
  PersonAdd24Filled, PersonAdd24Regular, Settings24Filled, Settings24Regular, SignOut24Filled,
  SignOut24Regular, Sparkle24Filled, Sparkle24Regular, Subtract24Filled, Subtract24Regular,
  TextSortAscending24Filled, TextSortAscending24Regular, Warning24Filled, Warning24Regular,
  WeatherMoon24Filled, WeatherMoon24Regular, WeatherSunny24Filled, WeatherSunny24Regular,
} from '@fluentui/react-icons'

function fluent(Regular, Filled) {
  return function Icon({ size = 20, className = '' }) {
    return (
      <span className={`fi ${className}`} style={{ fontSize: size }} aria-hidden="true">
        <Regular className="fi-r" />
        <Filled className="fi-f" />
      </span>
    )
  }
}

export const HomeIcon = fluent(Home24Regular, Home24Filled)
export const PlusIcon = fluent(Add24Regular, Add24Filled)
export const MinusIcon = fluent(Subtract24Regular, Subtract24Filled)
export const TrashIcon = fluent(Delete24Regular, Delete24Filled)
export const CloseIcon = fluent(Dismiss24Regular, Dismiss24Filled)
export const LogOutIcon = fluent(SignOut24Regular, SignOut24Filled)
export const AlertTriangleIcon = fluent(Warning24Regular, Warning24Filled)
export const CheckCircleIcon = fluent(CheckmarkCircle24Regular, CheckmarkCircle24Filled)
export const AlertCircleIcon = fluent(ErrorCircle24Regular, ErrorCircle24Filled)
export const XCircleIcon = fluent(DismissCircle24Regular, DismissCircle24Filled)
export const SortStatusIcon = fluent(ArrowSortDownLines24Regular, ArrowSortDownLines24Filled)
export const SortAlphaIcon = fluent(TextSortAscending24Regular, TextSortAscending24Filled)
export const CartIcon = fluent(Cart24Regular, Cart24Filled)
export const UserPlusIcon = fluent(PersonAdd24Regular, PersonAdd24Filled)
export const SunIcon = fluent(WeatherSunny24Regular, WeatherSunny24Filled)
export const MoonIcon = fluent(WeatherMoon24Regular, WeatherMoon24Filled)
export const SettingsIcon = fluent(Settings24Regular, Settings24Filled)
export const PencilIcon = fluent(Edit24Regular, Edit24Filled)
export const FlameIcon = fluent(Fire24Regular, Fire24Filled)
export const SparkleIcon = fluent(Sparkle24Regular, Sparkle24Filled)

// category icons
export const LeafIcon = fluent(FoodCarrot24Regular, FoodCarrot24Filled)
export const AppleIcon = fluent(FoodApple24Regular, FoodApple24Filled)
export const DropletIcon = fluent(FoodEgg24Regular, FoodEgg24Filled)
export const LayersIcon = fluent(FoodGrains24Regular, FoodGrains24Filled)
export const BowlIcon = fluent(BowlSalad24Regular, BowlSalad24Filled)
export const BottleIcon = fluent(Drop24Regular, Drop24Filled)
export const CupIcon = fluent(DrinkCoffee24Regular, DrinkCoffee24Filled)
export const PackageIcon = fluent(Cookies24Regular, Cookies24Filled)
export const BoxIcon = fluent(Box24Regular, Box24Filled)

// Custom icons (no Fluent equivalent): drawn on the same 24px grid with a Fluent-like 1.5 stroke.
function custom(children) {
  return function Icon({ size = 20, className = '' }) {
    return (
      <span className={`fi ${className}`} style={{ fontSize: size }} aria-hidden="true">
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </svg>
      </span>
    )
  }
}

// Rasoi logo mark
export const CookingPotIcon = custom(<>
  <path d="M2 12h20" />
  <path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" />
  <path d="M4 12a2 2 0 010-4h16a2 2 0 010 4" />
  <path d="M12 4v4" />
  <path d="M10 4h4" />
</>)

export const DiyaIcon = custom(<>
  <path d="M12 3c1.5 2 2 3.2 2 4.2a2 2 0 01-4 0C10 6.2 10.5 5 12 3z" />
  <path d="M3 13h18c-1 4-4.5 6-9 6s-8-2-9-6z" />
</>)

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.657 14.132 17.64 11.824 17.64 9.2z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}
