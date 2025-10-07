"use client"
import { Search, Printer } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import RoomChangeModal from './RoomChangeModal'; // Adjust path as needed

import { RoomChangeData, SortConfig } from '@/types';

const Page: React.FC = () => {
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState<RoomChangeData | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig<RoomChangeData>>({ key: null, direction: 'asc' });

    const roomChange: RoomChangeData[] = useMemo(() => [
        {
            roomNumber: "T1_1",
            folioNr: "000316",
            bookingNumber: "MX120043-W2000011",
            roomType: "T1",
            arrivalDate: new Date("2022-03-18"),
            departureDate: new Date("2022-03-20"),
            guestName: "Marcovic Pou"
        },
        {
            roomNumber: "T1_2",
            folioNr: "000316",
            bookingNumber: "MX120043-W2000011",
            roomType: "T1",
            arrivalDate: new Date("2022-04-15"),
            departureDate: new Date("2022-04-18"),
            guestName: "Arcovic Pou"
        }
    ], []);

    const [roomTypeOption, setRoomTypeOption] = useState<'same' | 'change'>('change');
    const [roomForm, setRoomForm] = useState({
        roomType: "",
        roomNumber: "",
        rate: "",
        totalCharge: "",
    });

    // Arrays of strings for dropdown options
    const roomTypeOptions = ["T1", "T2", "D1", "D2", "Suite", "Deluxe"];
    const roomNumberOptions = ["T1_1", "T1_2", "T1_3", "T2_1", "T2_2", "D1_1", "D1_2", "D2_1", "Suite_1"];
    const rateOptions = ["80.00", "100.00", "120.00", "150.00", "180.00", "200.00", "250.00"];
    const totalChargeOptions = ["160.00", "200.00", "240.00", "300.00", "360.00", "400.00", "500.00"];

    const filteredRoomChange = useMemo(() => {
        return roomChange.filter(room =>
            room.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.folioNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.arrivalDate.toString().includes(searchTerm) ||
            room.departureDate.toString().includes(searchTerm)
        )
    }, [searchTerm, roomChange])

    const sortedRoomChange = useMemo(() => {
        if (!sortConfig.key) return filteredRoomChange;

        return [...filteredRoomChange].sort((a, b) => {
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
    }, [filteredRoomChange, sortConfig]);

    const handleSort = (key: keyof RoomChangeData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof RoomChangeData }> = ({ sortKey }) => {
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

    const handlePrint = (booking: RoomChangeData) => {
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
                <div className="p-1 sm:p-2 lg:p-5 border-b border-gray-200">
                    {/* Export and Search Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col lg:flex-row gap-2 order-2 sm:order-1">
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
                                    className="w-full sm:w-[220px] pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='roomNumber' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            FOLIO<br />NR.
                                        </div>
                                        <SortIcon sortKey='folioNr' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='bookingNumber' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />TYPE
                                        </div>
                                        <SortIcon sortKey='roomType' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon sortKey='arrivalDate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            DEPARTURE<br />DATE
                                        </div>
                                        <SortIcon sortKey='departureDate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            GUEST<br />NAME
                                        </div>
                                        <SortIcon sortKey='guestName' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3  font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-12 text-center">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredRoomChange.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedRoomChange.map((room: RoomChangeData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.folioNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.bookingNumber}
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
                                        <td className=" py-3 border-b border-gray-100 text-xs ">
                                            <div className='flex items-center justify-center'>
                                                <button
                                                     className="h-6 w-6 p-0 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center"
                                                    onClick={() => handlePrint(room)}
                                                    title="Print"
                                                >
                                                    <Printer size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Room Change Modal */}
                <RoomChangeModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onAccept={handleAccept}
                    currentBooking={currentBooking}
                    roomTypeOption={roomTypeOption}
                    setRoomTypeOption={setRoomTypeOption}
                    roomForm={roomForm}
                    setRoomForm={setRoomForm}
                    roomTypeOptions={roomTypeOptions}
                    roomNumberOptions={roomNumberOptions}
                    rateOptions={rateOptions}
                    totalChargeOptions={totalChargeOptions}
                />

                {/* Pagination Section */}
                <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                    <div className="text-gray-600 text-sm order-2 sm:order-1">
                        Showing {filteredRoomChange.length > 0 ? 1 : 0} to {Math.min(10, filteredRoomChange.length)} of {filteredRoomChange.length} rows
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                        <button
                            disabled
                            className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                        >
                            <span className="hidden lg:inline">≪ First</span>
                            <span className="lg:hidden">First</span>
                        </button>
                        <button
                            disabled
                            className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                        >
                            <span className="hidden lg:inline">Previous</span>
                            <span className="lg:hidden">‹</span>
                        </button>
                        <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <span className="hidden lg:inline">Next</span>
                            <span className="lg:hidden">›</span>
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <span className="hidden lg:inline">Last ≫</span>
                            <span className="lg:hidden">Last</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;