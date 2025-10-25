import { expect, test } from 'vitest';
import { GlobalContext } from '../hooks/context-hooks';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SchoolInventoryManagementSystem from './school-inventory-management-system';
import 'element-internals-polyfill';

const mockGlobalState: any = {};
const mockSetGlobalState = () => {};

test('renders SchoolInventoryManagementSystem component', () => {
  const wrapper = render(
    <GlobalContext.Provider value={{ globalState: mockGlobalState, setGlobalState: mockSetGlobalState }}>
      <SchoolInventoryManagementSystem />
    </GlobalContext.Provider>,
    { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});