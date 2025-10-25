import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Dashboard from './dashboard';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders Dashboard component', () => {
  const wrapper = render(<Dashboard />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});