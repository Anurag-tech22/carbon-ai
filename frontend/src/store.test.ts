import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store';

describe('Global Store', () => {
  beforeEach(() => {
    useStore.setState({ carbonScore: null, totalEmissions: null });
  });

  it('initializes with null state', () => {
    const state = useStore.getState();
    expect(state.carbonScore).toBeNull();
    expect(state.totalEmissions).toBeNull();
  });

  it('updates the carbon score and total emissions correctly', () => {
    const { setScore } = useStore.getState();
    
    // Execute state update
    setScore(85, 4200);
    
    // Verify state
    const state = useStore.getState();
    expect(state.carbonScore).toBe(85);
    expect(state.totalEmissions).toBe(4200);
  });
});
