export interface CheckInBookingData {
    bookingNumber: string;
    ratePlan: string;
    room: string;
    arrivalDate: Date;
    departureDate: Date;
    price: number;
    currency: string;
    guestName: string;
    email: string;
}