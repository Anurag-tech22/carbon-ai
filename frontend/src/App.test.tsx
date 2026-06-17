import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

// Mocking framer-motion and recharts to prevent issues in testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => <div {...props}>{children as React.ReactNode}</div>,
  },
  AnimatePresence: ({ children }: Record<string, unknown>) => <>{children}</>,
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: Record<string, unknown>) => <div className="recharts-wrapper">{children as React.ReactNode}</div>,
  AreaChart: ({ children }: Record<string, unknown>) => <div className="area-chart">{children as React.ReactNode}</div>,
  Area: () => <div className="area" />,
  XAxis: () => <div className="x-axis" />,
  YAxis: () => <div className="y-axis" />,
  CartesianGrid: () => <div className="grid" />,
  Tooltip: () => <div className="tooltip" />,
}));

describe('App Root Component', () => {
  it('renders without crashing', () => {
    // Basic test to verify the app mounts
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
