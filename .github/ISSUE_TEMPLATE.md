# Bimakey Deployment Guide

## Prerequisites

1. **Vercel Account** (for frontend hosting)
2. **Render Account** (for backend hosting)
3. **MongoDB Atlas** (free tier for database)

---

## Repository Secrets Configuration

Add these secrets in GitHub repository Settings > Secrets:

### Frontend (Vercel)

| Secret Name | Description | Where to Get |
|-------------|-------------|--------------|
| `VERCEL_TOKEN` | Vercel API token | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel Organization ID | vercel.com/account/teams |
| `VERCEL_PROJECT_ID` | Vercel Project ID | Project settings in Vercel |
| `VITE_API_BASE_URL` | Backend production URL | Your Render backend URL |

### Backend (Render)

| Secret Name | Description | Where to Get |
|-------------|-------------|--------------|
| `RENDER_API_KEY` | Render API key | render.com/account/api-keys |
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas |

---

## Manual Deployment

### Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

Set environment variable:
```bash
vercel env add VITE_API_BASE_URL
# Enter: https://your-backend.onrender.com/api
```

### Backend to Render

1. Go to render.com
2. Create New > Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGO_URI` (from MongoDB Atlas)
   - `PORT` = 5000
   - `NODE_ENV` = production
   - `CLIENT_URL` = your Vercel frontend URL
   - `SMTP_*` = Email credentials
   - `WHATSAPP_*` = WhatsApp settings
   - `JWT_SECRET` = Generate secure random string

---

## GitHub Actions Deployment

The workflow files are already configured:

- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/lint.yml` - Code quality checks

### Enable GitHub Actions

1. Push to `develop` branch → Deploys to Staging
2. Push to `main` branch → Deploys to Production

---

## Environment Variables

### Frontend (.env.production)

```env
VITE_API_BASE_URL=https://api.bimakey.in
```

### Backend (production)

```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://bimakey.in
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/insure-right
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=hello@bimakey.in
WHATSAPP_ENABLED=true
WHATSAPP_ADMIN_NUMBER=919876543210
JWT_SECRET=your-secure-random-string
```

---

## Post-Deployment Checklist

- [ ] Verify frontend loads at domain
- [ ] Test API health endpoint: `https://api.bimakey.in/api/health`
- [ ] Test lead submission form
- [ ] Check WhatsApp notification
- [ ] Verify email notifications
- [ ] Update DNS if using custom domain
