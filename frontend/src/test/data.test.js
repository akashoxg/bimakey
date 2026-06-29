import { describe, it, expect } from 'vitest';
import { healthPlans, healthMethodology } from '../data/healthPlans';

describe('Health Plans Data', () => {
  it('should have exactly 5 plans', () => {
    expect(healthPlans.length).toBe(5);
  });

  it('should have plans ranked 1-5', () => {
    const ranks = healthPlans.map(p => p.rank).sort((a, b) => a - b);
    expect(ranks).toEqual([1, 2, 3, 4, 5]);
  });

  it('should have all required plan properties', () => {
    const requiredProps = [
      'rank', 'name', 'insurer', 'type', 'score', 'scoreBreakdown',
      'premiums', 'pros', 'cons', 'keyFeatures', 'externalUrl'
    ];
    
    healthPlans.forEach(plan => {
      requiredProps.forEach(prop => {
        expect(plan).toHaveProperty(prop);
      });
    });
  });

  it('should have valid scores between 0 and 5', () => {
    healthPlans.forEach(plan => {
      expect(plan.score).toBeGreaterThan(0);
      expect(plan.score).toBeLessThanOrEqual(5);
    });
  });

  it('should have valid score breakdown', () => {
    healthPlans.forEach(plan => {
      expect(plan.scoreBreakdown).toHaveProperty('featureRating');
      expect(plan.scoreBreakdown).toHaveProperty('insurerRating');
      expect(plan.scoreBreakdown).toHaveProperty('premiumRating');
      
      Object.values(plan.scoreBreakdown).forEach(rating => {
        expect(rating).toBeGreaterThan(0);
        expect(rating).toBeLessThanOrEqual(5);
      });
    });
  });

  it('should have non-empty pros and cons arrays', () => {
    healthPlans.forEach(plan => {
      expect(plan.pros.length).toBeGreaterThan(0);
      expect(plan.cons.length).toBeGreaterThan(0);
      expect(plan.pros.length).toBeGreaterThan(plan.cons.length);
    });
  });

  it('should have valid premiums array', () => {
    healthPlans.forEach(plan => {
      expect(Array.isArray(plan.premiums)).toBe(true);
      expect(plan.premiums.length).toBeGreaterThan(0);
      
      plan.premiums.forEach(premium => {
        expect(premium).toHaveProperty('profile');
        expect(premium).toHaveProperty('amount');
        expect(premium.amount).toBeGreaterThan(0);
      });
    });
  });

  it('should have valid claim settlement ratios', () => {
    healthPlans.forEach(plan => {
      expect(plan.claimSettlementRatio).toBeGreaterThan(0);
      expect(plan.claimSettlementRatio).toBeLessThanOrEqual(100);
    });
  });

  it('should have valid network hospitals count', () => {
    healthPlans.forEach(plan => {
      expect(plan.networkHospitals).toBeGreaterThan(0);
    });
  });

  it('should have valid external URLs', () => {
    healthPlans.forEach(plan => {
      expect(plan.externalUrl).toMatch(/^https?:\/\/.+/);
    });
  });

  it('should have year 2026', () => {
    healthPlans.forEach(plan => {
      expect(plan.year).toBe(2026);
    });
  });

  it('should have health type for all plans', () => {
    healthPlans.forEach(plan => {
      expect(plan.type).toBe('health');
    });
  });

  it('should have valid sum insured options', () => {
    healthPlans.forEach(plan => {
      expect(Array.isArray(plan.sumInsuredOptions)).toBe(true);
      expect(plan.sumInsuredOptions.length).toBeGreaterThan(0);
      plan.sumInsuredOptions.forEach(option => {
        expect(option).toBeGreaterThan(0);
      });
    });
  });
});

describe('Health Methodology', () => {
  it('should have 3 criteria', () => {
    expect(healthMethodology.criteria.length).toBe(3);
  });

  it('should have criteria with weights summing to 100', () => {
    const totalWeight = healthMethodology.criteria.reduce((sum, c) => sum + c.weight, 0);
    expect(totalWeight).toBe(100);
  });

  it('should have valid criteria properties', () => {
    healthMethodology.criteria.forEach(criterion => {
      expect(criterion).toHaveProperty('name');
      expect(criterion).toHaveProperty('weight');
      expect(criterion).toHaveProperty('description');
      expect(criterion).toHaveProperty('color');
    });
  });

  it('should have Feature Rating at 45%', () => {
    const feature = healthMethodology.criteria.find(c => c.name === 'Feature Rating');
    expect(feature.weight).toBe(45);
  });

  it('should have Insurer Rating at 45%', () => {
    const insurer = healthMethodology.criteria.find(c => c.name === 'Insurer Rating');
    expect(insurer.weight).toBe(45);
  });

  it('should have Premium Rating at 10%', () => {
    const premium = healthMethodology.criteria.find(c => c.name === 'Premium Rating');
    expect(premium.weight).toBe(10);
  });

  it('should have valid colors', () => {
    const validColors = ['teal', 'navy', 'amber', 'green', 'red'];
    healthMethodology.criteria.forEach(criterion => {
      expect(validColors).toContain(criterion.color);
    });
  });
});
