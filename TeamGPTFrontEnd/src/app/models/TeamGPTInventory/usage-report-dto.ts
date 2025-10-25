import { ActiveUserDto } from './active-user-dto';
import { MostBorrowedItemDto } from './most-borrowed-item-dto';
import { UsageByTypeDto } from './usage-by-type-dto';

export interface UsageReportDto {
  timeRange?: string;
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  usageByType?: UsageByTypeDto[];
  mostBorrowedItems?: MostBorrowedItemDto[];
  activeUsers?: ActiveUserDto[];
  averageBorrowDays?: number;
  overdueCount: number;
  availableEquipment: number;
  underRepairEquipment: number;
  returnedRequests: number;
}
