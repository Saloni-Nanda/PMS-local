// src/types/maintenance.types.ts

export interface MaintenanceData {
    id: string;
    room: string;
    assignedTo: string;
    reason: string;
    priority: string;
    initiated: Date;
    completed: Date | null;
    outOfOrder: boolean;
    notes: string;
}
