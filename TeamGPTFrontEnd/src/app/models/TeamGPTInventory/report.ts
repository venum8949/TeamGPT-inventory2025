export interface Report {
    equipmentName: string;
    requestedBy: string;
    requestedAt: string;
    approvedAt?: string;
    returnedAt?: string;
    status: string;
    notes: string;
}