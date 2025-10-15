# Portfolio Website Development Plan

## Project Overview

Portfolio website for **huckschlag.dev** built with React Router v7 (framework mode) + Tailwind CSS.

**Current Setup:**

- Domain registered with Namecheap
- DNS managed by Cloudflare
- MX records pointing to all-inkl.com for webmail
- GitHub Pages hosting at `hucki.github.io`
- Redirect from `huckschlag.dev` to `hucki.github.io` via all-inkl.com
- React Router v7 with `ssr: false` (static SPA build)

---

## Phase 1: GitHub Pages Deployment (CURRENT)

### GitHub Pages Configuration

**Repository Setup:**

- Repository: `hucki/hucki.github.io` (or similar)
- Branch for deployment: `gh-pages` or `main`
- Build output directory: `build/` (React Router v7 default)

### React Router v7 SPA Configuration

**Important:** GitHub Pages requires special handling for client-side routing.

React Router v7 framework mode with `ssr: false` generates a static SPA. For GitHub Pages deployment, use the 404.html trick for clean URLs.

**Minimal Configuration (`react-router.config.ts`):**

```typescript
import { type Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

**404.html Trick for Clean URLs (Recommended)**

Add a `404.html` file to your build output:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      // Redirect any 404 to index.html with path preserved
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/index.html'" />
  </head>
</html>
```

And in your `index.html`, add before your app loads:

```html
<script>
  (function () {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

**Why This Works:**

- GitHub Pages serves `404.html` for any non-existent route
- The 404 page preserves the URL in `sessionStorage` and redirects to `index.html`
- Your React app reads the URL from `sessionStorage` and uses client-side routing
- Results in clean URLs like `huckschlag.dev/about` instead of `huckschlag.dev/#/about`

**Implementation Note:** You'll need to ensure `404.html` is copied to your build output. This can be done by adding it to your `public/` directory or as part of your build process.

### Deployment Workflow

**Manual Deployment:**

```bash
# Build the site
npm run build

# Deploy to gh-pages branch (using gh-pages package)
npx gh-pages -d build
```

**Automated GitHub Actions:**

Create `.github/workflows/deploy-github-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: "./build"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

**Enable GitHub Pages:**

1. Go to repository Settings → Pages
2. Source: GitHub Actions (recommended) or select branch
3. Save

### Domain Configuration

**Current Setup (Keep As-Is):**

- `huckschlag.dev` redirects to `hucki.github.io` via all-inkl.com
- This continues to work fine

**Optional Enhancement:**
If you want GitHub Pages to serve `huckschlag.dev` directly:

1. Add `CNAME` file to your build output with content: `huckschlag.dev`
2. In Cloudflare DNS, change:
   - From: A record → all-inkl.com redirect
   - To: CNAME → `hucki.github.io`
3. In GitHub repo Settings → Pages → Custom domain: `huckschlag.dev`

**Recommendation:** Keep current redirect for Phase 1. Change DNS in Phase 2 when moving to AWS.

### Testing Checklist

- [ ] Site builds successfully locally
- [ ] All routes work with chosen routing strategy
- [ ] Images and assets load correctly
- [ ] Responsive design works on mobile
- [ ] GitHub Pages deployment succeeds
- [ ] Site accessible at `hucki.github.io`
- [ ] Redirect from `huckschlag.dev` works

---

## Phase 2: AWS Migration (FUTURE)

> **⚠️ IMPORTANT:** Only proceed with Phase 2 after Phase 1 is complete and stable.

**When to consider Phase 2:**

- Portfolio is live and working well on GitHub Pages
- You have time to focus on infrastructure
- You're deploying other projects to AWS and want consolidation
- You want to add backend features (API, contact forms, analytics)

## Development Phases

### Phase 1: GitHub Pages Update (CURRENT PHASE)

**Goal:** Modernize portfolio with new tech stack while keeping existing GitHub Pages deployment.

**Tech Stack:**

- React Router v7 (framework mode, `ssr: false`)
- Tailwind CSS
- GitHub Pages hosting (existing `hucki.github.io`)

**Changes:**

- Rebuild portfolio with React Router v7 + Tailwind
- Keep deploying to GitHub Pages
- Maintain existing domain redirect setup
- No infrastructure changes

**Deployment:**

- Same as current: push to GitHub Pages
- Domain setup unchanged: `huckschlag.dev` → `hucki.github.io`
- Email (MX records) unchanged

**Benefits of This Approach:**

- Focus on building the portfolio first
- No infrastructure complexity
- Free hosting
- Proven deployment process
- Can iterate quickly

---

### Phase 2: AWS Migration (FUTURE)

> **Note:** This is a future enhancement. Complete Phase 1 first before considering AWS migration.

**Goal:** Move to AWS infrastructure for professional portfolio hosting and to consolidate with other AWS projects.

---

## Architecture Overview

```
Cloudflare DNS (existing)
    ↓
