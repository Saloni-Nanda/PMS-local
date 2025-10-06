"use client"
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CalendarDays,
    Users,
    MapPin,
    CreditCard,
    Building,
    Clock,
    FileText,
    Home,
    Bed,
    Calendar,
    Settings,
    Settings2,
} from 'lucide-react';

interface GuestInfo {
    name: string;
    document: string;
    nationality: string;
    customerType: string;
    origin: string;
    destination: string;
}

interface Address {
    customer: string,
    guest: string,
    roomNo: string
}

interface Room {
    folio: string,
    adults: number,
    children: number
}

interface Booking {
    bookingNo: string,
    rateplan: string,
    total: number
}

interface Date {
    arrival: string,
    departure: string,
    nights: number
}


interface RegistrationData {
    guest: GuestInfo;
    address: Address;
    room: Room;
    booking: Booking;
    date: Date;
    totalDeposite: number;
    Date: string;
    Time: string;
}


interface InfoRowProps {
    label: string;
    value: string | number;
    icon?: React.ElementType;
}

const Confirmation: React.FC = () => {
    const registrationData: RegistrationData = {
        guest: {
            name: 'María Elena Rodriguez',
            document: 'CURP123456789',
            nationality: 'Mexico',
            customerType: 'Premium Guest',
            origin: 'Guadalajara, Mexico',
            destination: 'Business Travel',
        },
        address: {
            customer: 'abcdefgh',
            guest: 'abcdefgh',
            roomNo: '67'
        },
        room: {
            folio: 'cjj',
            adults: 4,
            children: 6
        },
        booking:{
            bookingNo: '6754332456',
            rateplan: 'hgsfdhsavx',
            total: 4
        },
        date:{
            arrival: '05/09/2025',
            departure: '09/08/2026',
            nights: 5
        },
        totalDeposite: 0.00,
        Date:'05/09/2025',
        Time: '06:30'
    };

    const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon: Icon }) => (
        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-2">
                {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
                <span className="text-xs sm:text-sm text-gray-600 font-medium">{label}:</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-900 font-semibold text-right break-words max-w-[50%]">{value}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 md:p-4">
            <div className="max-w-5xl mx-auto">
                {/* Hotel Header */}
                <Card className="mb-3 sm:mb-4 shadow-sm border-0 bg-white">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-base sm:text-xl font-bold text-gray-900">HOTEL PRUEBA MEXICO</h1>
                                    <p className="text-gray-500 text-[10px] sm:text-xs flex items-center">
                                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                        57 E 57th St, Ciudad de Mexico
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-[#076DB3] text-lg sm:text-xl font-bold my-2 sm:my-3 px-1">
                    Registration Card
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* Left Column */}
                    <div className="space-y-3 sm:space-y-4">
                        {/* Guest Information */}
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            {/* Compact Header */}
                            <div className="flex items-center space-x-2 px-3 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                <h2 className="text-xs sm:text-sm font-medium text-gray-900">
                                    Guest Information
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="p-2.5 sm:p-3 space-y-1.5 text-sm">
                                <InfoRow label="Full Name" value={registrationData.guest.name} />
                                <InfoRow label="Document ID" value={registrationData.guest.document} />
                                <InfoRow label="Nationality" value={registrationData.guest.nationality} />
                                <InfoRow label="Origin City" value={registrationData.guest.origin} />
                                <InfoRow label="Travel Purpose" value={registrationData.guest.destination} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 sm:space-y-4">
                        {/* Address */}
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            {/* Compact Header */}
                            <div className="flex items-center space-x-2 px-3 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                <h2 className="text-xs sm:text-sm font-medium text-gray-900">
                                    Address
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="p-2.5 sm:p-3 space-y-1.5 text-sm">
                                <InfoRow label="Customer" value={registrationData.address.customer} />
                                <InfoRow label="Guest" value={registrationData.address.guest} />
                                <InfoRow label="Room No" value={registrationData.address.roomNo} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#076DB3] text-lg sm:text-xl font-bold my-2 sm:my-3 px-1">
                    Stay Info
                </div>

                {/* Stay Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {/* Room Info */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center space-x-2 px-3 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                <h2 className="text-xs sm:text-sm font-medium text-gray-900">
                                    Room
                                </h2>
                            </div>

                            <div className="p-2.5 sm:p-3 space-y-1.5 text-sm">
                                <InfoRow label="Folio" value={registrationData.room.folio} />
                                <InfoRow label="Adults" value={registrationData.room.adults} />
                                <InfoRow label="Children" value={registrationData.room.children} />
                            </div>
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center space-x-2 px-3 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                <h2 className="text-xs sm:text-sm font-medium text-gray-900">
                                    Booking Info
                                </h2>
                            </div>

                            <div className="p-2.5 sm:p-3 space-y-1.5 text-sm">
                                <InfoRow label="Booking no." value={registrationData.booking.bookingNo} />
                                <InfoRow label="Rate Plan" value={registrationData.booking.rateplan} />
                                <InfoRow label="Total" value={registrationData.booking.total} />
                            </div>
                        </div>
                    </div>

                    {/* Date Info */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center space-x-2 px-3 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                <h2 className="text-xs sm:text-sm font-medium text-gray-900">
                                    Date
                                </h2>
                            </div>

                            <div className="p-2.5 sm:p-3 space-y-1.5 text-sm">
                                <InfoRow label="Arrival Date" value={registrationData.date.arrival} />
                                <InfoRow label="Departure Date" value={registrationData.date.departure} />
                                <InfoRow label="Nights" value={registrationData.date.nights} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-3 sm:mt-4 shadow-sm border-0 bg-white rounded-md">
                    <CardContent className="p-2.5 sm:p-3">
                        <InfoRow label="Total Deposite" value={registrationData.totalDeposite} />
                        <InfoRow 
                            label="Date" 
                            value={`${registrationData.Date} ${registrationData.Time}`} 
                        />
                    </CardContent>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;