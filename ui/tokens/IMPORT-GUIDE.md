# Altitude Design System - Figma Variables Import Guide

## Overview

The Altitude Design System uses a **three-tier token architecture** with an additional **framework adapter layer**:

```
┌─────────────────────────────────────────────────────────────┐
│  05-Greenshift (Framework Adapter)                          │
│  WordPress/Greenshift CSS custom properties                 │
│  Maps: --wp--preset--color--brand → Semantic tokens         │
├─────────────────────────────────────────────────────────────┤
│  04-Components                                              │
│  Button, Card, Input component tokens                       │
├─────────────────────────────────────────────────────────────┤
│  03-Semantic                                                │
│  Role-based tokens: Brand, Background, Text, Status         │
│  Modes: Light / Dark                                        │
├─────────────────────────────────────────────────────────────┤
│  02-Typography                                              │
│  Type scales with responsive modes                          │
│  Modes: Mobile / Desktop                                    │
├─────────────────────────────────────────────────────────────┤
│  01-Primitives                                              │
│  Raw values: Colors, Spacing, Radius, etc.                  │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

| Order | File | Collection Name | Modes | Variables |
|-------|------|-----------------|-------|-----------|
| 1 | `01-Primitives.json` | Primitives | Default | 326 |
| 2a | `02a-Typography-MajorSecond.json` | Typography - Major Second | Mobile, Desktop | 11 |
| 2b | `02b-Typography-MajorThird.json` | Typography - Major Third | Mobile, Desktop | 11 |
| 3 | `03-Semantic.json` | Semantic | Light, Dark | 31 |
| 4 | `04-Components.json` | Components | Default | 28 |
| 5 | `05-Greenshift.json` | Greenshift | Light, Dark | 46 |

## Import Order

**Import files in numbered order:**

1. **01-Primitives.json** - Base color palette, spacing, radius, etc.
2. **02a or 02b-Typography** - Font sizes with responsive modes (choose one or both)
3. **03-Semantic.json** - Theme-aware semantic tokens (Light/Dark)
4. **04-Components.json** - Component-specific tokens
5. **05-Greenshift.json** - WordPress/Greenshift framework mapping

---

## JSON Structure Format

All files use **nested object structure** for variable grouping, which enables cross-collection alias references:

```json
{
  "CollectionName": {
    "modes": {
      "ModeName": {
        "Group": {
          "Subgroup": {
            "Variable": { "$value": "#hex", "$type": "color" }
          }
        }
      }
    }
  }
}
```

### Cross-Collection Alias References

Variables can reference other collections using the path format:

```
{CollectionName.modes.ModeName.Group.Subgroup.Variable}
```

**Examples:**

```json
// Semantic referencing Primitives
"$value": "{Primitives.modes.Default.Color.Emerald.400}"

// Components referencing Semantic
"$value": "{Semantic.modes.Light.Color.Brand.Default}"

