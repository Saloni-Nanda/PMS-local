"use client"
import {EditIcon, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import { CheckInBookingData, SortConfig } from '@/types';
import TableSkeleton from '@/components/ui/TableSkeleton';

const Page: React.FC = () => {
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<CheckInBookingData>>({ key: null, direction: 'asc' });
    const [isLoading, setIsLoading] = useState(true);
    
        // Simulate loading data
        React.useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }, []);

    const checkInBookings: CheckInBookingData[] = useMemo(() => [
        {
            bookingNumber: "MX120043-W2000011",
            ratePlan: "000316",
            room: "D1",
            arrivalDate: new Date("2022-08-25"),
            departureDate: new Date("2022-08-27"),
            price: 15.00,
            currency: "MXN",
            guestName: "Marcovic Pou",
            email: "test@test.com",
        },
        {
            bookingNumber: "MX120044-W2000012",
            ratePlan: "000317",
            room: "D2",
            arrivalDate: new Date("2022-08-23"),
            departureDate: new Date("2022-08-29"),
            price: 25.00,
            currency: "MXN",
            guestName: "John Smith",
            email: "john@test.com",
        },
        {
            bookingNumber: "MX120045-W2000013",
            ratePlan: "000318",
            room: "D3",
            arrivalDate: new Date("2022-08-26"),
            departureDate: new Date("2022-08-30"),
            price: 30.00,
            currency: "MXN",
            guestName: "Maria Garcia",
            email: "maria@test.com",
        }
    ], []);

    // Search functionality - search across multiple fields
    // const filteredBookings = checkInBookings.filter(booking =>
    //     booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     booking.price.toString().includes(searchTerm)
    // );

    const filteredBookings = useMemo(() => {
        return checkInBookings.filter(booking =>
            booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.price.toString().includes(searchTerm)
        )
    }, [searchTerm, checkInBookings])

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
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredBookings, sortConfig]);

    const handleSort = (key: keyof CheckInBookingData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof CheckInBookingData }> = ({ sortKey }) => {
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
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
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
                                    className="w-full sm:w-[220px] pl-8  pr-3 py-2 border border-gray-400 rounded-md text-sm  focus:ring focus:ring-blue-200 placeholder-gray-600"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='bookingNumber' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">
                                            RATE PLAN
                                        </div>
                                        <SortIcon sortKey='ratePlan' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">ROOM</div>
                                        <SortIcon sortKey='room' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon sortKey='arrivalDate' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">
                                            DEPARTURE<br />DATE
                                        </div>
                                        <SortIcon sortKey='departureDate' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">PRICE</div>
                                        <SortIcon sortKey='price' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">CURRENCY</div>
                                        <SortIcon sortKey='currency' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">
                                            GUEST NAME
                                        </div>
                                        <SortIcon sortKey='guestName' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">EMAIL</div>
                                        <SortIcon sortKey='email' />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-center font-medium text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <div className="leading-tight">ACTION</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedBookings.map((booking: CheckInBookingData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.bookingNumber}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.ratePlan}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.room}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.arrivalDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.departureDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.price}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.currency}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.guestName}
                                        </td>
                                        <td className="px-3 py-3 text-xs text-center">
                                            {booking.email}
                                        </td>
                                        <td className="px-3 py-3 text-xs">
                                            <div className="flex justify-center items-center">
                                                <Link href={"/frontdesk/check-in/edit"}>
                                                    <button className="h-5 w-5 text-black cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center">
                                                        <EditIcon size={14} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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