# Altitude Design System

A comprehensive design token system for Altitude Marketing, featuring a 5-layer architecture that bridges design tools (Figma) with development frameworks (WordPress/Greenshift).

## Overview

This repository contains:

- **Design Tokens** — JSON-based token definitions compatible with Figma Variables
- **Documentation UI** — Interactive Next.js application for exploring tokens and relationships
- **Theme Generator** — Tool for building custom themes with live preview
- **Framework Adapters** — WordPress/Greenshift CSS variable mappings

## Token Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  05-Greenshift (Framework Adapter)                          │
│  WordPress/Greenshift CSS custom properties                 │
├─────────────────────────────────────────────────────────────┤
│  04-Components                                              │
│  Button, Card, Input component tokens                       │
├─────────────────────────────────────────────────────────────┤
│  03-Semantic                                                │
│  Role-based tokens: Brand, Background, Text, Status         │
│  Modes: Light / Dark                                        │
├─────────────────────────────────────────────────────────────┤
│  02-Typography                                              │
│  Type scales: Major Second (1.125) / Major Third (1.25)     │
│  Modes: Mobile / Desktop                                    │
├─────────────────────────────────────────────────────────────┤
│  01-Primitives                                              │
│  Raw values: Colors, Spacing, Radius, etc.                  │
└─────────────────────────────────────────────────────────────┘
```

## Repository Structure

```
design-system/
├── tokens/                 # Design token JSON files
│   ├── 01-Primitives.json
│   ├── 02a-Typography-MajorSecond.json
│   ├── 02b-Typography-MajorThird.json
│   ├── 03-Semantic.json
│   ├── 04-Components.json
│   ├── 05-Greenshift.json
│   ├── IMPORT-GUIDE.md     # Figma import instructions
│   └── *.css               # Generated CSS variables
│
├── ui/                     # Next.js documentation app
│   ├── src/
│   │   ├── app/            # Pages and API routes
│   │   ├── components/     # React components
│   │   └── lib/            # Token parsing utilities
│   └── README.md           # UI-specific documentation
│
└── README.md               # This file
```

## Quick Start

### View Documentation UI

```bash
cd ui
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the design system.

### Import Tokens to Figma

1. Open your Figma file
2. Go to **Local Variables** panel
3. Import files from `/tokens/` in numbered order:
   - `01-Primitives.json` → `02a-Typography-*.json` → `03-Semantic.json` → `04-Components.json` → `05-Greenshift.json`

See [`tokens/IMPORT-GUIDE.md`](tokens/IMPORT-GUIDE.md) for detailed instructions.

## Token Collections

| Collection | Variables | Modes | Description |
|------------|-----------|-------|-------------|
| **Primitives** | 326 | Default | Colors (22 palettes), spacing, radius, font weights, durations |
| **Typography** | 11 | Mobile/Desktop | Responsive type scales |
| **Semantic** | 31 | Light/Dark | Role-based color mappings |
| **Components** | 28 | Default | Button, Card, Input tokens |
| **Greenshift** | 46 | Light/Dark | WordPress CSS variable adapters |

## Features

### Documentation Pages
- **Primitives** — Full Tailwind color palette (22 colors × 11 shades), spacing scales, radius values
- **Semantic** — Role-based colors for Brand, Background, Text, and Status
- **Components** — Button, Card, and Input token specifications
- **Typography** — Two type scales for different use cases
- **Greenshift** — WordPress framework variable mappings

### Theme Generator
Interactive tool for building custom themes:
- Adjust brand colors, typography, and spacing
- Live preview with mockup website
- Token chain visualization
- Export to CSS, JSON, or Figma formats

### API Endpoints
- `/api/tokens` — All tokens
- `/api/tokens/primitives` — Primitive tokens
- `/api/tokens/semantic` — Semantic tokens
- `/api/tokens/components` — Component tokens
- `/api/tokens/export` — Export in multiple formats

## Tech Stack

- **Tokens**: JSON (Figma Variables compatible)
- **UI Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: CSS Custom Properties
- **Icons**: Lucide React

## WordPress Integration

The Greenshift adapter layer maps semantic tokens to WordPress CSS custom properties:

```css
--wp--preset--color--brand → Semantic.Color.Brand.Default
--wp--custom--button--border-radius → Components.Button.Radius
--wp--style--global--content-size → Semantic.Layout.ContentWidth
```

This enables seamless integration with:
- Greenshift page builder
- GenerateBlocks
- WordPress theme.json
- Other CSS variable-based frameworks

## License

Proprietary — Altitude Marketing
