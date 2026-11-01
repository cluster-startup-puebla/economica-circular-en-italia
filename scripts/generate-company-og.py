#!/usr/bin/env python3
"""Composite each company logo onto the shared share image.

Reads slug, logo, and logoDark from src/data/companies.ts and writes
public/og/empresas/{slug}.jpg (1200x630 JPEG). Not part of the Next build.

    python3 scripts/generate-company-og.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OG_PATH = ROOT / "public" / "og.jpg"
COMPANIES_PATH = ROOT / "src" / "data" / "companies.ts"
OUT_DIR = ROOT / "public" / "og" / "empresas"

# Brand ink. Light logos (logoDark) are redrawn in this color so they
# stay visible on the white plate.
INK = (0x14, 0x30, 0x28)

# Same plate for every company: left side, over the sky and the green hill,
# clear of the mountain peaks on the right and the pipes along the bottom.
PLATE_X = 40
PLATE_Y = 268
PLATE_W = 700
PLATE_H = 328
PLATE_RADIUS = 32
PLATE_PAD = 44

CANVAS = (1200, 630)
JPEG_LIMIT = 300_000


def load_companies(path: Path) -> list[tuple[str, str, bool]]:
    text = path.read_text()
    start = text.index("const COMPANY_LIST")
    end = text.index("];", start)
    body = text[start:end]
    companies: list[tuple[str, str, bool]] = []
    for block in re.split(r"\n  \{", body)[1:]:
        slug = re.search(r'slug:\s*"([^"]+)"', block)
        logo = re.search(r'logo:\s*"([^"]+)"', block)
        if not slug or not logo:
            continue
        logo_dark = re.search(r"logoDark:\s*true", block) is not None
        companies.append((slug.group(1), logo.group(1), logo_dark))
    if not companies:
        raise SystemExit(f"No companies parsed from {path}")
    return companies


def rounded_rect(size: tuple[int, int], radius: int, fill: tuple[int, int, int, int]) -> Image.Image:
    """Supersampled rounded rect so the plate edge stays smooth in JPEG."""
    scale = 4
    width, height = size
    image = Image.new("RGBA", (width * scale, height * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (0, 0, width * scale - 1, height * scale - 1),
        radius=radius * scale,
        fill=fill,
    )
    return image.resize(size, Image.Resampling.LANCZOS)


def recolor(logo: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    alpha = logo.getchannel("A")
    inked = Image.new("RGBA", logo.size, color + (255,))
    inked.putalpha(alpha)
    return inked


def trim(logo: Image.Image, threshold: int = 12) -> Image.Image:
    mask = logo.getchannel("A").point(lambda value: 255 if value >= threshold else 0)
    bbox = mask.getbbox()
    return logo.crop(bbox) if bbox else logo


def contain(logo: Image.Image, max_width: int, max_height: int) -> Image.Image:
    logo = trim(logo)
    scale = min(max_width / logo.width, max_height / logo.height)
    size = (max(1, round(logo.width * scale)), max(1, round(logo.height * scale)))
    return logo.resize(size, Image.Resampling.LANCZOS)


def composite(base: Image.Image, logo: Image.Image, logo_dark: bool) -> Image.Image:
    canvas = base.convert("RGBA")
    if logo_dark:
        logo = recolor(logo.convert("RGBA"), INK)
    else:
        logo = logo.convert("RGBA")

    shadow = rounded_rect((PLATE_W, PLATE_H), PLATE_RADIUS, INK + (120,))
    blur = 18
    pad = blur * 3
    shadow_canvas = Image.new("RGBA", (PLATE_W + pad * 2, PLATE_H + pad * 2), (0, 0, 0, 0))
    shadow_canvas.paste(shadow, (pad, pad + 10), shadow)
    shadow_canvas = shadow_canvas.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(shadow_canvas, (PLATE_X - pad, PLATE_Y - pad))

    plate = rounded_rect((PLATE_W, PLATE_H), PLATE_RADIUS, (255, 255, 255, 255))
    canvas.alpha_composite(plate, (PLATE_X, PLATE_Y))

    fitted = contain(logo, PLATE_W - PLATE_PAD * 2, PLATE_H - PLATE_PAD * 2)
    logo_x = PLATE_X + (PLATE_W - fitted.width) // 2
    logo_y = PLATE_Y + (PLATE_H - fitted.height) // 2
    canvas.alpha_composite(fitted, (logo_x, logo_y))

    flat = Image.new("RGB", canvas.size, (255, 255, 255))
    flat.paste(canvas, mask=canvas.getchannel("A"))
    return flat


def save_jpeg(image: Image.Image, path: Path) -> tuple[int, int]:
    quality_used = 78
    for quality in (90, 86, 82, 78):
        quality_used = quality
        image.save(
            path,
            "JPEG",
            quality=quality,
            optimize=True,
            subsampling=0,
            progressive=True,
        )
        if path.stat().st_size <= JPEG_LIMIT:
            break
    return quality_used, path.stat().st_size


def main() -> None:
    if not OG_PATH.is_file():
        raise SystemExit(f"Missing base image: {OG_PATH}")
    companies = load_companies(COMPANIES_PATH)
    base = Image.open(OG_PATH).convert("RGB")
    if base.size != CANVAS:
        raise SystemExit(f"{OG_PATH} is {base.size}, expected {CANVAS}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, logo_url, logo_dark in companies:
        logo_path = ROOT / "public" / logo_url.lstrip("/")
        if not logo_path.is_file():
            raise SystemExit(f"Missing logo for {slug}: {logo_path}")
        logo = Image.open(logo_path)
        image = composite(base, logo, logo_dark)
        if image.size != CANVAS:
            raise SystemExit(f"{slug} rendered at {image.size}")
        destination = OUT_DIR / f"{slug}.jpg"
        quality, size = save_jpeg(image, destination)
        print(f"{destination.relative_to(ROOT)}  {size / 1024:.0f}KB  q={quality}  logoDark={logo_dark}")
        if size > JPEG_LIMIT:
            print(f"  warning: still above {JPEG_LIMIT} bytes", file=sys.stderr)


if __name__ == "__main__":
    main()
