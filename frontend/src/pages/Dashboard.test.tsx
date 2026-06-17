import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => <div {...props}>{children as React.ReactNode}</div>,
  },
}));

describe('Dashboard Component', () => {
  it('renders dashboard correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(getByText(/Welcome back/i)).toBeTruthy();
  });
});
