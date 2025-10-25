import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import EquipmentRequest from './equipment-request';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders EquipmentRequest component', () => {
  const wrapper = render(<EquipmentRequest />);
  expect(wrapper).toBeTruthy();
});