import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RegisterView from './register-view';
import 'element-internals-polyfill';

test('renders RegisterView component', () => {
  const wrapper = render(<RegisterView />, { wrapper: MemoryRouter });
  expect(wrapper).toBeTruthy();
});