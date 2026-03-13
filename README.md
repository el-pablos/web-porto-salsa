<div align="center">

# Portfolio Adinda Salsa — Data Analyst

[![Deploy Status](https://img.shields.io/github/deployments/el-pablos/web-porto-salsa/production?label=vercel&logo=vercel)](https://salsa.tams.codes)
[![Tests](https://img.shields.io/github/actions/workflow/status/el-pablos/web-porto-salsa/main.yml?label=tests&logo=github)](https://github.com/el-pablos/web-porto-salsa/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Tests-35%2F35_Passed-00D4AA)](https://github.com/el-pablos/web-porto-salsa/actions)

**Portfolio digital Adinda Salsa Aryadi Putri — Data Analyst & Researcher.**
**Full responsive, mobile-first, smooth animations.**

[Live Demo](https://salsa.tams.codes) · [Repository](https://github.com/el-pablos/web-porto-salsa)

</div>

---

## Deskripsi

Website portfolio pribadi untuk **Adinda Salsa Aryadi Putri** — mahasiswi Sosiologi FISIP UNAS yang fokus di bidang Data Analysis dan Riset Kuantitatif. Dibangun pake Next.js 14 dengan TypeScript, Tailwind CSS buat styling, dan Framer Motion buat animasi smooth.

Desain menggunakan **tema pink pastel** yang soft dan feminin dengan glass morphism effect — berdasarkan feedback langsung dari pemilik portfolio.

Live di **[salsa.tams.codes](https://salsa.tams.codes)**.

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 14 | Framework React dengan SSR dan App Router |
| TypeScript | 5.7 | Static typing buat keamanan kode |
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| Framer Motion | 11 | Animasi komponen yang smooth |
| React Icons | 5 | Kumpulan icon SVG |
| Jest + RTL | 29 | Unit testing dan component testing |
| GitHub Actions | - | CI/CD automation |
| Vercel | - | Hosting dan deployment |
| Redis Cloud | - | Visitor counter backend |

## Arsitektur

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout + PixelBackground (lazy loaded)
│   ├── page.tsx               # Halaman utama
│   ├── globals.css            # Global styles + glass morphism
│   ├── not-found.tsx          # Custom 404 (FuzzyText)
│   └── error.tsx              # Custom 500 (FuzzyText)
├── components/
│   ├── Navbar.tsx             # Navigasi responsive + glass effect
│   ├── Hero.tsx               # Hero + LaserFlow (lazy loaded) + ShuffleText
│   ├── About.tsx              # Tentang saya
│   ├── Skills.tsx             # Skill tags/chips (dari portfolio.json)
│   ├── Projects.tsx           # Project cards (dari portfolio.json)
│   ├── Experience.tsx         # Timeline pengalaman & pendidikan
│   ├── Contact.tsx            # Form kontak + info
│   ├── VisitorCounter.tsx     # Stats counter animasi
│   ├── Footer.tsx             # Footer
│   └── effects/               # Efek visual
│       ├── ShuffleText.tsx    # Animasi shuffle teks
│       ├── FuzzyText.tsx      # Animasi glitch teks
│       ├── CountUp.tsx        # Counter animasi
│       ├── LaserFlow.tsx      # Background laser (optimized 30fps)
│       └── PixelBackground.tsx # Global pixel background (optimized 30fps)
├── data/
│   └── portfolio.json         # Single source of truth untuk semua konten
└── __tests__/                 # 35 unit tests, 10 suites
```

## Flowchart

```mermaid
graph TD
    A[Visitor buka website] --> B[Next.js App Router]
    B --> C[layout.tsx]
    C --> D[PixelBackground - lazy loaded]
    C --> E[page.tsx - Semua Section]
    E --> F[Navbar]
    E --> G[Hero + LaserFlow]
    E --> H[About]
    E --> I[Skills]
    E --> J[Projects]
    E --> K[Experience]
    E --> L[Contact]
    E --> M[VisitorCounter]
    E --> N[Footer]
    I --> O[(portfolio.json)]
    J --> O
    K --> O
    L --> O
```

## Cara Development

```bash
# clone repo
git clone https://github.com/el-pablos/web-porto-salsa.git
cd web-porto-salsa

# install dependencies
npm install

# setup environment (copy dan isi credentials)
cp .env.example .env

# jalankan development server
npm run dev

# jalankan tests
npm test

# build production
npm run build
```

## Testing

- **10 test suites**, **35 tests** — semua **100% passed**
- Framework: Jest + React Testing Library
- Coverage: semua komponen utama dan efek visual

## Optimasi Performa

- Canvas animations di-throttle ke 30fps
- Visibility API pause saat tab tidak aktif
- Resize handler di-debounce
- Google Fonts via `next/font` (no render blocking)
- Dynamic import dengan `ssr: false` untuk canvas components
- Console.log dihapus otomatis di production build
- First Load JS: ~135kB

## Kontributor

<a href="https://github.com/el-pablos/web-porto-salsa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=el-pablos/web-porto-salsa" />
</a>

---

<div align="center">

**Dibuat oleh [el-pablos](https://github.com/el-pablos)**

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/el-pablos/web-porto-salsa)
![GitHub repo size](https://img.shields.io/github/repo-size/el-pablos/web-porto-salsa)
![GitHub top language](https://img.shields.io/github/languages/top/el-pablos/web-porto-salsa)
![GitHub last commit](https://img.shields.io/github/last-commit/el-pablos/web-porto-salsa)

</div>
