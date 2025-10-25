import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import LoginView from './login-view';
import 'element-internals-polyfill';

test('renders LoginView component', () => {
  const wrapper = render(<LoginView />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});