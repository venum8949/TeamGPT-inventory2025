import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import BorrowingHistory from './borrowing-history';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders BorrowingHistory component', () => {
  const wrapper = render(<BorrowingHistory />);
  expect(wrapper).toBeTruthy();
});