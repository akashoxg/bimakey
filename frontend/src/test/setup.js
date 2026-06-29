import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.mock('import.meta.env', () => ({
  VITE_API_BASE_URL: 'http://localhost:5000/api',
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: vi.fn((component) => component),
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: vi.fn(),
  }),
  useInView: () => true,
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
  useNavigate: () => vi.fn(),
  Link: ({ children }) => children,
}));
