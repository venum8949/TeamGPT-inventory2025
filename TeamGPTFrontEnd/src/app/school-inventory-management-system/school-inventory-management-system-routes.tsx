import { redirect } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import InventoryCatalog from './inventory-catalog/inventory-catalog';
import EquipmentRequest from './equipment-request/equipment-request';
import BorrowingHistory from './borrowing-history/borrowing-history';
import AdminEquipmentRequests from './admin-equipment-requests/admin-equipment-requests';
import AdminInventoryCatalog from './admin-inventory-catalog/admin-inventory-catalog';

export const routes = [
  { index: true, loader: () => redirect('dashboard') },
  { path: 'dashboard', element: <Dashboard />, text: 'Dashboard' },
  { path: 'inventory-catalog', element: <InventoryCatalog />, text: 'Inventory Catalog' },
  { path: 'equipment-request', element: <EquipmentRequest />, text: 'Equipment Request' },
  { path: 'equipment-request/:EquipmentID?', element: <EquipmentRequest />, text: 'Equipment Request' },
  { path: 'borrowing-history', element: <BorrowingHistory />, text: 'Borrowing History' },
  { path: 'admin-equipment-requests', element: <AdminEquipmentRequests />, text: 'Admin Equipment Requests' },
  { path: 'admin-inventory-catalog', element: <AdminInventoryCatalog />, text: 'Admin Inventory Catalog' }
];
