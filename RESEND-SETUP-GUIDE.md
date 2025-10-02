# 📧 RESEND DOMAIN VERIFICATION - STEP BY STEP GUIDE

## Current Status: ❌ Domain NOT Verified

Your Resend API key is working, but rvaglowco.com needs to be verified before you can send emails to getlit@rvaglowco.com.

---

## 🔧 HOW TO VERIFY YOUR DOMAIN (10-15 minutes)

### Step 1: Log into Resend
1. Go to: https://resend.com/login
2. Log in with your account

### Step 2: Add Your Domain
1. Click on "Domains" in the left sidebar
2. Click "Add Domain" button
3. Enter: `rvaglowco.com`
4. Click "Add"

### Step 3: Get DNS Records
Resend will show you DNS records to add. They look like this:

**Record 1 - SPF Record (TXT)**
```
Type: TXT
Name: @ (or rvaglowco.com)
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

**Record 2 - DKIM Record (TXT)**
```
Type: TXT
Name: resend._domainkey
Value: (a long string starting with p=...)
TTL: 3600
```

**Record 3 - DMARC Record (TXT)** (Optional but recommended)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none
TTL: 3600
```

### Step 4: Add Records to SiteGround

1. **Log into SiteGround**
   - Go to: https://my.siteground.com
   - Log in with your credentials

2. **Access DNS Zone Editor**
   - Click on "Websites" in the top menu
   - Find rvaglowco.com and click "Site Tools"
   - Navigate to: Domain → DNS Zone Editor

3. **Add Each DNS Record**

   **For each TXT record from Resend:**
   - Click "Add New Record"
   - Type: Select "TXT"
   - Name: Enter the name from Resend (e.g., `@`, `resend._domainkey`, `_dmarc`)
   - TTL: 3600 (or leave default)
   - TXT Data/Value: Copy-paste the exact value from Resend
   - Click "Create"

4. **Example Screenshots of What to Enter:**

   **SPF Record:**
   ```
   Type: TXT
   Host: @
   Points to: v=spf1 include:_spf.resend.com ~all
   ```

   **DKIM Record:**
   ```
   Type: TXT
   Host: resend._domainkey
   Points to: [paste the long p= string from Resend]
   ```

### Step 5: Verify in Resend

1. Go back to Resend dashboard
2. Click on your domain (rvaglowco.com)
3. Click "Verify" button
4. If it shows ✅ green checkmarks, you're done!
5. If it shows ❌ red X:
   - Wait 5-10 minutes for DNS to propagate
   - Click "Verify" again
   - Repeat until all records show green

### Step 6: Test Email Sending

Once you see all green checkmarks in Resend:

1. Come back to me and say "domain is verified"
2. I'll update the code to use getlit@rvaglowco.com
3. We'll run a test to confirm emails work

---

## ⏱️ TIMELINE

- Adding DNS records: 5 minutes
- DNS propagation: 5-30 minutes (usually ~10 minutes)
- Verification: Instant once DNS propagates

**Total time: 10-35 minutes**

---

## 🆘 TROUBLESHOOTING

### "Records not found" in Resend after adding to SiteGround

**Solution**: DNS takes time to propagate. Wait 10-15 minutes and try again.

### "SPF record already exists"

**Solution**:
1. Find your existing SPF record in SiteGround
2. Modify it to include Resend's SPF:
   - Old: `v=spf1 ... ~all`
   - New: `v=spf1 include:_spf.resend.com ... ~all`

### Can't find DNS Zone Editor in SiteGround

**Solution**:
1. Make sure you're in "Site Tools" not "My Accounts"
2. Look under: Domain → DNS Zone Editor
3. If still not visible, contact SiteGround support

### Verification stuck on "Pending"

**Solution**:
1. Check you entered records exactly as shown (no extra spaces)
2. Wait 30 minutes for DNS propagation
3. Use DNS checker: https://mxtoolbox.com/DNSLookup.aspx
   - Enter: `resend._domainkey.rvaglowco.com`
   - Should show your DKIM record

---

## 📞 NEED HELP?

- **Resend Support**: support@resend.com
- **Resend Docs**: https://resend.com/docs/dashboard/domains/introduction
- **SiteGround Support**: Via your SiteGround account

---

## ✅ ONCE VERIFIED

Let me know and I'll:
1. Update the API code to send to getlit@rvaglowco.com
2. Update the "from" address to noreply@rvaglowco.com
3. Test that emails work perfectly
4. Push changes to production

---

**Ready to do this? It's the last major blocker before launch! 🚀**
