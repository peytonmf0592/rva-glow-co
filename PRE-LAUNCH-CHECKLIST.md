# 🚀 RVA GLOW CO - PRE-LAUNCH CHECKLIST

## ✅ COMPLETED (READY TO GO!)

- [x] Website design and branding
- [x] All pages functional (Home, Services, About, Contact, Booking, FAQ)
- [x] Contact forms working
- [x] Email notifications configured (Resend API)
- [x] Christmas lights success animations
- [x] AI Chatbot (Lumi) with smart responses
- [x] Privacy Policy and Terms of Service
- [x] robots.txt created
- [x] sitemap.xml generated
- [x] Metadata optimized with "Get Lit" branding
- [x] Production build successful
- [x] GitHub repository set up
- [x] Vercel deployment configured

---

## 🚨 CRITICAL - DO BEFORE LAUNCH

### 1. Email Configuration
**STATUS**: ⚠️ NEEDS COMPLETION

Current: Emails go to peytonmf0592@gmail.com
Target: getlit@rvaglowco.com

**STEPS**:
1. Log into Resend.com dashboard
2. Go to Domains section
3. Verify rvaglowco.com is verified (check for green checkmark)
4. If not verified:
   - Copy DNS records from Resend
   - Add to SiteGround DNS Zone Editor
   - Wait 5-30 minutes for verification
5. Once verified, update `/app/api/quote/route.ts` line 46:
   ```typescript
   // Change from:
   to: 'peytonmf0592@gmail.com', // Temporary until domain verified
   // To:
   to: 'getlit@rvaglowco.com',
   ```
6. Also update line 45:
   ```typescript
   // Change from:
   from: 'RVA Glow Co <onboarding@resend.dev>',
   // To:
   from: 'RVA Glow Co <noreply@rvaglowco.com>',
   ```

