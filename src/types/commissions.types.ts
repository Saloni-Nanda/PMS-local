export interface CommissionData{
    id: number;
    commissionId: string;
    partner: string;
    type: string;
    rate: number;
    period: string;
    bookings: number;
    revenue: number;
    commission: number;
    dueDate: Date;
    status: 'Paid' | 'Overdue' | 'Pending';
}