"use client"
import CustomDatePicker from '@/components/ui/customDatePicker';
import { Search, ListFilterIcon, Printer } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { CheckOutData, SortConfig } from '@/types';
const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<CheckOutData>>({ key: null, direction: 'asc' });

    const CheckOutDatas: CheckOutData[] = useMemo(() =>[
        {
            id:1,
            folioNr: 317,
            bookingNr: "MX19069 - W2200054",
            reservationDate: new Date("2022-03-17"),
            roomNumber: "D1_1",
            guest: "Javier Garcia",
            checkIn: new Date("2022-03-17"),
            checkOut: new Date("2022-03-17"),
            bookingTotal: -15.00,
            roomTotal: -15.00,
            balance: -15.00
        },
         {
            id:2,
            folioNr: 317,
            bookingNr: "MX19069 - W2200054",
            reservationDate: new Date("2022-03-17"),
            roomNumber: "D1_1",
            guest: "Avier Garcia",
            checkIn: new Date("2022-03-17"),
            checkOut: new Date("2022-03-18"),
            bookingTotal: -15.00,
            roomTotal: -15.00,
            balance: -15.00
        }
    ], []);

    // Search functionality - search across multiple fields
    // const filteredRecords = CheckOutDatas.filter(record =>
    //     record.folioNr.toString().includes(searchTerm) ||
    //     record.bookingNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     record.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     record.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     record.reservationDate.toString().includes(searchTerm) ||
    //     record.checkIn.toString().includes(searchTerm) ||
    //     record.checkOut.toString().includes(searchTerm)
    // );

    const filteredRecords = useMemo(()=>{
        return CheckOutDatas.filter(record =>
record.folioNr.toString().includes(searchTerm) ||
        record.bookingNr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.reservationDate.toString().includes(searchTerm) ||
        record.checkIn.toString().includes(searchTerm) ||
        record.checkOut.toString().includes(searchTerm)
        )
    }, [searchTerm, CheckOutDatas])

    const sortedRecords = useMemo(() => {
            if (!sortConfig.key) return filteredRecords;
    
            return [...filteredRecords].sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
    
                let comparison = 0;
    
                if (aValue instanceof Date && bValue instanceof Date) {
                    comparison = aValue.getTime() - bValue.getTime();
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                }else {
                    comparison = String(aValue).localeCompare(String(bValue));
                }
    
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });
        }, [filteredRecords, sortConfig]);

        const handleSort = (key: keyof CheckOutData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof CheckOutData }> = ({ sortKey }) => {
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
                <div className="p-1 sm:p-2 lg:p-5 border-b border-gray-200">
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
                                <span className="">Filter</span>
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
                                    className="w-full sm:w-[220px] pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            FOLIO<br />NR.
                                        </div>
                                        <SortIcon sortKey='folioNr'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />NR.
                                        </div>
                                        <SortIcon sortKey='bookingNr'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RESERVATION<br />DATE
                                        </div>
                                        <SortIcon sortKey='reservationDate'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />NUMBER
                                        </div>
                                        <SortIcon sortKey='roomNumber'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">GUEST</div>
                                        <SortIcon sortKey='guest'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">CHECK-IN</div>
                                        <SortIcon sortKey='checkIn'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">CHECK-OUT</div>
                                        <SortIcon sortKey='checkOut'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BOOKING<br />TOTAL
                                        </div>
                                        <SortIcon sortKey='bookingTotal'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ROOM<br />TOTAL
                                        </div>
                                        <SortIcon sortKey='roomTotal'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            BALANCE<br />IN ???
                                        </div>
                                        <SortIcon sortKey='balance'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedRecords.map((record: CheckOutData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.folioNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.bookingNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.reservationDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.roomNumber}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.guest}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.checkIn.toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.checkOut.toLocaleDateString()}
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
                                                <button className="h-6 w-6 text-gray-600 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center">
                                                    <Search className="h-4 w-4" />
                                                </button>
                                                <button className="h-6 w-6 text-gray-600 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center">
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

export default Page