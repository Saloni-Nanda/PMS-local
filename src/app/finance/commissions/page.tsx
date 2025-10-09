"use client"
import { Search, ListFilterIcon, Printer, Plus, Edit } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import CommissionModal from './commissionModal';
import { CommissionData, SortConfig } from '@/types';
import CustomDatePicker from '@/components/ui/customDatePicker';
import TableSkeleton from '@/components/ui/TableSkeleton';

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    const [, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingCommission, setEditingCommission] = useState<CommissionData | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig<CommissionData>>({ key: null, direction: 'asc' });
    const [isLoading, setIsLoading] = useState(true);
    
        // Simulate loading data
        React.useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }, []);

    const commissionData: CommissionData[] = useMemo(() => [
        {
            id: 1,
            commissionId: 'COM000030',
            partner: 'Booking.com',
            type: 'OTA',
            rate: 15,
            bookings: 45,
            revenue: 23450.00,
            commission: 3517.50,
            period: 'Sept 2022',
            dueDate: new Date('2022-10-15'),
            status: 'Pending'
        },
        {
            id: 2,
            commissionId: 'COM000029',
            partner: 'Expedia',
            type: 'OTA',
            rate: 18,
            bookings: 32,
            revenue: 18900.00,
            commission: 3402.00,
            period: 'Sept 2022',
            dueDate: new Date('2022-10-20'),
            status: 'Paid'
        },
        {
            id: 3,
            commissionId: 'COM000028',
            partner: 'Airbnb',
            type: 'OTA',
            rate: 14,
            bookings: 28,
            revenue: 15600.00,
            commission: 2184.00,
            period: 'Sept 2022',
            dueDate: new Date('2022-10-18'),
            status: 'Pending'
        },
        {
            id: 4,
            commissionId: 'COM000027',
            partner: 'Travel Agency Plus',
            type: 'Agency',
            rate: 10,
            bookings: 12,
            revenue: 8400.00,
            commission: 840.00,
            period: 'Aug 2022',
            dueDate: new Date('2022-09-30'),
            status: 'Overdue'
        },
        {
            id: 5,
            commissionId: 'COM000026',
            partner: 'Corporate Travel Co',
            type: 'Corporate',
            rate: 8,
            bookings: 56,
            revenue: 42000.00,
            commission: 3360.00,
            period: 'Aug 2022',
            dueDate: new Date('2022-09-25'),
            status: 'Paid'
        },
    ],[])

    const [commissionForm, setCommissionForm] = useState({
        commissionId: '',
        partner: '',
        type: 'OTA',
        rate: 0,
        bookings: 0,
        revenue: 0,
        commission: 0,
        period: '',
        dueDate: new Date(),
        status: 'Pending'
    });

    const filteredCommissionData = useMemo(() => {
        return commissionData.filter(data =>
            data.commissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.rate.toString().includes(searchTerm) ||
            data.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, commissionData])

    const sortedRoomChange = useMemo(() => {
        if (!sortConfig.key) return filteredCommissionData;

        return [...filteredCommissionData].sort((a, b) => {
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
    }, [filteredCommissionData, sortConfig]);

    const handleSort = (key: keyof CommissionData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortIcon: React.FC<{ sortKey: keyof CommissionData }> = ({ sortKey }) => {
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

    const handlePayment = (commission: CommissionData) => {
        console.log('Pay commission:', commission);
        // Implement print functionality
    };

    const handleOpenAddModal = () => {
        setEditingCommission(null);
        setCommissionForm({
            commissionId: '',
            partner: '',
            type: 'OTA',
            rate: 0,
            bookings: 0,
            revenue: 0,
            commission: 0,
            period: '',
            dueDate: new Date(),
            status: 'Pending'
        });
        setIsAddEditModalOpen(true);
    };

    const handleOpenEditModal = (commission: CommissionData) => {
        setEditingCommission(commission);
        setCommissionForm({
            commissionId: commission.commissionId,
            partner: commission.partner,
            type: commission.type,
            rate: commission.rate,
            bookings: commission.bookings,
            revenue: commission.revenue,
            commission: commission.commission,
            period: commission.period,
            dueDate: commission.dueDate,
            status: commission.status
        });
        setIsAddEditModalOpen(true);
    };

    const handleCloseAddEditModal = () => {
        setIsAddEditModalOpen(false);
        setEditingCommission(null);
    };

    const handleSaveCommission = () => {
        console.log('Saving commission:', commissionForm);
        // Here you would typically save to your backend
        // Example: await saveCommission(commissionForm);
        handleCloseAddEditModal();
    };

    const handleFormChange = (field: string, value: string | number | Date) => {
        setCommissionForm(prev => ({
            ...prev,
            [field]: value
        }));
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
                                    minDate={fromDate}
                                />
                            </div>
                        </div>

                        {/* Filter and Add Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-400 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none">
                                <ListFilterIcon size={14} />
                                <span className="">Filter</span>
                            </button>
                        </div>
                    </div>

                    {/* Export and Search Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col lg:flex-row gap-2 order-2 sm:order-1">
                            <button 
                                onClick={handleOpenAddModal}
                                className="px-4 py-2 bg-[#076DB3] hover:bg-[#054f80] border border-[#076DB3] rounded-md text-sm text-white cursor-pointer flex items-center justify-center gap-2 focus:outline-none">
                                <span className="">＋Add</span>
                            </button>
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
                     {isLoading ? (
                        <TableSkeleton />
                    ) : (
                    <table className="w-full border-1 min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">COMMISSION ID</div>
                                        <SortIcon sortKey='commissionId' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">PARTNER</div>
                                        <SortIcon sortKey='partner' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">TYPE</div>
                                        <SortIcon sortKey='type' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">COMMISSION<br />RATE</div>
                                        <SortIcon sortKey='rate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">PERIOD</div>
                                        <SortIcon sortKey='period' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">BOOKINGS</div>
                                        <SortIcon sortKey='bookings' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">TOTAL<br />REVENUE</div>
                                        <SortIcon sortKey='revenue' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">TOTAL<br />COMMISSION</div>
                                        <SortIcon sortKey='commission' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">DUE DATE</div>
                                        <SortIcon sortKey='dueDate' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-center gap-1 items-center text-center">
                                        <div className="leading-tight">STATUS</div>
                                        <SortIcon sortKey='status' />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-12 text-center">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {filteredCommissionData.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                                        No records found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedRoomChange.map((room: CommissionData) => (
                                    <tr key={room.id} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.commissionId}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.partner}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.type}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.rate}%
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.period}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.bookings}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            ₹{room.revenue.toFixed(2)}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            ₹{room.commission.toFixed(2)}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {room.dueDate.toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                room.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                room.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {room.status}
                                            </span>
                                        </td>
                                        <td className="py-3 border-b border-gray-100 text-xs">
                                            <div className='flex items-center justify-center gap-1'>
                                                <button
                                                    className="h-6 w-6 p-0 cursor-pointer bg-white hover:bg-gray-300 rounded-md transition-colors inline-flex items-center justify-center"
                                                    onClick={() => handleOpenEditModal(room)}
                                                    title="Edit"
                                                >
                                                    <Edit size={12} />
                                                </button>
                                                <button
                                                    className="h-6 w-6 p-0 cursor-pointer bg-white hover:bg-gray-300 rounded-md transition-colors inline-flex items-center justify-center"
                                                    onClick={() => handlePayment(room)}
                                                    title="Print"
                                                >
                                                    <Printer size={12} />
                                                </button>
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
                        Showing {filteredCommissionData.length > 0 ? 1 : 0} to {Math.min(10, filteredCommissionData.length)} of {filteredCommissionData.length} rows
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

            {/* Commission Modal */}
            <CommissionModal
                isOpen={isAddEditModalOpen}
                onClose={handleCloseAddEditModal}
                onSave={handleSaveCommission}
                editingCommission={editingCommission}
                commissionForm={commissionForm}
                handleFormChange={handleFormChange}
            />
        </div>
    );
};

export default Page;