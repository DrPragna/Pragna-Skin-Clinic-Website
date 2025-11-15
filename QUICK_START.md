# 🚀 Quick Start Guide - Pragna Website

## ⚡ Deploy to Vercel NOW (5 minutes)

### 1. Create GitHub Repository
```bash
# Go to https://github.com/new
# Repository name: pragna-website
# Make it Private or Public
# Click "Create repository"
```

### 2. Push Code to GitHub
```bash
cd /Users/saisubhashyeniganti/Downloads/PSC/pragna-website

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pragna-website.git

# Push the code
git push -u origin main
```

### 3. Deploy on Vercel
```
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select "pragna-website" repository
5. Click "Deploy" (no configuration needed!)
6. Wait 2 minutes ⏱️
7. Your site is LIVE! 🎉
```

Your website will be at: `https://pragna-website.vercel.app`

---

## 📝 Post-Deployment Steps

### Add Custom Domain (Optional)
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `pragnaclinicindia.com`
3. Follow DNS instructions from Vercel
4. Wait 24-48 hours for DNS propagation

### Update Contact Information
Files to edit:
- `components/sections/Branches.tsx` - Add real phone numbers, emails, map links
- `components/sections/Footer.tsx` - Add social media URLs

### Add Real Images
1. Create folder: `public/images/`
2. Add your images:
   - `hero-clinic.jpg` (hero section)
   - `dr-padmavathi.jpg` (doctor photo)
   - `dr-pragna.jpg` (doctor photo)
   - Blog images in `public/images/blog/`

3. Update image paths in components (or we can help with this)

### Connect Contact Form
Currently the form logs to console. Options:

**Option 1: Formspree (Easiest)**
```typescript
// In components/sections/Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
};
```

**Option 2: Web3Forms**
Similar to Formspree, free tier available

**Option 3: Custom Backend**
Integrate with your existing systems

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  maroon: {
    DEFAULT: '#722B2B', // Change this
  },
  // ... other colors
}
```

### Add/Remove Sections
Edit `app/page.tsx`:
```typescript
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Comment out or remove sections you don't want */}
      {/* <TrustStrip /> */}
      <WhyPragna />
      // ... etc
    </main>
  );
}
```

### Update Content
All content is in the component files:
- **Treatments:** `components/sections/Treatments.tsx`
- **Conditions:** `components/sections/Conditions.tsx`
- **FAQs:** `components/sections/FAQ.tsx`
- **Testimonials:** `components/sections/Testimonials.tsx`
- **Blog:** `components/sections/Blog.tsx`

Just edit the arrays/objects in each file!

---

## 🐛 Troubleshooting

### "Node.js version required"
This is normal on your local machine. Vercel uses Node 20+ automatically. Your site will build fine on Vercel!

### Changes not showing?
```bash
# Make changes, then:
git add -A
git commit -m "Update: description of changes"
git push

# Vercel auto-deploys on push!
```

### Build fails on Vercel?
Check the build logs in Vercel dashboard for specific errors.

---

## 📞 Need Help?

**Common Tasks:**
- ✅ Add images → See "Add Real Images" above
- ✅ Change text → Edit component files directly
- ✅ Update colors → Edit `tailwind.config.ts`
- ✅ Connect form → See "Connect Contact Form" above
- ✅ Add Google Analytics → Add to `app/layout.tsx`

**Documentation:**
- Full deployment guide: `DEPLOYMENT.md`
- Project overview: `PROJECT_OVERVIEW.md`
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
- Vercel docs: https://vercel.com/docs

---

## ✅ Checklist

Before announcing the website:
- [ ] Push to GitHub ✓
- [ ] Deploy to Vercel ✓
- [ ] Add custom domain (if applicable)
- [ ] Update phone numbers and emails
- [ ] Add real images
- [ ] Connect contact form
- [ ] Add Google Maps links for branches
- [ ] Update social media links
- [ ] Add Google Analytics (optional)
- [ ] Test on mobile devices
- [ ] Test form submission
- [ ] Check all links work

---

**Your website is ready to go live! 🎊**

The design, animations, and responsive layout are all complete.  
Just follow the 3 steps above to deploy!

