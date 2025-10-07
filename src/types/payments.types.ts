export interface PaymentData {
    id: number;
    paymentId: string;
    commissionId: string;
    partner: string;
    amount: number;
    paymentDate: Date;
    paymentMethod: string;
    reference: string;
    processedBy: string;
    status: 'Completed' | 'Pending' | 'Failed';
}