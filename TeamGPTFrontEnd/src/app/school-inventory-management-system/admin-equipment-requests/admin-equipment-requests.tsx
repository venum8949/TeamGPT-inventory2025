import { IgrButton, IgrRipple } from '@infragistics/igniteui-react';
import { IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarTitle } from '@infragistics/igniteui-react-grids';
import { useState } from 'react';
import { getRequest } from '../../services/team-gptinventory';
import { Request } from '../../models/TeamGPTInventory/request';
import { useGetRequestList1 } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './admin-equipment-requests.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';

export default function AdminEquipmentRequests() {
  const classes = createClassTransformer(styles);
  const [selected_Request, setSelected_Request] = useState<Request | undefined>();
  const { teamGPTInventoryRequest } = useGetRequestList1();

  async function clickButton() {
    await getRequest((selected_Request as Request)?.requestId ?? 0);
  }
  async function clickButton1() {
    await getRequest((selected_Request as Request)?.requestId ?? 0);
  }
  async function clickButton2() {
    await getRequest((selected_Request as Request)?.requestId ?? 0);
  }

  return (
    <>
      <div className={classes("column-layout admin-equipment-requests-container")}>
        <div className={classes("column-layout admin-requests-layout")}>
          <h3 className={classes("content")}>
            <span>Equipment Requests</span>
          </h3>
          <p className={classes("typography__body-1 content")}>
            <span>Manage and approve/reject equipment borrowing requests.</span>
          </p>
          <IgrGrid data={teamGPTInventoryRequest} primaryKey="requestId" rowSelection="single" allowFiltering={true} filterMode="excelStyleFilter" onRowSelectionChanging={(e) => setSelected_Request(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar admin-requests-grid")}>
            <IgrGridToolbar>
              <IgrGridToolbarActions>
                <IgrGridToolbarExporter></IgrGridToolbarExporter>
              </IgrGridToolbarActions>
              <IgrGridToolbarTitle>
                <span>Grid Toolbar</span>
              </IgrGridToolbarTitle>
            </IgrGridToolbar>
            <IgrColumn field="requestId" dataType="number" header="Request ID" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipmentId" dataType="number" header="Equipment ID" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.name" dataType="string" header="Name" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.type" dataType="string" header="Type" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.serialNumber" dataType="string" header="Serial Number" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.condition" dataType="string" header="Condition" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.status" dataType="string" header="Status" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.location" dataType="string" header="Location" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="equipment.photoUrl" dataType="string" header="Image" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="requestedBy" dataType="string" header="Requested By" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="requestedAt" dataType="date" header="Requested At" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="approvedAt" dataType="date" header="Approved At" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="returnedAt" dataType="date" header="Returned At" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="status" dataType="string" header="Return" groupable={true} sortable={true} selectable={false}></IgrColumn>
            <IgrColumn field="notes" dataType="string" header="Comment" groupable={true} sortable={true} selectable={false}></IgrColumn>
          </IgrGrid>
          <div className={classes("row-layout group")}>
            <IgrButton type="button" onClick={clickButton} className={classes("button button_1")}>
              <span>RETURN</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
            <IgrButton type="button" onClick={clickButton1} className={classes("button button_2")}>
              <span>Approve</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
            <IgrButton type="button" onClick={clickButton2} className={classes("button button_3")}>
              <span>Reject</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
          </div>
        </div>
      </div>
    </>
  );
}