// Greenshift referencing Components
"$value": "{Components.modes.Default.Button.Background.Default}"
```

---

## Collection Details

### 01-Primitives
Raw design tokens - the foundation of the system.

| Group | Contents |
|-------|----------|
| `Color.[Name].[Shade]` | Full Tailwind palette (22 colors × 11 shades) |
| `Spacing.[Size]` | 4px/8px grid (0, px, 0-5, 1, 1-5, ... 64) |
| `Size.[Size]` | Control sizes (4-48) |
| `Layout.[Size]` | Container widths (xs-7xl) |
| `Radius.[Size]` | Border radius (none, sm, md, lg, xl, 2xl, 3xl, 4xl, full) |
| `LineHeight.[Name]` | Line heights (none, tight, snug, normal, relaxed, loose) |
| `FontWeight.[Name]` | Font weights (thin, light, normal, ... black) |
| `Duration.[ms]` | Animation durations (75-1000ms) |

### 02-Typography
Responsive type scales with Mobile/Desktop modes.

**Major Second (1.125 ratio)** - Conservative scale for data-heavy UIs
**Major Third (1.25 ratio)** - Expressive scale for marketing sites

| Variable | Mobile | Desktop (Major Second) |
|----------|--------|------------------------|
| FontSize.2xs | 10 | 12 |
| FontSize.xs | 12 | 14 |
| FontSize.sm | 14 | 16 |
| FontSize.md | 16 | 18 |
| FontSize.lg | 18 | 20 |
| FontSize.xl | 20 | 24 |
| FontSize.2xl | 24 | 28 |
| FontSize.3xl | 28 | 32 |
| FontSize.4xl | 32 | 36 |
| FontSize.5xl | 36 | 40 |
| FontSize.6xl | 40 | 48 |

### 03-Semantic
Role-based tokens with Light/Dark theme modes. All values reference Primitives.

| Group | Purpose |
|-------|---------|
| `Color.Brand.*` | Primary brand colors (Default, Hover, Light, Dark) |
| `Color.Secondary.*` | Secondary brand colors |
| `Color.Background.*` | Background colors (Default, Alt) |
| `Color.Text.*` | Text colors (Foreground, Muted, Subtle, OnBrand, OnSecondary) |
| `Color.Card.*` | Card-specific colors |
| `Color.Border.*` | Border colors (Default, Strong) |
| `Color.Status.*` | Feedback colors (Success, Warning, Error, Info + Light variants) |
| `Radius.*` | Semantic radius (Button, Card, Input, Badge, Modal) |
| `Layout.*` | Content widths (ContentWidth, WideWidth, ProseWidth) |

### 04-Components
Component-specific tokens referencing Semantic and Primitives.

| Group | Tokens |
|-------|--------|
| `Button.*` | Background, Hover, Text, Radius, Padding, Heights, Secondary, Outline |
| `Card.*` | Background, Border, Text, Radius, Padding |
| `Input.*` | Background, Border states, Radius, Padding, Height, Text, Placeholder |

### 05-Greenshift (Framework Adapter)
**WordPress/Greenshift mapping layer** with Light/Dark modes.

This collection maps WordPress CSS custom properties to semantic tokens. Each variable includes metadata for AI-powered framework transformation:

```json
{
  "Preset": {
    "Color": {
      "brand": { 
        "$value": "{Semantic.modes.Light.Color.Brand.Default}", 
        "$type": "color",
        "$wpVariable": "--wp--preset--color--brand"
      }
    }
  }
}
```

| Group | WordPress Pattern | Example |
|-------|-------------------|---------|
| `Preset.Color.*` | `--wp--preset--color--*` | brand, background, surface |
| `Custom.Button.*` | `--wp--custom--button--*` | background, text, border-radius |
| `Custom.Card.*` | `--wp--custom--card--*` | border-radius, spacing |
| `Custom.Input.*` | `--wp--custom--input--*` | background, border, border-radius |
| `Custom.Badge.*` | `--wp--custom--badge--*` | border-radius |
| `Custom.Modal.*` | `--wp--custom--modal--*` | border-radius |
| `Style.Global.*` | `--wp--style--global--*` | content-size, wide-size |

---

## AI Framework Transformation

The `05-Greenshift.json` file is designed for AI-powered variable transformation. Each variable contains:

| Metadata | Purpose |
|----------|---------|
| `$value` | Alias reference to source token |
| `$type` | Variable type (color, number, string) |
| `$wpVariable` | WordPress CSS custom property name |

### Using with AI Agents

When transforming for different WordPress frameworks, AI can:

1. **Read the `$wpVariable`** to understand the WordPress naming convention
2. **Trace the `$value` alias** back through the token chain
3. **Resolve to primitives** for the actual value
4. **Apply `$type`** for correct formatting

### Supported Frameworks

The Greenshift collection can be transformed for:

| Framework | Transformation Notes |
|-----------|---------------------|
| **Greenshift** | Direct use - variables match Greenshift patterns |
| **GenerateBlocks** | Map to `--gb-*` custom properties |
| **Cwicly** | Map to Cwicly's variable system |
| **Kadence** | Map to Kadence global palette |
| **theme.json** | Generate WordPress theme.json settings |

---

## Troubleshooting

### Variables showing as "0" or "1" groups
- Each file should start with `{` not `[`
- Import one collection per file

### Modes not appearing correctly
- Check the `"modes": { "ModeName": { ... } }` structure
- Each mode should contain the same variable names

### Alias references not found
- Import collections in order (Primitives → Typography → Semantic → Components → Greenshift)
- Cross-collection aliases use the format: `{CollectionName.modes.ModeName.Group.Variable}`
- Example: `{Primitives.modes.Default.Color.Emerald.400}`

---

## Variable Scopes (Post-Import)

Configure scopes after import for better UX:

| Variable Type | Recommended Scopes |
|---------------|-------------------|
| Preset.Color.* | FRAME_FILL, SHAPE_FILL |
| Color.Text.* | TEXT_FILL |
| Color.Border.* | STROKE_COLOR |
| Radius.* | CORNER_RADIUS |
| Spacing.* | GAP, WIDTH_HEIGHT |
| FontSize.* | FONT_SIZE |
| Style.Global.* | WIDTH_HEIGHT |

Use the **Variable Scope Manager** plugin for bulk scope editing.
