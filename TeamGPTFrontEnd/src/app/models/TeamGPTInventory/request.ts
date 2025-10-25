import { Equipment } from './equipment';

export interface Request {
  requestId: number;
  equipmentId: number;
  equipment?: Equipment;
  requestedBy: string;
  requestedAt: Date;
  approvedAt?: Date;
  returnedAt?: Date;
  status?: string;
  notes?: string;
}
