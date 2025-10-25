import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import AdminEquipmentRequests from './admin-equipment-requests';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders AdminEquipmentRequests component', () => {
  const wrapper = render(<AdminEquipmentRequests />);
  expect(wrapper).toBeTruthy();
});