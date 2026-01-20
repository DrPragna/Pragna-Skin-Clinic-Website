# Pragna Skin Clinic - Design System

This document defines the color system and visual patterns used across the website.

---

## 1. Brand Colors

### Primary Brand Color — Maroon
The signature color used everywhere for brand identity.

| Token | Hex | Usage |
|-------|-----|-------|
| `maroon` | `#722B2B` | CTAs, text accents, highlighted words, hover states |
| `maroon-light` | `#8B3A3A` | Hover states |
| `maroon-dark` | `#5A2222` | Active/pressed states |

**Usage patterns:**
- Eyebrow labels: `text-maroon`, `text-maroon/80`, `text-maroon/70`
- Highlighted words in headings: `text-maroon` (always italic)
- CTA buttons: `bg-maroon text-white`
- Decorative lines and borders

### Secondary Accent — Rose Gold
Used sparingly for premium moments and subtle highlights.

| Token | Hex |
|-------|-----|
| `rose-gold` | `#B76E79` |

**Where it's used:**
- Hero: Trust badge dots (`bg-rose-gold`)
- Navbar: Star icons for top concerns (`text-rose-gold`)
- Doctors: Animated orb, badge dot, highlight bullets
- WhyPragna: Card hover border and glow (`border-rose-gold/40`)
- Contact: Background orbs (`bg-rose-gold/5`)
- Footer: Marquee dots, link hover state

### Primary Text — Charcoal
Main text color and dramatic dark backgrounds.

| Token | Hex | Usage |
|-------|-----|-------|
| `charcoal` | `#111111` | Headings, body text, dark hero backgrounds |
| `charcoal/80`, `/70`, `/60` | — | Secondary text, descriptions |

### Background Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FFF8F0` | Section backgrounds, page base |
| `beige-warm` | `#FAF4F0` | Alternating sections, card backgrounds |
| `white` | `#FFFFFF` | Clean sections, cards |
| `#F9FAFB` | Light gray | Testimonials section |

---

## 2. Homepage Section Backgrounds

The homepage uses a specific sequence of backgrounds:

| Section | Background | Notes |
|---------|------------|-------|
| Hero | `bg-charcoal` + video | Dark with `bg-black/40` overlay |
| WhyPragna | `bg-white` | Clean white |
| TreatmentPillars | `bg-cream` | Warm cream |
| SignaturePrograms | `bg-white` | Clean white |
| Doctors | `bg-cream` | Warm cream |
| Testimonials | `bg-[#F9FAFB]` | Cool light gray |
| Branches | `bg-cream` | Warm cream |
| Contact | Gradient | `linear-gradient(135deg, #F5EDE8, #FAF4F0, #F8EFE8)` |
| Footer | Image + `bg-black/85` | Dark with image overlay |

**Pattern:** Dark → White/Cream alternation → Light Gray → Gradient → Dark

---

## 3. Category (Pillar) Colors

Used on **Conditions** and **Treatments** pages to distinguish areas of focus. These colors appear in hero gradients via the `LuminousBackground` component.

### Hero Background Structure
All category heroes use a layered approach:
1. **Base**: `#111111` (charcoal) or `#0F0F0F` (conditions)
2. **Gradient overlay**: Radial gradient with pillar colors at 40% opacity
3. **Animated orbs**: Blurred colored circles
4. **Grain texture**: Subtle noise at 7% opacity
5. **Dark overlay**: `bg-black/20` for text readability

### Skin (Face & Skin)
Terracotta/Copper tones representing warmth and skin health.

| Role | Hex | Description |
|------|-----|-------------|
| Primary | `#C28E79` | Terracotta |
| Secondary | `#8B5A4A` | Deep Burgundy |
| Accent | `#F3D7CD` | Light Terracotta |
| Hero BG | `#5C2E26` | Deep Copper (conditions page) |
| Card BG | `#FDFBF7` | Warm Off-White |
| Card Hover | `#F7F5F0` | Slightly darker |
| Text Accent | `#A66249` | Terracotta accent |

