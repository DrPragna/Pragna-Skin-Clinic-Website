# Pragna Skin & Laser Clinics - Project Overview

## 🎯 Project Vision

A premium, globally-positioned dermatology website that reflects Pragna's 30+ years of expertise, combining:
- **Calm, ethical, professional** tone
- **Modern, editorial, minimal** design (Apple/Aesop aesthetic)
- **Warm terracotta & maroon** brand colors
- **Magazine-like** typography and layout
- **Subtle, elegant** animations

## 🎨 Design System

### Color Palette
```
Deep Maroon:     #722B2B (primary brand, headlines, CTAs)
Maroon Light:    #8B3A3A (hover states)
Terracotta:      #EAC7BB (backgrounds, gradients)
Terracotta Light: #F3D7CD (soft washes)
Off-White:       #FAF4F0 (page background)
Beige:           #F9F7F6 (cards, sections)
Charcoal:        #111111 (text, emphasis)
Warm Dust Red:   #C35A4A (accents, icons)
```

### Typography
- **Headlines:** Playfair Display (serif) - editorial, luxury feel
- **Body/UI:** Inter (sans-serif) - clean, modern, legible
- **Hero H1:** 3.5rem (mobile: 2.25rem)
- Generous line spacing, high readability

### Layout Principles
- Large negative space (Apple-inspired)
- Soft shadows, minimal borders
- Rounded corners (16-24px)
- Card-based design
- Mobile-first responsive

## 📁 Project Structure

```
pragna-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── navigation/
│   │   └── Navbar.tsx      # Sticky navigation with scroll effect
│   └── sections/
│       ├── Hero.tsx        # Hero with parallax effect
│       ├── TrustStrip.tsx  # 5 trust indicators
│       ├── WhyPragna.tsx   # 3 pillars section
│       ├── SignaturePrograms.tsx  # 5 curated programs
│       ├── Conditions.tsx  # 11 conditions grid
│       ├── Treatments.tsx  # Tabbed treatments (Skin/Hair/Body/Wellness)
│       ├── Doctors.tsx     # 2 doctor profiles
│       ├── Testimonials.tsx # Patient testimonial carousel
│       ├── Branches.tsx    # 2 clinic locations
│       ├── Blog.tsx        # 4 blog post cards
│       ├── FAQ.tsx         # Accordion with 8 FAQs
│       ├── Contact.tsx     # Appointment booking form
│       └── Footer.tsx      # Brand story + links
├── public/                 # Static assets (add images here)
├── tailwind.config.ts      # Custom Tailwind configuration
├── DEPLOYMENT.md           # Deployment instructions
└── package.json
```

## ✨ Key Features

### 1. **Smooth Animations**
- Fade-in on scroll
- Slide-up for sections
- Hover effects on cards (scale 1.01-1.03)
- Parallax hero image
- Smooth testimonial carousel

### 2. **Interactive Components**
- Tabbed treatments interface
- FAQ accordion
- Testimonial slider with dots
- Mobile-responsive navigation

### 3. **SEO Optimized**
- Semantic HTML
- Proper heading hierarchy
- Meta tags configured
- Fast loading (Next.js optimization)

### 4. **Accessibility**
- ARIA labels on buttons
- Keyboard navigation support
- High contrast text
- Focus states

## 🔧 Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.3 | React framework with SSR |
| React | 19.0.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.0.0 | Utility-first styling |
| Vercel | - | Hosting & deployment |

## 📋 Content Sections

1. **Navigation** - Sticky header with Book Appointment CTA
2. **Hero** - Main headline, trust building, dual CTAs, parallax image
3. **Trust Strip** - 5 key differentiators in pill format
4. **Why Pragna** - 3 pillars: Experience, Technology, Ethics
5. **Signature Programs** - 5 curated treatment journeys
6. **Conditions** - 11 commonly treated conditions
7. **Treatments** - Tabbed interface for 4 categories (50+ treatments)
8. **Technology & Experience** - Brand positioning block
9. **Doctors** - 2 dermatologist profiles
10. **Testimonials** - 5 patient stories with carousel
11. **Branches** - 2 clinic locations with contact info
12. **Blog** - 4 recent articles
13. **FAQ** - 8 common questions with accordion
14. **Contact** - Appointment form with 18 service options
15. **Footer** - Brand story, links, social media

