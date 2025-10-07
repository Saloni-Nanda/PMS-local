"use client"
import { Search, ChevronDown, ListFilterIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/customDatePicker';

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

interface SortConfig {
    key: keyof BookingData | null;
    direction: 'asc' | 'desc';
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [searchTerm, setSearchTerm] = useState('');
    const [, setCurrentPage] = useState(1);
    const options = ["Arrival Date", "Booking Date"];
    const [searchBy, setSearchBy] = useState(options[0]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

    const bookings: BookingData[] = useMemo(() =>[
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
            reservationDate: new Date("2022-03-15"),
            bookingNumber: 'MX120043-W2200001',
            status: 'New',
            nights: 1,
            guestName: 'Javier Ibarra',
            specialRequests: '-',
            total: '140.00',
            currency: 'MXN',
            ratePlan: 'RACK'
        },
        {
            id: 3,
            arrivalDate: new Date("2022-03-16"),
            reservationDate: new Date("2022-03-17"),
            bookingNumber: 'MX120043-W2200003',
            status: 'New',
            nights: 1,
            guestName: 'Xavier Ibarra',
            specialRequests: '-',
            total: '140.00',
            currency: 'MXN',
            ratePlan: 'RACK'
        }
    ],[]);

    const filteredBookings = useMemo(() => {
        return bookings.filter(booking =>
            booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, bookings]);

    const sortedBookings = useMemo(() => {
        if (!sortConfig.key) return filteredBookings;

        return [...filteredBookings].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            let comparison = 0;

            if (aValue instanceof Date && bValue instanceof Date) {
                comparison = aValue.getTime() - bValue.getTime();
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else if (sortConfig.key === 'total') {
                // Handle total as numeric string
                const aNum = parseFloat(String(aValue));
                const bNum = parseFloat(String(bValue));
                comparison = aNum - bNum;
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredBookings, sortConfig]);

    const handleSort = (key: keyof BookingData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof BookingData }> = ({ sortKey }) => {
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

                        {/* Search By and Filter */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="font-normal text-gray-800 text-sm sm:text-base whitespace-nowrap">
                                    Search by:
                                </label>
                                <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                                    <Listbox value={searchBy} onChange={setSearchBy}>
                                        <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-400 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
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

                            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-400 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none">
                                <ListFilterIcon size={14} />
                                <span>Filter</span>
                            </button>
                        </div>
                    </div>

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
                                    className="pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm w-full sm:min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section - Always Visible with Horizontal Scroll */}
                <div className="overflow-x-auto">
                    <table className="w-full border-1 min-w-[700px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon sortKey='arrivalDate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RESERVATION<br />DATE
                                        </div>
                                        <SortIcon sortKey='reservationDate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-40">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='bookingNumber' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>STATUS</div>
                                        <SortIcon sortKey='status' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>NIGHTS</div>
                                        <SortIcon sortKey='nights' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            GUEST<br />NAME
                                        </div>
                                        <SortIcon sortKey='guestName' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            SPECIAL<br />REQUESTS
                                        </div>
                                        <SortIcon sortKey='specialRequests' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>TOTAL</div>
                                        <SortIcon sortKey='total' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE<br />PLAN
                                        </div>
                                        <SortIcon sortKey='ratePlan' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedBookings.map((booking) => (
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
                                        <td className=" py-3 border-b border-gray-100 text-xs text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-5 w-5 bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center"
                                                asChild
                                            >
                                                <Link href="/bookings/search/see">
                                                    <Search size={16} />
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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