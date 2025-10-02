# 🔒 GOOGLE MAPS API SECURITY SETUP

## ⚠️ CRITICAL SECURITY ISSUE

Your Google Maps API key is currently **unrestricted**, which means:
- Anyone can use your API key
- You could get unexpected charges
- Your key could be stolen and used elsewhere

**Time to fix: 5-10 minutes**

---

## 🔧 HOW TO SECURE YOUR API KEY

### Step 1: Go to Google Cloud Console

1. Go to: https://console.cloud.google.com
2. Sign in with your Google account
3. Make sure you're in the correct project

### Step 2: Navigate to API Credentials

1. Click the menu (☰) in the top left
2. Go to: **APIs & Services** → **Credentials**
3. Find your API key in the list
4. Look for: `AIzaSyDFaBp8CCYNmb2qsC8HS87DMnoCtkIxPPM`
5. Click on the key name to edit it

### Step 3: Set Application Restrictions

In the "Application restrictions" section:

1. Select: **HTTP referrers (web sites)**

2. Click **+ ADD AN ITEM** and add these referrers:

   ```
   https://rvaglowco.com/*
   https://*.rvaglowco.com/*
   https://*.vercel.app/*
   http://localhost:3000/*
   ```

3. **Why these?**
   - `https://rvaglowco.com/*` - Your production domain
   - `https://*.rvaglowco.com/*` - Subdomains (like www)
   - `https://*.vercel.app/*` - Vercel preview deployments
   - `http://localhost:3000/*` - Local development

### Step 4: Set API Restrictions

In the "API restrictions" section:

1. Select: **Restrict key**

2. Click **Select APIs** dropdown

3. Check ONLY these APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Street View Static API**

4. Uncheck all others

### Step 5: Save

1. Scroll to bottom
2. Click **SAVE**
3. Wait 5 minutes for changes to propagate

---

## ✅ VERIFICATION

After 5 minutes, test your website:

1. Visit: https://rvaglowco.com
2. Try the "Get Estimate" button
3. Start typing an address
4. Google autocomplete should still work ✓

If Maps stops working:
- Check you added all 4 referrers correctly
- Check you enabled all 3 APIs
- Wait another 5 minutes for propagation

---

## 🎯 WHAT THIS DOES

**Before**: Anyone could use your API key from anywhere
**After**: Only your website (and dev environment) can use the key

**Security Level**: 🔴 Critical → 🟢 Secure

---

## 📊 MONITOR USAGE

To see your API usage:

1. Go to: APIs & Services → Dashboard
2. Click on "Maps JavaScript API"
3. View your daily requests

**Free tier**: 28,000 map loads per month
**Your expected usage**: ~500-2,000/month (very safe)

---

## 🆘 IF YOU GET LOCKED OUT

If you accidentally restrict too much:

1. Go back to Credentials
2. Click your API key
3. Change restrictions back to "None" temporarily
4. Test website works
5. Re-apply restrictions correctly

---

## ✅ COMPLETION CHECKLIST

- [ ] Logged into Google Cloud Console
- [ ] Found API key credentials
- [ ] Set HTTP referrer restrictions (4 referrers)
- [ ] Set API restrictions (3 APIs only)
- [ ] Clicked SAVE
- [ ] Waited 5 minutes
- [ ] Tested website still works

---

**Once complete, your API key is secure and your site is protected!** 🔒
