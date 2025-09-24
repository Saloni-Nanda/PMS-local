"use client"
import { Search, ChevronDown, Filter, Edit2, EditIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Link from 'next/link';

interface MaintenanceRecord {
    id: string;
    room: string;
    assignedTo: string;
    reason: string;
    priority: string;
    initiated: Date;
    completed: Date | null;
    outOfOrder: boolean;
    notes: string;
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const statusOptions = ["All Status", "Completed", "In Progress", "Pending"];
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

    const maintenanceRecords: MaintenanceRecord[] = [
        {
            id: "1",
            room: "101",
            assignedTo: "Borgia of the Source",
            reason: "Other motives",
            priority: "High",
            initiated: new Date("2017-09-14"),
            completed: new Date("2017-12-21"),
            outOfOrder: true,
            notes: "Repair Leaks"
        },
        {
            id: "2",
            room: "102",
            assignedTo: "Borgia of the Source",
            reason: "Leaks",
            priority: "Medium",
            initiated: new Date("2017-06-20"),
            completed: new Date("2018-01-18"),
            outOfOrder: false,
            notes: "Under maintenance due to leaks, urgent to repair"
        },
        {
            id: "3",
            room: "104",
            assignedTo: "Borgia of the Source",
            reason: "Leaks",
            priority: "Low",
            initiated: new Date("2017-06-20"),
            completed: new Date("2018-01-18"),
            outOfOrder: false,
            notes: "Under maintenance due to leaks, urgent to repair"
        },
    ];

    const filteredRecords = maintenanceRecords.filter(record =>
        record.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">

                    {/* Export and Search Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
                            <Link href={"/maintainance/add-maintainance"}>
                            <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                                Add
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
                                        <div>ROOM</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            ASSIGNED<br />TO
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>REASON</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>PRIORITY</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>INITIATED</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>COMPLETED</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            OUT OF<br />ORDER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-40">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>NOTES</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No maintenance records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.room}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.assignedTo}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.reason}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.priority !== '-' ? (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(record.priority)}`}>
                                                    {record.priority}
                                                </span>
                                            ) : (
                                                record.priority
                                            )}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.initiated.toLocaleDateString('en-GB')}
                                            <br />
                                            <span className="text-gray-500">{record.initiated.toLocaleTimeString('en-GB', { hour12: false })}</span>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {record.completed ? (
                                                <>
                                                    {record.completed.toLocaleDateString('en-GB')}
                                                    <br />
                                                    <span className="text-gray-500">{record.completed.toLocaleTimeString('en-GB', { hour12: false })}</span>
                                                </>
                                            ) : (
                                                <span className="text-yellow-600">In Progress</span>
                                            )}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.outOfOrder
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {record.outOfOrder ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle">
                                            <div className="text-center" title={record.notes}>
                                                {record.notes}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <Link href={"/maintainance/edit-maintainance"}>
                                            <button className="text-gray-600 hover:text-blue-600 transition-colors">
                                                <EditIcon size={16} />
                                            </button>
                                            </Link>
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

export default Page;