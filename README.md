<div align="center">

# ✨ Portfolio — Adinda Salsa Aryadi Putri

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer)
![Redis](https://img.shields.io/badge/Redis-Cloud-DC382D?style=for-the-badge&logo=redis)
![Tests](https://img.shields.io/badge/Tests-34%2F34_Passed-00D4AA?style=for-the-badge)

**Website portofolio personal yang dibangun dengan teknologi modern.**
**Full responsive, mobile-first, smooth animations.**

[🌐 Live Demo](https://salsa.tams.codes) · [📂 Repository](https://github.com/el-pablos/web-porto-salsa)

</div>

---

## 📖 Deskripsi Projek

Website portfolio pribadi untuk **Adinda Salsa Aryadi Putri** — seorang Data Analyst & QA Enthusiast. Website ini dibangun menggunakan Next.js 14 dengan TypeScript, Tailwind CSS untuk styling, dan Framer Motion untuk animasi yang smooth di setiap sudut.

Desain dibuat dengan pendekatan **mobile-first** dan setiap elemen memiliki sudut yang smooth (border-radius), transisi yang halus, serta efek visual interaktif.

## 🏗️ Arsitektur Projek

```
web-porto-salsa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout + global effects
│   │   ├── page.tsx            # Halaman utama
│   │   ├── not-found.tsx       # Custom 404 page (FuzzyText)
│   │   ├── error.tsx           # Custom error page (FuzzyText)
│   │   └── globals.css         # Global styles + glass morphism
│   ├── components/
│   │   ├── Navbar.tsx          # Navigasi responsive + glass effect
│   │   ├── Hero.tsx            # Hero section + LaserFlow background
│   │   ├── About.tsx           # Tentang saya
│   │   ├── Skills.tsx          # Skill bars animated
│   │   ├── Projects.tsx        # Project cards
│   │   ├── Experience.tsx      # Timeline pengalaman & pendidikan
│   │   ├── Contact.tsx         # Form kontak + info
│   │   ├── VisitorCounter.tsx  # Statistik count-up
│   │   ├── Footer.tsx          # Footer
│   │   └── effects/            # Efek visual (ReactBits-inspired)
│   │       ├── ShuffleText.tsx # Animasi shuffle teks (welcoming)
│   │       ├── FuzzyText.tsx   # Animasi glitch teks (error pages)
│   │       ├── CountUp.tsx     # Counter animasi (visitor stats)
│   │       ├── LaserFlow.tsx   # Background laser (hero section)
│   │       ├── ClickSpark.tsx  # Spark effect di setiap klik
│   │       └── PixelBackground.tsx # Global pixel background
│   └── data/
│       └── portfolio.json      # Data konten portfolio
├── backend/
│   ├── src/RedisService.php    # Redis service (Predis) visitor log
│   ├── public/api.php          # API endpoint
│   └── composer.json           # PHP dependencies
├── __mocks__/                  # Jest mocks (framer-motion, dll)
├── .github/workflows/
│   └── main.yml                # CI/CD pipeline (test + auto release)
├── jest.config.js              # Konfigurasi Jest
├── tailwind.config.js          # Konfigurasi Tailwind
├── next.config.js              # Konfigurasi Next.js
├── vercel.json                 # Konfigurasi deployment Vercel
└── .env.example                # Template environment variables
```

## 🔄 Flowchart Arsitektur

```mermaid
graph TD
    A[User Visit] --> B[Next.js Frontend]
    B --> C{Route}
    C -->|/| D[Home Page]
    C -->|404| E[Not Found - FuzzyText]
    C -->|500| F[Error Page - FuzzyText]

    D --> G[Navbar - Glass Effect]
    D --> H[Hero - LaserFlow + ShuffleText]
    D --> I[About Section]
    D --> J[Skills - Animated Bars]
    D --> K[Projects - Glass Cards]
    D --> L[Experience - Timeline]
    D --> M[Contact - Form + Links]
    D --> N[Visitor Counter - CountUp]
    D --> O[Footer]

    B --> P[Global Effects]
    P --> Q[PixelBackground - Canvas]
    P --> R[ClickSpark - Canvas]

    S[Backend PHP] --> T[Redis Cloud]
    T --> U[Visitor Count]
    T --> V[Visit Log]
    T --> W[Cache]

    style A fill:#6C63FF,color:#fff
    style B fill:#0a0a1a,stroke:#6C63FF,color:#fff
    style T fill:#DC382D,color:#fff
```

## 🔄 CI/CD Flow

```mermaid
graph LR
    A[Push/PR] --> B[GitHub Actions]
    B --> C[Frontend Tests - Jest]
    B --> D[Backend Tests - PHPUnit]
    C --> E{All Passed?}
    D --> E
    E -->|Yes| F[Build Next.js]
    F --> G[Create GitHub Release]
    G --> H[Deploy ke Vercel]
    H --> I[salsa.tams.codes]
    E -->|No| J[Block & Notify]

    style A fill:#6C63FF,color:#fff
    style I fill:#00D4AA,color:#000
    style J fill:#FF6584,color:#fff
```

## 🎨 Fitur Visual

| Komponen | Efek | Inspirasi |
|----------|------|-----------|
| Hero Section | Laser flow background + shuffle text | ReactBits LaserFlow + Shuffle |
| Error Pages | Glitch/fuzzy text animation | ReactBits FuzzyText |
| Stats Section | Animated count up | ReactBits CountUp |
| Global | Pixel blast background | ReactBits PixelBlast |
| Global | Click spark particles | ReactBits ClickSpark |
| All Cards | Glass morphism + hover lift | Custom |

## 🧪 Testing

- **Frontend:** Jest + React Testing Library
- **10 test suites**, **34 tests** — semua **100% passed**
- **Backend:** PHPUnit (untuk Redis service)

## 🚀 Cara Menjalankan

```bash
# Clone repo
git clone https://github.com/el-pablos/web-porto-salsa.git
cd web-porto-salsa

# Install dependencies
npm install

# Setup environment (copy dan isi credentials)
cp .env.example .env

# Jalankan development server
npm run dev

# Jalankan tests
npm test

# Build production
npm run build
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Glass Morphism
- **Animation:** Framer Motion + Custom Canvas Effects
- **Backend:** PHP 8.3 + Predis (Redis Cloud)
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions + Auto Release
- **Hosting:** Vercel
- **DNS:** Cloudflare

## 👥 Kontributor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/adndaaryadi">
        <img src="https://github.com/adndaaryadi.png" width="80" style="border-radius:50%"><br>
        <b>Adinda Salsa Aryadi Putri</b>
      </a><br>
      <sub>Portfolio Owner</sub>
    </td>
    <td align="center">
      <a href="https://github.com/el-pablos">
        <img src="https://github.com/el-pablos.png" width="80" style="border-radius:50%"><br>
        <b>el-pablos</b>
      </a><br>
      <sub>Developer & Builder</sub>
    </td>
  </tr>
</table>

---

<div align="center">

**Dibuat dengan ❤️ oleh [el-pablos](https://github.com/el-pablos)**

![GitHub stars](https://img.shields.io/github/stars/el-pablos/web-porto-salsa?style=social)
![GitHub forks](https://img.shields.io/github/forks/el-pablos/web-porto-salsa?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/el-pablos/web-porto-salsa?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/el-pablos/web-porto-salsa?style=flat-square)

</div>
