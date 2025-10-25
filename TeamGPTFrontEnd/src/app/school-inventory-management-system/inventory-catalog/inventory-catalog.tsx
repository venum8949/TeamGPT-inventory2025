import { IgrButton, IgrRipple } from '@infragistics/igniteui-react';
import { IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarAdvancedFiltering, IgrGridToolbarTitle, IgrPaginator } from '@infragistics/igniteui-react-grids';
import { useNavigate } from 'react-router-dom';
import { useGetEquipmentList } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './inventory-catalog.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';

export default function InventoryCatalog() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const { teamGPTInventoryEquipment } = useGetEquipmentList();

  const columnBodyTemplate = (ctx: IgrCellTemplateContext) => {
    return (
      <>
        <IgrButton type="button" onClick={() => navigate(`/school-inventory-management-system/equipment-request`)} className={classes("button")}>
          <span>Request</span>
          <IgrRipple></IgrRipple>
        </IgrButton>
      </>
    )
  }

  return (
    <>
      <div className={classes("column-layout inventory-catalog-container")}>
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
              <IgrGrid data={teamGPTInventoryEquipment} primaryKey="equipmentId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
                <IgrGridToolbar>
                  <IgrGridToolbarActions>
                    <IgrGridToolbarAdvancedFiltering></IgrGridToolbarAdvancedFiltering>
                  </IgrGridToolbarActions>
                  <IgrGridToolbarTitle>
                    <span>Grid Toolbar</span>
                  </IgrGridToolbarTitle>
                </IgrGridToolbar>
                <IgrPaginator perPage={10}></IgrPaginator>
                <IgrColumn header="Request" bodyTemplate={columnBodyTemplate} filterable={false} selectable={false}></IgrColumn>
                <IgrColumn field="name" dataType="string" header="name" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="photoUrl" dataType="image" header="photoUrl" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="type" dataType="string" header="type" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="serialNumber" dataType="string" header="serialNumber" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="condition" dataType="string" header="condition" sortable={true} selectable={false}></IgrColumn>
                <IgrColumn field="status" dataType="string" header="status" sortable={true} selectable={false}></IgrColumn>
              </IgrGrid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
