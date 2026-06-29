# 🛡️ BimaKey — India's Only 100% Unbiased Insurance Advisory Platform

![BimaKey Banner](https://img.shields.io/badge/BimaKey-Unbiased%20Insurance%20Platform-1B6B5A?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20CSS%20%7C%20Node.js-E07A2F?style=for-the-badge)
[![CI/CD](https://github.com/akashoxg/bimakey/actions/workflows/ci.yml/badge.svg)](https://github.com/akashoxg/bimakey/actions)
[![Tests](https://img.shields.io/badge/Tests-Vitest-129%3F?style=for-the-badge)](https://vitest.dev/)
![CI Status](https://img.shields.io/badge/CI-Active-brightgreen?style=for-the-badge)

**BimaKey** is a modern, transparent, and completely unbiased insurance comparison and advisory web platform. We help families across India compare 150+ Health, Term Life, and Motor insurance plans using a published rating methodology—with zero agent commissions, zero spam calls, and lifelong claims support.

Operating 100% online from **New Delhi, India**, BimaKey brings clarity and honesty to buying insurance.

---

## ✨ Key Features

- 🔍 **Proprietary Rating Methodology**: Every insurance plan is ranked based on a transparent mathematical formula combining **Feature Score (45%)**, **Insurer Reliability Score (45%)**, and **Premium Rating (10%)**.
- 🚫 **Zero Commissions & Zero Spam**: Unlike traditional portals or agents, we do not push high-commission policies or share phone numbers with third-party telemarketers.
- 🏥 **Comprehensive Categories**: Deep dives, FAQs, and comparison tables for **Health Insurance**, **Term Life Insurance**, and **Motor (Car & Bike) Insurance**.
- ⚡ **Interactive Consultation Funnel**: Integrated instant consultation booking modals and direct WhatsApp conversation links for seamless expert advisory.
- 🎨 **Modern & Responsive Aesthetic**: Built mobile-first with vibrant visual hierarchy, deep navy headers, sage green accents (`#1B6B5A`), warm amber highlights (`#E07A2F`), and smooth micro-animations powered by Framer Motion.
- 🔒 **Production-Ready Security**: Helmet.js, rate limiting, input validation, CORS protection, and JWT authentication for admin routes.

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI Framework |
| [Vite](https://vitejs.dev/) | Build Tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form Handling |
| [Vitest](https://vitest.dev/) | Testing |

### **Backend**
| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express 5](https://expressjs.com/) | API Framework |
| [MongoDB](https://mongodb.com/) | Database |
| [Nodemailer](https://nodemailer.com/) | Email Service |
| [Helmet](https://helmetjs.github.io/) | Security Headers |
| [JWT](https://jwt.io/) | Authentication |

---

## 📁 Project Structure

```
bimakey/
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   └── ISSUE_TEMPLATE.md   # Deployment guide
│
├── frontend/               # React + Vite Frontend
│   ├── public/
│   │   ├── robots.txt      # SEO
│   │   └── sitemap.xml     # Sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── consultation/  # Booking modal, WhatsApp
│   │   │   ├── home/           # Hero, Trust bar, etc.
│   │   │   ├── insurance/      # Plan tables, badges
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── shared/         # SEO, TOC, Skeleton
│   │   │   └── ui/             # Base UI components
│   │   ├── data/            # Insurance plan data
│   │   ├── pages/           # Route pages
│   │   ├── hooks/           # Custom hooks
│   │   ├── test/            # Test files
│   │   └── utils/           # Constants, API client
│   ├── vitest.config.js     # Test configuration
│   └── .env.example         # Environment template
│
├── backend/                # Express API
│   ├── src/
│   │   ├── config/          # DB, env config
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/     # Auth, validation, error
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   └── utils/          # Email, WhatsApp
│   ├── server.js           # Entry point
│   ├── .env.example        # Environment template
│   └── package.json
│
└── insurance-platform-blueprint.md  # Full specification
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm**
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/akashoxg/bimakey.git
cd bimakey
```

### 2. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and email credentials
npm run dev
```
API runs on [http://localhost:5000](http://localhost:5000)

---

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd frontend
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# UI mode
npm run test:ui
```

### Test Structure
```
frontend/src/test/
├── constants.test.js   # Constants & utilities
├── components.test.js  # Component rendering
├── utils.test.js       # Helper functions
└── data.test.js        # Plan data validation
```

---

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

| Trigger | Action |
|---------|--------|
| Push to `develop` | Deploy to Staging |
| Push to `main` | Deploy to Production |
| Pull Request | Run tests & linting |

### Required Secrets
Add in GitHub Settings > Secrets:

**Frontend (Vercel):**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_API_BASE_URL`

**Backend (Render):**
- `RENDER_API_KEY`
- `MONGODB_URI`

---

## 📦 API Endpoints

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit consultation request |
| GET | `/api/health` | Health check |

### Protected Routes (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads/admin/leads` | Get all leads |
| PATCH | `/api/leads/admin/leads/:id/status` | Update lead status |

---

## 🔐 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - 5 requests/IP/hour
- **Input Validation** - Server-side validation
- **CORS** - Restricted to frontend domain
- **MongoDB Injection Prevention**
- **JWT Authentication** - Admin routes

---

## 📍 Operating Base & Contact

- **Operating Base**: New Delhi, India (100% Online Nationwide Advisory)
- **Email**: `hello@bimakey.in`
- **WhatsApp**: +91 97174 27154

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ in India for honest insurance advisory
</p>
