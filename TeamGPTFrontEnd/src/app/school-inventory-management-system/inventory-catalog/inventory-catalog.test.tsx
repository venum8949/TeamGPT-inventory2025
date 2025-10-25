import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import InventoryCatalog from './inventory-catalog';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders InventoryCatalog component', () => {
  const wrapper = render(<InventoryCatalog />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});