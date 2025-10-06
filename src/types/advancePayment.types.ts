export interface AdvancePayments {
  id: string;
  bookingNumber: string;
  arrivalDate: Date;
  guestName: string;
  paymentMethod: string;
  advancePayment: number;
  notAssigned: number;
  currency: string;
}