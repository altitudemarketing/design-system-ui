'use client';

import React from 'react';
import { Zap, Shield, LayoutGrid } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';

interface MockupWebsiteProps {
  onElementClick?: (elementId: string) => void;
}

/**
 * MockupWebsite
 * 
 * Interactive website mockup that demonstrates theme changes.
 * Clicking elements updates the token inspector.
 */
export function MockupWebsite({ onElementClick }: MockupWebsiteProps) {
  const { setSelectedElement, brandHex } = useThemeGenerator();
  
  const handleClick = (elementId: string) => {
    setSelectedElement(elementId);
    onElementClick?.(elementId);
  };
  
  return (
    <div 
      className="bg-white"
      style={{ 
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-foreground)',
      }}
    >
      {/* Navigation */}
      <nav 
        className="px-8 py-4 flex items-center justify-between border-b"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--color-brand)' }}
            onClick={() => handleClick('logo')}
          />
          <span 
            className="font-semibold cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-foreground)' }}
            onClick={() => handleClick('text-heading')}
          >
            Acme Co
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="text-sm cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-muted)' }}
            onClick={(e) => { e.preventDefault(); handleClick('nav-link'); }}
          >Products</a>
          <a 
            href="#" 
            className="text-sm cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-muted)' }}
            onClick={(e) => { e.preventDefault(); handleClick('nav-link'); }}
          >Solutions</a>
          <a 
            href="#" 
            className="text-sm cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-muted)' }}
            onClick={(e) => { e.preventDefault(); handleClick('nav-link'); }}
          >Pricing</a>
          <button 
            className="px-4 py-2 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-button, 6px)',
              color: 'white',
            }}
            onClick={() => handleClick('button-primary')}
          >
            <span 
              className="cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleClick('button-text'); }}
            >
              Get Started
            </span>
          </button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section 
        className="px-8 py-16 text-center"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <span 
          className="inline-block px-3 py-1 text-xs font-medium mb-4 rounded-full cursor-pointer hover:opacity-80"
          style={{ 
            backgroundColor: 'var(--color-secondary-light)',
            color: 'var(--color-secondary-dark)',
          }}
          onClick={() => handleClick('badge')}
        >
          New Release
        </span>
        <h1 
          className="text-4xl font-bold mb-4 cursor-pointer hover:opacity-80"
          style={{ color: 'var(--color-foreground)' }}
          onClick={() => handleClick('hero-title')}
        >
          Build something amazing
        </h1>
        <p 
          className="text-lg mb-8 max-w-xl mx-auto cursor-pointer hover:opacity-80"
          style={{ color: 'var(--color-muted)' }}
          onClick={() => handleClick('hero-subtitle')}
        >
          Create beautiful, responsive websites with our design system powered by carefully crafted tokens.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button 
            className="px-6 py-3 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-button, 6px)',
              color: 'white',
            }}
            onClick={() => handleClick('button-primary')}
          >
            <span onClick={(e) => { e.stopPropagation(); handleClick('button-text'); }}>
              Start Free Trial
            </span>
          </button>
          <button 
            className="px-6 py-3 text-sm font-medium border-2 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
            style={{ 
              color: 'var(--color-secondary)',
              borderColor: 'var(--color-secondary)',
              borderRadius: 'var(--radius-button, 6px)',
            }}
            onClick={() => handleClick('button-outline')}
          >
            Learn More
          </button>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section 
        className="px-8 py-12"
        style={{ backgroundColor: 'var(--color-background-alt)' }}
      >
        <h2 
          className="text-2xl font-bold mb-8 text-center cursor-pointer hover:opacity-80"
          style={{ color: 'var(--color-foreground)' }}
          onClick={() => handleClick('text-heading')}
        >
          Features
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1 */}
          <FeatureCard
            icon={<Zap className="w-5 h-5" color="var(--color-accent)" />}
            iconBg="var(--color-accent-light)"
            title="Lightning Fast"
            description="Optimized for performance with lazy loading and efficient caching."
            onCardClick={() => handleClick('card')}
            onIconClick={() => handleClick('card-icon')}
            onTitleClick={() => handleClick('card-title')}
            onDescriptionClick={() => handleClick('card-description')}
          />
          
          {/* Card 2 */}
          <FeatureCard
            icon={<Shield className="w-5 h-5" color="var(--color-accent)" />}
            iconBg="var(--color-accent-light)"
            title="Secure"
            description="Enterprise-grade security with end-to-end encryption."
            onCardClick={() => handleClick('card')}
            onIconClick={() => handleClick('card-icon')}
            onTitleClick={() => handleClick('card-title')}
            onDescriptionClick={() => handleClick('card-description')}
          />
          
          {/* Card 3 */}
          <FeatureCard
            icon={<LayoutGrid className="w-5 h-5" color="var(--color-accent)" />}
            iconBg="var(--color-accent-light)"
            title="Flexible"
            description="Customize everything to match your brand identity."
            onCardClick={() => handleClick('card')}
            onIconClick={() => handleClick('card-icon')}
            onTitleClick={() => handleClick('card-title')}
            onDescriptionClick={() => handleClick('card-description')}
          />
        </div>
      </section>
      
      {/* Contact Form */}
      <section 
        className="px-8 py-12"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="max-w-md mx-auto">
          <h2 
            className="text-2xl font-bold mb-6 text-center cursor-pointer hover:opacity-80"
            style={{ color: 'var(--color-foreground)' }}
            onClick={() => handleClick('text-heading')}
          >
            Contact Us
          </h2>
          <div className="space-y-4">
            <FormField 
              label="Name" 
              placeholder="John Doe"
              onInputClick={() => handleClick('input')}
              onLabelClick={() => handleClick('form-label')}
              onPlaceholderClick={() => handleClick('input-placeholder')}
            />
            <FormField 
              label="Email" 
              placeholder="john@example.com"
              type="email"
              onInputClick={() => handleClick('input')}
              onLabelClick={() => handleClick('form-label')}
              onPlaceholderClick={() => handleClick('input-placeholder')}
            />
            <FormField 
              label="Message" 
              placeholder="Your message..."
              isTextarea
              onInputClick={() => handleClick('input')}
              onLabelClick={() => handleClick('form-label')}
              onPlaceholderClick={() => handleClick('input-placeholder')}
            />
            <button 
              className="w-full px-4 py-2.5 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: 'var(--color-brand)',
                borderRadius: 'var(--radius-button, 6px)',
                color: 'white',
              }}
              onClick={() => handleClick('button-primary')}
            >
              <span 
                className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleClick('button-text'); }}
              >
                Send Message
              </span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="px-8 py-8 border-t cursor-pointer"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-background)',
        }}
        onClick={() => handleClick('footer-text')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded cursor-pointer hover:opacity-80"
              style={{ backgroundColor: 'var(--color-brand)' }}
              onClick={(e) => { e.stopPropagation(); handleClick('logo'); }}
            />
            <span 
              className="text-sm cursor-pointer hover:opacity-80" 
              style={{ color: 'var(--color-muted)' }}
              onClick={(e) => { e.stopPropagation(); handleClick('footer-text'); }}
            >
              © 2024 Acme Co. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm cursor-pointer hover:opacity-80" 
              style={{ color: 'var(--color-muted)' }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick('footer-link'); }}
            >Privacy</a>
            <a 
              href="#" 
              className="text-sm cursor-pointer hover:opacity-80" 
              style={{ color: 'var(--color-muted)' }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick('footer-link'); }}
            >Terms</a>
            <a 
              href="#" 
              className="text-sm cursor-pointer hover:opacity-80" 
              style={{ color: 'var(--color-muted)' }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick('footer-link'); }}
            >Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  onCardClick: () => void;
  onIconClick: () => void;
  onTitleClick: () => void;
  onDescriptionClick: () => void;
}

