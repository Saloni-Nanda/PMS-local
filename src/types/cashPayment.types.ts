export interface CashPaymentData {
    date: Date;
    time: string;
    paymentType: string;
    amount: number;
    card: string;
    description: string;
    reference: string;
    idNr: number;
    user: string;
}