'use client';

import React from 'react';
import { MousePointer2 } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { TokenChainVisualizer, TokenChainNode, ResolvedValuePanel } from './TokenChainVisualizer';
import { AffectedTokensList, AffectedToken } from './AffectedTokensList';

/** Element metadata including display info and what CSS property is being inspected */
interface ElementMetadata {
  displayName: string;
  propertyLabel: string;
  chain: TokenChainNode[];
  affected: AffectedToken[];
  /** CSS variable name used to resolve the color */
  colorSource: 'brand' | 'brand-light' | 'brand-dark' | 'secondary' | 'secondary-light' | 'secondary-dark' | 'accent' | 'accent-light' | 'muted' | 'foreground' | 'surface' | 'border';
}

/** Mock data for token chains based on selected element */
const ELEMENT_TOKEN_CHAINS: Record<string, ElementMetadata> = {
  'button-primary': {
    displayName: 'Button Primary',
    propertyLabel: 'Background color',
    colorSource: 'brand',
    chain: [
      { layer: 'component', label: 'Component', name: 'Button.Background.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.400' },
    ],
    affected: [
      { id: 'outline-border', name: 'Outline Button Border' },
      { id: 'link-hover', name: 'Link Hover Color' },
      { id: 'focus-ring', name: 'Focus Ring' },
      { id: 'input-focus', name: 'Input Focus Border' },
      { id: 'badge-brand', name: 'Badge Background (Brand)' },
    ],
  },
  'button-text': {
    displayName: 'Button Text',
    propertyLabel: 'Text color',
    colorSource: 'surface',
    chain: [
      { layer: 'component', label: 'Component', name: 'Button.Text.Primary' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Surface', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.White' },
    ],
    affected: [
      { id: 'icon-on-brand', name: 'Icons on Brand Background' },
      { id: 'text-on-accent', name: 'Text on Accent' },
    ],
  },
  'button-outline': {
    displayName: 'Button Outline',
    propertyLabel: 'Border & text color',
    colorSource: 'secondary',
    chain: [
      { layer: 'component', label: 'Component', name: 'Button.Border.Outline' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Secondary.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Violet.400' },
    ],
    affected: [
      { id: 'badge-text', name: 'Badge Text Color' },
      { id: 'secondary-link', name: 'Secondary Link Color' },
    ],
  },
  'badge': {
    displayName: 'Badge',
    propertyLabel: 'Background color',
    colorSource: 'secondary-light',
    chain: [
      { layer: 'component', label: 'Component', name: 'Badge.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Secondary.Light', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Violet.100' },
    ],
    affected: [
      { id: 'highlight-bg', name: 'Highlight Background' },
      { id: 'tag-bg', name: 'Tag Background' },
    ],
  },
  'nav-link': {
    displayName: 'Nav Link',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Nav.Link.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'body-text', name: 'Body Text (Muted)' },
      { id: 'placeholder', name: 'Input Placeholder' },
      { id: 'caption', name: 'Caption Text' },
    ],
  },
  'footer-link': {
    displayName: 'Footer Link',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Footer.Link.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'nav-link', name: 'Navigation Links' },
      { id: 'subtitle', name: 'Subtitle Text' },
    ],
  },
  'footer-text': {
    displayName: 'Footer Text',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Footer.Text' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'nav-link', name: 'Navigation Links' },
      { id: 'caption', name: 'Caption Text' },
    ],
  },
  'text-muted': {
    displayName: 'Body Text',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Text.Body.Muted' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'nav-link', name: 'Navigation Links' },
      { id: 'footer-text', name: 'Footer Text' },
      { id: 'description', name: 'Card Descriptions' },
    ],
  },
  'hero-title': {
    displayName: 'Hero Title',
    propertyLabel: 'Text color',
    colorSource: 'foreground',
    chain: [
      { layer: 'component', label: 'Component', name: 'Hero.Title' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Foreground', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.900' },
    ],
    affected: [
      { id: 'section-title', name: 'Section Titles' },
      { id: 'card-title', name: 'Card Titles' },
      { id: 'form-heading', name: 'Form Headings' },
    ],
  },
  'hero-subtitle': {
    displayName: 'Hero Subtitle',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Hero.Subtitle' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'description', name: 'Descriptions' },
      { id: 'body-text', name: 'Body Text' },
      { id: 'card-description', name: 'Card Descriptions' },
    ],
  },
  'card': {
    displayName: 'Card',
    propertyLabel: 'Background color',
    colorSource: 'surface',
    chain: [
      { layer: 'component', label: 'Component', name: 'Card.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Surface', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.White' },
    ],
    affected: [
      { id: 'modal-bg', name: 'Modal Background' },
      { id: 'dropdown-bg', name: 'Dropdown Background' },
      { id: 'input-bg', name: 'Input Background' },
    ],
  },
  'card-icon': {
    displayName: 'Card Icon',
    propertyLabel: 'Background color',
    colorSource: 'accent-light',
    chain: [
      { layer: 'component', label: 'Component', name: 'Card.Icon.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Accent.Light', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.100' },
    ],
    affected: [
      { id: 'feature-icon', name: 'Feature Icons' },
      { id: 'highlight-bg', name: 'Highlight Background' },
    ],
  },
  'card-title': {
    displayName: 'Card Title',
    propertyLabel: 'Text color',
    colorSource: 'foreground',
    chain: [
      { layer: 'component', label: 'Component', name: 'Card.Title' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Foreground', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.900' },
    ],
    affected: [
      { id: 'heading', name: 'Headings' },
      { id: 'section-title', name: 'Section Titles' },
      { id: 'form-label', name: 'Form Labels' },
    ],
  },
  'card-description': {
    displayName: 'Card Description',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Card.Description' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'body-text', name: 'Body Text' },
      { id: 'subtitle', name: 'Subtitles' },
      { id: 'caption', name: 'Caption Text' },
    ],
  },
  'text-heading': {
    displayName: 'Heading',
    propertyLabel: 'Text color',
    colorSource: 'foreground',
    chain: [
      { layer: 'component', label: 'Component', name: 'Text.Heading' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Foreground', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.900' },
    ],
    affected: [
      { id: 'text-body', name: 'Body Text' },
      { id: 'label', name: 'Form Labels' },
    ],
  },
  'form-label': {
    displayName: 'Form Label',
    propertyLabel: 'Text color',
    colorSource: 'foreground',
    chain: [
      { layer: 'component', label: 'Component', name: 'Form.Label' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Foreground', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.900' },
    ],
    affected: [
      { id: 'heading', name: 'Headings' },
      { id: 'text-strong', name: 'Strong Text' },
    ],
  },
  'input': {
    displayName: 'Input Field',
    propertyLabel: 'Border color',
    colorSource: 'border',
    chain: [
      { layer: 'component', label: 'Component', name: 'Input.Border.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Border', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.200' },
    ],
    affected: [
      { id: 'card-border', name: 'Card Border' },
      { id: 'divider', name: 'Dividers' },
    ],
  },
  'input-placeholder': {
    displayName: 'Input Placeholder',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Input.Placeholder' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'caption', name: 'Caption Text' },
      { id: 'hint-text', name: 'Hint Text' },
    ],
  },
  'logo': {
    displayName: 'Logo',
    propertyLabel: 'Background color',
    colorSource: 'brand',
    chain: [
      { layer: 'component', label: 'Component', name: 'Logo.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.400' },
    ],
    affected: [
      { id: 'primary-btn', name: 'Primary Button' },
      { id: 'accent', name: 'Accent Elements' },
    ],
  },
};

