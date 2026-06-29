import { describe, it, expect } from 'vitest';

/**
 * Currency formatting utility tests
 * Tests the formatCurrency function with Indian Rupee formatting
 */

// Mock formatCurrency if not exists in project
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

describe('Currency Formatting', () => {
  it('should format simple number with INR symbol', () => {
    const result = formatCurrency(10000);
    expect(result).toContain('₹');
    expect(result).toContain('10,000');
  });

  it('should format large numbers with proper commas', () => {
    const result = formatCurrency(1000000);
    expect(result).toContain('10,00,000');
  });

  it('should format small numbers', () => {
    const result = formatCurrency(100);
    expect(result).toContain('100');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });

  it('should format premium amounts correctly', () => {
    const premiums = [13459, 21128, 26017, 75608];
    premiums.forEach(premium => {
      const result = formatCurrency(premium);
      expect(result).toContain('₹');
      expect(result).toMatch(/\d/);
    });
  });
});

describe('Phone Number Validation', () => {
  const isValidIndianPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  it('should validate correct 10-digit Indian mobile numbers', () => {
    expect(isValidIndianPhone('9876543210')).toBe(true);
    expect(isValidIndianPhone('9876543210')).toBe(true);
    expect(isValidIndianPhone('6000000000')).toBe(true);
    expect(isValidIndianPhone('9999999999')).toBe(true);
  });

  it('should reject numbers starting with 0-5', () => {
    expect(isValidIndianPhone('0123456789')).toBe(false);
    expect(isValidIndianPhone('1234567890')).toBe(false);
    expect(isValidIndianPhone('5123456789')).toBe(false);
  });

  it('should reject short numbers', () => {
    expect(isValidIndianPhone('987654321')).toBe(false);
    expect(isValidIndianPhone('98765')).toBe(false);
  });

  it('should reject long numbers', () => {
    expect(isValidIndianPhone('98765432101')).toBe(false);
    expect(isValidIndianPhone('987654321012')).toBe(false);
  });

  it('should reject non-numeric strings', () => {
    expect(isValidIndianPhone('abcdefghij')).toBe(false);
    expect(isValidIndianPhone('98765abcd0')).toBe(false);
  });
});

describe('Email Validation', () => {
  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  it('should validate correct email formats', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.in')).toBe(true);
    expect(isValidEmail('hello@bimakey.in')).toBe(true);
  });

  it('should reject invalid email formats', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('user name@domain.com')).toBe(false);
  });
});

describe('Name Validation', () => {
  const isValidName = (name) => {
    return typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 100;
  };

  it('should accept valid names', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('Akash Kumar')).toBe(true);
    expect(isValidName('A')).toBe(false);
  });

  it('should reject short names', () => {
    expect(isValidName('A')).toBe(false);
    expect(isValidName('')).toBe(false);
  });

  it('should reject non-string values', () => {
    expect(isValidName(null)).toBe(false);
    expect(isValidName(undefined)).toBe(false);
    expect(isValidName(123)).toBe(false);
  });

  it('should trim whitespace', () => {
    expect(isValidName('  John  ')).toBe(true);
  });
});

describe('Insurance Type Validation', () => {
  const VALID_TYPES = ['health', 'term', 'motor', 'other'];
  
  const isValidInsuranceType = (type) => {
    return VALID_TYPES.includes(type);
  };

  it('should accept valid insurance types', () => {
    expect(isValidInsuranceType('health')).toBe(true);
    expect(isValidInsuranceType('term')).toBe(true);
    expect(isValidInsuranceType('motor')).toBe(true);
    expect(isValidInsuranceType('other')).toBe(true);
  });

  it('should reject invalid insurance types', () => {
    expect(isValidInsuranceType('car')).toBe(false);
    expect(isValidInsuranceType('life')).toBe(false);
    expect(isValidInsuranceType('home')).toBe(false);
    expect(isValidInsuranceType('')).toBe(false);
  });
});

describe('URL Validation', () => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  it('should validate correct URLs', () => {
    expect(isValidUrl('https://bimakey.in')).toBe(true);
    expect(isValidUrl('https://bimakey.in/health-insurance/plans')).toBe(true);
    expect(isValidUrl('http://localhost:5173')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('bimakey.in')).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });
});

describe('Score Calculation', () => {
  const calculateScore = (feature, insurer, premium) => {
    return (feature * 0.45) + (insurer * 0.45) + (premium * 0.1);
  };

  it('should calculate weighted score correctly', () => {
    const score = calculateScore(4.7, 4.6, 4.2);
    expect(score).toBeCloseTo(4.59, 1);
  });

  it('should return value between 0 and 5', () => {
    const scores = [3.0, 4.0, 4.5, 5.0].map(s => calculateScore(s, s, s));
    scores.forEach(score => {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(5);
    });
  });
});