### 2. Vercel Environment Variables
**STATUS**: ⚠️ VERIFY ALL ARE SET

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables** (copy from .env.local):
```
RESEND_API_KEY=re_FPcuWSZu_83FoBaoAVNHtE33Wmzv3Mc8i
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDFaBp8CCYNmb2qsC8HS87DMnoCtkIxPPM
GEMINI_API_KEY=AIzaSyDA0UgTWMTVVKXMZdN4OIxMyLwvE8rxr8M
NEXT_PUBLIC_SUPABASE_URL=https://ukslfqjnnybcocmigcqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc2xmcWpubnliY29jbWlnY3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMTcyNzYsImV4cCI6MjA3Mjc5MzI3Nn0.iusbw1sFO9Lzwl6SJCmIm0DUhO5DWpxC8krX2p_qvGk
SUPABASE_SERVICE_ROLE_KEY=sbp_8a8a6c991f9657587034f5fb00d330d1c10425a1
DATABASE_URL=postgresql://postgres.ukslfqjnnybcocmigcqo:P2320084323228f!@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Set for**: Production, Preview, and Development

### 3. Google Maps API Security
**STATUS**: ⚠️ CRITICAL SECURITY ISSUE

Your API key is exposed in frontend code!

**STEPS**:
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. Click on your API key: AIzaSyDFaBp8CCYNmb2qsC8HS87DMnoCtkIxPPM
4. Under "Application restrictions":
   - Select: "HTTP referrers (web sites)"
   - Add these referrers:
     ```
     https://rvaglowco.com/*
     https://*.rvaglowco.com/*
     http://localhost:3000/*
     https://*.vercel.app/*
     ```
5. Under "API restrictions":
   - Select: "Restrict key"
   - Check these APIs:
     - Maps JavaScript API
     - Places API
     - Street View Static API
6. Click SAVE

### 4. Domain Configuration
**STATUS**: ⚠️ VERIFY IN VERCEL

**STEPS**:
1. In Vercel Dashboard → Domains
2. Verify these are added:
   - rvaglowco.com (redirects to www)
   - www.rvaglowco.com (primary)
3. Check SSL certificate shows "Issued"
4. Test both URLs work

---

## 📊 HIGHLY RECOMMENDED

### 5. Google Search Console
**STEPS**:
1. Go to: https://search.google.com/search-console
2. Click "Add Property" → Domain property → rvaglowco.com
3. Verify via DNS (add TXT record to SiteGround)
4. Once verified, submit sitemap: https://rvaglowco.com/sitemap.xml

### 6. Google Analytics (Optional but valuable)
**STEPS**:
1. Create GA4 property at: https://analytics.google.com
2. Get Measurement ID (format: G-XXXXXXXXXX)
3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 7. Google My Business
**STEPS**:
1. Create listing at: https://business.google.com
2. Add your business info
3. Verify your business
4. Add photos of completed projects
5. Encourage customers to leave reviews

---

## 🧪 TESTING CHECKLIST

### Before You Announce Launch:

**Desktop Testing**:
- [ ] Test in Chrome
- [ ] Test in Safari
- [ ] Test in Firefox
- [ ] Test contact form submission
- [ ] Test booking form submission
- [ ] Check email arrives at correct address
- [ ] Test chatbot responses
- [ ] Verify all images load
- [ ] Check Google Maps address preview works

**Mobile Testing**:
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test all forms on mobile
- [ ] Verify responsive design
- [ ] Check mobile navigation menu

**SEO Testing**:
- [ ] Visit https://rvaglowco.com/robots.txt (should show content)
- [ ] Visit https://rvaglowco.com/sitemap.xml (should show XML)
- [ ] Share link on Facebook (check preview)
- [ ] Share link via text message (check "Get Lit" appears)
- [ ] Share link on Twitter/X (check preview)

**Functionality Testing**:
- [ ] Submit a test booking with real info
- [ ] Submit a test contact form
- [ ] Verify you receive both emails
- [ ] Test "Get Estimate" modal on homepage
- [ ] Click all navigation links
- [ ] Test footer links
- [ ] Verify phone number is clickable on mobile

---

## 💼 BUSINESS SETUP

### Legal & Insurance
- [ ] Business entity registered (LLC, sole proprietor, etc.)
- [ ] General liability insurance obtained
- [ ] Richmond business license (if required)
- [ ] Electrical contractor license (if required for your services)
- [ ] Workers compensation insurance (if hiring employees)

### Financial
- [ ] Business bank account opened
- [ ] Payment processing set up (Stripe, Square, etc.)
- [ ] Invoicing system ready
- [ ] Accounting/bookkeeping plan

### Operations
- [ ] Pricing strategy finalized
- [ ] Service area boundaries confirmed
- [ ] Equipment and materials sourced
- [ ] Storage location secured for off-season
- [ ] Installation schedule/calendar system
- [ ] Customer management system (CRM)

---

## 🎯 MARKETING PREP

### Social Media
- [ ] Create Instagram account (@rvaglowco)
- [ ] Create Facebook Business Page
- [ ] Create TikTok account (optional)
- [ ] Plan first 10-15 posts
- [ ] Take before/after photos of first jobs

### Local Marketing
- [ ] Print business cards
- [ ] Design yard signs
- [ ] Create door hangers for neighborhoods
- [ ] Join local Facebook groups
- [ ] Nextdoor business account

### Online Presence
- [ ] Set up Facebook Ads account
- [ ] Set up Google Ads account (optional)
- [ ] Create Instagram business account
- [ ] Plan launch promotion/discount

---

## 📱 POST-LAUNCH MONITORING

### Week 1 Tasks:
- [ ] Monitor email deliverability
- [ ] Check Google Analytics (if set up)
- [ ] Test all forms daily
- [ ] Monitor customer inquiries
- [ ] Respond to all leads within 2 hours
- [ ] Check website performance

### Ongoing:
- [ ] Weekly backup of customer data
- [ ] Monthly review of Google Analytics
- [ ] Update FAQ based on common questions
- [ ] Add customer testimonials as you get them
- [ ] Post project photos to Instagram
- [ ] Encourage satisfied customers to leave Google reviews

---

## 🎉 LAUNCH DAY TASKS

1. **Final verification**:
   - All environment variables set ✓
   - Email going to getlit@rvaglowco.com ✓
   - Domain working with SSL ✓

2. **Announce launch**:
   - Post on personal social media
   - Share in local Facebook groups
   - Post on Nextdoor
   - Email friends and family
   - Create Instagram launch post

3. **Monitor closely**:
   - Check email every hour
   - Respond to inquiries immediately
   - Monitor website for errors
   - Be ready to fix issues quickly

---

## 🆘 TROUBLESHOOTING

### If forms aren't working:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test API endpoint directly
4. Check browser console for errors

### If emails aren't sending:
1. Check Resend dashboard for errors
2. Verify domain is verified
3. Check spam folder
4. Verify API key is correct

### If Google Maps isn't loading:
1. Verify API key is set in Vercel
2. Check API restrictions allow your domain
3. Check browser console for errors
4. Verify billing is enabled in Google Cloud

---

## 📞 EMERGENCY CONTACTS

- **Vercel Support**: vercel.com/support
- **Resend Support**: resend.com/support
- **Google Cloud Support**: console.cloud.google.com
- **Domain Support (SiteGround)**: your SiteGround account

---

## ✅ READY TO LAUNCH?

Your website is **95% ready**. Complete the critical items above and you're good to go!

**Estimated time to 100% ready**: 30-60 minutes

Good luck with RVA Glow Co! 🎄✨
