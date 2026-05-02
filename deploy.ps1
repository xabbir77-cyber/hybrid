# Hybrid View Deployment Script for Cloudflare Pages

# 1. Build the project
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

# 2. Deploy to Cloudflare Pages
# Note: This will require you to be logged in to wrangler (npx wrangler login)
Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Cyan
npx wrangler pages deploy dist --project-name=hybrid-view

# 3. Set the API Key environment variable
Write-Host "Setting environment variables..." -ForegroundColor Cyan
npx wrangler pages secret put VITE_YOUTUBE_API_KEY --project-name=hybrid-view
# When prompted, paste the key: AIzaSyCDdVJj0myKu4mig27U134eNhdoZVmG6TA

Write-Host "Deployment process initiated!" -ForegroundColor Green
