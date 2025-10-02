# 🔍 GOOGLE SEARCH CONSOLE SETUP GUIDE

## What is Google Search Console?

Google Search Console (GSC) is a free tool that helps you:
- Monitor how Google sees your website
- See what keywords people use to find you
- Track your search rankings
- Submit your sitemap for faster indexing
- Get alerts about issues

**Time to set up: 10-15 minutes**

---

## 📋 STEP-BY-STEP SETUP

### Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account (use the same one for all business tools)

### Step 2: Add Your Property

1. Click "Add Property" or the property dropdown
2. You'll see two options:

   **Option A: Domain Property** (Recommended - covers all variations)
   - Enter: `rvaglowco.com`
   - This covers: http, https, www, non-www, subdomains

   **Option B: URL Prefix** (Easier but less comprehensive)
   - Enter: `https://rvaglowco.com`
   - Only covers this specific URL format

**Recommendation**: Choose **Domain Property** for better coverage

### Step 3: Verify Ownership (Domain Property Method)

If you chose Domain Property, Google will ask you to verify via DNS:

1. **Google will show you a TXT record like this:**
   ```
   Type: TXT
   Name: @ (or rvaglowco.com)
   Value: google-site-verification=abc123xyz456... (long string)
   TTL: 3600
   ```

2. **Add this to SiteGround DNS:**
   - Log into SiteGround
   - Go to: Site Tools → Domain → DNS Zone Editor
   - Click "Add New Record"
   - Type: TXT
   - Host: @ (or leave blank if it asks for subdomain)
   - Points to: Paste the full verification string
   - TTL: 3600
   - Click "Create"

3. **Wait 5-10 minutes for DNS to propagate**

4. **Go back to Google Search Console**
   - Click "Verify"
   - If successful, you'll see ✅ "Ownership verified"

### Step 3 Alternative: Verify via HTML Tag (URL Prefix Method)

If you chose URL Prefix, you can verify using the meta tag:

1. **Get the verification code from Google**
   - Example: `<meta name="google-site-verification" content="abc123xyz">`

2. **I'll add it to your website:**
   - Tell me the verification code
   - I'll update `/app/layout.tsx`
   - We'll push to production
   - You click "Verify" in Google

### Step 4: Submit Your Sitemap

Once verified:

1. In Google Search Console, click on "Sitemaps" in the left menu
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Status should show "Success" within a few minutes

### Step 5: Explore Your Data

Initial setup is done! Now explore:

- **Performance**: See search queries, clicks, impressions
- **Coverage**: See which pages Google has indexed
- **Enhancements**: Check for mobile usability issues
- **Security**: Get alerts about security issues

---

## 📊 WHAT TO MONITOR (Weekly)

### Week 1-4 (Launch Phase)
- **Index Coverage**: Make sure all pages are indexed
- **Performance**: Track impressions and clicks
- **Mobile Usability**: Ensure no mobile issues

### Ongoing (Monthly)
- **Search Queries**: See what keywords bring traffic
- **Click-Through Rate**: Optimize titles/descriptions
- **Core Web Vitals**: Monitor site speed

---

## 🎯 INITIAL OPTIMIZATION TASKS

After setup, do these immediately:

### 1. Submit Sitemap (Already Done Above)
✅ Your sitemap is already created at `/sitemap.xml`

### 2. Check Mobile Usability
1. Go to: Enhancements → Mobile Usability
2. Fix any issues Google finds
3. Request re-crawl after fixes

### 3. Request Indexing for Key Pages
1. Use the URL Inspection tool at the top
2. Enter: `https://rvaglowco.com`
3. Click "Request Indexing"
4. Repeat for:
   - `/services`
   - `/booking`
   - `/contact`

### 4. Set Up Email Alerts
1. Go to Settings (gear icon)
2. Click "Users and permissions"
3. Ensure your email is added
4. You'll get alerts for critical issues

---

## 🔧 COMMON VERIFICATION ISSUES

### "DNS verification failed"

**Solutions**:
1. Wait 30 minutes for DNS to fully propagate
2. Check DNS record with: https://mxtoolbox.com/SuperTool.aspx
   - Enter: `rvaglowco.com`
   - Look for your TXT record
3. Make sure there's no typo in the verification string
4. Make sure Host field is `@` or blank, not `rvaglowco.com.rvaglowco.com`

### "Verification record not found"

**Solutions**:
1. Check you added TXT record, not A or CNAME
2. Check Host is `@` or blank for root domain
3. Wait 15-30 minutes after adding
4. Contact SiteGround support if still not working

### Multiple TXT records conflict

**Solution**: You can have multiple TXT records with the same name. Add Google's verification as a new TXT record with Host `@` - don't modify existing records.

---

## 🎓 ADVANCED FEATURES (Optional)

### Link to Google Analytics
1. In GSC, go to Settings → Associations
2. Link your GA4 property
3. See search data in Analytics

### Set Preferred Domain
1. This is automatic if you use Domain Property
2. For URL Prefix, Google will follow your redirects

### International Targeting
1. Settings → International Targeting
2. For US only, you can leave as default
3. Language is auto-detected from your HTML

---

## 📈 EXPECTED TIMELINE

- **Day 1**: Setup and verification complete
- **Day 3-7**: First data starts appearing
- **Week 2**: Google starts crawling regularly
- **Week 4**: Enough data to spot trends
- **Month 3**: Comprehensive keyword data

---

## 🆘 TROUBLESHOOTING RESOURCES

- **GSC Help**: https://support.google.com/webmasters
- **Verification Guide**: https://support.google.com/webmasters/answer/9008080
- **Sitemap Guide**: https://support.google.com/webmasters/answer/7451001

---

## ✅ VERIFICATION CHECKLIST

After setup, confirm:
- [ ] Property verified (green checkmark)
- [ ] Sitemap submitted and shows "Success"
- [ ] At least 1 page indexed (check Coverage report)
- [ ] Mobile usability report shows no errors
- [ ] Email notifications enabled

---

## 🚀 NEXT STEPS AFTER SETUP

1. **Week 1**: Monitor indexing - make sure all pages get indexed
2. **Week 2**: Review first search queries
3. **Week 3**: Optimize meta descriptions for top queries
4. **Monthly**: Check for crawl errors and fix them

---

**Once you have the verification code from Google, let me know and I'll add it to your site!** 🎯
