import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** Shared hairline icon shell — gold strokes, no fills. */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconScissors = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="18" r="2.6" />
    <circle cx="18" cy="18" r="2.6" />
    <path d="M7.8 16.2 17 3M16.2 16.2 7 3" />
  </Icon>
)

export const IconRuler = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.2 14.8 14.8 3.2a1.4 1.4 0 0 1 2 0l4 4a1.4 1.4 0 0 1 0 2L9.2 20.8a1.4 1.4 0 0 1-2 0l-4-4a1.4 1.4 0 0 1 0-2Z" />
    <path d="M8 10l2 2M11 7l2 2M14 4.6l2 2" />
  </Icon>
)

export const IconThobe = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c-1.1 0-1.9.6-1.9.6L6.4 5.1A1.6 1.6 0 0 0 5.4 6.7L5 10" />
    <path d="M12 3c1.1 0 1.9.6 1.9.6l3.7 1.5a1.6 1.6 0 0 1 1 1.6l.4 3.3" />
    <path d="M5 10v11h14V10" />
    <path d="M10.1 3.6 12 5.6l1.9-2" />
  </Icon>
)

export const IconFabric = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8c2.6-1.3 5.4-1.3 8 0s5.4 1.3 8 0" />
    <path d="M4 12c2.6-1.3 5.4-1.3 8 0s5.4 1.3 8 0" />
    <path d="M4 16c2.6-1.3 5.4-1.3 8 0s5.4 1.3 8 0" />
    <path d="M4 5.5v13M20 5.5v13" opacity=".5" />
  </Icon>
)

export const IconNeedle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 4 8.5 15.5" />
    <path d="M8.5 15.5 6 20l4.5-2.5" />
    <circle cx="19.2" cy="4.8" r="1.6" />
    <path d="M14 7c-2 1-3 3-2.5 5" strokeDasharray="2 2.4" />
  </Icon>
)

export const IconClock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </Icon>
)

export const IconUsers = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.1" />
    <path d="M3.4 20c.5-3.1 2.8-5 5.6-5s5.1 1.9 5.6 5" />
    <path d="M16 5.4a3.1 3.1 0 0 1 0 5.2M17.4 15.2c2 .6 3.4 2.3 3.8 4.8" />
  </Icon>
)

export const IconSparkle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.4l1.7 4.9 4.9 1.7-4.9 1.7L12 16.6l-1.7-4.9-4.9-1.7 4.9-1.7Z" />
    <path d="M18.6 16.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" />
  </Icon>
)

export const IconShield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.2 19 6v6c0 4.2-3 7-7 8.8C8 19 5 16.2 5 12V6Z" />
    <path d="M9.2 12.2l2 2 3.6-4" />
  </Icon>
)

export const IconHeart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7-4.3-7-9a3.9 3.9 0 0 1 7-2.4A3.9 3.9 0 0 1 19 11c0 4.7-7 9-7 9Z" />
  </Icon>
)

export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.42 1.32 4.9L2 22l5.4-1.46a9.86 9.86 0 0 0 4.64 1.18h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.96a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.07.83.83-3-.19-.31a8.1 8.1 0 0 1-1.24-4.34c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.16-8.23 8.16Zm4.5-6.1c-.25-.13-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.66 6.66 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.69c-.14-.25-.01-.38.11-.5.11-.12.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.54-1.33-.74-1.82-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.46-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.17-.47-.29Z" />
  </svg>
)

export const IconPhone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.2 3.6h3l1.4 3.6-2 1.4a10.4 10.4 0 0 0 5.4 5.4l1.4-2 3.6 1.4v3c0 .9-.7 1.6-1.6 1.6A14.6 14.6 0 0 1 4.6 5.2c0-.9.7-1.6 1.6-1.6Z" />
  </Icon>
)

export const IconMail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.4" width="18" height="13.2" rx="1.4" />
    <path d="m3.8 6.4 8.2 6 8.2-6" />
  </Icon>
)

export const IconPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s6.4-5.6 6.4-10.2A6.4 6.4 0 0 0 5.6 10.8C5.6 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.4" />
  </Icon>
)

export const IconGlobe = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.4 12h17.2M12 3.4c2.2 2.4 2.2 14.8 0 17.2M12 3.4c-2.2 2.4-2.2 14.8 0 17.2" />
  </Icon>
)

export const IconArrow = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Icon>
)

export const IconChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Icon>
)

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const IconCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.8 4.6 4.4L19 6.8" />
  </Icon>
)

export const IconAlert = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.6v5.2M12 16.2v.6" />
  </Icon>
)

export const IconInstagram = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="16.9" cy="7.1" r=".9" fill="currentColor" stroke="none" />
  </Icon>
)

export const IconX = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.4 4.4l15.2 15.2M19.6 4.4 4.4 19.6" />
  </Icon>
)

export const IconSnapchat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.6c2.5 0 4 1.8 4 4.2 0 1.2-.1 2.2.3 2.5.4.3 1.2-.3 1.6.2.4.6-.6 1.3-1.4 1.8-.6.4-.3.8.5 1.9.6.8 1.6 1.2 2.4 1.4-.7.9-2.2.9-2.7 1.3-.3.3-.2 1-.7 1.1-.6.2-1.6-.5-3-.5s-2.4.7-3 .5c-.5-.1-.4-.8-.7-1.1-.5-.4-2-.4-2.7-1.3.8-.2 1.8-.6 2.4-1.4.8-1.1 1.1-1.5.5-1.9-.8-.5-1.8-1.2-1.4-1.8.4-.5 1.2.1 1.6-.2.4-.3.3-1.3.3-2.5 0-2.4 1.5-4.2 4-4.2Z" />
  </Icon>
)

export const IconTikTok = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.4 3.6v9.9a3.4 3.4 0 1 1-3.4-3.4c.3 0 .6 0 .9.1" />
    <path d="M14.4 3.6c.3 2.3 2 4 4.3 4.2" />
  </Icon>
)
