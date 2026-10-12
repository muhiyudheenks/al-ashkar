import type { Dictionary } from '../i18n/en'
import {
  IconClock,
  IconFabric,
  IconHeart,
  IconNeedle,
  IconRuler,
  IconShield,
  IconSparkle,
  IconThobe,
  IconUsers,
} from '../components/Icons'

/**
 * Structural content: icons and ordering live here, while every string comes
 * from the active dictionary — so both locales stay in step automatically.
 */

export type ServiceKey = keyof Dictionary['servicesData']
export type ValueKey = keyof Dictionary['valuesData']

export const serviceIcons: Record<ServiceKey, typeof IconThobe> = {
  custom: IconThobe,
  fabric: IconFabric,
  alteration: IconNeedle,
  express: IconClock,
  finishing: IconSparkle,
  group: IconUsers,
}

export const serviceOrder: ServiceKey[] = [
  'custom',
  'fabric',
  'alteration',
  'express',
  'finishing',
  'group',
]

/** The four services featured on the homepage. */
export const featuredServices: ServiceKey[] = ['custom', 'fabric', 'alteration', 'express']

export const valueIcons: Record<ValueKey, typeof IconThobe> = {
  precision: IconRuler,
  heritage: IconShield,
  fabric: IconFabric,
  service: IconHeart,
}

export const valueOrder: ValueKey[] = ['precision', 'heritage', 'fabric', 'service']
