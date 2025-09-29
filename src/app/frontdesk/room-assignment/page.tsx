"use client"
import { Search, Printer, ListFilterIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/customDatePicker';
import RoomAssignmentModal from './RoomAssignmentModal'; // Adjust path as needed

interface RoomData {
    id: string;
    roomNumber: string;
    bookingNumber: string;
    ratePlan: string;
    roomType: string;
    arrivalDate: Date;
    departureDate: Date;
    guestName: string;
    numberOfRooms: string;
}

interface SortConfig {
    key: keyof RoomData | null;
    direction: 'asc' | 'desc';
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('D1_1');
    const [currentBooking, setCurrentBooking] = useState<RoomData | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

    const roomSelectionOptions = [
        { value: 'D1_1', label: 'D1_1' },
        { value: 'D1_2', label: 'D1_2' },
        { value: 'D1_3', label: 'D1_3' },
    ];

    const roomAssign: RoomData[] = [
        {
            id: '1',
            roomNumber: 'DL-3',
            bookingNumber: 'MX120043-W2000011',
            ratePlan: 'RACK',
            roomType: 'D1',
            arrivalDate: new Date("2022-08-27"),
            departureDate: new Date("2022-08-28"),
            guestName: 'Marcovic Pou',
            numberOfRooms: '1 de: 1'
        },
        {
            id: '2',
            roomNumber: 'DL-5',
            bookingNumber: 'MX120043-W2000011',
            ratePlan: 'RACK',
            roomType: 'D1',
            arrivalDate: new Date("2022-08-28"),
            departureDate: new Date("2022-08-29"),
            guestName: 'Marcovic Pou',
            numberOfRooms: '2 de: 1'
        },
        {
            id: '3',
            roomNumber: 'DL-4',
            bookingNumber: 'MX120043-W2000011',
            ratePlan: 'RACK',
            roomType: 'D1',
            arrivalDate: new Date("2022-08-27"),
            departureDate: new Date("2022-08-28"),
            guestName: 'Marcovic Pou',
            numberOfRooms: '1 de: 1'
        },
    ];

    const filteredRoomAssign = useMemo(() => {
        return roomAssign.filter(room =>
            room.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, roomAssign])

    const sortedRoomAssign = useMemo(() => {
        if (!sortConfig.key) return filteredRoomAssign;

        return [...filteredRoomAssign].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            let comparison = 0;

            if (aValue instanceof Date && bValue instanceof Date) {
                comparison = aValue.getTime() - bValue.getTime();
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredRoomAssign, sortConfig]);

    const handleSort = (key: keyof RoomData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof RoomData }> = ({ sortKey }) => {
        const getSortIcon = () => {
            if (sortConfig.key !== sortKey) {
                return <span className=" text-gray-800 text-xs">⇅</span>;
            }

            return sortConfig.direction === 'asc'
                ? <span className=" text-gray-800 text-xs">⇅</span>
                : <span className=" text-gray-800 text-xs">⇅</span>;
        };

        return (
            <button
                onClick={() => handleSort(sortKey)}
                className="hover:bg-gray-300 p-1 rounded transition-colors"
                type="button"
            >
                {getSortIcon()}
            </button>
        );
    };

    const handlePrint = (booking: RoomData) => {
        setCurrentBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBooking(null);
    };

    const handleAccept = () => {
        //alert(`Room ${selectedRoom} selected for booking ${currentBooking?.bookingNumber}`);
        handleCloseModal();
    };

    return (
        <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">
                    {/* Filter Row */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                        {/* Date Inputs */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-800 text-sm sm:text-base whitespace-nowrap">From:</label>
                                <CustomDatePicker
                                    selectedDate={fromDate}
                                    onChange={setFromDate}
                                    placeholder="Select From Date"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-800 text-sm sm:text-base whitespace-nowrap">To:</label>
                                <CustomDatePicker
                                    selectedDate={toDate}
                                    onChange={setToDate}
                                    placeholder="Select To Date"
                                    minDate={fromDate} // prevent To date < From date
                                />
                            </div>
                        </div>

                        {/* Filter Button */}
                        <div className="flex w-full sm:w-auto">
                            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-400 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none w-full sm:w-auto">
                                <ListFilterIcon size={14} />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Export and Search Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
                            <button className="px-4 sm:px-5 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer">
                                Export Excel
                            </button>
                            <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                                Export PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            <div className="relative w-full sm:w-auto">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600">
                                    <Search size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-1 min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='roomNumber'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='bookingNumber'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE<br />PLAN
                                        </div>
                                        <SortIcon sortKey='ratePlan'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />TYPE
                                        </div>
                                        <SortIcon sortKey='roomType'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon sortKey='arrivalDate'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            DEPARTURE<br />DATE
                                        </div>
                                        <SortIcon sortKey='departureDate'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">GUEST NAME</div>
                                        <SortIcon sortKey='guestName'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            NUMBER OF<br />ROOMS
                                        </div>
                                        <SortIcon sortKey='numberOfRooms'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-center font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {sortedRoomAssign.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedRoomAssign.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.bookingNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center font-medium">
                                            {room.ratePlan}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.roomType}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.arrivalDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.departureDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.guestName}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.numberOfRooms}
                                        </td>
                                        
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs">
                                        <div
                                            className="flex items-center justify-center"
                                        >
                                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center" asChild
                                            onClick={() => handlePrint(room)}>
                                                <span>
                                                    <Printer size={14} />
                                                </span>
                                            </Button>
                                        </div>
                                    </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Room Selection Modal */}
                <RoomAssignmentModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onAccept={handleAccept}
                    currentBooking={currentBooking}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    roomOptions={roomSelectionOptions}
                />

            </div>

            {/* Pagination Section */}
            <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                <div className="text-gray-600 text-sm order-2 sm:order-1">
                    Showing {filteredRoomAssign.length > 0 ? 1 : 0} to {Math.min(10, filteredRoomAssign.length)} of {filteredRoomAssign.length} rows
                </div>

                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                    <button
                        disabled
                        className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">≪ First</span>
                        <span className="sm:hidden">≪</span>
                    </button>
                    <button
                        disabled
                        className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">‹</span>
                    </button>
                    <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
                        1
                    </button>
                    <button
                        onClick={() => setCurrentPage(2)}
                        className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">›</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage(2)}
                        className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                    >
                        <span className="hidden sm:inline">Last ≫</span>
                        <span className="sm:hidden">≫</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;