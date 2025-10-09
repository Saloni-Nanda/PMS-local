export interface BookingData {
    id: number;
    arrivalDate: Date;
    reservationDate: Date;
    bookingNumber: string;
    status: string;
    nights: number;
    guestName: string;
    specialRequests: string;
    total: string;
    currency: string;
    ratePlan: string;
}