# 🚀 Deployment Guide - ReHumanizr

## Vercel Deployment (Recommended)

### 1. Connect to GitHub

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `ericytex/rehumanizr`
4. Select the repository and click "Import"

### 2. Configure Project

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3. Environment Variables

Add these environment variables in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get your Gemini API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it into Vercel

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Alternative Deployments

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Your Google Gemini API key |
| `NEXT_PUBLIC_APP_NAME` | ❌ | App name (default: ReHumanizr) |
| `NEXT_PUBLIC_APP_URL` | ❌ | App URL for metadata |

## Post-Deployment

### 1. Test Your App

- Visit your deployed URL
- Test the humanization pipeline
- Verify API endpoints work

### 2. Monitor Performance

- Check Vercel Analytics
- Monitor API response times
- Watch for rate limiting

### 3. Custom Domain (Optional)

1. Go to your Vercel project settings
2. Add custom domain
3. Configure DNS records

## Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### API Errors

- Check environment variables are set
- Verify Gemini API key is valid
- Check API quotas and billing

### Performance Issues

- Enable Vercel Edge Functions
- Use CDN for static assets
- Implement caching strategies

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: [github.com/ericytex/rehumanizr/issues](https://github.com/ericytex/rehumanizr/issues)

---

**🎯 Your AI detection evasion pipeline is now live and ready to beat the detectors!** 