CloudFront Distribution (AWS CDN + SSL)
    ↓
S3 Bucket (static website hosting)
```

### Why This Stack?

**S3 + CloudFront:**

- Cost-effective (~$1-2/month for typical traffic)
- Global CDN for fast loading worldwide
- Scales automatically
- Demonstrates AWS cloud architecture skills
- Easy integration with other AWS services (Lambda, API Gateway)

**Keeping Cloudflare DNS:**

- No need to migrate DNS to Route 53
- Existing MX records for email remain untouched
- Cloudflare can proxy to CloudFront (or use CNAME)

---

## Deployment Architecture

### Option A: Cloudflare Proxy + CloudFront (Recommended)

- Cloudflare DNS → CloudFront → S3
- Benefits: Cloudflare DDoS protection + caching layer
- Consideration: Double CDN might be overkill, but gives extra protection

### Option B: Direct CNAME to CloudFront

- Cloudflare DNS (DNS-only mode) → CloudFront → S3
- Cleaner, single CDN layer
- Still keeps MX records in Cloudflare

---

## AWS Components Needed

### Stage Environment

#### 1. S3 Bucket - Stage

- **Name:** `huckschlag-portfolio-stage`
- **Purpose:** Host stage build files
- **Configuration:**
  - Static website hosting enabled
  - Public read access via bucket policy
  - Versioning enabled (optional, for rollback)

#### 2. CloudFront Distribution - Stage

- **Purpose:** CDN for stage environment
- **Configuration:**
  - Origin: S3 bucket website endpoint
  - Custom SSL certificate (same wildcard cert as production)
  - Custom domain: `stage.huckschlag.dev`
  - Default root object: `index.html`
  - CloudFront Function for SPA routing
  - Price class: Use only North America and Europe (cheaper)

### Production Environment

#### 1. S3 Bucket - Production

- **Name:** `huckschlag-portfolio-production`
- **Purpose:** Host production build files
- **Configuration:**
  - Static website hosting enabled
  - Public read access via bucket policy
  - Versioning enabled (for rollback capability)
  - Lifecycle rules (optional, for old version cleanup)

#### 2. CloudFront Distribution - Production

- **Purpose:** CDN for production environment
- **Configuration:**
  - Origin: S3 bucket website endpoint
  - Custom SSL certificate (ACM)
  - Custom domains: `huckschlag.dev` and `www.huckschlag.dev`
  - Default root object: `index.html`
  - CloudFront Function for SPA routing
  - Price class: Use all edge locations (best performance)

### Shared Resources

#### 3. ACM Certificate

- **Purpose:** Free SSL certificate for both environments
- **Region:** Must be in `us-east-1` for CloudFront
- **Validation:** DNS validation via Cloudflare
- **Domains:**
  - `huckschlag.dev`
  - `*.huckschlag.dev` (wildcard for stage, www, api, etc.)

#### 4. CloudFront Function (Shared)

- **Purpose:** Handle React Router client-side routing
- **Logic:** Rewrite all non-file requests to `/index.html`
- **Usage:** Same function attached to both distributions

#### 5. IAM User for GitHub Actions

- **Purpose:** Programmatic access for CI/CD
- **Permissions needed:**
  - `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on both buckets
  - `s3:ListBucket` on both buckets
  - `cloudfront:CreateInvalidation` on both distributions
- **Best practice:** Use separate IAM users or roles per environment (optional)

---

## SPA Routing Solution

