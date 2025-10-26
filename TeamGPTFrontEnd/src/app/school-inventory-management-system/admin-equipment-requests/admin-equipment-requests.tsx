import { IgrButton, IgrRipple } from '@infragistics/igniteui-react';
import { IgrColumn, IgrGrid, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarExporter, IgrGridToolbarTitle } from '@infragistics/igniteui-react-grids';
import { useRef, useState } from 'react';
// removed unused getRequest import; buttons now call approve/return/reject handlers directly
import { Request } from '../../models/TeamGPTInventory/request';
import { useGetRequestList1 } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './admin-equipment-requests.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';
import { approveRequest, returnRequest, rejectRequest } from '../../services/team-gptinventory';

export default function AdminEquipmentRequests() {
  const classes = createClassTransformer(styles);
  const [selected_Request, setSelected_Request] = useState<Request | undefined>();
  const { teamGPTInventoryRequest, requestTeamGPTInventoryRequest } = useGetRequestList1();
  const grid = useRef<IgrGrid>(null);
  // Top row buttons will call the existing handlers directly (handleReturn/handleApprove/handleReject)

  async function handleReturn() {
    if (!selected_Request) return;
    try {
      await returnRequest(selected_Request.requestId);
      console.log('Върнато');
      // презареди списъка със заявки чрез hook-а
      requestTeamGPTInventoryRequest();
      grid.current?.deselectAllRows();
      setSelected_Request(undefined);
    } catch (error) {
      console.error('Грешка при връщане:', error);
    }
  }

  async function handleReject() {
    if (!selected_Request) return;
    try {
      await rejectRequest(selected_Request.requestId);
      console.log('Отхвърлено');
      requestTeamGPTInventoryRequest();
      grid.current?.deselectAllRows();
      setSelected_Request(undefined);
    } catch (error) {
      console.error('Грешка при отхвърляне:', error);
    }
  }

  async function handleApprove() {
    console.log('Натиснат е бутон APPROVE');
    console.log('Избрана заявка:', selected_Request);

    if (!selected_Request) {
      console.warn('Няма избрана заявка');
      return;
    }

    try {
      console.log('Изпращам заявка към бекенда...');
      await approveRequest(selected_Request.requestId);
      console.log('Одобрено успешно');
      requestTeamGPTInventoryRequest();
      grid.current?.deselectAllRows();
      setSelected_Request(undefined);
    } catch (error) {
      console.error('Грешка при одобрение:', error);
    }
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
          <IgrGrid ref={grid} data={teamGPTInventoryRequest} primaryKey="requestId" rowSelection="single" allowFiltering={true} filterMode="excelStyleFilter" onRowSelectionChanging={(e) => setSelected_Request(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar admin-requests-grid")}>
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
            <IgrButton type="button" onClick={handleReturn} disabled={!selected_Request || selected_Request.status !== 'Approved'} className={classes("button button_1")}>
              <span>RETURN</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
            <IgrButton type="button" onClick={handleApprove} disabled={!selected_Request || selected_Request.status !== 'Pending'} className={classes("button button_2")}>
              <span>Approve</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
            <IgrButton type="button" onClick={handleReject} disabled={!selected_Request || selected_Request.status !== 'Pending'} className={classes("button button_3")}>
              <span>Reject</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
          </div>
        </div>
      </div>
    </>
  );
}
