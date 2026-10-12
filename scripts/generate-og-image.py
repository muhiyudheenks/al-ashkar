#!/usr/bin/env python3
"""
Generate public/og-image.jpg — the Open Graph card for link previews.

Run from the project root:

    python3 scripts/generate-og-image.py

The card is purely typographic, in the Al Ashkar palette, using the same thobe
line-art motif as the site's own image placeholders. It carries no photograph,
because the project currently has no licensed Al Ashkar thobe photography. To
use a real shop photo instead, set PHOTO below to its path; it will be placed
in the right-hand panel, cropped to fill, with the gold frame kept.

Drawn at 4x and downsampled, so the strokes and type stay crisp.
"""

from __future__ import annotations

import os
import re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# --- Output ---------------------------------------------------------------
OUT = os.path.join("public", "og-image.jpg")
W, H = 1200, 630
SS = 4  # supersampling factor

# Set to a path like "public/images/hero-thobe.jpg" once real photography
# exists; leave as None for the typographic card.
PHOTO: str | None = None

# --- Brand palette --------------------------------------------------------
CHARCOAL = (32, 32, 32)
CHARCOAL_SOFT = (58, 58, 58)
GOLD = (197, 161, 91)
GOLD_LIGHT = (221, 196, 141)
WHITE = (255, 255, 255)
IVORY = (247, 243, 235)

FONT_DIR = "/usr/share/fonts/truetype/noto"
SERIF = os.path.join(FONT_DIR, "NotoSerifDisplay-Light.ttf")
SERIF_MED = os.path.join(FONT_DIR, "NotoSerifDisplay-Regular.ttf")
SANS = os.path.join(FONT_DIR, "NotoSans-Medium.ttf")


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size * SS)


