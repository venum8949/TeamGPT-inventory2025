export interface UsageByTypeDto {
  type?: string;
  borrowCount: number;
  totalCount: number;
  available: number;
  inUse: number;
  underRepair: number;
  retired: number;
}