## 🎯 Brand Positioning

**Tagline:** "Advanced Skin & Hair Dermatology in Hyderabad"

**Main Headline:** "Radiant skin, backed by 30+ years of trusted dermatology."

**Key Differentiators:**
- 30+ years experience
- International speaker & researcher
- 20+ awards
- First-mover in advanced technologies
- Ethical, transparent pricing

**Tone of Voice:**
- Calm and assured
- Expert but warm
- Scientific yet approachable
- Premium without pretension

## 🚀 Performance Features

- **Static Generation:** Pre-rendered pages for fast loading
- **Image Optimization:** Next.js automatic image optimization (ready for real images)
- **Code Splitting:** Automatic by Next.js
- **CSS Optimization:** Tailwind purges unused styles
- **Font Loading:** Optimized Google Fonts loading

## 🎨 Animation Details

All animations follow the "premium but subtle" principle:

```css
/* Fade In */
@keyframes fadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

/* Slide Up */
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(20px) }
  100% { opacity: 1; transform: translateY(0) }
}

/* Float (Hero image) */
@keyframes float {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-10px) }
}
```

**Hover States:**
- Cards: scale(1.02) + shadow increase
- Buttons: color transition + scale(1.02)
- Links: color shift to maroon
- Icons: subtle rotation or translation

## 📱 Responsive Breakpoints

```
Mobile:    < 768px
Tablet:    768px - 1024px
Desktop:   > 1024px
Wide:      > 1280px
```

All sections adapt gracefully:
- Hero: stacks on mobile
- Grids: 1 → 2 → 3/4 columns
- Navigation: hamburger menu on mobile
- Typography: scales down appropriately

## 🔄 Future Enhancements

### Phase 2 (Recommended)
- [ ] Add real images (clinic, doctors, treatments)
- [ ] Connect contact form to email/CRM
- [ ] Integrate Google Maps for branches
- [ ] Add Google Analytics
- [ ] Set up custom domain

### Phase 3 (Optional)
- [ ] Blog CMS integration (Contentful/Sanity)
- [ ] Online booking system integration
- [ ] Before/after photo galleries
- [ ] Multi-language support (Telugu/Hindi)
- [ ] Patient testimonial video section
- [ ] Live chat widget
- [ ] WhatsApp integration

## 🎓 Maintenance Guide

### Adding New Treatments
Edit `components/sections/Treatments.tsx`:
```typescript
const treatments = {
  skin: {
    list: [
      'New Treatment Name',
      // ... existing treatments
    ]
  }
}
```

### Adding New Conditions
Edit `components/sections/Conditions.tsx`:
```typescript
const conditions = [
  'New Condition',
  // ... existing conditions
];
```

### Updating Doctor Info
Edit `components/sections/Doctors.tsx`

### Adding Blog Posts
Edit `components/sections/Blog.tsx` (or integrate with a CMS)

### Changing Colors
Edit `tailwind.config.ts` in the colors section

## 💡 Design Philosophy

This website follows the principle of **"Serious Medicine, Warm Experience"**:

1. **Global, Not Local:** Design choices make Pragna feel like an international brand
2. **Editorial Quality:** Typography and spacing create a magazine-like feel
3. **Trust Through Calm:** No aggressive sales tactics, just confident expertise
4. **Premium Through Restraint:** Elegance through minimalism, not maximalism
5. **Warm Terracotta:** The color palette humanizes the medical context

## 📊 Success Metrics to Track

Once live, monitor:
- Page load time (aim for < 2 seconds)
- Bounce rate
- Time on page
- Form submission rate
- Mobile vs desktop traffic
- Most viewed sections
- Traffic sources

## 🤝 Credits

**Design Direction:** Global brand dermatology aesthetic  
**Color Palette:** Pragna brand guidelines  
**Content:** Provided clinic information and existing website  
**Development:** Next.js + Tailwind CSS  
**Typography:** Playfair Display + Inter (Google Fonts)  

---

**Website Status:** ✅ Production Ready  
**Last Updated:** November 15, 2025  
**Version:** 1.0.0

