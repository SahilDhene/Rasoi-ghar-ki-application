// Hand-drawn stroke icons (24×24 viewBox, Feather-style).
const DEFAULT_SIZE = 20

function Svg({ size, strokeWidth, children, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const icon = (strokeWidth, children) =>
  function Icon({ size = DEFAULT_SIZE, className }) {
    return (
      <Svg size={size} strokeWidth={strokeWidth} className={className}>
        {children}
      </Svg>
    )
  }

export const HomeIcon = icon(1.75, <>
  <path d="M3 12L12 3l9 9" />
  <path d="M9 21V12h6v9" />
  <path d="M5 10v11h14V10" />
</>)

export const PlusIcon = icon(2, <path d="M12 5v14M5 12h14" />)
export const MinusIcon = icon(2, <path d="M5 12h14" />)

export const TrashIcon = icon(1.75, <>
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6M14 11v6" />
  <path d="M9 6V4h6v2" />
</>)

export const CloseIcon = icon(2, <path d="M18 6L6 18M6 6l12 12" />)

export const LogOutIcon = icon(1.75, <>
  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" y1="12" x2="9" y2="12" />
</>)

export const AlertTriangleIcon = icon(1.75, <>
  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  <line x1="12" y1="9" x2="12" y2="13" />
  <line x1="12" y1="17" x2="12.01" y2="17" />
</>)

export const CheckCircleIcon = icon(1.75, <>
  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
  <polyline points="22 4 12 14.01 9 11.01" />
</>)

export const AlertCircleIcon = icon(1.75, <>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" y1="8" x2="12" y2="12" />
  <line x1="12" y1="16" x2="12.01" y2="16" />
</>)

export const XCircleIcon = icon(1.75, <>
  <circle cx="12" cy="12" r="10" />
  <line x1="15" y1="9" x2="9" y2="15" />
  <line x1="9" y1="9" x2="15" y2="15" />
</>)

export const LeafIcon = icon(1.75, <>
  <path d="M17 8C8 10 5.9 16.17 3.82 19.5c-.67 1.11.04 2.5 1.18 2.5h14a2 2 0 002-2V8z" />
  <path d="M3.82 19.5a10 10 0 0114.14-14" />
</>)

export const DropletIcon = icon(1.75, <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />)

export const LayersIcon = icon(1.75, <>
  <polygon points="12 2 2 7 12 12 22 7 12 2" />
  <polyline points="2 17 12 22 22 17" />
  <polyline points="2 12 12 17 22 12" />
</>)

export const FlameIcon = icon(1.75,
  <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />,
)

export const CupIcon = icon(1.75, <>
  <path d="M17 8h1a4 4 0 010 8h-1" />
  <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
  <line x1="6" y1="2" x2="6" y2="4" />
  <line x1="10" y1="2" x2="10" y2="4" />
  <line x1="14" y1="2" x2="14" y2="4" />
</>)

export const PackageIcon = icon(1.75, <>
  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
  <line x1="12" y1="22.08" x2="12" y2="12" />
</>)

export const SortStatusIcon = icon(1.75, <>
  <line x1="11" y1="5" x2="17" y2="5" />
  <line x1="11" y1="9" x2="15" y2="9" />
  <line x1="11" y1="13" x2="13" y2="13" />
  <polyline points="8 15 4 19 8 23" />
  <line x1="4" y1="19" x2="4" y2="5" />
</>)

export const SortAlphaIcon = icon(1.75, <>
  <line x1="3" y1="7" x2="7" y2="3" />
  <line x1="7" y1="3" x2="11" y2="7" />
  <line x1="7" y1="3" x2="7" y2="21" />
  <line x1="13" y1="21" x2="21" y2="21" />
  <line x1="13" y1="17" x2="19" y2="17" />
  <line x1="13" y1="13" x2="17" y2="13" />
</>)

export const CartIcon = icon(1.75, <>
  <circle cx="9" cy="21" r="1" />
  <circle cx="20" cy="21" r="1" />
  <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
</>)

export const UserPlusIcon = icon(1.75, <>
  <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <line x1="19" y1="8" x2="19" y2="14" />
  <line x1="22" y1="11" x2="16" y2="11" />
</>)

export const SunIcon = icon(1.75, <>
  <circle cx="12" cy="12" r="4" />
  <line x1="12" y1="2" x2="12" y2="4" />
  <line x1="12" y1="20" x2="12" y2="22" />
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
  <line x1="2" y1="12" x2="4" y2="12" />
  <line x1="20" y1="12" x2="22" y2="12" />
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
</>)

export const MoonIcon = icon(1.75, <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />)

export const SettingsIcon = icon(1.75, <>
  <circle cx="12" cy="12" r="3" />
  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
</>)

export const PencilIcon = icon(1.75, <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />)

export const CookingPotIcon = icon(2, <>
  <path d="M2 12h20" />
  <path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" />
  <path d="M4 12a2 2 0 010-4h16a2 2 0 010 4" />
  <path d="M12 4v4" />
  <path d="M10 4h4" />
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
