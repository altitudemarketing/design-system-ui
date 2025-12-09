# Altitude Design System UI

Interactive documentation and tooling for the Altitude Marketing design token system.

## Overview

This Next.js application provides comprehensive documentation for Altitude's 5-layer design token architecture, along with interactive tools for exploring token relationships and generating custom themes.

### Token Architecture

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
├─────────────────────────────────────────────────────────────┤
│  02-Typography                                              │
│  Type scales: Major Second (1.125) / Major Third (1.25)     │
├─────────────────────────────────────────────────────────────┤
│  01-Primitives                                              │
│  Raw values: Colors, Spacing, Radius, etc.                  │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
ui/
├── src/
│   ├── app/
│   │   ├── (main)/              # Main documentation pages
│   │   │   ├── tokens/          # Token documentation
│   │   │   │   ├── primitives/  # Primitive tokens (colors, spacing)
│   │   │   │   ├── semantic/    # Semantic tokens (roles)
│   │   │   │   ├── components/  # Component tokens
│   │   │   │   ├── typography/  # Type scales
│   │   │   │   └── colors/      # Color overview
│   │   │   ├── components/      # Component examples
│   │   │   └── frameworks/      # Framework adapters (Greenshift)
│   │   ├── (fullscreen)/        # Full-width pages
│   │   │   └── generator/       # Theme generator tool
│   │   └── api/tokens/          # Token API endpoints
│   ├── components/
│   │   ├── generator/           # Theme generator components
│   │   └── tokens/              # Token display components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom hooks
│   └── lib/
│       ├── generator/           # Theme generation utilities
│       └── tokens/              # Token parsing & resolution
├── features/
│   └── theme-generator/         # Theme generator specs
├── public/                      # Static assets
├── agent.md                     # Project agent/planning doc
└── styleguide.md               # UI style guidelines
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

### Documentation Pages
- **Primitives** - 22 color families, spacing scales, radius values
- **Semantic Tokens** - Role-based color mappings (Brand, Background, Text, Status)
- **Component Tokens** - Button, Card, Input token specifications
- **Typography** - Major Second & Major Third type scales
- **Greenshift/WordPress** - Framework adapter mappings

### Theme Generator (In Progress)
Interactive three-panel tool for building custom themes:
- **Controls Panel** - Adjust colors, typography, spacing
- **Live Preview** - Real-time mockup website preview
- **Token Inspector** - Visualize token chain relationships

### API Endpoints
- `/api/tokens` - All tokens
- `/api/tokens/primitives` - Primitive tokens
- `/api/tokens/semantic` - Semantic tokens
- `/api/tokens/components` - Component tokens
- `/api/tokens/typography` - Typography tokens
- `/api/tokens/greenshift` - Greenshift mappings
- `/api/tokens/export` - Export in CSS/JSON/Figma formats

## Token Source Files

Token definitions are located in the `/tokens/` directory at the project root:
- `01-Primitives.json` - Raw color values, spacing, radius
- `02a-Typography-MajorSecond.json` - Conservative type scale (1.125)
- `02b-Typography-MajorThird.json` - Expressive type scale (1.25)
- `03-Semantic.json` - Light/Dark mode semantic tokens
- `04-Components.json` - Component-specific tokens
- `05-Greenshift.json` - WordPress/Greenshift variable mapping

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Custom Properties + Inline Styles
- **Icons**: Lucide React

## Documentation

- `agent.md` - Project planning and task tracking
- `styleguide.md` - UI component patterns and style guidelines
- `features/theme-generator/` - Theme generator specifications

## License

Proprietary - Altitude Marketing