React Router v7 in SPA mode needs all routes to serve `index.html`. CloudFront Function handles this:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If URI doesn't have a file extension, serve index.html
  if (!uri.includes(".") && !uri.endsWith("/")) {
    request.uri = "/index.html";
  }

  // If URI ends with /, serve index.html
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  }

  return request;
}
```

**Attach to:** CloudFront Viewer Request event

---

## DNS Configuration (Cloudflare)

### Keep Existing:

- MX records (all-inkl.com webmail) - **DO NOT TOUCH**
- Any other existing records

### Add/Update:

```
Type    Name    Value                           Proxy Status
A       @       <CloudFront Distribution>       Proxied (or DNS only)
CNAME   www     <CloudFront Distribution>       Proxied (or DNS only)
```

**Note:** If using Cloudflare proxy, you'll point to CloudFront's domain. If DNS-only, use CNAME to CloudFront distribution domain.

---

## Deployment Workflow

### Initial Setup (One-time)

1. **Create S3 bucket** with static website hosting
2. **Create CloudFront distribution** pointing to S3
3. **Request ACM certificate** in us-east-1
4. **Validate certificate** via Cloudflare DNS (add CNAME records AWS provides)
5. **Add CloudFront Function** for SPA routing
6. **Update Cloudflare DNS** to point to CloudFront

### Regular Deployments

```bash
# Build the static site
npm run build

# Sync to S3
aws s3 sync ./build s3://huckschlag-portfolio --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id XXXXXXXXXXXXX \
  --paths "/*"
```

### Automated CI/CD (GitHub Actions)

#### Two Separate Workflows

**File: `.github/workflows/deploy-stage.yml`**

```yaml
name: Deploy to Stage

on:
  push:
    branches: [stage]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: stage

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          # Add stage-specific env vars if needed
          VITE_API_URL: https://api-stage.huckschlag.dev

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to S3 (Stage)
        run: |
          aws s3 sync ./build s3://huckschlag-portfolio-stage \
            --delete \
            --cache-control "public,max-age=0,must-revalidate"

      - name: Invalidate CloudFront (Stage)
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_STAGE }} \
            --paths "/*"

      - name: Deployment Summary
        run: |
          echo "🚀 Stage deployment complete!"
          echo "🌐 URL: https://stage.huckschlag.dev"
```

**File: `.github/workflows/deploy-production.yml`**

```yaml
name: Deploy to Production

on:
  push:
    branches: [production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests (optional)
        run: npm test
        continue-on-error: false

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          # Add production-specific env vars if needed
          VITE_API_URL: https://api.huckschlag.dev

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to S3 (Production)
        run: |
          aws s3 sync ./build s3://huckschlag-portfolio-production \
            --delete \
            --cache-control "public,max-age=31536000,immutable" \
            --exclude "*.html" \
            --exclude "service-worker.js"

          # HTML files with shorter cache (for SPA)
          aws s3 sync ./build s3://huckschlag-portfolio-production \
            --exclude "*" \
            --include "*.html" \
            --cache-control "public,max-age=0,must-revalidate"

      - name: Invalidate CloudFront (Production)
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID_PROD }} \
            --paths "/*"

      - name: Deployment Summary
        run: |
          echo "🎉 Production deployment complete!"
          echo "🌐 URL: https://huckschlag.dev"
```

#### GitHub Secrets Required

Add these secrets in your GitHub repository settings (`Settings → Secrets and variables → Actions`):

```
AWS_ACCESS_KEY_ID                    # IAM user access key
AWS_SECRET_ACCESS_KEY                # IAM user secret key
CLOUDFRONT_DISTRIBUTION_ID_STAGE     # Stage CloudFront distribution ID
CLOUDFRONT_DISTRIBUTION_ID_PROD      # Production CloudFront distribution ID
```

#### GitHub Environments (Optional but Recommended)

Configure environments in `Settings → Environments`:

**Stage environment:**

- No protection rules (auto-deploy)
- Environment secrets/variables for stage-specific config

**Production environment:**

- Required reviewers (optional - for manual approval)
- Deployment branch rule: only `production` branch
- Environment secrets/variables for production config

---

## Infrastructure as Code Option

Since you have serverless experience, consider using **AWS CDK** or **Serverless Framework** to manage infrastructure:

### AWS CDK Stack (TypeScript):

```typescript
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

