# LoL Brawl Wiki

A beautiful and modern League of Legends Wiki built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful UI with LoL-themed colors (gold and blue)
- 📱 Fully responsive design
- ⚡ Built with Next.js 16+ App Router
- 🎯 TypeScript for type safety
- 💅 Styled with Tailwind CSS 4
- 🎮 Real-time data from official LoL API (172+ champions)
- 🚀 Ready for Vercel deployment

## Getting Started

### Installation

```bash
npm install
```

### Update Heroes Data

Fetch the latest champion data from the official API:

```bash
# Using Node.js
node scripts/fetch-heroes.js

# Or using the shell script
./scripts/update-heroes.sh
```

This will download all 172+ champions and save them to `data/champions.json`.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

Alternatively, use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
lol-brawl-wiki/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ChampionCard.tsx
├── lib/                 # Utilities and data
│   ├── types.ts
│   └── data.ts
├── data/                # Champion data
│   ├── champions.json   # All 172+ champions
│   ├── heroes-raw.json  # Raw API response
│   └── types.ts         # Type definitions
├── scripts/             # Utility scripts
│   ├── fetch-heroes.js  # Fetch champion data
│   └── update-heroes.sh # Shell script wrapper
└── public/              # Static assets
```

## Tech Stack

- **Framework:** Next.js 16+
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Data Source:** Tencent Game API
- **Deployment:** Vercel

## Data Updates

The champion data is fetched from the official Tencent LoL API:
- **API Endpoint:** `https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js`
- **Total Champions:** 172+
- **Update Frequency:** Run the fetch script anytime to get latest data

## License

ISC
