# Photography

Every image below is referenced by a fixed path. **Drop a real Al Ashkar
photograph at the path and it appears immediately** — no code change needed.
Any slot without a file renders an on-brand line-art placeholder instead, so
the site never shows a broken image.

The paths are defined in `src/lib/images.ts`.

## Page images

| Path | Used on | Suggested shot |
| --- | --- | --- |
| `hero-thobe.jpg` | Home hero (full-bleed) | A Saudi man in a white thobe, three-quarter or full length. Text sits over the left side in English and the right side in Arabic, so leave the figure off-centre. |
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
- **Format:** `.jpg` as listed. To use `.webp` or `.avif` instead, update the
  paths in `src/lib/images.ts`.
- **Alt text** is translated in both locales under `galleryData` in
  `src/i18n/en.ts` and `src/i18n/ar.ts`. Update it to match the real photo.
