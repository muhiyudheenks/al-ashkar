import { useState } from 'react'
import { useLang } from '../i18n'
import type { PhotoKind } from '../lib/images'

type PhotoProps = {
  src: string
  alt: string
  kind?: PhotoKind
  className?: string
  imgClassName?: string
  /** Darken the placeholder so overlaid white text stays readable. */
  dark?: boolean
  loading?: 'lazy' | 'eager'
  /** Slow drift animation, for hero imagery only. */
  drift?: boolean
  /** Show the "photograph to be added" note on the placeholder. */
  note?: boolean
  /**
   * 'hero' makes the fallback artwork a deliberate focal element: larger,
   * brighter, and lit by a soft gold glow.
   */
  emphasis?: 'default' | 'hero'
  /** Intrinsic size, so the browser reserves the box and nothing shifts. */
  width?: number
  height?: number
  fetchPriority?: 'high' | 'low' | 'auto'
}

/**
 * An image that degrades gracefully.
 *
 * If the real photograph is not present at `src`, an elegant on-brand
 * placeholder is drawn instead — so the design reads as finished while the
 * shop's own photography is still being collected.
 */
export function Photo({
  src,
  alt,
  kind = 'thobe',
  className = '',
  imgClassName = '',
  dark = false,
  loading = 'lazy',
  drift = false,
  note = true,
  emphasis = 'default',
  width,
  height,
  fetchPriority,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  // Only supply `relative` when the caller has not positioned the wrapper
  // itself — Tailwind sorts `.relative` after `.absolute`, so hardcoding it
  // would silently override an `absolute inset-0` passed in by the caller.
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className)
  const box = `${positioned ? '' : 'relative'} overflow-hidden ${className}`

  if (failed) {
    return (
      <div className={box} role="img" aria-label={alt}>
        <PhotoPlaceholder kind={kind} dark={dark} note={note} emphasis={emphasis} />
      </div>
    )
  }

  return (
    <div className={box}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${drift ? 'drift' : ''} ${imgClassName}`}
      />
    </div>
  )
}

/* ------------------------------------------------------------------------ */

function PhotoPlaceholder({
  kind,
  dark,
  note,
  emphasis,
}: {
  kind: PhotoKind
  dark: boolean
  note: boolean
  emphasis: 'default' | 'hero'
}) {
  const { t } = useLang()
  const isHero = emphasis === 'hero'

  // The background fills any aspect ratio via CSS, while the motif is a
  // centred, size-capped SVG — so a wide hero and a narrow tile both read
  // correctly instead of the artwork being cropped or blown up.
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        backgroundImage: dark
          ? 'linear-gradient(160deg, #202020 0%, #2b2b2b 55%, #3a3a3a 100%)'
          : 'linear-gradient(160deg, #F2ECE0 0%, #F9F6F0 55%, #E8DFCD 100%)',
      }}
    >
      {/* Woven-cloth texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${
            dark ? 'rgba(247,243,235,.045)' : 'rgba(32,32,32,.07)'
          } 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, ${
            dark ? 'rgba(247,243,235,.03)' : 'rgba(32,32,32,.05)'
          } 0 1px, transparent 1px 9px)`,
        }}
      />

      {/* Hairline frame */}
      <div
        aria-hidden="true"
        className="absolute inset-4 border md:inset-6"
        style={{ borderColor: dark ? 'rgba(197,161,91,.28)' : 'rgba(197,161,91,.32)' }}
      />

      {/* A soft gold glow lifts the hero artwork off the charcoal */}
      {isHero && (
        <div
          aria-hidden="true"
          className="gold-glow absolute top-1/2 left-1/2 h-[78%] w-[88%] -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* Motif */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className={
          isHero
            ? 'relative h-[80%] max-h-[520px] w-auto max-w-[84%]'
            : 'relative h-[62%] max-h-[260px] w-auto max-w-[60%]'
        }
        style={{ opacity: isHero ? 0.45 : dark ? 0.5 : 0.78 }}
      >
        <g
          color={isHero ? '#C9A24B' : '#C5A15B'}
          stroke={isHero ? '#C9A24B' : '#C5A15B'}
          fill="none"
          strokeWidth={isHero ? 2.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Motif kind={kind} />
        </g>
      </svg>

      {note && (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[0.5625rem] tracking-[0.24em] uppercase md:bottom-8"
          style={{ color: dark ? 'rgba(247,243,235,.45)' : 'rgba(119,115,109,.65)' }}
        >
          {t.image.placeholder}
        </span>
      )}
    </div>
  )
}

/** Line-art motifs, one per photo kind. */
function Motif({ kind }: { kind: PhotoKind }) {
  switch (kind) {
    case 'fabric':
      // Stacked folds of cloth
      return (
        <>
          <path d="M90 190c40-16 90-16 130 0s90 16 90 16" />
          <path d="M90 230c40-16 90-16 130 0s90 16 90 16" />
          <path d="M90 270c40-16 90-16 130 0s90 16 90 16" />
          <path d="M90 310c40-16 90-16 130 0s90 16 90 16" />
          <path d="M110 150v180M290 166v180" opacity="0.4" />
        </>
      )

    case 'detail':
      // A run of stitching across a seam
      return (
        <>
          <path d="M70 250h260" opacity="0.45" />
          <path d="M70 274h260" strokeDasharray="9 11" />
          <path d="M70 226h260" strokeDasharray="9 11" />
          <circle cx="200" cy="180" r="9" />
          <path d="M200 189v28M186 203h28" opacity="0.5" />
        </>
      )

    case 'atelier':
      // Measuring tape and shears
      return (
        <>
          <path d="M80 300c50-70 110-70 150-30s70 50 90 20" />
          <path d="M80 320c50-70 110-70 150-30s70 50 90 20" opacity="0.4" />
          <circle cx="150" cy="190" r="22" />
          <circle cx="206" cy="190" r="22" />
          <path d="M166 206l74 74M190 206l-74 74" />
        </>
      )

    case 'portrait':
    case 'thobe':
    default:
      // A thobe silhouette: collar, placket, sleeves, hem
      return (
        <>
          <path d="M200 112c-14 0-24 7-24 7l-46 20c-10 4-16 13-16 24l-6 62" />
          <path d="M200 112c14 0 24 7 24 7l46 20c10 4 16 13 16 24l6 62" />
          <path d="M108 225l-6 148h40" opacity="0.55" />
          <path d="M292 225l6 148h-40" opacity="0.55" />
          <path d="M142 373l6 60h104l6-60" />
          <path d="M142 373h116" opacity="0.3" />
          <path d="M176 119l24 26 24-26" />
          <path d="M200 145v228" strokeDasharray="7 9" opacity="0.7" />
          <circle cx="200" cy="186" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="200" cy="222" r="2.6" fill="currentColor" stroke="none" />
          <circle cx="200" cy="258" r="2.6" fill="currentColor" stroke="none" />
        </>
      )
  }
}
