"use client"
import CustomDatePicker from '@/components/ui/customDatePicker';
import { Search, ListFilterIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { CashPaymentData, SortConfig } from '@/types';

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<CashPaymentData>>({ key: null, direction: 'asc' });

    const cashPayments: CashPaymentData[] = useMemo(() => [
        {
            date: new Date("2022-03-04"),
            time: "14:38:43",
            paymentType: "Cash",
            amount: 150.00,
            card: "",
            description: "Folio Payment",
            reference: "Folio",
            idNr: 483,
            user: "jo.asistenteadmon@solusystems.mx"
        },
        {
            date: new Date("2022-02-09"),
            time: "10:38:01",
            paymentType: "Cash",
            amount: 490.00,
            card: "",
            description: "Sale in Food and Drinks",
            reference: "",
            idNr: 678,
            user: "jo.asistenteadmon@solusystems.mx"
        },
        {
            date: new Date("2022-02-09"),
            time: "10:31:19",
            paymentType: "Cash",
            amount: 40.00,
            card: "",
            description: "Folio Payment",
            reference: "Folio",
            idNr: 32,
            user: "jo.asistenteadmon@solusystems.mx"
        }
    ], []);

    // Search functionality - search across multiple fields
    // const filteredPayments = cashPayments.filter(payment =>
    //     payment.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     payment.idNr.toString().includes(searchTerm) ||
    //     payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     payment.amount.toString().includes(searchTerm)
    // );

    const filteredPayments = useMemo(() => {
        return cashPayments.filter(payment =>
            payment.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.idNr.toString().includes(searchTerm) ||
            payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.amount.toString().includes(searchTerm)
        )
    }, [searchTerm, cashPayments])

    const sortedPayments = useMemo(() => {
            if (!sortConfig.key) return filteredPayments;
    
            return [...filteredPayments].sort((a, b) => {
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
        }, [filteredPayments, sortConfig]);

        const handleSort = (key: keyof CashPaymentData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof CashPaymentData }> = ({ sortKey }) => {
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
                                    className="w-full sm:w-[220px] pl-8  pr-3 py-2 border border-gray-400 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
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
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">DATE</div>
                                        <SortIcon sortKey='date'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            PAYMENT<br />TYPE
                                        </div>
                                        <SortIcon sortKey='paymentType'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">AMOUNT</div>
                                        <SortIcon sortKey='amount'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-12">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">CARD</div>
                                        <SortIcon sortKey='card'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            DESCRIPTION<br />AND NOTES
                                        </div>
                                        <SortIcon sortKey='description'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">REFERENCE</div>
                                        <SortIcon sortKey='reference'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">ID NR</div>
                                        <SortIcon sortKey='idNr'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">USER</div>
                                        <SortIcon sortKey='user'/>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedPayments.map((payment: CashPaymentData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <div>
                                                <div>{payment.date.toLocaleDateString('en-GB')}</div>
                                                <div className="text-xs text-gray-500">{payment.time}</div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.paymentType}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.amount}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.card}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.description}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.reference}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.idNr}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <div className=" max-w-[200px]" title={payment.user}>
                                                {payment.user}
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
                        Showing {filteredPayments.length > 0 ? 1 : 0} to {Math.min(10, filteredPayments.length)} of {filteredPayments.length} rows
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