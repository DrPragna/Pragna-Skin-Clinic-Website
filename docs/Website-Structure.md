# PSC Website Structure

## Overview

This document explains the codebase organization for Pragna Skin Clinic website, following Next.js App Router conventions.

---

## Directory Structure

```
PSC/
├── app/                              # Next.js App Router (pages & routing)
│   ├── page.tsx                      # Home page
│   ├── layout.tsx                    # Root layout (Navbar, Footer, etc.)
│   ├── globals.css                   # Global styles
│   ├── api/                          # API routes
│   │   └── book-appointment/
│   ├── conditions/                   # Conditions pages
│   │   ├── page.tsx                  # Conditions directory
│   │   ├── _components/              # Page-specific components
│   │   │   └── MobileConditionsMenu.tsx
│   │   └── [slug]/page.tsx           # Individual condition page
│   ├── signature-programs/           # Signature programs pages
│   │   ├── page.tsx                  # Programs directory
│   │   ├── _components/              # Page-specific components
│   │   │   └── SignatureProgramsDirectory.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── _components/
│   │           └── SignatureProgramClientContent.tsx
│   └── treatments/                   # Treatments pages
│       ├── page.tsx                  # Treatments menu
│       ├── _components/              # Page-specific components
│       │   ├── TreatmentsDirectory.tsx
│       │   └── MobileTreatmentsMenu.tsx
│       └── [familySlug]/
│           ├── page.tsx              # Treatment family page
│           ├── _components/
│           │   ├── TreatmentFamilyClient.tsx
│           │   └── MobileTreatmentFamily.tsx
│           └── [subTreatmentSlug]/
│               ├── page.tsx          # Sub-treatment page
│               └── _components/
│                   ├── SubTreatmentClientContent.tsx
│                   └── MobileSubTreatment.tsx
│
├── components/                       # Shared/reusable components
│   ├── navigation/
│   │   └── Navbar.tsx                # Site navigation
│   ├── sections/                     # Reusable page sections (mainly Home page)
│   │   ├── Hero.tsx
│   │   ├── WhyPragna.tsx
│   │   ├── TreatmentPillars.tsx
│   │   ├── SignaturePrograms.tsx
│   │   ├── Doctors.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Branches.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx                # Used on all pages
│   │   └── FAQ.tsx                   # Reusable FAQ component
│   └── ui/                           # Pure UI primitives
│       ├── BookingModal.tsx
│       ├── Reveal.tsx                # Animation wrapper
│       ├── LuminousBackground.tsx
│       ├── FloatingActions.tsx       # WhatsApp + Booking buttons
│       └── ...
│
├── lib/                              # Data & utilities
│   ├── content/                      # Page content data
│   │   ├── conditions/               # Individual condition content
│   │   ├── sub-treatments/           # Individual treatment content
│   │   ├── treatment-families/       # Treatment family content
│   │   └── signature-programs.ts
│   └── navigationData.ts             # Site navigation structure
│
└── docs/                             # Documentation
    ├── Design-System.md
    └── Website-Structure.md          # This file
```

---

## Key Conventions

### 1. `_components/` Folders

Page-specific components live in `_components/` folders within their route directory:

```
app/treatments/[familySlug]/
├── page.tsx                          # Server Component (data fetching, SEO)
└── _components/
    ├── TreatmentFamilyClient.tsx     # Client wrapper (handles mobile/desktop)
    └── MobileTreatmentFamily.tsx     # Mobile-specific layout
```

```
app/treatments/[familySlug]/[subTreatmentSlug]/
├── page.tsx                          # Server Component
└── _components/
    ├── SubTreatmentClientContent.tsx # Client wrapper (handles mobile/desktop)
    └── MobileSubTreatment.tsx        # Mobile-specific layout
```

```
app/conditions/
├── page.tsx                          # Server Component (handles mobile/desktop)
└── _components/
    └── MobileConditionsMenu.tsx      # Mobile-specific layout
```

**Why `_components/`?**
- Underscore prefix prevents Next.js from treating it as a route
- Keeps related code together
- Clear separation between pages and their components

### 2. Server vs Client Components

| Type | Location | Purpose |
|------|----------|---------|
| Server | `page.tsx` | Data fetching, SEO metadata, JSON-LD schemas |
| Client | `_components/*.tsx` | Interactive features, animations, mobile detection |

### 3. Shared vs Page-Specific

| Type | Location | Example |
|------|----------|---------|
| Shared | `components/` | Footer, Navbar, BookingModal |
| Page-specific | `app/*/\_components/` | MobileTreatmentFamily, TreatmentsDirectory |

---

## Mobile Adaptive Design Pattern

### Home Page
Uses `isMobile` state **within** existing section components:
```tsx
// components/sections/Hero.tsx
const [isMobile, setIsMobile] = useState(false);
// Conditional styling within same component
```

### Other Pages
Use **separate mobile components** with CSS-based detection:
```tsx
// app/treatments/[familySlug]/_components/TreatmentFamilyClient.tsx
<>
  <div className="md:hidden">
    <MobileTreatmentFamily {...props} />
  </div>
  <div className="hidden md:block">
    {/* Desktop layout */}
  </div>
</>
```

**Why the difference?**
- Home page sections are simpler, changes are mostly CSS
- Other pages have fundamentally different mobile layouts (carousels vs grids, timelines vs cards)

---

## Mobile Design Checklist

When creating mobile adaptive designs for a new page:

1. **Create mobile component**: `app/[route]/_components/Mobile[PageName].tsx`
2. **Create client wrapper**: `app/[route]/_components/[PageName]Client.tsx`
3. **Use CSS detection**: `md:hidden` / `hidden md:block`
4. **Keep text consistent**: Same labels, titles, content between mobile and desktop
5. **Import pattern**:
   ```tsx
   // In page.tsx
   import PageClient from './_components/PageClient';
   ```

---

## Pages Requiring Mobile Adaptive Design

| Page | Status | Mobile Component |
|------|--------|-----------------|
| Home | ✅ Done | Uses isMobile in sections |
| Treatments Menu | ✅ Done | MobileTreatmentsMenu.tsx |
| Treatment Family | ✅ Done | MobileTreatmentFamily.tsx |
| Sub-Treatment | ✅ Done | MobileSubTreatment.tsx |
| Conditions Directory | ✅ Done | MobileConditionsMenu.tsx |
| Condition Detail | ⏳ Pending | - |
| Signature Programs Directory | ⏳ Pending | - |
| Signature Program Detail | ⏳ Pending | - |

---

## Legacy/Unused Files

The following files in `components/sections/` appear to be unused:
- `Treatments.tsx` - Legacy, replaced by TreatmentsDirectory
- `Conditions.tsx` - Legacy, may be used for home page conditions section

---

## Import Path Conventions

```tsx
// Absolute imports for shared components
import Footer from '@/components/sections/Footer';
import { Reveal } from '@/components/ui/Reveal';

// Relative imports for page-specific components
import TreatmentFamilyClient from './_components/TreatmentFamilyClient';
import MobileTreatmentFamily from './MobileTreatmentFamily';
```

---

## Adding a New Page

1. Create `app/[route]/page.tsx` (Server Component)
2. Create `app/[route]/_components/` folder
3. Add client components as needed
4. If mobile design differs significantly, create separate mobile component
5. Update this documentation

---

*Last updated: February 2026*
