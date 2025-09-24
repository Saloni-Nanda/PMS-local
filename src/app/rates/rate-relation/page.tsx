"use client"
import React, { useState } from 'react';
import { Search, Edit2, Trash2, EditIcon, ListFilterIcon } from 'lucide-react';
import Link from 'next/link';

interface RateRelatedData {
    id: string;
    baseRate: string;
    rateRelated: string;
    value: number;
    relationType: string;
}

const Page: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState(new Date("2022-08-20"));

    const rateData: RateRelatedData[] = [
        {
            id: "1",
            baseRate: "RACK",
            rateRelated: "AGEN",
            value: 10.00,
            relationType: "Percentage-Decrement"
        },
        {
            id: "2",
            baseRate: "RACK",
            rateRelated: "COMERCIAL",
            value: 10.00,
            relationType: "Percentage-Decrement"
        },
        {
            id: "3",
            baseRate: "RACK",
            rateRelated: "CONVENIO",
            value: 10.00,
            relationType: "Percentage-Decrement"
        },
        {
            id: "4",
            baseRate: "RACK",
            rateRelated: "HOTELREZ",
            value: 0.00,
            relationType: "Percentage-Decrement"
        }
    ];

    const filteredData = rateData.filter(item =>
        item.baseRate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rateRelated.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.relationType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

    return (
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
                                value={date ? date.toISOString().split("T")[0] : ""}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                            />
                        </div>
                    </div>
                    <button className="px-4 sm:px-6 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none">
                        <ListFilterIcon size={14} />
                        <span className="hidden sm:inline">Filter</span>
                    </button>

                </div>
                {/* Export and Search Row */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
                        <Link href="/rates/rate-relation/edit">
                            <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                                Add Relation
                            </button>
                        </Link>
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
                                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] focus:ring focus:ring-[#076DB3]"
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
                            <th className="bg-gray-50 px-4 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
                                <div className="flex justify-center gap-1 items-center">
                                    <div className="leading-tight">
                                        BASE RATE
                                    </div>
                                    <SortIcon />
                                </div>
                            </th>
                            <th className="bg-gray-50 px-4 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
                                <div className="flex justify-center gap-1 items-center">
                                    <div className="leading-tight">
                                        RATE RELATED
                                    </div>
                                    <SortIcon />
                                </div>
                            </th>
                            <th className="bg-gray-50 px-4 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
                                <div className="flex justify-center gap-1 items-center">
                                    <div>VALUE</div>
                                    <SortIcon />
                                </div>
                            </th>
                            <th className="bg-gray-50 px-4 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
                                <div className="flex justify-center gap-1 items-center">
                                    <div className="leading-tight">
                                        RELATION TYPE
                                    </div>
                                    <SortIcon />
                                </div>
                            </th>
                            <th className="bg-gray-50 px-4 py-3 text-center font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 bg-white">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No data found matching your search criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <td className="px-4 py-3 border-b border-gray-100 text-xs align-middle text-gray-700 text-center">
                                        {item.baseRate}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-100 text-xs align-middle text-gray-700 text-center">
                                        {item.rateRelated}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-100 text-xs align-middle text-gray-700 text-center">
                                        {item.value.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-100 text-xs align-middle text-gray-700 text-center">
                                        {item.relationType}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-100 text-xs align-middle text-center ">
                                        <div className="flex justify-center gap-2">
                                            <Link href="/rates/rate-relation/edit">
                                                <button className="text-blue-500 hover:text-blue-700 transition-colors p-1">
                                                    <EditIcon size={14} />
                                                </button>
                                            </Link>
                                            <button className="text-red-500 hover:text-red-700 transition-colors p-1 mb-1">
                                                <Trash2 size={14} />
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
            <div className="px-4 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3 bg-white">
                <div className="text-gray-600 text-sm order-2 sm:order-1">
                    Showing {filteredData.length > 0 ? 1 : 0} to {Math.min(10, filteredData.length)} of {filteredData.length} rows
                </div>

                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                    <button
                        disabled
                        className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed "
                    >
                        <span className="hidden sm:inline">≪ First</span>
                        <span className="sm:hidden">≪</span>
                    </button>
                    <button
                        disabled
                        className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed "
                    >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">‹</span>
                    </button>
                    <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
                        1
                    </button>
                    <button className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50 ">
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">›</span>
                    </button>
                    <button className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50 ">
                        <span className="hidden sm:inline">Last ≫</span>
                        <span className="sm:hidden">≫</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;