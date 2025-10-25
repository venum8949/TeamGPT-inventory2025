import { useGlobalContext } from '../hooks/context-hooks';
import { IgrDropdown, IgrDropdownItem, IgrIconButton, IgrNavbar, IgrNavDrawer, IgrNavDrawerItem, IgrRipple } from '@infragistics/igniteui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import styles from './school-inventory-management-system.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';

export default function SchoolInventoryManagementSystem() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const mainNavDrawer = useRef<IgrNavDrawer>(null);
  const dropdown = useRef<IgrDropdown>(null);
  const { globalState, setGlobalState } = useGlobalContext();

  function clickGroup() {
    setGlobalState({ ...globalState, user: undefined });
    localStorage.removeItem('user');
    navigate(`/login-view`);
  }

  return (
    <>
      <div className={classes("column-layout school-inventory-management-system-container")}>
        <IgrNavbar className={classes("main-navbar")}>
          <div style={{ display: 'contents' }} slot="start" onClick={() => mainNavDrawer?.current?.toggle()}>
            <IgrIconButton variant="flat">
              <span className={classes("material-icons")}>
                <span>menu</span>
              </span>
              <IgrRipple></IgrRipple>
            </IgrIconButton>
          </div>
          <div className={classes("row-layout group")}>
            <h6 className={classes("h6")}>
              <span>School Inventory</span>
            </h6>
            <div className={classes("row-layout navbar-content-row")}>
              <span className={classes("material-icons site-icon")}>
                <span>school</span>
              </span>
              <h6 className={classes("site-name-title")}>
                <span>School Inventory</span>
              </h6>
            </div>
          </div>
          <div style={{ display: 'contents' }} slot="end">
            <IgrIconButton onClick={(e) => dropdown?.current?.toggle(e.currentTarget)} variant="flat">
              <span className={classes("material-icons")}>
                <span>account_circle</span>
              </span>
              <IgrRipple></IgrRipple>
            </IgrIconButton>
          </div>
        </IgrNavbar>
        <div className={classes("row-layout main-horizontal-group")}>
          <IgrNavDrawer open={true} position="relative" ref={mainNavDrawer} className={classes("main-nav-drawer")}>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/dashboard`)}>
              <IgrNavDrawerItem>
                <div slot="content">Dashboard</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/inventory-catalog`)}>
              <IgrNavDrawerItem>
                <div slot="content">Inventory Catalog</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/equipment-request`)}>
              <IgrNavDrawerItem>
                <div slot="content">Request Equipment</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/borrowing-history`)}>
              <IgrNavDrawerItem>
                <div slot="content">Borrowing History</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/admin-equipment-requests`)}>
              <IgrNavDrawerItem>
                <div slot="content">Admin Requests</div>
              </IgrNavDrawerItem>
            </div>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/admin-inventory-catalog`)}>
              <IgrNavDrawerItem>
                <div slot="content">Admin Inventory Catalog</div>
              </IgrNavDrawerItem>
            </div>
          </IgrNavDrawer>
          <div className={classes("main-page-container")}>
            <Outlet></Outlet>
          </div>
        </div>
        <IgrDropdown ref={dropdown} className={classes("dropdown")}>
          <div style={{ display: 'contents' }} onClick={clickGroup}>
            <IgrDropdownItem>
              <span>LOGOUT</span>
            </IgrDropdownItem>
          </div>
        </IgrDropdown>
      </div>
    </>
  );
}
