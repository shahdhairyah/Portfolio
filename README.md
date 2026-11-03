<div align="center">

# Shah Dhairya — Digital Architect & Portfolio

<p align="center">
  <strong>Production Portfolio Website & Engineering Archive</strong><br />
  Crafted with precision at the intersection of performance, design, and resilient architecture.
</p>

<p align="center">
  <a href="https://shahdhairyah.in" target="_blank">
    <img src="https://img.shields.io/badge/Live_Site-shahdhairyah.in-ea580c?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://github.com/shahdhairyah" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-shahdhairyah-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/shahdhairyah/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Dhairya_Shah-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Framer_Motion_12-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel_Analytics-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License" />
</p>

</div>

---

## 🧭 Overview

This repository powers **[shahdhairyah.in](https://shahdhairyah.in)** — the official portfolio and technical portfolio archive of **Shah Dhairya** (*Dhairya Shah*), Full-Stack Developer & Digital Architect.

Designed with an immersive, dark void aesthetic (`#020202` canvas, `#bf4417` burnt orange glow, Syne display typography, and JetBrains Mono monospace accents), the site showcases deep-dive software case studies, state and national hackathon triumphs, an interactive skills directory, and an AI-assisted inquiries widget.

---

## ✨ Key Features & Architecture

### ⚡ 1. Interactive Hero & Terminal Architecture
- **Interactive Terminal Card**: Real-time rotating terminal simulating full-stack system introspection (`whoami`, `echo $STACK`, `open new_ideas`).
- **Atmospheric Visuals**: Custom dynamic Aurora canvas shaders, interactive `ClickSpark` physics, and reactive `DotGrid` ambient meshes.
- **Micro-Interactions**: Magnet hover physics, star border glowing tracks, and encrypted text decrypters.

### 🏆 2. Redesigned Hall of Fame & Achievements
- **Competitive Track Record**: Interactive Bento spotlight tiles detailing **25+** hackathon sprints, **2** state champion titles, **17+** finalist rounds, and **10,400+** competitors faced.
- **Crowning Milestone Spotlight**: High-impact feature card for top honors, notably the **SSIP State Hackathon 2023** (4th place out of 2,062 teams and 10,449 participants across Gujarat) with high-res event photography.
- **Dual View Modes**:
  - **Showcase Grid**: Rich bento cards with real event photo previews, medal ranks, 3-stat breakdown pills, key takeaways, and role tags.
  - **Chronological Timeline**: Vertical visual journey from 2023 to 2026 connected by a luminous gradient spine.
- **Inline Gallery Lightbox**: Instant modal carousel allowing visitors to browse on-ground event photos, presentations, and award certificates without leaving the page.
- **Category Filter & Real-Time Search**: Filter between *Winners & Awards*, *State & National*, and *36h Sprints*, or search live by keyword.

### 💼 3. Full-Stack Project Case Studies
- Comprehensive case study breakdowns for production applications:
  - **ADIT CMS Platform**: Role-based content management system for CVM University departments with React frontend and PHP/MySQL REST API.
  - **Smart IoT Monitoring**: Hardware-integrated telemetry platform.
  - **Real-Time Weather Engine**: High-performance meteorological data dashboard.
- Features problem statement vs. solution deep dives, architecture highlights, live demos, and GitHub source links.

### 🛠️ 4. The Craft — Filterable Skills Directory
- Comprehensive categorized matrix (Frontend, Backend, Database, Cloud & Tools).
- Tier-based classification (`Core`, `Proficient`, `Familiar`) with official Devicon vector integration and cross-links to projects utilizing each skill.

### 📜 5. Interactive Career Journey & PDF Resume
- Vertical progression timeline detailing milestones from 2021 coding roots to BBIT Computer Engineering Diploma (7.90 CGPA) and B.Tech at ADIT (CVM University).
- Built-in downloadable resume generator and clean interactive viewer.

### 🤖 6. AI Chatbot Widget & Contact System
- Floating contextual assistant loaded with portfolio context to answer visitor questions regarding technical background, skills, and project experience.
- Accessible contact form supporting Web3Forms delivery with graceful fallback to native mail client.

### 🌐 7. SEO, Analytics & Schema.org Structured Data
- Automated pre-build dynamic XML sitemap generation (`scripts/generate-sitemap.mjs`).
- Complete OpenGraph metadata, Twitter Cards, and Schema.org JSON-LD structured data (`Person`, `BreadcrumbList`).
- Integration with `@vercel/analytics` for privacy-first telemetry.

---

## 🛠️ Tech Stack & Tooling

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) (Concurrent Mode), [Vite 5](https://vitejs.dev/) |
| **Routing & Code-Splitting** | [React Router v7](https://reactrouter.com/) (Lazy dynamic page loading via `Suspense`) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) (Oxide engine, CSS custom properties, fluid `@theme`) |
| **Motion & Physics** | [Framer Motion 12](https://www.framer.com/motion/) (Spring physics, layout transitions, in-view triggers) |
| **Icons & UI Primitives** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Radix UI](https://www.radix-ui.com/) (Accessible Toasts) |
| **Typography** | Syne (Display Headlines), Inter (Body Text), JetBrains Mono (Terminal & Badges) |
| **SEO & Head Management** | [React Helmet Async](https://github.com/staylor/react-helmet-async), Schema.org JSON-LD, XML Sitemap Generator |
| **Analytics & Hosting** | [Vercel](https://vercel.com/), `@vercel/analytics` |

---

## 📂 Project Structure

```bash
shahdhairyah.in/
├── public/                       # Static public assets
│   ├── images/
│   │   ├── achievement/          # Hackathon photography & cover assets (SSIP, Creato, CVMU, GGA)
│   │   ├── projects/             # Project cover photos and screenshots
│   │   └── testimonials/         # Endorsement avatars
│   ├── Dhairya-Shah-Resume.pdf   # Downloadable PDF resume
│   ├── robots.txt                # Search engine crawler directives
│   └── sitemap.xml               # Auto-generated XML sitemap
├── scripts/
│   └── generate-sitemap.mjs      # Pre-build dynamic sitemap generator
├── src/
│   ├── assets/                   # Static icons and profile media
│   ├── components/               # Modular UI architecture
│   │   ├── home/                 # Hero terminal, featured cards, and effects
│   │   ├── reactbits/            # Creative canvas shaders (Aurora, ClickSpark, DotGrid, SpotlightCard)
│   │   ├── shared/               # Reusable CTA banners, tickers, page headers
│   │   ├── ui/                   # Radix UI primitives (Toast, Toaster)
│   │   ├── ChatbotWidget.jsx     # Embedded AI portfolio assistant
│   │   ├── Navbar.jsx            # Responsive navigation with glassmorphism
│   │   ├── PageHeader.jsx        # Aurora-backed page title headers
│   │   ├── SEO.jsx               # Dynamic meta tag & JSON-LD injector
│   │   └── Footer.jsx            # Site footer and credentials
│   ├── data/                     # Single-source-of-truth configuration files
│   │   ├── achievements.js       # Hackathons, award categories, stats, and gallery records
│   │   ├── chatContext.js        # Knowledge base powering the AI chatbot
│   │   ├── profile.js            # Identity, social handles, timeline, and philosophy
│   │   ├── projects.js           # Full-stack case studies and architectural specifications
│   │   └── skills.js             # Categorized technical competencies and mappings
│   ├── pages/                    # Lazy-loaded route views
│   │   ├── Home.jsx              # Landing page & executive summary
│   │   ├── About.jsx             # Deep biography, journey, and credentials
│   │   ├── Achievements.jsx      # Redesigned Hall of Fame & competitive records
│   │   ├── AchievementDetails.jsx# Individual hackathon case studies & galleries
│   │   ├── Projects.jsx          # Filterable project catalog
│   │   ├── ProjectCaseStudy.jsx  # Technical case study breakdown
│   │   ├── Skills.jsx            # Interactive stack & craftsmanship directory
│   │   ├── Resume.jsx            # Interactive CV & resume viewer
│   │   ├── Contact.jsx           # Direct communication channel
│   │   └── NotFound.jsx          # Custom 404 handler
│   ├── lib/
│   │   └── utils.js              # Class merging utilities (`clsx` + `twMerge`)
│   ├── App.jsx                   # Route provider, lazy loaders, and page transitions
│   ├── main.jsx                  # React 18 DOM mount point
│   └── index.css                 # Tailwind CSS v4 directives, font imports & custom animations
├── .env.example                  # Environment variable reference
├── eslint.config.js / .eslintrc  # ESLint strict ruleset
├── package.json                  # Dependencies and execution scripts
├── vercel.json                   # Vercel deployment routes and security headers
└── vite.config.js                # Vite build and path aliases configuration (`@/*`)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- **Node.js**: `v18.0.0` or higher
- **npm** or **pnpm** / **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/shahdhairyah/react-tailwind-portfolio.git
cd react-tailwind-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Populate the required keys (optional, for contact form email delivery):

```env
# Free access key from https://web3forms.com
VITE_WEB3FORMS_KEY=your_web3forms_key_here
```

*(If unset, the contact form automatically falls back to invoking the user's native email client).*

### 4. Run the Development Server

```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔨 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Boots up the local Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Triggers `prebuild` (sitemap generator), then compiles an optimized production bundle in `dist/`. |
| `npm run preview` | Locally serves the production `dist/` build to test production performance. |
| `npm run lint` | Runs ESLint across all `.js` and `.jsx` files enforcing zero warnings. |
| `npm run sitemap` | Manually regenerates `public/sitemap.xml` with current route declarations. |

---

## ⚡ Performance & Quality Standards

- **Route-Based Code Splitting**: Every major route is code-split through `React.lazy` and `Suspense`, ensuring minimal initial JavaScript payload (~140 kB gzipped main chunk).
- **Asset Optimization**: High-resolution gallery and cover photography converted to modern `.webp` formats for instantaneous loading.
- **Zero-Warning Linting**: Strict adherence to React Hooks rules and PropTypes type contracts.
- **Fluid Responsiveness**: Engineered from the ground up for mobile, tablet, laptop, and ultra-wide desktop viewports.

---

## 👨‍💻 Author & Connect

**Shah Dhairya (Dhairya Shah)**  
*Full-Stack Developer & Digital Architect*  
Gujarat, India

- 🌐 **Website**: [shahdhairyah.in](https://shahdhairyah.in)
- 🐙 **GitHub**: [@shahdhairyah](https://github.com/shahdhairyah)
- 💼 **LinkedIn**: [in/shahdhairyah](https://www.linkedin.com/in/shahdhairyah/)
- 📷 **Instagram**: [@shahdhairyah](https://www.instagram.com/shahdhairyah)
- 💡 **LeetCode**: [leetcode.com/shahdhairyah](https://leetcode.com/shahdhairyah)
- ✉️ **Email**: [sdhairyah@gmail.com](mailto:sdhairyah@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to explore the code for learning and design inspiration.
