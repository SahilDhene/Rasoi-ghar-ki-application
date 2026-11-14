import { FLUENT_EMOJI } from '../lib/fluentEmoji'

const codepoints = (char) =>
  [...char.replace(/️/g, '')].map((c) => c.codePointAt(0).toString(16)).join('-')

// Microsoft 3D Fluent Emoji when we ship that image, otherwise the phone's own emoji.
// Sized in em, so it follows the parent's font-size like a normal emoji character.
export default function Emoji({ char, className = '' }) {
  const cp = codepoints(char)
  if (!FLUENT_EMOJI.has(cp)) return <span className={className}>{char}</span>
  return (
    <img
      src={`/emoji/${cp}.webp`}
      alt={char}
      className={`emoji-img ${className}`}
      draggable={false}
      decoding="async"
    />
  )
}
