"use client"
import { Search, ChevronDown, ListFilterIcon, X, Printer } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface RoomData {
    id: string;
    roomNumber: string;
    bookingNumber: string;
    ratePlan: string;
    roomType: string;
    arrivalDate: string;
    departureDate: string;
    guestName: string;
    numberOfRooms: string;
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('D1_1');
    const [currentBooking, setCurrentBooking] = useState<RoomData | null>(null);

    const roomSelectionOptions = [
        { value: 'D1_1', label: 'D1_1' },
        { value: 'D1_2', label: 'D1_2' },
        { value: 'D1_3', label: 'D1_3' },
    ];

    const bookings: RoomData[] = [
        {
            id: '1',
            roomNumber: 'DL-3',
            bookingNumber: 'MX120043-W2000011',
            ratePlan: 'RACK',
            roomType: 'D1',
            arrivalDate: '27/08/2022',
            departureDate: '28/08/2022',
            guestName: 'Marcovic Pou',
            numberOfRooms: '1 de: 1'
        }
    ];



    // Search functionality - search across multiple fields
    const filteredBookings = bookings.filter(booking =>
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.arrivalDate.includes(searchTerm) ||
        booking.departureDate.includes(searchTerm)
    );

    const handlePrint = (booking: RoomData) => {
        setCurrentBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBooking(null);
    };

    const handleAccept = () => {
        alert(`Room ${selectedRoom} selected for booking ${currentBooking?.bookingNumber}`);
        handleCloseModal();
    };

    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

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
                                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">From:</label>
                                <input
                                    type="date"
                                    value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
                                    onChange={(e) => setFromDate(new Date(e.target.value))}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">To:</label>
                                <input
                                    type="date"
                                    value={toDate ? toDate.toISOString().split("T")[0] : ""}
                                    onChange={(e) => setToDate(new Date(e.target.value))}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Filter Button */}
                        <div className="flex w-full sm:w-auto">
                            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none w-full sm:w-auto">
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
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                                    <Search size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200"
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />NUMBER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE<br />PLAN
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />TYPE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            DEPARTURE<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">GUEST NAME</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            NUMBER OF<br />ROOMS
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.bookingNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center font-medium">
                                            {booking.ratePlan}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.roomType}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.arrivalDate}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.departureDate}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.guestName}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {booking.numberOfRooms}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <button
                                                onClick={() => handlePrint(booking)}
                                                className="text-gray-600 hover:text-[#076DB3] transition-colors p-1 rounded"
                                                title="Print"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-[#0000005c] flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] mx-4">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Select Room</h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                {/* Current Room Info */}
                                <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">Current Room</span>
                                    <span className="text-gray-900 font-medium">
                                        Room {currentBooking?.roomNumber}
                                    </span>
                                </div>

                                {/* Room Selection Dropdown */}
                                <div className="mb-6 relative">
                                    <Listbox value={selectedRoom} onChange={setSelectedRoom}>
                                        <ListboxButton className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#076DB3] focus:border-[#076DB3] font-medium">
                                            {roomSelectionOptions.find(option => option.value === selectedRoom)?.label || "Select Room"}
                                            <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                        </ListboxButton>

                                        <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-lg shadow-lg z-10">
                                            {roomSelectionOptions.map((option) => (
                                                <ListboxOption
                                                    key={option.value}
                                                    value={option.value}
                                                    className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-700 font-normal data-[focus]:bg-gray-100 data-[focus]:text-gray-700 data-[selected]:font-semibold"
                                                >
                                                    {option.label}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox>
                                </div>


                                {/* Modal Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 px-6 py-2 bg-[#076DB3] text-white rounded-lg hover:bg-[#054f80] font-medium"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Pagination Section */}
            <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                <div className="text-gray-600 text-sm order-2 sm:order-1">
                    Showing {filteredBookings.length > 0 ? 1 : 0} to {Math.min(10, filteredBookings.length)} of {filteredBookings.length} rows
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