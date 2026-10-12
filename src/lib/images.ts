import type { Dictionary } from '../i18n/en'

/**
 * Photography manifest.
 *
 * Every image is referenced by a stable public path. Drop a real Al Ashkar
 * photograph at that path and it appears immediately — no code change needed.
 * Until then, <Photo> renders a designed, on-brand placeholder, so nothing
 * ever shows as a broken image.
 *
 * See public/images/README.md for the full list of slots and guidance.
 */

export type PhotoKind = 'thobe' | 'fabric' | 'detail' | 'atelier' | 'portrait'

export type GalleryCategory = 'thobes' | 'fabrics' | 'details' | 'atelier'

export type GalleryImage = {
  id: string
  src: string
  /** Key into the `galleryData` dictionary, so alt text is translated. */
  altKey: keyof Dictionary['galleryData']
  category: GalleryCategory
  kind: PhotoKind
}

/** Single-purpose images used in page layouts. */
export const photos = {
  hero: 'https://i.pinimg.com/736x/1b/fd/d0/1bfdd000620efdb4c172c86ba8d0cc54.jpg',
  aboutCraft: '/images/about-craft.jpg',
  aboutAtelier: '/images/about-atelier.jpg',
  servicesHero: '/images/services-fabric.jpg',
  statement: '/images/statement-thobe.jpg',
  contact: '/images/contact-shop.jpg',
} as const

export const gallery: GalleryImage[] = [
  {
    id: 'thobe-front',
    src: '/images/thobes/thobe-front.jpg',
    altKey: 'thobe1',
    category: 'thobes',
    kind: 'portrait',
  },
  {
    id: 'thobe-form',
    src: '/images/thobes/thobe-form.jpg',
    altKey: 'thobe2',
    category: 'thobes',
    kind: 'thobe',
  },
  {
    id: 'thobe-collar',
    src: '/images/thobes/thobe-collar.jpg',
    altKey: 'thobe3',
    category: 'thobes',
    kind: 'thobe',
  },
  {
    id: 'thobe-sleeve',
    src: '/images/thobes/thobe-sleeve.jpg',
    altKey: 'thobe4',
    category: 'thobes',
    kind: 'detail',
  },
  {
    id: 'fabric-folded',
    src: '/images/fabrics/fabric-folded.jpg',
    altKey: 'fabric1',
    category: 'fabrics',
    kind: 'fabric',
  },
  {
    id: 'fabric-weave',
    src: '/images/fabrics/fabric-weave.jpg',
    altKey: 'fabric2',
    category: 'fabrics',
    kind: 'fabric',
  },
  {
    id: 'fabric-swatches',
    src: '/images/fabrics/fabric-swatches.jpg',
    altKey: 'fabric3',
    category: 'fabrics',
    kind: 'fabric',
  },
  {
    id: 'detail-collar-stitch',
    src: '/images/details/collar-stitch.jpg',
    altKey: 'detail1',
    category: 'details',
    kind: 'detail',
  },
  {
    id: 'detail-cuff',
    src: '/images/details/cuff.jpg',
    altKey: 'detail2',
    category: 'details',
    kind: 'detail',
  },
  {
    id: 'detail-placket',
    src: '/images/details/placket.jpg',
    altKey: 'detail3',
    category: 'details',
    kind: 'detail',
  },
  {
    id: 'detail-seam',
    src: '/images/details/seam.jpg',
    altKey: 'detail4',
    category: 'details',
    kind: 'detail',
  },
  {
    id: 'atelier-measure',
    src: '/images/atelier/measuring.jpg',
    altKey: 'atelier1',
    category: 'atelier',
    kind: 'atelier',
  },
  {
    id: 'atelier-cutting',
    src: '/images/atelier/cutting.jpg',
    altKey: 'atelier2',
    category: 'atelier',
    kind: 'atelier',
  },
  {
    id: 'atelier-rail',
    src: '/images/atelier/finished-rail.jpg',
    altKey: 'atelier3',
    category: 'atelier',
    kind: 'thobe',
  },
]

/** The six images shown in the homepage collection preview. */
export const collectionPreview = [
  'thobe-front',
  'fabric-folded',
  'detail-collar-stitch',
  'thobe-collar',
  'detail-cuff',
  'atelier-rail',
].map((id) => gallery.find((g) => g.id === id)!)

/**
 * One ratio for every tile. Mixed ratios in a CSS grid leave ragged gaps
 * where rows align to their tallest item, which reads as unfinished rather
 * than editorial — so the grids stay uniform in both LTR and RTL.
 */
export const tileAspect = 'aspect-[3/4]'
