"use client"
import { Search, ListFilterIcon, Printer } from 'lucide-react';
import React, { useState } from 'react';

interface CheckInOutRecord {
  folioNr: string;
  bookingNr: string;
  reservationDate: string;
  roomNumber: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  bookingTotal: string;
  roomTotal: string;
  balance: string;
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const checkInOutRecords: CheckInOutRecord[] = [
        {
            folioNr: "000317",
            bookingNr: "MX19069 - W2200054",
            reservationDate: "26/08/2022",
            roomNumber: "D1_1",
            guest: "Javier Garcia",
            checkIn: "26/08/2022",
            checkOut: "27/08/2022",
            bookingTotal: "-15.00",
            roomTotal: "-15.00",
            balance: "-15.00"
        }
    ];

    // Search functionality - search across multiple fields
    const filteredRecords = checkInOutRecords.filter(record =>
        record.folioNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.bookingNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.reservationDate.includes(searchTerm) ||
        record.checkIn.includes(searchTerm) ||
        record.checkOut.includes(searchTerm)
    );

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
                                            BOOKING<br />NR.
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RESERVATION<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />NUMBER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">GUEST</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">CHECK-IN</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">CHECK-OUT</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />TOTAL
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />TOTAL
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BALANCE<br />IN ???
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
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record: CheckInOutRecord, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.folioNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.bookingNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.reservationDate}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.guest}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.checkIn}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.checkOut}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.bookingTotal}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.roomTotal}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.balance}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button className="text-gray-600 hover:text-[#076DB3] transition-colors">
                                                    <Search className="h-4 w-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-[#076DB3] transition-colors">
                                                    <Printer className="h-4 w-4" />
                                                </button>
                                            </div>
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
                        Showing {filteredRecords.length > 0 ? 1 : 0} to {Math.min(10, filteredRecords.length)} of {filteredRecords.length} rows
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

export default Page