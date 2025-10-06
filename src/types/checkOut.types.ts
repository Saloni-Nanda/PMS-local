export interface CheckOutData {
    id:number;
  folioNr: number;
  bookingNr: string;
  reservationDate: Date;
  roomNumber: string;
  guest: string;
  checkIn: Date;
  checkOut: Date;
  bookingTotal: number;
  roomTotal: number;
  balance: number;
}