/**
 * TokenInspector
 * 
 * Right panel component that displays:
 * - Selected element info
 * - Resolved value (moved here for prominence)
 * - Token chain visualization
 * - Affected components list
 */
export function TokenInspector() {
  const { state, brandHex, secondaryHex, accentHex } = useThemeGenerator();
  
  // Get chain data based on selected element
  const selectedData = state.selectedElement 
    ? ELEMENT_TOKEN_CHAINS[state.selectedElement] 
    : ELEMENT_TOKEN_CHAINS['button-primary']; // Default to button
  
  // Color mapping based on neutral scale
  const neutralColors: Record<number, string> = {
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
    slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
    zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
    neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
    stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
  }[state.neutralScale] as Record<number, string>;
  
  // Color palettes for light/dark shade lookups
  const colorPalettes: Record<string, Record<number, string>> = {
    emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 400: '#34d399', 700: '#047857' },
    blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 400: '#60a5fa', 700: '#1d4ed8' },
    violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 400: '#a78bfa', 700: '#6d28d9' },
    red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 400: '#f87171', 700: '#b91c1c' },
    orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 400: '#fb923c', 700: '#c2410c' },
    teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 400: '#2dd4bf', 700: '#0f766e' },
    cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 400: '#22d3ee', 700: '#0e7490' },
    green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 400: '#4ade80', 700: '#15803d' },
    indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 400: '#818cf8', 700: '#4338ca' },
    pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 400: '#f472b6', 700: '#be185d' },
    rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 400: '#fb7185', 700: '#be123c' },
    amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 400: '#fbbf24', 700: '#b45309' },
    yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 400: '#facc15', 700: '#a16207' },
    lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 400: '#a3e635', 700: '#4d7c0f' },
    purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 400: '#c084fc', 700: '#7e22ce' },
    fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 400: '#e879f9', 700: '#a21caf' },
    sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 400: '#38bdf8', 700: '#0369a1' },
  };
  
  // Brand light color (shade 100 relative to selected shade)
  const brandLightHex = colorPalettes[state.brandColor.family]?.[100] || '#d1fae5';
  
  // Secondary colors
  const secondaryLightHex = colorPalettes[state.secondaryColor.family]?.[100] || '#ede9fe';
  const secondaryDarkHex = colorPalettes[state.secondaryColor.family]?.[700] || '#6d28d9';
  
  // Accent colors
  const accentLightHex = colorPalettes[state.accentColor.family]?.[100] || '#d1fae5';
  
  // Resolve the actual color based on the colorSource
  const resolvedColor = (() => {
    if (!selectedData) return brandHex;
    switch (selectedData.colorSource) {
      case 'brand': return brandHex;
      case 'brand-light': return brandLightHex;
      case 'brand-dark': return colorPalettes[state.brandColor.family]?.[700] || '#047857';
      case 'secondary': return secondaryHex;
      case 'secondary-light': return secondaryLightHex;
      case 'secondary-dark': return secondaryDarkHex;
      case 'accent': return accentHex;
      case 'accent-light': return accentLightHex;
      case 'muted': return neutralColors[state.bodyTextShade] || '#6b7280';
      case 'foreground': return neutralColors[state.headingTextShade] || '#111827';
      case 'surface': return '#ffffff';
      case 'border': return neutralColors[200] || '#e5e7eb';
      default: return brandHex;
    }
  })();
  
  // Helper to capitalize first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  
  // Update the primitive name based on current theme settings
  const chain = selectedData?.chain.map((node) => {
    if (node.layer === 'primitive') {
      // Update primitive name based on what color source is being used
      switch (selectedData.colorSource) {
        case 'brand':
          return { ...node, name: `Color.${capitalize(state.brandColor.family)}.${state.brandColor.shade}` };
        case 'brand-light':
          return { ...node, name: `Color.${capitalize(state.brandColor.family)}.100` };
        case 'brand-dark':
          return { ...node, name: `Color.${capitalize(state.brandColor.family)}.700` };
        case 'secondary':
          return { ...node, name: `Color.${capitalize(state.secondaryColor.family)}.${state.secondaryColor.shade}` };
        case 'secondary-light':
          return { ...node, name: `Color.${capitalize(state.secondaryColor.family)}.100` };
        case 'secondary-dark':
          return { ...node, name: `Color.${capitalize(state.secondaryColor.family)}.700` };
        case 'accent':
          return { ...node, name: `Color.${capitalize(state.accentColor.family)}.${state.accentColor.shade}` };
        case 'accent-light':
          return { ...node, name: `Color.${capitalize(state.accentColor.family)}.100` };
        case 'muted':
          return { ...node, name: `Color.${capitalize(state.neutralScale)}.${state.bodyTextShade}` };
        case 'foreground':
          return { ...node, name: `Color.${capitalize(state.neutralScale)}.${state.headingTextShade}` };
        case 'border':
          return { ...node, name: `Color.${capitalize(state.neutralScale)}.200` };
        default:
          return node;
      }
    }
    return node;
  }) || [];
  
  // Convert hex to RGB for display
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  };
  
  // Use element metadata for display
  const elementName = selectedData?.displayName || 'Button Primary';
  const propertyLabel = selectedData?.propertyLabel || 'Background color';
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Token Inspector
        </h2>
        <div className="flex items-center gap-1.5 mt-1.5">
          <MousePointer2 className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500">Click to inspect token</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Selected Element */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Selected Element</div>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: resolvedColor }}
            >
              <MousePointer2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white">{elementName}</div>
              <div className="text-xs text-gray-500">{propertyLabel}</div>
            </div>
          </div>
        </div>
        
        {/* Resolved Value - Moved here for prominence */}
        <ResolvedValuePanel
          resolvedValue={resolvedColor}
          resolvedRgb={hexToRgb(resolvedColor)}
        />
        
        {/* Token Chain */}
        <TokenChainVisualizer
          chain={chain}
          resolvedValue={resolvedColor}
          resolvedRgb={hexToRgb(resolvedColor)}
        />
        
        {/* Affected Tokens */}
        <AffectedTokensList
          tokens={selectedData?.affected || []}
          onTokenClick={(token) => console.log('Token clicked:', token)}
        />
      </div>
    </div>
  );
}
