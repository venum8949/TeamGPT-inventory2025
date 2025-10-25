import { IgrActionStrip, IgrColumn, IgrGrid, IgrGridEditDoneEventArgs, IgrGridEditingActions, IgrGridPinningActions, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarTitle, IgrPaginator, IgrRowDataEventArgs } from '@infragistics/igniteui-react-grids';
import { Equipment } from '../../models/TeamGPTInventory/equipment';
import { postEquipment } from '../../services/team-gptinventory';
import { useGetEquipmentList } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './admin-inventory-catalog.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';

export default function AdminInventoryCatalog() {
  const classes = createClassTransformer(styles);
  const { teamGPTInventoryEquipment } = useGetEquipmentList();

  async function rowDeletedGrid(e: IgrRowDataEventArgs) {
    // call to end point cannot be generated. Check your end point validity.
  }
  async function rowEditDoneGrid(e: IgrGridEditDoneEventArgs) {
    if (!e.detail.isAddRow) {
      // call to end point cannot be generated. Check your end point validity.
    }
  }
  async function rowAddedGrid(e: IgrRowDataEventArgs) {
    await postEquipment(e.detail.rowData as Equipment);
  }

  return (
    <>
      <div className={classes("column-layout admin-inventory-catalog-container")}>
        <div className={classes("row-layout product-list-container")}>
          <div className={classes("column-layout product-list-main-column")}>
            <div className={classes("column-layout product-list-header")}>
              <h3 className={classes("content")}>
                <span>Inventory Catalog</span>
              </h3>
              <p className={classes("typography__body-1 content")}>
                <span>Browse and request available equipment.</span>
              </p>
            </div>
            <div className={classes("row-layout product-list-content")}>
              <IgrGrid data={teamGPTInventoryEquipment} primaryKey="equipmentId" rowEditable={true} allowFiltering={true} filterMode="excelStyleFilter" onRowDeleted={rowDeletedGrid} onRowEditDone={rowEditDoneGrid} onRowAdded={rowAddedGrid} className={classes("ig-typography ig-scrollbar grid")}>
                <IgrGridToolbar>
                  <IgrGridToolbarActions>
                    <IgrGridToolbarExporter></IgrGridToolbarExporter>
                  </IgrGridToolbarActions>
                  <IgrGridToolbarTitle>
                    <span>Grid Toolbar</span>
                  </IgrGridToolbarTitle>
                </IgrGridToolbar>
                <IgrPaginator perPage={10}></IgrPaginator>
                <IgrColumn field="equipmentId" dataType="number" header="equipmentId" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="name" dataType="string" header="name" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="type" dataType="string" header="type" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="serialNumber" dataType="string" header="serialNumber" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="condition" dataType="string" header="condition" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="status" dataType="string" header="status" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="location" dataType="string" header="location" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="photoUrl" dataType="string" header="photoUrl" sortable={true} selectable={false}></IgrColumn>
                <IgrActionStrip>
                  <IgrGridPinningActions></IgrGridPinningActions>
                  <IgrGridEditingActions addRow={true}></IgrGridEditingActions>
                </IgrActionStrip>
              </IgrGrid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
