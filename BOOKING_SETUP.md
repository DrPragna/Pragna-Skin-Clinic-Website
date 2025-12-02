# Booking System Setup Guide

This guide will help you set up the appointment booking system for Pragna Skin Clinic.

## Overview

When a user submits the booking form:
1. ✅ Data is saved to **Google Sheets** (permanent record)
2. ✅ Email notification sent to **yenigantisai@gmail.com** (optional)
3. ✅ User is prompted to send a **WhatsApp message** to **+91 93805 51547**

---

## Step 1: Set Up Google Sheets (Required)

This stores all booking requests in a spreadsheet you can access anytime.

### Instructions:

1. **Create a new Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it: `Pragna Skin Clinic - Bookings`

2. **Open Apps Script**
   - In the spreadsheet, go to **Extensions → Apps Script**
   - Delete any existing code

3. **Paste the script**
   - Copy the entire contents of `lib/google-apps-script.js`
   - Paste it into the Apps Script editor
   - Click **Save** (💾 icon)

4. **Deploy the script**
   - Click **Deploy → New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Select **Web app**
   - Fill in:
     - Description: `Booking Form Handler`
     - Execute as: `Me`
     - Who has access: `Anyone`
   - Click **Deploy**
   - **Authorize** the app when prompted (click through the warnings)

5. **Copy the Web App URL**
   - After deployment, you'll see a URL like:
     ```
     https://script.google.com/macros/s/AKfycbx.../exec
     ```
   - Copy this URL

6. **Add to environment variables**
   - Create a file called `.env.local` in your project root
   - Add:
     ```
     GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
     WHATSAPP_NUMBER=919380551547
     NOTIFICATION_EMAIL=yenigantisai@gmail.com
     ```

---

## Step 2: Set Up Email Notifications (Optional)

Get email alerts whenever someone books an appointment.

### Option A: Resend (Recommended - Free tier available)

1. **Sign up at [resend.com](https://resend.com)**
   - Free tier: 100 emails/day, 3000/month

2. **Get your API key**
   - Go to API Keys section
   - Create a new key
   - Copy it

3. **Add to `.env.local`**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

4. **Verify your domain** (for production)
   - In Resend dashboard, add and verify your domain
   - Update the "from" email in `/app/api/book-appointment/route.ts`

### Option B: Skip Email

If you don't set up Resend, the system will still work - you'll just rely on:
- Google Sheets for records
- WhatsApp for instant notifications

---

## Step 3: Test the System

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Fill out the booking form** on your website

3. **Check that:**
   - ✅ Form shows success message
   - ✅ WhatsApp button appears
   - ✅ Data appears in Google Sheet
   - ✅ Email arrives (if configured)

---

## Environment Variables Summary

Create `.env.local` with:

```env
# Required
WHATSAPP_NUMBER=919380551547

# Google Sheets (set up in Step 1)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec

# Email (optional - Step 2)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAIL=yenigantisai@gmail.com
```

---

## Troubleshooting

### Form submits but no data in Google Sheet
- Check that `GOOGLE_SCRIPT_URL` is correctly set in `.env.local`
- Make sure you deployed the Apps Script as a **Web app**
- Check the Apps Script execution logs for errors

### WhatsApp link doesn't work
- Ensure the number format is correct: `919380551547` (no + sign)
- The user needs WhatsApp installed on their device

### Emails not arriving
- Check spam folder
- Verify your Resend API key is correct
- In production, you need to verify your sending domain

---

## Production Deployment (Vercel)

When deploying to Vercel:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add all the variables from `.env.local`
4. Redeploy your application

---

## Future Improvements

When you're ready to upgrade:

1. **WhatsApp Business API** - Send automated messages (requires business verification)
2. **Calendar Integration** - Sync with Google Calendar
3. **CRM Integration** - Connect to Zoho, HubSpot, etc.
4. **SMS Notifications** - Via Twilio or similar

---

Need help? The booking API is located at `/app/api/book-appointment/route.ts`

