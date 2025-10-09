"use client"
import CustomDatePicker from '@/components/ui/customDatePicker';
import { Search, ListFilterIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { PaymentData, SortConfig } from '@/types';
import TableSkeleton from '@/components/ui/TableSkeleton';

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<PaymentData>>({ key: null, direction: 'asc' });
     const [isLoading, setIsLoading] = useState(true);
    
        // Simulate loading data
        React.useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }, []);

    const [payments, setPayments] = useState<PaymentData[]>([
        {
            id: 1,
            paymentId: 'PAY000045',
            commissionId: 'COM000029',
            partner: 'Expedia',
            amount: 3402.00,
            paymentDate: new Date('2022-09-30'),
            paymentMethod: 'Bank Transfer',
            reference: 'BT2209300045',
            processedBy: 'John Doe',
            status: 'Completed'
        },
        {
            id: 2,
            paymentId: 'PAY000044',
            commissionId: 'COM000026',
            partner: 'Corporate Travel Co',
            amount: 3360.00,
            paymentDate: new Date('2022-09-28'),
            paymentMethod: 'Bank Transfer',
            reference: 'BT2209280044',
            processedBy: 'Sarah Smith',
            status: 'Completed'
        },
        {
            id: 3,
            paymentId: 'PAY000043',
            commissionId: 'COM000023',
            partner: 'Booking.com',
            amount: 3250.00,
            paymentDate: new Date('2022-09-15'),
            paymentMethod: 'Wire Transfer',
            reference: 'WT2209150043',
            processedBy: 'John Doe',
            status: 'Completed'
        },
        {
            id: 4,
            paymentId: 'PAY000042',
            commissionId: 'COM000022',
            partner: 'TUI Group',
            amount: 2890.00,
            paymentDate: new Date('2022-09-10'),
            paymentMethod: 'Bank Transfer',
            reference: 'BT2209100042',
            processedBy: 'Sarah Smith',
            status: 'Completed'
        },
        {
            id: 5,
            paymentId: 'PAY000041',
            commissionId: 'COM000021',
            partner: 'Airbnb',
            amount: 2100.00,
            paymentDate: new Date('2022-09-05'),
            paymentMethod: 'ACH Transfer',
            reference: 'ACH2209050041',
            processedBy: 'John Doe',
            status: 'Completed'
        },
    ]);

    const statusOptions = ['Completed', 'Pending', 'Failed', 'Processing'];

    const handleStatusChange = (paymentId: number, newStatus: string) => {
        setPayments(prevPayments =>
            prevPayments.map(payment =>
                payment.id === paymentId
                    ? { ...payment, status: newStatus as PaymentData['status'] }
                    : payment
            )
        );
    };

    // Search functionality - search across multiple fields
    const filteredPayments = useMemo(() => {
        return payments.filter(payment =>
            payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.commissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.processedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.status.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
    }, [searchTerm, payments])

    const sortedPayments = useMemo(() => {
        if (!sortConfig.key) return filteredPayments;

        return [...filteredPayments].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            let comparison = 0;

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredPayments, sortConfig]);

    const handleSort = (key: keyof PaymentData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof PaymentData }> = ({ sortKey }) => {
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
                     {isLoading ? (
                        <TableSkeleton />
                    ) : (
                    <table className="w-full border-1 min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight text-center">PAYMENT <br />ID</div>
                                        <SortIcon sortKey='paymentId'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">
                                            COMMISSION<br />ID
                                        </div>
                                        <SortIcon sortKey='commissionId'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">PARTNER</div>
                                        <SortIcon sortKey='partner'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-12">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">AMOUNT</div>
                                        <SortIcon sortKey='amount'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">
                                            PAYMENT<br />DATE
                                        </div>
                                        <SortIcon sortKey='paymentDate'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">
                                            PAYMENT<br />METHOD
                                        </div>
                                        <SortIcon sortKey='paymentMethod'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">REFERENCE</div>
                                        <SortIcon sortKey='reference'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">PROCESSED <br />BY</div>
                                        <SortIcon sortKey='processedBy'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight text-center">STATUS</div>
                                        <SortIcon sortKey='status'/>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedPayments.map((payment: PaymentData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <div>{payment.paymentId}</div>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.commissionId}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.partner}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.amount}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.paymentDate.toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.paymentMethod}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.reference}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {payment.processedBy}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <select
                                                value={payment.status}
                                                onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                                                className={`px-2 py-1 rounded text-xs border focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ${
                                                    payment.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-300' :
                                                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                                    payment.status === 'Failed' ? 'bg-red-100 text-red-800 border-red-300' :
                                                    'bg-blue-100 text-blue-800 border-blue-300'
                                                }`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
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