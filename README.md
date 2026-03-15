<div align="center">

# 🌸 Portfolio — Adinda Salsa Aryadi Putri

**Data Analyst & Researcher**

*Mengubah data mentah menjadi insight bermakna*

[![Live Site](https://img.shields.io/badge/🔗_Live-salsa.tams.codes-FF99C8?style=for-the-badge)](https://salsa.tams.codes)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Deskripsi Projek

Website portfolio pribadi buat **Adinda Salsa Aryadi Putri** — mahasiswi Sosiologi FISIP UNAS yang fokus di bidang Data Analysis dan Riset Kuantitatif. Dibangun pake Next.js 14 dengan TypeScript, Tailwind CSS buat styling, dan Framer Motion buat animasi smooth.

Desainnya pake **tema pink pastel soft** yang feminin dengan glass morphism effect, blob morphing, sparkle cursor trail, dan berbagai micro-interactions lucu — berdasarkan feedback langsung dari pemilik portfolio.

Live di **[salsa.tams.codes](https://salsa.tams.codes)**.

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 14 | Framework React dengan SSR dan App Router |
| TypeScript | 5.7 | Static typing buat keamanan kode |
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| Framer Motion | 11 | Library animasi dan transisi |
| canvas-confetti | 1.9 | Efek confetti easter egg |
| Jest | 29 | Unit testing framework |
| GitHub Actions | — | CI/CD pipeline otomatis |

---

## Arsitektur Projek

```
web-porto-salsa/
├── .github/
│   └── workflows/
│       └── main.yml                # CI/CD: test → build → release otomatis
├── __mocks__/
│   └── framer-motion.js            # Mock framer-motion buat unit test
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + ScrollProgress + SparkleTrail
│   │   ├── page.tsx                # Halaman utama (compose semua section)
│   │   ├── globals.css             # Global styles + animasi keyframes
│   │   ├── not-found.tsx           # Custom 404 page (FuzzyText)
│   │   └── error.tsx               # Custom 500 page (FuzzyText)
│   ├── components/
│   │   ├── Navbar.tsx              # Navigasi responsive + glass effect
│   │   ├── Hero.tsx                # Hero + ShuffleText + LaserFlow + FloatingElements + Confetti
│   │   ├── About.tsx               # Tentang saya + highlight cards
│   │   ├── Skills.tsx              # Skill tags/chips per kategori
│   │   ├── Projects.tsx            # Project cards + ShimmerCard hover effect
│   │   ├── Experience.tsx          # Timeline pengalaman & pendidikan (alternating)
│   │   ├── Contact.tsx             # Form kontak + info sosial
│   │   ├── VisitorCounter.tsx      # Stats counter animasi (CountUp)
│   │   ├── Footer.tsx              # Footer + social links
│   │   └── effects/                # Efek visual & animasi interaktif
│   │       ├── ShuffleText.tsx     # Animasi shuffle/random teks
│   │       ├── FuzzyText.tsx       # Animasi glitch teks (error pages)
│   │       ├── CountUp.tsx         # Animasi count up angka
│   │       ├── LaserFlow.tsx       # Canvas laser beam background
│   │       ├── PixelBackground.tsx # Pixel background effect
│   │       ├── ScrollProgress.tsx  # Progress bar gradient di atas halaman
│   │       ├── SparkleTrail.tsx    # Sparkle cursor trail (desktop only)
│   │       ├── ShimmerCard.tsx     # Hover shimmer/gloss effect pada cards
│   │       ├── FloatingElements.tsx# Elemen dekoratif melayang
│   │       └── useConfettiEgg.ts   # Hook easter egg confetti (klik 5x)
│   ├── data/
│   │   └── portfolio.json          # Data konten portfolio (single source of truth)
│   └── __tests__/                  # Unit tests (44 tests, 15 suites)
│       ├── components/             # Test setiap komponen
│       └── effects/                # Test setiap efek visual
├── tailwind.config.js              # Konfigurasi tema pink pastel
├── jest.config.ts                  # Konfigurasi Jest
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies & scripts
```

---

## Flowchart Arsitektur

```
┌──────────────────────────────────────────────────────────────┐
│                        layout.tsx                            │
│  ┌─────────────────┐  ┌──────────────────┐                  │
│  │ ScrollProgress   │  │  SparkleTrail    │ ← global effects │
│  └─────────────────┘  └──────────────────┘                  │
│                                                              │
│  ┌────────────────── page.tsx ──────────────────┐           │
│  │                                              │           │
│  │  ┌──────────┐                                │           │
│  │  │  Navbar  │ ← glass morphism, responsive   │           │
│  │  └──────────┘                                │           │
│  │       ↓                                      │           │
│  │  ┌──────────────────────────────────┐        │           │
│  │  │           Hero Section           │        │           │
│  │  │  ┌────────────┐ ┌─────────────┐  │        │           │
│  │  │  │ LaserFlow  │ │FloatingElems│  │        │           │
│  │  │  │ (canvas)   │ │ (shapes)    │  │        │           │
│  │  │  └────────────┘ └─────────────┘  │        │           │
│  │  │  ┌────────────┐ ┌─────────────┐  │        │           │
│  │  │  │ShuffleText │ │ConfettiEgg  │  │        │           │
│  │  │  │ (typing)   │ │ (5x click)  │  │        │           │
│  │  │  └────────────┘ └─────────────┘  │        │           │
│  │  │  + Blob Morphing BG (CSS)        │        │           │
│  │  └──────────────────────────────────┘        │           │
│  │       ↓                                      │           │
│  │  ┌──────────┐                                │           │
│  │  │  About   │ ← highlight cards              │           │
│  │  └──────────┘                                │           │
│  │       ↓                                      │           │
│  │  ┌──────────┐                                │           │
│  │  │  Skills  │ ← tag chips per kategori       │           │
│  │  └──────────┘                                │           │
│  │       ↓                                      │           │
│  │  ┌──────────────────────────────────┐        │           │
│  │  │        Projects Section          │        │           │
│  │  │  ┌────────────┐                  │        │           │
│  │  │  │ShimmerCard │ ← hover glow     │        │           │
│  │  │  └────────────┘                  │        │           │
│  │  └──────────────────────────────────┘        │           │
│  │       ↓                                      │           │
│  │  ┌────────────┐                              │           │
│  │  │ Experience │ ← alternating timeline       │           │
│  │  └────────────┘                              │           │
│  │       ↓                                      │           │
│  │  ┌──────────┐                                │           │
│  │  │ Contact  │ ← form + social links          │           │
│  │  └──────────┘                                │           │
│  │       ↓                                      │           │
│  │  ┌────────────────┐                          │           │
│  │  │VisitorCounter  │ ← CountUp animasi        │           │
│  │  └────────────────┘                          │           │
│  │       ↓                                      │           │
│  │  ┌──────────┐                                │           │
│  │  │  Footer  │                                │           │
│  │  └──────────┘                                │           │
│  └──────────────────────────────────────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

---

## Fitur Animasi Interaktif

| Fitur | Deskripsi | Tipe |
|---|---|---|
| ShuffleText | Teks "Salsa" acak random lalu settle ke nama asli | Component |
| LaserFlow | Canvas laser beam pink melayang di background hero | Canvas |
| FloatingElements | Shapes dekoratif (✦ ◇ ○ ✿ ⬡) melayang perlahan | Framer Motion |
| SparkleTrail | Bintang pink ikutin cursor mouse (desktop only) | Canvas |
| ScrollProgress | Progress bar gradient di atas halaman saat scroll | Framer Motion |
| ShimmerCard | Efek glossy/holographic saat hover project cards | CSS + State |
| Blob Morphing | Background blob berubah bentuk terus-menerus | CSS Keyframes |
| Gradient Shift | Teks gradient bergerak shimmer pink→lavender→teal | CSS Keyframes |
| Confetti Burst | Easter egg — klik nama "Salsa" 5x = confetti meledak | canvas-confetti |
| CountUp | Angka statistik count dari 0 ke target saat masuk viewport | Component |

---

## Cara Jalanin Lokal

```bash
# clone repo
git clone https://github.com/el-pablos/web-porto-salsa.git
cd web-porto-salsa

# install dependencies
npm install

# jalanin development server
npm run dev

# buka di browser
# http://localhost:3000
```

## Testing

```bash
# jalanin semua test
npm test

# jalanin test dengan watch mode
npm run test:watch

# jalanin test dengan coverage report
npm run test:coverage
```

**Status test saat ini: 44 tests, 15 suites — 100% passed**

---

## CI/CD Pipeline

Setiap push ke branch `master`:

```
Push → Test & Lint → Build → Create Tag → Create Release (latest + versioned)
```

Pipeline otomatis:
1. Install dependencies
2. Jalanin linter
3. Jalanin semua unit test dengan coverage
4. Build production
5. Buat git tag (`v2.0.0-abc1234`)
6. Buat GitHub Release `latest` (selalu update ke commit terbaru)
7. Buat GitHub Release versioned (history semua release)

---

## Data Flow

```
portfolio.json (single source of truth)
       │
       ├──→ Hero.tsx        → nama, title, tagline
       ├──→ About.tsx       → deskripsi, highlights
       ├──→ Skills.tsx      → skill categories & tags
       ├──→ Projects.tsx    → project cards + tech tags
       ├──→ Experience.tsx  → timeline pengalaman & pendidikan
       ├──→ Contact.tsx     → social links & lokasi
       ├──→ VisitorCounter  → stats counter
       └──→ Footer.tsx      → nama, social links
```

---

## Kontributor

| | Nama | Peran |
|---|---|---|
| 🧑‍💻 | **[el-pablos](https://github.com/el-pablos)** | Developer & maintainer |
| 🤖 | **Claude Opus 4.6** | AI pair programmer |
| 🤖 | **Gemini CLI** | AI redesign assistant |
| 🎨 | **Adinda Salsa Aryadi Putri** | Pemilik portfolio & design feedback |

---

<div align="center">

**Dibuat oleh [el-pablos](https://github.com/el-pablos)**

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/el-pablos/web-porto-salsa?color=FF99C8)
![GitHub repo size](https://img.shields.io/github/repo-size/el-pablos/web-porto-salsa?color=CFBAF0)
![GitHub top language](https://img.shields.io/github/languages/top/el-pablos/web-porto-salsa?color=9ED2D6)
![GitHub last commit](https://img.shields.io/github/last-commit/el-pablos/web-porto-salsa?color=FF99C8)
![GitHub release](https://img.shields.io/github/v/release/el-pablos/web-porto-salsa?color=CFBAF0)
![GitHub workflow status](https://img.shields.io/github/actions/workflow/status/el-pablos/web-porto-salsa/main.yml?color=9ED2D6&label=CI%2FCD)

</div>
