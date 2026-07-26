# Vercel Region Configuration

## Recommended Region

For optimal latency targeting the primary user base in India, configure the Vercel project region to:

- **Primary:** `bom1` (Mumbai, India)
- **Fallback:** Nearest APAC region if `bom1` is unavailable

## How to Configure

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Under **Deployment Settings** → **Region**, select the recommended region
4. Save changes

## Verification

After deployment, verify the region by checking response headers or using Vercel Analytics to confirm traffic is being served from the selected region.
