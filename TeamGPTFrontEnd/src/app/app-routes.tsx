import { redirect } from 'react-router-dom';
import LoginView from './login-view/login-view';
import RegisterView from './register-view/register-view';
import SchoolInventoryManagementSystem from './school-inventory-management-system/school-inventory-management-system';
import { routes as schoolInventoryManagementSystemRoute } from './school-inventory-management-system/school-inventory-management-system-routes';

export const routes = [
  { index: true, loader: () => redirect('login-view') },
  { path: 'login-view', element: <LoginView />, text: 'Login View' },
  { path: 'register-view', element: <RegisterView />, text: 'Register View' },
  { path: 'school-inventory-management-system', element: <SchoolInventoryManagementSystem />, text: 'School Inventory Management System', children: schoolInventoryManagementSystemRoute }
];
