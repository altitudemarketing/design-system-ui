# Design System UI Modernization Plan

This plan outlines the steps to modernize the Design System UI, focusing on style uniformity, purposeful color usage, and improved typography. The goal is to evolve the current design into a professional, coherent documentation site that leverages the design system's own tokens.

## 1. Color Standardization
**Goal**: Eliminate "random" colors and establish a purposeful theme.

*   **Current Issue**: Pages use arbitrary colors (Blue, Green, Purple, Orange) for stats and headers without semantic meaning.
*   **Proposed Solution**:
    *   **Primary Theme**: Use `var(--color-brand)` (Teal) as the primary accent color for active states, links, and key highlights.
    *   **Secondary Theme**: Use `var(--color-secondary)` (Deep Purple) for architectural or structural elements (like "About Primitives" or navigation).
    *   **Neutral Foundation**: Use neutral grays (`var(--color-muted)`, `var(--color-foreground)`) for labels, secondary text, and borders.
    *   **Semantic Colors Only**: Reserve Green, Orange, and Red for actual status indicators (Success, Warning, Error), not for decoration.

## 2. Component Consistency
**Goal**: Create reusable patterns for informational elements.

*   **Stats Cards**:
    *   **Current**: Varied background tints and icon colors.
    *   **Update**: Unified design.
        *   **Value**: `var(--color-brand)` (Large, Bold).
        *   **Label**: `var(--color-muted)` (Small, Uppercase/Caps).
        *   **Icon**: `var(--color-brand)` or `var(--color-secondary)` (consistent across all).
        *   **Background**: `var(--color-card)` with `var(--color-card-border)`.

*   **Callouts / Info Boxes**:
    *   **Current**: Hardcoded hex backgrounds (e.g., `#3b82f610`) and borders.
    *   **Update**: Standardized "Callout" style.
        *   **Background**: `rgba(42, 175, 184, 0.05)` (Brand tint) or `var(--color-background)`.
        *   **Border**: `var(--color-border)`.
        *   **Icon**: Aligned with the content type (Info = Brand, Warning = Amber).

*   **Page Headers**:
    *   **Update**: Standardize the "Layer Badge" icon to use the Page's primary theme color (Brand or Secondary), rather than random colors per page.

## 3. Typography Refinement
**Goal**: Reduce jarring scale jumps and improve readability.

*   **Current Issue**: Large jump between Body text and Headings (due to Major Third scale).
*   **Proposed Solution**:
    *   **Switch to Conservative Scale**: Update the documentation site's headings to use the **Major Second** scale (e.g., `var(--font-size-h2--ms)` instead of `--mt`) or manually map H1/H2 to smaller steps on the Major Third scale.
    *   **Rationale**: Documentation sites benefit from a more compact, predictable rhythm.
    *   **Implementation**: Update `globals.css` or the individual page headers to use the `--ms` scale for a tighter look.

## 4. Visual Rhythm & Layout
**Goal**: Enforce the 4px/8px grid.

*   **Action**:
    *   Audit margins and paddings to ensuring they strictly use `--spacing-X` tokens.
    *   Align "Stats" grids and "Card" grids to the same max-width and gap structure.

## Execution Plan
1.  **Refactor `PrimitivesPage`**: Apply new color theme and standardized stats.
2.  **Refactor `ComponentTokensPage`**: Update "Token Reference Chain" and stats.
3.  **Refactor `TypographyPage`**: Update type scale comparison cards and table visuals.
4.  **Global Styles**: Adjust heading variable mappings in `globals.css` to reduce visual size jumps.
