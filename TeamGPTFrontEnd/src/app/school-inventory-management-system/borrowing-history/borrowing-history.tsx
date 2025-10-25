import { IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarTitle, IgrPaginator } from '@infragistics/igniteui-react-grids';
import { useGetRequestList } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './borrowing-history.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';

export default function BorrowingHistory() {
  const classes = createClassTransformer(styles);
  const { teamGPTInventoryRequest } = useGetRequestList();

  return (
    <>
      <div className={classes("column-layout borrowing-history-container")}>
        <div className={classes("column-layout history-layout")}>
          <h3 className={classes("content")}>
            <span>My Borrowing History</span>
          </h3>
          <p className={classes("typography__body-1 content")}>
            <span>View your past and current equipment borrowings.</span>
          </p>
          <IgrGrid data={teamGPTInventoryRequest} primaryKey="requestId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar borrowing-history-grid")}>
            <IgrGridToolbar>
              <IgrGridToolbarActions>
                <IgrGridToolbarExporter></IgrGridToolbarExporter>
              </IgrGridToolbarActions>
              <IgrGridToolbarTitle>
                <span>Grid Toolbar</span>
              </IgrGridToolbarTitle>
            </IgrGridToolbar>
            <IgrPaginator perPage={10}></IgrPaginator>
            <IgrColumn field="requestId" dataType="number" header="Request ID" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipmentId" dataType="number" header="Equipment ID" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.name" dataType="string" header="Name" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.type" dataType="string" header="Type" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="status" dataType="string" header="Status" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.serialNumber" dataType="string" header="Serial Number" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.photoUrl" dataType="string" header="Image" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="requestedAt" dataType="date" header="Requested At" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="approvedAt" dataType="date" header="Approved At" sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="returnedAt" dataType="date" header="Returned At" sortable={true} selectable={false}></IgrColumn>
          </IgrGrid>
        </div>
      </div>
    </>
  );
}
