"use client"
import { Search, ChevronDown, ListFilterIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BookingData {
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

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [searchTerm, setSearchTerm] = useState('');
    const [_, setCurrentPage] = useState(1);
    const options = ["Arrival Date", "Booking Date"];
    const [searchBy, setSearchBy] = useState(options[0]);

    const bookings: BookingData[] = [
        {
            id: 1,
            arrivalDate: new Date("2022-03-17"),
            reservationDate: new Date("2022-03-17"),
            bookingNumber: 'MX120043-W2200002',
            status: 'New',
            nights: 1,
            guestName: 'Benjamin Bravo Lopez',
            specialRequests: '-',
            total: '100',
            currency: 'MXN',
            ratePlan: 'RACK'
        },
        {
            id: 2,
            arrivalDate: new Date("2022-03-17"),
            reservationDate: new Date("2022-03-17"),
            bookingNumber: 'MX120043-W2200001',
            status: 'New',
            nights: 1,
            guestName: 'javier ibarra',
            specialRequests: '-',
            total: '140.00',
            currency: 'MXN',
            ratePlan: 'RACK'
        }
    ];

    const filteredBookings = bookings.filter(booking =>
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

    return (
        <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-3 border-b border-gray-200">
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
                                    className="px-3 py-2 border border-gray-500 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">To:</label>
                                <input
                                    type="date"
                                    value={toDate ? toDate.toISOString().split("T")[0] : ""}
                                    onChange={(e) => setToDate(new Date(e.target.value))}
                                    className="px-3 py-2 border border-gray-500 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Search By and Filter */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">
                                    Search by:
                                </label>
                                <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                                    <Listbox value={searchBy} onChange={setSearchBy}>
                                        <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-500 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                            {searchBy}
                                            <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                        </ListboxButton>
                                        <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                                            {options.map((option) => (
                                                <ListboxOption
                                                    key={option}
                                                    value={option}
                                                    className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                                                >
                                                    {option}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox>
                                </div>
                            </div>

                            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-500 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none">
                                <ListFilterIcon size={14} />
                                <span className="">Filter</span>
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
                                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:min-w-[200px] focus:ring focus:ring-blue-200"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section - Always Visible with Horizontal Scroll */}
                <div className="overflow-x-auto">
                    <table className="w-full border-1 min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RESERVATION<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-40">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>STATUS</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>NIGHTS</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            GUEST<br />NAME
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            SPECIAL<br />REQUESTS
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>TOTAL</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE<br />PLAN
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.arrivalDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.reservationDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.bookingNumber}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.status}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.nights}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.guestName}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.specialRequests}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.total}<br />{booking.currency}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                        {booking.ratePlan}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-xs">
                                        <Link
                                            href="/bookings/search/see"
                                            className="flex items-center justify-center"
                                        >
                                            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" asChild>
                                                <Search />
                                            </Button>
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className=" py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                    <div className="text-gray-600 text-sm order-2 sm:order-1">
                        Showing 1 to 10 of 20 rows
                    </div>

                    <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center">
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
                            <span className="">Previous</span>
                        </button>
                        <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <span className="">Next</span>
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