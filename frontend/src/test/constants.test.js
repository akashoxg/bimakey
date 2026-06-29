import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BRAND, getWhatsAppUrl, INSURANCE_TYPES, NAV_LINKS } from '../utils/constants';

describe('Brand Constants', () => {
  it('should have required brand properties', () => {
    expect(BRAND).toHaveProperty('name');
    expect(BRAND).toHaveProperty('phone');
    expect(BRAND).toHaveProperty('whatsapp');
    expect(BRAND).toHaveProperty('email');
    expect(BRAND).toHaveProperty('googleRating');
  });

  it('should have correct brand name', () => {
    expect(BRAND.name).toBe('BimaKey');
  });

  it('should have valid phone number format', () => {
    expect(BRAND.phone).toMatch(/^\+91\d{10}$/);
  });

  it('should have valid WhatsApp number format', () => {
    expect(BRAND.whatsapp).toMatch(/^91\d{10}$/);
  });

  it('should have valid Google rating', () => {
    expect(BRAND.googleRating).toBeGreaterThanOrEqual(0);
    expect(BRAND.googleRating).toBeLessThanOrEqual(5);
  });
});

describe('WhatsApp URL Generator', () => {
  it('should generate WhatsApp URL for general context', () => {
    const url = getWhatsAppUrl('general');
    expect(url).toContain('wa.me');
    expect(url).toContain(BRAND.whatsapp);
    expect(url).toContain('Hi');
  });

  it('should generate WhatsApp URL for health context', () => {
    const url = getWhatsAppUrl('health');
    expect(url).toContain('health');
  });

  it('should generate WhatsApp URL for term context', () => {
    const url = getWhatsAppUrl('term');
    expect(url).toContain('term');
  });

  it('should generate WhatsApp URL for motor context', () => {
    const url = getWhatsAppUrl('motor');
    expect(url).toContain('motor');
  });

  it('should fall back to general message for unknown context', () => {
    const url = getWhatsAppUrl('unknown');
    expect(url).toContain('wa.me');
  });

  it('should URL encode the message', () => {
    const url = getWhatsAppUrl('health');
    expect(url).toContain('%20');
  });
});

describe('Insurance Types', () => {
  it('should have at least 3 insurance types', () => {
    expect(INSURANCE_TYPES.length).toBeGreaterThanOrEqual(3);
  });

  it('should have health, term, and motor types', () => {
    const values = INSURANCE_TYPES.map(t => t.value);
    expect(values).toContain('health');
    expect(values).toContain('term');
    expect(values).toContain('motor');
  });

  it('should have valid label and value for each type', () => {
    INSURANCE_TYPES.forEach(type => {
      expect(type).toHaveProperty('value');
      expect(type).toHaveProperty('label');
      expect(typeof type.value).toBe('string');
      expect(typeof type.label).toBe('string');
    });
  });
});

describe('Navigation Links', () => {
  it('should have at least 4 main navigation items', () => {
    expect(NAV_LINKS.length).toBeGreaterThanOrEqual(4);
  });

  it('should have label and href for each nav item', () => {
    NAV_LINKS.forEach(link => {
      expect(link).toHaveProperty('label');
      expect(link).toHaveProperty('href');
      expect(typeof link.label).toBe('string');
      expect(typeof link.href).toBe('string');
    });
  });

  it('should have children array for dropdown menus', () => {
    const mainLinks = NAV_LINKS.filter(link => link.children);
    mainLinks.forEach(link => {
      expect(Array.isArray(link.children)).toBe(true);
    });
  });

  it('should have valid href paths', () => {
    NAV_LINKS.forEach(link => {
      expect(link.href).toMatch(/^\/[-a-z]+$/i);
    });
  });
});