// Define S3 bucket, CloudFront distribution, certificate
// Version controlled, repeatable deployments
```

### Benefits:

- Version controlled infrastructure
- Easy to replicate for other projects
- Clear documentation of setup
- Can be torn down and recreated easily

---

## Cost Estimate

### Phase 1: GitHub Pages (Current)

**Monthly Cost: $0**

- GitHub Pages: Free
- Domain (Namecheap): Already paid
- Cloudflare DNS: Free tier
- all-inkl.com: Existing service (webmail)

### Phase 2: AWS (Future)

**Monthly costs for typical portfolio traffic (~1000 visitors):**

| Service                         | Estimated Cost        |
| ------------------------------- | --------------------- |
| S3 Storage (1GB)                | $0.023                |
| S3 Requests                     | $0.05                 |
| CloudFront Data Transfer (10GB) | Free (first 1TB free) |
| CloudFront Requests             | $0.10                 |
| ACM Certificate                 | Free                  |
| **Total**                       | **~$0.20 - $1/month** |

**Note:** Cloudflare remains free (existing plan).

---

## Migration Steps

### Phase 1: AWS Setup (Both Environments)

#### Stage Environment First (Lower Risk)

1. Create S3 bucket `huckschlag-portfolio-stage` with static website hosting
2. Upload initial build manually to test
3. Create CloudFront distribution for stage
4. Request and validate ACM certificate (wildcard `*.huckschlag.dev`)
5. Add CloudFront Function for SPA routing
6. Add `stage` CNAME in Cloudflare pointing to stage CloudFront distribution
7. Test `stage.huckschlag.dev` works correctly

#### Production Environment

1. Create S3 bucket `huckschlag-portfolio-production` with static website hosting
2. Upload initial build manually to test
3. Create CloudFront distribution for production
4. Use same ACM certificate as stage
5. Attach same CloudFront Function as stage
6. Test CloudFront URL works correctly (don't update DNS yet)

### Phase 2: GitHub Actions Setup

1. Create IAM user for GitHub Actions with necessary permissions
2. Add AWS credentials to GitHub Secrets
3. Add CloudFront distribution IDs to GitHub Secrets
4. Create `.github/workflows/deploy-stage.yml`
5. Create `.github/workflows/deploy-production.yml`
6. Create and push to `stage` branch → verify stage deployment works
7. Create and push to `production` branch → verify production deployment works

### Phase 3: DNS Cutover (Production)

1. **Backup:** Note current all-inkl.com redirect settings (just in case)
2. Update Cloudflare DNS A/CNAME records for `huckschlag.dev` and `www.huckschlag.dev`
3. Point to production CloudFront distribution
4. **Wait 5-10 minutes** for DNS propagation
5. Test `huckschlag.dev` loads correctly
6. **Verify email still works** (send/receive test email - MX records untouched)
7. **Monitor:** Check CloudFront metrics for traffic

### Phase 4: GitHub Pages Migration

1. Create simple redirect page on `hucki.github.io`
2. Update repository to serve redirect HTML
3. Test redirect works from `hucki.github.io` → `huckschlag.dev`

### Phase 5: Cleanup (Optional, After 1 Week)

1. Remove/disable all-inkl.com redirect (if not needed for anything else)
2. Archive old portfolio code from `hucki.github.io` if desired
3. Remove any unused GitHub Actions workflows

---

## Benefits of This Setup

### Technical:

- **Globally fast:** CloudFront edge locations
- **Scalable:** Handles traffic spikes automatically
- **Reliable:** S3 11 9's durability, CloudFront 99.9% uptime
- **Secure:** Free SSL, AWS security best practices

### Professional:

- **Demonstrates AWS skills** on your own portfolio
- **Easy to extend:** Add Lambda functions, API Gateway later
- **Unified ecosystem:** Same platform as other projects
- **Portfolio piece:** "This site runs on AWS infrastructure I designed"

### Practical:

- **Cost-effective:** Probably $1-2/month
- **Low maintenance:** No servers to manage
- **Quick deployments:** Automated via GitHub Actions
- **No email disruption:** MX records stay with all-inkl.com

---

## Future Enhancements

Once basic deployment works, consider:

1. **Contact form:** API Gateway + Lambda function + SES
2. **Analytics:** CloudWatch + Lambda for custom tracking
3. **Multi-environment:** Separate staging/production distributions
4. **Performance monitoring:** CloudWatch RUM
5. **Additional subdomains:**
   - `api.huckschlag.dev` → API Gateway endpoints
   - `app.huckschlag.dev` → Other React applications

---

## Multi-Environment Setup

### Two Separate Deployments

**Stage Environment:**

- **Domain:** `stage.huckschlag.dev`
- **S3 Bucket:** `huckschlag-portfolio-stage`
- **CloudFront Distribution:** Separate distribution for stage
- **Trigger:** Auto-deploy when code merged to `stage` branch
- **Purpose:** Test changes before production

**Production Environment:**

- **Domain:** `huckschlag.dev` and `www.huckschlag.dev`
- **S3 Bucket:** `huckschlag-portfolio-production`
- **CloudFront Distribution:** Separate distribution for production
- **Trigger:** Auto-deploy when code merged to `production` branch
- **Purpose:** Live public site

### DNS Configuration (Cloudflare)

```
Type    Name    Value                               Purpose
A       @       <Production CloudFront>             Main domain
CNAME   www     <Production CloudFront>             www subdomain
CNAME   stage   <Stage CloudFront>                  Stage environment
```

### Branch Strategy

```
main (development)
  ├── stage (staging branch)
  │    └── triggers stage deployment → stage.huckschlag.dev
  └── production (production branch)
       └── triggers production deployment → huckschlag.dev
