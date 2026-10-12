# Photography

Every image below is referenced by a fixed path. **Drop a real Al Ashkar
photograph at the path and it appears immediately** — no code change needed.
Any slot without a file renders an on-brand line-art placeholder instead, so
the site never shows a broken image.

The paths are defined in `src/lib/images.ts`.

## Page images

| Path | Used on | Suggested shot |
| --- | --- | --- |
| `hero-thobe.jpg` | Home hero (framed, right column) | A Saudi man in a white thobe, three-quarter or full length. Displayed as a **4:5 portrait, cropped to fill**, so keep the subject centred vertically. A charcoal wash covers the edge nearest the headline on desktop. |
| `statement-thobe.jpg` | Home quote band (background) | A quiet, low-contrast thobe or fabric shot — it sits at 35% opacity behind text. |
| `about-craft.jpg` | Home values column | Close craft detail: stitching, a collar, a cuff. |
| `about-atelier.jpg` | About page | The workshop — cutting table, machine, pattern marks. |
| `services-fabric.jpg` | Services page | Fabric bolts or swatches laid out. |
| `contact-shop.jpg` | Reserved for the contact page | The shopfront or interior. |

## Gallery

| Path | Category |
| --- | --- |
| `thobes/thobe-front.jpg` | Thobes |
| `thobes/thobe-form.jpg` | Thobes |
| `thobes/thobe-collar.jpg` | Thobes |
| `thobes/thobe-sleeve.jpg` | Thobes |
| `fabrics/fabric-folded.jpg` | Fabrics |
| `fabrics/fabric-weave.jpg` | Fabrics |
| `fabrics/fabric-swatches.jpg` | Fabrics |
| `details/collar-stitch.jpg` | Details |
| `details/cuff.jpg` | Details |
| `details/placket.jpg` | Details |
| `details/seam.jpg` | Details |
| `atelier/measuring.jpg` | Atelier |
| `atelier/cutting.jpg` | Atelier |
| `atelier/finished-rail.jpg` | Atelier |

## Guidance

- **Subject:** traditional Saudi men's thobes. White and off-white first.
  Fabric texture, precise stitching, collars, cuffs and plackets. No Western
  suits as product imagery.
- **Crop:** gallery tiles are displayed at a 3:4 portrait ratio and cropped to
  fill, so keep the subject away from the very edges.
- **Size:** export at roughly 1600px on the long edge for gallery tiles and
  2400px for the hero. Compress to keep each file under ~400 KB.
- **Format:** `.jpg` as listed. Prefer `.webp` for noticeably smaller files —
  just change the path in `src/lib/images.ts` to match the file you add.
- **Host images locally**, in this folder. `photos.hero` currently points at an
  external `i.pinimg.com` URL; see the warning below.
- **Alt text** is translated in both locales under `galleryData` in
  `src/i18n/en.ts` and `src/i18n/ar.ts`. Update it to match the real photo.


## The hero image

`photos.hero` in `src/lib/images.ts` is currently set to an external Pinterest
URL (`https://i.pinimg.com/736x/...`) rather than a file in this folder. That
is fine for previewing the layout, but it should not ship:

- **Licensing** — the photograph is someone else's work, used here without a
  licence. A commercial site needs an image Al Ashkar owns or has licensed.
- **It can disappear** — Pinterest may block hotlinking at any time, and the
  hero would then fall back to the placeholder artwork.
- **Resolution** — the source is 736px wide but the hero renders up to 448px
  CSS, which is already soft on a 2× screen.
- **Speed** — the hero is marked `fetchpriority="high"`, so an extra DNS and
  TLS round-trip to a third-party host delays the largest element on the page.

Replace it with a local file:

```ts
// src/lib/images.ts
export const photos = {
  hero: '/images/hero-thobe.webp',
  …
}
```

Export it at roughly 1200×1500 (4:5) and compress to under ~300 KB.

## The placeholder

Any slot without a file renders line art instead of a broken image. In the
hero it is drawn deliberately large — about 420–520px tall, at 45% opacity,
in gold (`#C9A24B`) over a soft radial glow — so the section still reads as
finished. Elsewhere it is smaller and quieter.
