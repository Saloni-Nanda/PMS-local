"use client"
import { Search, ChevronDown, ListFilterIcon, X, Printer } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface RoomChange {
    roomNumber: string;
    folioNr: string;
    bookingNumber: string;
    roomType: string;
    arrivalDate: string;
    departureDate: string;
    guestName: string;
}

const Page: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('D1_1');
    const [currentBooking, setCurrentBooking] = useState<RoomChange | null>(null);

    const roomChange: RoomChange[] = [
        {
            roomNumber: "T1_1",
            folioNr: "000316",
            bookingNumber: "MX120043-W2000011",
            roomType: "T1",
            arrivalDate: "27/08/2022",
            departureDate: "28/08/2022",
            guestName: "Marcovic Pou"
        }
    ];

    const [roomTypeOption, setRoomTypeOption] = useState<'same' | 'change'>('change');
    const [roomForm, setRoomForm] = useState({
        roomType: "",
        roomNumber: "",
        rate: "",
        totalCharge: "",
    });

    // ✅ Arrays of strings for dropdown options
    const roomTypeOptions = ["T1", "T2", "D1", "D2", "Suite", "Deluxe"];
    const roomNumberOptions = ["T1_1", "T1_2", "T1_3", "T2_1", "T2_2", "D1_1", "D1_2", "D2_1", "Suite_1"];
    const rateOptions = ["80.00", "100.00", "120.00", "150.00", "180.00", "200.00", "250.00"];
    const totalChargeOptions = ["160.00", "200.00", "240.00", "300.00", "360.00", "400.00", "500.00"];

    // Search functionality - search across multiple fields
    const filteredAssignments = roomChange.filter(assignment =>
        assignment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.folioNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.arrivalDate.includes(searchTerm) ||
        assignment.departureDate.includes(searchTerm)
    );

    const handlePrint = (booking: RoomChange) => {
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

    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

    return (
        <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">
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
                    <table className="w-full border-1 min-w-[800px]">
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            FOLIO<br />NR.
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            GUEST<br />NAME
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-12">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {filteredAssignments.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredAssignments.map((assignment: RoomChange, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.folioNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.bookingNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.roomType}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.arrivalDate}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.departureDate}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {assignment.guestName}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <button
                                                className="text-gray-600 hover:text-[#076DB3] transition-colors p-1 rounded"
                                                onClick={() => handlePrint(assignment)}
                                                title="Print"
                                            >
                                                <Printer className="h-4 w-4" />
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
                    <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">Select Room</h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Current Room Info */}
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="font-medium text-gray-700">Current Room: T1_1</div>
                                            <div className="text-gray-600 mt-1 text-xs">Total Stay : 36.00 MXN</div>
                                            <div className="text-gray-600 text-xs">Total Charge : 24.00 MXN</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-700">Rate Plan: RACK</div>
                                            <div className="text-gray-600 mt-1 text-xs">Nr. Of Nights : 3</div>
                                            <div className="text-gray-600 text-xs">Nights Charged : 2</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Room Type Options */}
                                <div className="space-y-3">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setRoomTypeOption('same')}
                                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${roomTypeOption === 'same'
                                                ? 'bg-white border-gray-300 text-gray-700'
                                                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            Same Room Type
                                        </button>
                                        <button
                                            onClick={() => setRoomTypeOption('change')}
                                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${roomTypeOption === 'change'
                                                ? 'bg-[#076DB3] border-[#076DB3] text-white'
                                                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            Change Room Type
                                        </button>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    {/* Room Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Room Type
                                        </label>
                                        <Listbox
                                            value={roomForm.roomType}
                                            onChange={(val) => setRoomForm({ ...roomForm, roomType: val })}
                                        >
                                            <div className="relative w-full">
                                            <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                                {roomForm.roomType || "Select"}
                                                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                                {roomTypeOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                            </div>
                                        </Listbox>
                                    </div>

                                    {/* Room Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Room Number
                                        </label>
                                        <Listbox
                                            value={roomForm.roomNumber}
                                            onChange={(val) => setRoomForm({ ...roomForm, roomNumber: val })}
                                        >
                                            <div className="relative w-full">
                                            <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                                {roomForm.roomNumber || "Select"}
                                                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                                {roomNumberOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                            </div>
                                        </Listbox>
                                    </div>

                                    {/* Rate */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Rate
                                        </label>
                                        <Listbox
                                            value={roomForm.rate}
                                            onChange={(val) => setRoomForm({ ...roomForm, rate: val })}
                                        >
                                            <div className="relative w-full">
                                            <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                                {roomForm.rate || "Select"}
                                                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                                {rateOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {option} MXN
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                            </div>
                                        </Listbox>
                                    </div>

                                    {/* Total Charge */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Charge
                                        </label>
                                        <Listbox
                                            value={roomForm.totalCharge}
                                            onChange={(val) => setRoomForm({ ...roomForm, totalCharge: val })}
                                        >
                                            <div className="relative w-full">
                                            <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                                {roomForm.totalCharge || "Select"}
                                                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                                {totalChargeOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {option} MXN
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#076DB3] hover:bg-[#054f80] rounded-md transition-colors"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination Section */}
                <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                    <div className="text-gray-600 text-sm order-2 sm:order-1">
                        Showing {filteredAssignments.length > 0 ? 1 : 0} to {Math.min(10, filteredAssignments.length)} of {filteredAssignments.length} rows
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
        </div>
    );
};

export default Page;