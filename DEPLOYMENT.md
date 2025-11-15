# Pragna Skin & Laser Clinics - Deployment Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
   - Name: `pragna-website` (or your preferred name)
   - Keep it private or public as per your preference
   - Don't initialize with README (we already have the code)

2. Push your local repository to GitHub:
```bash
cd /Users/saisubhashyeniganti/Downloads/PSC/pragna-website
git remote add origin https://github.com/YOUR_USERNAME/pragna-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your `pragna-website` repository
4. Vercel will auto-detect Next.js settings:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"
6. Your site will be live in ~2 minutes at `your-project-name.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Step 3: Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Settings → Domains
3. Add your custom domain (e.g., `pragnaclinicindia.com`)
4. Follow Vercel's instructions to update your DNS records

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📝 Environment Variables

If you need to add environment variables (for form submissions, analytics, etc.):

1. Create `.env.local` in the project root
2. Add your variables:
```
NEXT_PUBLIC_FORM_ENDPOINT=your_form_endpoint
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```
3. Add the same variables in Vercel Dashboard → Settings → Environment Variables

## 🎨 Customization Guide

### Adding Real Images

Replace the placeholder image sections in:
- `components/sections/Hero.tsx` - Clinic/doctor photos
- `components/sections/Doctors.tsx` - Doctor headshots
- `components/sections/Blog.tsx` - Blog post images

Create a `public/images` folder and add your images:
```
public/
  images/
    hero-clinic.jpg
    dr-padmavathi.jpg
    dr-pragna.jpg
    blog/
      medifacials.jpg
      ultrasound.jpg
      etc...
```

Then update the components to use these images with Next.js Image component.

### Updating Contact Information

Update phone numbers and email in:
- `components/sections/Branches.tsx`
- Add actual map links

### Connecting the Contact Form

The form in `components/sections/Contact.tsx` currently logs to console. 

Options to make it functional:
1. **Form Service** (Formspree, Web3Forms, etc.)
2. **Email API** (SendGrid, AWS SES, etc.)
3. **Backend Integration** (Your own API)

Example with Formspree:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
  // Handle response
};
```

## 🎯 SEO Optimization

1. Add real images with proper alt text
2. Update `app/layout.tsx` with accurate metadata
3. Add Google Analytics or similar
4. Create a `robots.txt` in `/public`
5. Add a sitemap (Vercel auto-generates this)

## 📱 Social Media Links

Update in `components/sections/Footer.tsx`:
- Instagram URL
- Facebook URL
- Add other social platforms as needed

## 🔧 Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Deployment:** Vercel
- **Fonts:** Google Fonts (Playfair Display + Inter)

## 📊 Analytics & Monitoring

Consider adding:
- Google Analytics 4
- Vercel Analytics (built-in)
- Microsoft Clarity
- Hotjar for heatmaps

## 🐛 Troubleshooting

### Build fails on Vercel
- Check Node.js version compatibility
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Styles not loading
- Ensure Tailwind config is correct
- Clear `.next` folder and rebuild

### Form not working
- Check form endpoint configuration
- Verify CORS settings if using external API
- Check browser console for errors

## 📞 Support

For technical issues with the website code, check:
- Next.js documentation: https://nextjs.org/docs
- Vercel documentation: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Built with ❤️ for Pragna Skin & Laser Clinics**