def tracked(draw, xy, text, fnt, fill, tracking=0):
    """Draw text with extra letter-spacing, returning the advance width."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking * SS
    return x - xy[0] - (tracking * SS if text else 0)


def tracked_width(draw, text, fnt, tracking=0):
    w = sum(draw.textlength(c, font=fnt) for c in text)
    return w + tracking * SS * max(len(text) - 1, 0)


# --------------------------------------------------------------------------
# Minimal SVG path support: the thobe motif from src/components/Photo.tsx,
# so the card and the site share one piece of artwork.
# --------------------------------------------------------------------------

THOBE_PATHS = [
    "M200 112c-14 0-24 7-24 7l-46 20c-10 4-16 13-16 24l-6 62",
    "M200 112c14 0 24 7 24 7l46 20c10 4 16 13 16 24l6 62",
    "M108 225l-6 148h40",
    "M292 225l6 148h-40",
    "M142 373l6 60h104l6-60",
    "M142 373h116",
    "M176 119l24 26 24-26",
]
THOBE_BUTTONS = [(200, 186), (200, 222), (200, 258)]
THOBE_PLACKET = (200, 145, 200, 373)
VIEWBOX = (400, 500)

TOKEN = re.compile(r"[MmLlHhVvCc]|-?\d*\.?\d+")


def parse_path(d: str) -> list[list[tuple[float, float]]]:
    """Flatten an SVG path into polylines. Supports M, l, h, v, c."""
    tokens = TOKEN.findall(d)
    i = 0
    cx = cy = 0.0
    polys: list[list[tuple[float, float]]] = []
    cur: list[tuple[float, float]] = []
    cmd = ""

    def num() -> float:
        nonlocal i
        v = float(tokens[i])
        i += 1
        return v

    while i < len(tokens):
        if tokens[i] in "MmLlHhVvCc":
            cmd = tokens[i]
            i += 1
            if cmd == "M":
                if cur:
                    polys.append(cur)
                cx, cy = num(), num()
                cur = [(cx, cy)]
                continue

        if cmd == "l":
            dx, dy = num(), num()
            cx, cy = cx + dx, cy + dy
            cur.append((cx, cy))
        elif cmd == "h":
            cx += num()
            cur.append((cx, cy))
        elif cmd == "v":
            cy += num()
            cur.append((cx, cy))
        elif cmd == "c":
            x1, y1, x2, y2, x, y = (num() for _ in range(6))
            p0 = (cx, cy)
            p1 = (cx + x1, cy + y1)
            p2 = (cx + x2, cy + y2)
            p3 = (cx + x, cy + y)
            for s in range(1, 25):
                t = s / 24
                u = 1 - t
                bx = u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0]
                by = u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1]
                cur.append((bx, by))
            cx, cy = p3
        else:
            i += 1  # unexpected token; skip

    if cur:
        polys.append(cur)
    return polys


def draw_thobe(draw, box, colour, width):
    """Fit the thobe motif inside `box` (l, t, r, b), preserving aspect."""
    l, t, r, b = box
    scale = min((r - l) / VIEWBOX[0], (b - t) / VIEWBOX[1])
    ox = l + ((r - l) - VIEWBOX[0] * scale) / 2
    oy = t + ((b - t) - VIEWBOX[1] * scale) / 2

    def pt(p):
        return (ox + p[0] * scale, oy + p[1] * scale)

    for d in THOBE_PATHS:
        for poly in parse_path(d):
            if len(poly) > 1:
                draw.line([pt(p) for p in poly], fill=colour, width=width, joint="curve")

    # Dashed placket
    x0, y0, _, y1 = THOBE_PLACKET
    y = y0
    while y < y1:
        a, bb = pt((x0, y)), pt((x0, min(y + 7, y1)))
        draw.line([a, bb], fill=colour, width=max(1, int(width * 0.7)))
        y += 16

    # Buttons
    for bx, by in THOBE_BUTTONS:
        px, py = pt((bx, by))
        rr = 3.2 * scale
        draw.ellipse([px - rr, py - rr, px + rr, py + rr], fill=colour)


# --------------------------------------------------------------------------
# Compose
# --------------------------------------------------------------------------

def build() -> Image.Image:
    w, h = W * SS, H * SS
    img = Image.new("RGB", (w, h), CHARCOAL)
    d = ImageDraw.Draw(img)

    # Soft charcoal lift from the top-left, so the panel is not dead flat
    glow = Image.new("L", (w, h), 0)
    ImageDraw.Draw(glow).ellipse(
        [-w * 0.35, -h * 0.85, w * 0.95, h * 1.05], fill=120
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=90 * SS // 4))
    img.paste(Image.new("RGB", (w, h), CHARCOAL_SOFT), (0, 0), glow)

    # Woven texture
    tex = Image.new("RGB", (w, h), CHARCOAL)
    td = ImageDraw.Draw(tex)
    step = 11 * SS
    for k in range(-h, w + h, step):
        td.line([(k, 0), (k + h, h)], fill=(70, 70, 70), width=max(1, SS // 2))
    tex_mask = tex.convert("L").point(lambda v: 26 if v > 40 else 0)
    img.paste(Image.new("RGB", (w, h), IVORY), (0, 0), tex_mask)

    # --- Right-hand panel: photograph if available, else the motif ---------
    panel_l = int(w * 0.615)
    panel_box = (panel_l, 0, w, h)

    if PHOTO and os.path.exists(PHOTO):
        src = Image.open(PHOTO).convert("RGB")
        pw, ph = panel_box[2] - panel_box[0], h
        ratio = max(pw / src.width, ph / src.height)
        src = src.resize((int(src.width * ratio), int(src.height * ratio)), Image.LANCZOS)
        left = (src.width - pw) // 2
        top = (src.height - ph) // 2
        img.paste(src.crop((left, top, left + pw, top + ph)), (panel_box[0], 0))

        # Charcoal wash on the edge facing the text
        wash = Image.new("L", (pw, ph), 0)
        wd = ImageDraw.Draw(wash)
        for x in range(pw):
            t = x / max(pw - 1, 1)
            wd.line([(x, 0), (x, ph)], fill=int(235 * max(0.0, 1 - t * 2.6)))
        img.paste(Image.new("RGB", (pw, ph), CHARCOAL), (panel_box[0], 0), wash)
    else:
        inset = int(w * 0.045)
        draw_thobe(
            d,
            (panel_l + inset, int(h * 0.13), w - inset, int(h * 0.87)),
            GOLD,
            max(2, int(2.6 * SS)),
        )

    # --- Hairline frame ----------------------------------------------------
    m = 26 * SS
    frame = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rectangle(
        [m, m, w - m, h - m], outline=GOLD + (120,), width=max(1, SS)
    )
    img = Image.alpha_composite(img.convert("RGBA"), frame).convert("RGB")
    d = ImageDraw.Draw(img)

    # --- Text block --------------------------------------------------------
    x = 72 * SS
    f_mark = font(SERIF, 62)
    f_head = font(SERIF, 46)
    f_eyebrow = font(SANS, 15)
    f_tag = font(SANS, 17)

    # Monogram
    box = 54 * SS
    y = 96 * SS
    d.rectangle([x, y, x + box, y + box], outline=GOLD, width=max(1, int(SS * 0.9)))
    f_mono = font(SERIF_MED, 26)
    mw = d.textlength("A", font=f_mono)
    d.text((x + (box - mw) / 2, y + box * 0.26), "A", font=f_mono, fill=GOLD)
    d.line(
        [x + box * 0.2, y + box * 0.80, x + box * 0.8, y + box * 0.80],
        fill=GOLD,
        width=max(1, int(SS * 0.8)),
    )

    # Eyebrow
    y += box + 42 * SS
    tracked(d, (x, y), "PREMIUM SAUDI THOBE TAILORING", f_eyebrow, GOLD_LIGHT, tracking=4.2)

    # Wordmark — always the exact spelling, in Latin script
    y += 46 * SS
    tracked(d, (x, y), "AL ASHKAR", f_mark, WHITE, tracking=9)

    # Gold rule
    y += 92 * SS
    d.line([x, y, x + 96 * SS, y], fill=GOLD, width=max(1, int(SS * 1.2)))

    # Headline
    y += 36 * SS
    d.text((x, y), "Crafted for", font=f_head, fill=IVORY)
    y += 58 * SS
    d.text((x, y), "Your Perfect Fit.", font=f_head, fill=IVORY)

    # Tagline
    y += 86 * SS
    tracked(d, (x, y), "MEASURED BY HAND  ·  CRAFTED TO ORDER", f_tag, (150, 146, 140), tracking=2.4)

    return img.resize((W, H), Image.LANCZOS)


if __name__ == "__main__":
    out = build()
    # save without EXIF, progressive, tuned for the ~300KB social budget
    out.save(OUT, "JPEG", quality=88, optimize=True, progressive=True, subsampling=1)
    size = os.path.getsize(OUT)
    print(f"wrote {OUT}  {out.size[0]}x{out.size[1]}  {size/1024:.0f} KB")