```

**Workflow:**

1. Develop features on `main` or feature branches
2. Merge to `stage` → auto-deploys to `stage.huckschlag.dev`
3. Test on stage environment
4. If everything works, merge `stage` to `production` → auto-deploys to `huckschlag.dev`

**Best Practice Commands:**

```bash
# After developing a feature on main
git checkout stage
git merge main
git push origin stage
# → Triggers stage deployment automatically

# After testing stage, promote to production
git checkout production
git merge stage
git push origin production
# → Triggers production deployment automatically
```

---

## GitHub Pages Migration

### Current Setup

- `hucki.github.io` currently serves your portfolio
- `huckschlag.dev` redirects to `hucki.github.io` via all-inkl.com

### Recommended Approach

**Option 1: Keep GitHub Pages as Fallback (Recommended)**

- Leave `hucki.github.io` active but outdated
- Add a banner: "This site has moved to huckschlag.dev"
- Provides backup if AWS has issues
- No rush to clean up

**Option 2: Redirect GitHub Pages**

- Add a simple redirect page on `hucki.github.io`:
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="refresh" content="0; url=https://huckschlag.dev" />
      <title>Redirecting...</title>
    </head>
    <body>
      <p>
        Redirecting to <a href="https://huckschlag.dev">huckschlag.dev</a>...
      </p>
    </body>
  </html>
  ```
- Clean, permanent redirect
- Shows visitors your new domain

**Option 3: Archive It**

- Stop updating `hucki.github.io`
- Keep repository for history
- No redirect needed

**Recommendation:** Go with Option 2 (redirect). It's professional and ensures anyone with old links finds your new site.

### All-inkl.com Redirect

- **You're correct:** Once CloudFront is serving `huckschlag.dev`, the all-inkl.com redirect becomes obsolete
- **No action needed:** Simply stop using it; won't interfere with anything
- **Bonus:** You can remove that service from all-inkl.com if it costs money

---

## Questions to Resolve

- [ ] Cloudflare proxy mode or DNS-only mode?
- [ ] Use AWS CDK/Serverless Framework or manual setup?
- [x] ~~Create separate staging environment?~~ **YES - stage.huckschlag.dev**
- [x] ~~GitHub Pages strategy?~~ **Redirect to huckschlag.dev**

---

## Resources

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)
- [React Router v7 Deployment](https://reactrouter.com/start/framework/deployment)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)

---

_Last Updated: October 2025_
_Current Phase: Phase 1 - GitHub Pages Deployment_
_Author: AI Assistant (Claude) - Review and adjust as needed_
