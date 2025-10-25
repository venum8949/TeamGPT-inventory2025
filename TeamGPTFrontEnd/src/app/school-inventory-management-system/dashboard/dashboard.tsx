import { IgrAvatar, IgrCard, IgrCardContent, IgrCardHeader, IgrList, IgrListItem } from '@infragistics/igniteui-react';
import { IgrCategoryChart, IgrCategoryChartModule } from '@infragistics/igniteui-react-charts';
import { IgrColumn, IgrGrid } from '@infragistics/igniteui-react-grids';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MostBorrowedItemDto } from '../../models/TeamGPTInventory/most-borrowed-item-dto';
import { useGetHistoryReport, useGetUsageReportDto } from '../../hooks/team-gptinventory-hooks';
import '@infragistics/igniteui-react-grids/grids/combined.js';
import styles from './dashboard.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';
import { useGlobalContext } from '../../hooks/context-hooks';

IgrCategoryChartModule.register();

export default function Dashboard() {
  const classes = createClassTransformer(styles);
  const uuid = () => crypto.randomUUID();
  const navigate = useNavigate();
  const [lowStockListSelectedItem, setLowStockListSelectedItem] = useState<MostBorrowedItemDto | undefined>();
  const { globalState } = useGlobalContext();
  const { teamGPTInventoryUsageReportDto: report } = useGetUsageReportDto(globalState.user?.accessToken ?? '');
  const { teamGPTInventoryHistoryReport: historyReport } = useGetHistoryReport();

  return (
    <>
      <div className={classes("row-layout dashboard-container")}>
        <div className={classes("column-layout dashboard-content-layout")}>
          <div className={classes("column-layout dashboard-header-section")}>
            <h4 className={classes("content")}>
              <span>Admin Dashboard</span>
            </h4>
            <p className={classes("typography__body-1 content")}>
              <span>Overview of inventory and requests.</span>
            </p>
          </div>
          <div className={classes("row-layout dashboard-metrics-section")}>
            <IgrCard className={classes("metric-card-available")}>
              <IgrCardHeader>
                <div slot="thumbnail">
                  <IgrAvatar shape="circle" className={classes("available-items-avatar")}>
                    <span className={classes("material-icons icon")}>
                      <span>check_circle_outline</span>
                    </span>
                  </IgrAvatar>
                </div>
                <h3 slot="title">
                  <span>Available Items</span>
                </h3>
                <h5 slot="subtitle">
                  <span></span>
                </h5>
              </IgrCardHeader>
              <IgrCardContent className={classes("body-content")}>
                <div className={classes("column-layout available-items-content")}>
                  <h3 className={classes("available-items-value")}>
                    <span>{report?.availableEquipment}</span>
                  </h3>
                </div>
              </IgrCardContent>
            </IgrCard>
            <IgrCard className={classes("metric-card-available")}>
              <IgrCardHeader>
                <div slot="thumbnail">
                  <IgrAvatar shape="circle" className={classes("available-items-avatar_1")}>
                    <span className={classes("material-icons icon")}>
                      <span>assignment_return</span>
                    </span>
                  </IgrAvatar>
                </div>
                <h3 slot="title">
                  <span>Checked Out Items</span>
                </h3>
                <h5 slot="subtitle">
                  <span></span>
                </h5>
              </IgrCardHeader>
              <IgrCardContent className={classes("body-content")}>
                <div className={classes("column-layout available-items-content")}>
                  <h3 className={classes("available-items-value")}>
                    <span>{report?.approvedRequests}</span>
                  </h3>
                </div>
              </IgrCardContent>
            </IgrCard>
            <div style={{ display: 'contents' }} onClick={() => navigate(`/school-inventory-management-system/admin-equipment-requests`)}>
              <IgrCard className={classes("metric-card-available")}>
                <IgrCardHeader>
                  <div slot="thumbnail">
                    <IgrAvatar shape="circle" className={classes("available-items-avatar_2")}>
                      <span className={classes("material-icons icon")}>
                        <span>hourglass_empty</span>
                      </span>
                    </IgrAvatar>
                  </div>
                  <h3 slot="title">
                    <span>Pending Requests</span>
                  </h3>
                  <h5 slot="subtitle">
                    <span></span>
                  </h5>
                </IgrCardHeader>
                <IgrCardContent className={classes("body-content")}>
                  <div className={classes("column-layout available-items-content")}>
                    <h3 className={classes("available-items-value")}>
                      <span>{report?.pendingRequests}</span>
                    </h3>
                  </div>
                </IgrCardContent>
              </IgrCard>
            </div>
            <IgrCard className={classes("metric-card-available")}>
              <IgrCardHeader>
                <div slot="thumbnail">
                  <IgrAvatar shape="circle" className={classes("available-items-avatar_3")}>
                    <span className={classes("material-icons icon")}>
                      <span>build</span>
                    </span>
                  </IgrAvatar>
                </div>
                <h3 slot="title">
                  <span>Under Repair</span>
                </h3>
                <h5 slot="subtitle">
                  <span></span>
                </h5>
              </IgrCardHeader>
              <IgrCardContent className={classes("body-content")}>
                <div className={classes("column-layout available-items-content")}>
                  <h3 className={classes("available-items-value")}>
                    <span>{report?.underRepairEquipment}</span>
                  </h3>
                </div>
              </IgrCardContent>
            </IgrCard>
            <IgrCard className={classes("metric-card-available")}>
              <IgrCardHeader>
                <div slot="thumbnail">
                  <IgrAvatar shape="circle" className={classes("available-items-avatar_4")}>
                    <span className={classes("material-icons icon")}>
                      <span>disabled_by_default</span>
                    </span>
                  </IgrAvatar>
                </div>
                <h3 slot="title">
                  <span>Rejected Requests</span>
                </h3>
                <h5 slot="subtitle">
                  <span></span>
                </h5>
              </IgrCardHeader>
              <IgrCardContent className={classes("body-content")}>
                <div className={classes("column-layout available-items-content")}>
                  <h3 className={classes("available-items-value")}>
                    <span>{report?.rejectedRequests}</span>
                  </h3>
                </div>
              </IgrCardContent>
            </IgrCard>
            <IgrCard className={classes("metric-card-available")}>
              <IgrCardHeader>
                <div slot="thumbnail">
                  <IgrAvatar shape="circle" className={classes("available-items-avatar_5")}>
                    <span className={classes("material-icons icon")}>
                      <span>recycling</span>
                    </span>
                  </IgrAvatar>
                </div>
                <h3 slot="title">
                  <span>Returned</span>
                </h3>
                <h5 slot="subtitle">
                  <span></span>
                </h5>
              </IgrCardHeader>
              <IgrCardContent className={classes("body-content")}>
                <div className={classes("column-layout available-items-content")}>
                  <h3 className={classes("available-items-value")}>
                    <span>{report?.returnedRequests}</span>
                  </h3>
                </div>
              </IgrCardContent>
            </IgrCard>
          </div>
          <div className={classes("column-layout dashboard-statistics-section")}>
            <div className={classes("column-layout charts-and-grid-column")}>
              <div className={classes("row-layout charts-row")}>
                <div className={classes("column-layout category-chart-section-1")}>
                  <div className={classes("column-layout dashboard-header-section")}>
                    <h5 className={classes("content")}>
                      <span>Equipment Usage by Type</span>
                    </h5>
                    <p className={classes("typography__body-2 content")}>
                      <span>Breakdown of checked-out items.</span>
                    </p>
                  </div>
                  <div className={classes("group")}>
                    <IgrCategoryChart dataSource={report?.usageByType} computedPlotAreaMarginMode="Series"></IgrCategoryChart>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes("row-layout list-column")}>
              <div className={classes("column-layout grid-section")}>
                <div className={classes("column-layout dashboard-header-section")}>
                  <h5 className={classes("content")}>
                    <span>Recent Equipment Activity</span>
                  </h5>
                  <p className={classes("typography__body-2 content")}>
                    <span>Latest check-outs and returns.</span>
                  </p>
                </div>
                <IgrGrid data={historyReport} primaryKey="equipmentName" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar recent-activity-grid")}>
									<IgrColumn field="equipmentName" dataType="string" header="equipmentName" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="requestedBy" dataType="string" header="requestedBy" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="requestedAt" dataType="date" header="requestedAt" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="approvedAt" dataType="date" header="approvedAt" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="returnedAt" dataType="date" header="returnedAt" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="status" dataType="string" header="status" sortable={true} selectable={false}></IgrColumn>
									<IgrColumn field="notes" dataType="string" header="notes" sortable={true} selectable={false}></IgrColumn>
								</IgrGrid>
              </div>
              <div className={classes("column-layout low-stock-alerts-list-section")}>
                <div className={classes("column-layout dashboard-header-section")}>
                  <h5 className={classes("content")}>
                    <span>Most Borrowed</span>
                  </h5>
                </div>
                <IgrList className={classes("low-stock-list")}>
                  {report?.mostBorrowedItems?.map((item) => (
                    <div style={{ display: 'contents' }} onClick={() => setLowStockListSelectedItem(item)} key={uuid()}>
                      <IgrListItem selected={lowStockListSelectedItem != null && lowStockListSelectedItem === item}>
                        <div slot="start">
                          <IgrAvatar shape="circle" className={classes("low-stock-item-1-avatar low-stock-item-1-avatar_1")}>
                            <span className={classes("material-icons icon_1")}>
                              <span>trending_up</span>
                            </span>
                          </IgrAvatar>
                        </div>
                        <div slot="title">{item.name}</div>
                        <div slot="subtitle">{item.borrowCount}</div>
                      </IgrListItem>
                    </div>
                  ))}
                </IgrList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
