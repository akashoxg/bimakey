# 🛡️ BimaKey — India's Only 100% Unbiased Insurance Advisory Platform

![BimaKey Banner](https://img.shields.io/badge/BimaKey-Unbiased%20Insurance%20Platform-1B6B5A?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20CSS%20%7C%20Node.js-E07A2F?style=for-the-badge)

**BimaKey** is a modern, transparent, and completely unbiased insurance comparison and advisory web platform. We help families across India compare 150+ Health, Term Life, and Motor insurance plans using a published rating methodology—with zero agent commissions, zero spam calls, and lifelong claims support.

Operating 100% online from **New Delhi, India**, BimaKey brings clarity and honesty to buying insurance.

---

## ✨ Key Features

- 🔍 **Proprietary Rating Methodology**: Every insurance plan is ranked based on a transparent mathematical formula combining **Feature Score (40%)**, **Insurer Reliability Score (40%)**, and **Value for Money / Premium Rating (20%)**.
- 🚫 **Zero Commissions & Zero Spam**: Unlike traditional portals or agents, we do not push high-commission policies or share phone numbers with third-party telemarketers.
- 🏥 **Comprehensive Categories**: Deep dives, FAQs, and comparison tables for **Health Insurance**, **Term Life Insurance**, and **Motor (Car & Bike) Insurance**.
- ⚡ **Interactive Consultation Funnel**: Integrated instant consultation booking modals and direct WhatsApp conversation links for seamless expert advisory.
- 🎨 **Modern & Responsive Aesthetic**: Built mobile-first with vibrant visual hierarchy, deep navy headers, sage green accents (`#1B6B5A`), warm amber highlights (`#E07A2F`), and smooth micro-animations powered by Framer Motion.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design System & Tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: Express.js
- **Email & Leads Service**: Nodemailer integration (`emailService.js`) for instant consultation lead notifications.

---

## 📁 Project Structure

```text
bimakey/
├── frontend/               # React + Vite Frontend Application
│   ├── public/             # Static assets (logo.png, favicon.svg)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Modals, Cards)
│   │   ├── data/           # Comprehensive insurance plan datasets & rankings
│   │   ├── hooks/          # Custom hooks (useScrollReveal)
│   │   ├── pages/          # Home, Health, Term, Motor, About, and Contact pages
│   │   └── utils/          # Global constants, brand config, formatting tools
│   └── tailwind.config.js  # Design tokens, custom palettes & typography
│
├── backend/                # Express API & Lead Notification Server
│   ├── src/
│   │   ├── controllers/    # Lead processing logic
│   │   ├── models/         # Data schemas
│   │   ├── routes/         # API endpoints
│   │   └── utils/          # SMTP email service
│   └── server.js           # Server entry point
│
└── insurance-platform-blueprint.md  # Architectural specification & product documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/akashoxg/bimakey.git
cd bimakey
```

### 2. Run the Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application live.

### 3. Run the Backend Server (Optional for Lead Emails)
```bash
cd ../backend
npm install
node server.js
```

---

## 📍 Operating Base & Contact

- **Operating Base**: New Delhi, India (100% Online Nationwide Advisory)
- **Email**: `hello@bimakey.in`
- **Website**: [BimaKey Platform](https://github.com/akashoxg/bimakey)

---

## 📄 License

This project is licensed under the MIT License.
