import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import AdminInventoryCatalog from './admin-inventory-catalog';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders AdminInventoryCatalog component', () => {
  const wrapper = render(<AdminInventoryCatalog />);
  expect(wrapper).toBeTruthy();
});