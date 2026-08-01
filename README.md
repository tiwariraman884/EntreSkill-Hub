<div align="center">
  <h1>🚀 EntreSkill Hub</h1>
  <p><strong>Turn Skills into Thriving Micro-Businesses</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?logo=lighthouse)](#-performance--accessibility)
</div>

---

## 📖 Overview
**EntreSkill Hub** is a modern, highly optimized Next.js 16 web application designed for micro-entrepreneurs. It provides structured roadmaps, learning resources, and mentor connections to help individuals turn their raw skills into profitable businesses. 

Built with the cutting-edge **App Router**, **React 19**, and **Tailwind CSS v4**, the platform prioritizes enterprise-grade performance, robust accessibility, and seamless agentic browsing.

---

## ⚡ Performance & Accessibility (100/100 Lighthouse)
We take performance seriously. The application has been rigorously audited and optimized to achieve perfect **100/100 scores** across all Lighthouse metrics on Production:

- **Performance (100/100)**: Zero unused JavaScript. CSS-only layout animations (no heavy JS animation libraries blocking the main thread). Next.js Image optimization (`next/image`) for lightning-fast LCP (Largest Contentful Paint).
- **Accessibility (100/100)**: Strict WCAG AA compliance. Flawless contrast ratios (`text-thread` tailored for perfect visibility), comprehensive ARIA landmarks, and robust keyboard navigation.
- **Agentic Browsing (100/100)**: AI-ready structure. The accessibility tree is perfectly well-formed, redundant alt-text is stripped, and `public/llms.txt` is maintained to standard specifications to ensure flawless parsing by LLM web agents.
- **SEO & Best Practices (100/100)**: Semantic HTML5, dynamically generated sitemaps, and optimized metadata.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: Custom accessible components (inspired by Shadcn UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: MongoDB (Local/Atlas)
- **Backend**: Node.js & Next.js API Routes

---

## 🚀 Getting Started

Follow these steps to set up the development environment.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tiwariraman884/EntreSkill-Hub.git
   cd EntreSkill-Hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   ```
   *Open `.env.local` and fill in your MongoDB URI and NextAuth secrets.*

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production** (To see true performance):
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Testing & Code Quality
- `npm run lint`: Analyzes code using ESLint according to our strict configuration.
- `npm run typecheck`: Ensures TypeScript safety across the entire 91-page codebase.
- The project is fully strictly-typed with `tsc` passing 100% successfully on build.

---

## 🤝 Contributing
We welcome contributions! 
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'feat: Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Please ensure all new components are Server Components by default, and `use client` is only used when React interactivity/hooks are absolutely necessary.

---

## ⚖️ License
This repository is strictly **Proprietary**. Unauthorized copying, modification, distribution, or use is strictly prohibited without explicit permission.

---

<div align="center">
  <p>Built with ❤️ for the next generation of micro-entrepreneurs.</p>
</div>