function FeatureCard({ 
  icon, 
  iconBg, 
  title, 
  description, 
  onCardClick,
  onIconClick,
  onTitleClick,
  onDescriptionClick,
}: FeatureCardProps) {
  return (
    <div 
      className="p-6 border cursor-pointer hover:shadow-md transition-shadow"
      style={{ 
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        borderRadius: 'var(--radius-card, 8px)',
      }}
      onClick={onCardClick}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: iconBg }}
        onClick={(e) => { e.stopPropagation(); onIconClick(); }}
      >
        {icon}
      </div>
      <h3 
        className="font-semibold mb-2 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'var(--color-foreground)' }}
        onClick={(e) => { e.stopPropagation(); onTitleClick(); }}
      >
        {title}
      </h3>
      <p 
        className="text-sm cursor-pointer hover:opacity-80 transition-opacity" 
        style={{ color: 'var(--color-muted)' }}
        onClick={(e) => { e.stopPropagation(); onDescriptionClick(); }}
      >
        {description}
      </p>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  onInputClick: () => void;
  onLabelClick: () => void;
  onPlaceholderClick: () => void;
}

function FormField({ 
  label, 
  placeholder, 
  type = 'text', 
  isTextarea, 
  onInputClick,
  onLabelClick,
  onPlaceholderClick,
}: FormFieldProps) {
  const inputStyles = {
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)',
    borderRadius: 'var(--radius-input, 4px)',
    color: 'var(--color-foreground)',
  };
  
  return (
    <div>
      <label 
        className="block text-sm font-medium mb-1 cursor-pointer hover:opacity-80"
        style={{ color: 'var(--color-foreground)' }}
        onClick={onLabelClick}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea 
          rows={3}
          placeholder={placeholder}
          className="w-full px-3 py-2 border text-sm resize-none cursor-pointer hover:border-gray-400 transition-colors"
          style={inputStyles}
          readOnly
          onClick={onInputClick}
          onFocus={onPlaceholderClick}
        />
      ) : (
        <input 
          type={type}
          placeholder={placeholder}
          className="w-full px-3 py-2 border text-sm cursor-pointer hover:border-gray-400 transition-colors"
          style={inputStyles}
          readOnly
          onClick={onInputClick}
          onFocus={onPlaceholderClick}
        />
      )}
    </div>
  );
}