### Hair (Hair & Scalp)
Gold tones representing vitality and growth.

| Role | Hex | Description |
|------|-----|-------------|
| Primary | `#CDAA5C` | True Gold |
| Secondary | `#A68A3D` | Deep Gold |
| Accent | `#F5F2EB` | Light Gold |
| Hero BG | `#5C4D22` | Deep Gold (conditions page) |
| Card BG | `#FCFBF7` | Light warm white |
| Card Hover | `#F5F2E8` | Slightly darker |
| Text Accent | `#A68A3D` | True Gold accent |

### Body (Body & Shape)
Olive/Clay tones representing earthiness and grounding.

| Role | Hex | Description |
|------|-----|-------------|
| Primary | `#9E8C6B` | Clay/Olive |
| Secondary | `#736243` | Deep Olive |
| Accent | `#F2F2EE` | Light Olive |
| Hero BG | `#423D33` | Deep Olive (conditions page) |
| Card BG | `#F9F9F6` | Neutral warm white |
| Card Hover | `#F0F0EB` | Slightly darker |
| Text Accent | `#736243` | Olive accent |

### Others / Wellness
Forest/Sage tones representing nature and healing.

| Role | Hex | Description |
|------|-----|-------------|
| Primary | `#87A896` | Sage |
| Secondary | `#527862` | Forest |
| Accent | `#ECF2EE` | Light Sage |
| Hero BG | `#2A3B33` | Deep Forest (conditions page) |
| Card BG | `#F5F9F7` | Cool mint white |
| Card Hover | `#E8F2EC` | Slightly darker |
| Text Accent | `#527862` | Forest accent |

### All (Default)
Neutral warm brown for the unfiltered state.

| Role | Hex |
|------|-----|
| Hero BG | `#3D2E2E` |
| Text Accent | `maroon` |

---

## 4. Common UI Patterns

### Text on Light Backgrounds
```
Headings:        text-charcoal
Highlighted:     text-maroon italic
Body:            text-charcoal/70 or text-charcoal/80
Eyebrow labels:  text-maroon or text-maroon/80, uppercase, tracking-widest
```

### Text on Dark Backgrounds (Hero/Footer)
```
Primary:         text-white
Secondary:       text-white/80, text-white/70, text-white/60
Footer:          text-cream, text-cream/25
```

### Cards
```
Background:      bg-white or bg-white/95
Border:          border-stone-200/50 or border-charcoal/5
Shadow:          shadow-soft, shadow-maroon/5
Hover border:    hover:border-maroon/20 or hover:border-rose-gold/40
Hover shadow:    hover:shadow-maroon/10
```

### CTA Buttons
```
Primary (dark bg):    bg-cream text-maroon → hover:bg-white
Primary (light bg):   bg-maroon text-white → hover:bg-charcoal
Secondary (dark bg):  border-cream/30 text-cream (ghost style)
```

### Borders & Dividers
```
Subtle:          border-charcoal/5, border-charcoal/10
Visible:         border-charcoal/20
Accent:          border-maroon/10, border-maroon/20
Hover:           hover:border-maroon/30
Decorative:      bg-maroon/20, bg-maroon/30 (lines)
```

### Opacity Scale
```
/5, /10         Borders, very subtle backgrounds
/20, /30        Decorative lines, hover borders
/40, /50        Gradient overlays, orbs
/60, /70        Secondary text, eyebrows
/80             Body text, subtitles
```

---

## 5. File References

| What | Where |
|------|-------|
| Tailwind color tokens | `tailwind.config.ts` (lines 11-97) |
| Category themes (conditions page) | `app/conditions/page.tsx` (lines 17-93) |
| Category themes (condition detail) | `app/conditions/[slug]/page.tsx` (lines 16-58) |
| LuminousBackground gradients | `components/ui/LuminousBackground.tsx` |
| Global styles | `app/globals.css` |
