"use client"
import { Search, ChevronDown, ListFilterIcon, FileText } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import CustomDatePicker from '@/components/ui/customDatePicker';
import PaymentModal from './PaymentModal';
import TableSkeleton from '@/components/ui/TableSkeleton';

interface AccountReceivableData {
  id: number;
  guestName: string;
  bookingNumber: string;
  roomNumber: string;
  originalAmount: number;
  paidAmount: number;
  date: Date;
  notes: string;
}
interface SortConfig {
  key: keyof AccountReceivableData | null;
  direction: 'asc' | 'desc';
}

const Page: React.FC = () => {
  const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
  const [toDate, setToDate] = useState(new Date("2022-08-20"));
  const [searchTerm, setSearchTerm] = useState('');
  const [, setCurrentPage] = useState(1);

  const statusOptions = ["All", "Unpaid", "Partially Paid", "Paid"];
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AccountReceivableData | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

   const [isLoading, setIsLoading] = useState(true);
  
      // Simulate loading data
      React.useEffect(() => {
          const timer = setTimeout(() => {
              setIsLoading(false);
          }, 1500);
          return () => clearTimeout(timer);
      }, []);
  

  const accountsReceivables: AccountReceivableData[] = useMemo(() => [
    {
      id: 1,
      guestName: "Javier Garcia",
      bookingNumber: "MX19069-W2200054",
      roomNumber: "D1_1",
      originalAmount: 100.00,
      paidAmount: 0.00,
      date: new Date("2025-09-23"),
      notes: "er.systems@solution.com"
    },
    {
      id: 2,
      guestName: "Maria Rodriguez",
      bookingNumber: "MX19070-W2200055",
      roomNumber: "D1_2",
      originalAmount: 250.00,
      paidAmount: 100.00,
      date: new Date("2025-09-22"),
      notes: "Partial payment made"
    },
    {
      id: 3,
      guestName: "Carlos Martinez",
      bookingNumber: "MX19071-W2200056",
      roomNumber: "D1_3",
      originalAmount: 150.00,
      paidAmount: 0.00,
      date: new Date("2025-09-29"),
      notes: "carlos.martinez@email.com"
    }
  ], []);

  const filteredRecords = useMemo(() => {
    return accountsReceivables.filter(record =>
      record.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.toString().includes(searchTerm)
    )
  }, [searchTerm, accountsReceivables])

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
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredRecords, sortConfig]);

  const handleSort = (key: keyof AccountReceivableData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const SortIcon: React.FC<{ sortKey: keyof AccountReceivableData }> = ({ sortKey }) => {
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

  const handlePaymentAction = (record: AccountReceivableData) => {
    setSelectedRecord(record);
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedRecord(null);
  };

  const handleAcceptPayment = () => {
    handleCloseModal();
  };

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

            {/* Status Filter and Filter Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-normal text-gray-800 text-sm sm:text-base whitespace-nowrap">
                  Status:
                </label>
                <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                  <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-400 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                      {selectedStatus}
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-1 w-full py-2 bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                      {statusOptions.map((option) => (
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
                <span className="">Filter</span>
              </button>
            </div>
          </div>

          {/* Export and Search Row */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
              <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                Add Payment
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
                  className="pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm w-full sm:min-w-[200px] focus:ring focus:ring-blue-200 placeholder-gray-600"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section - Always Visible with Horizontal Scroll */}
        <div className="overflow-x-auto">
           {isLoading ? (
                        <TableSkeleton />
                    ) : (
          <table className="w-full border-1 min-w-[900px]">
            <thead>
              <tr>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      GUEST<br />NAME
                    </div>
                    <SortIcon sortKey='guestName' />
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
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      ROOM<br />NUMBER
                    </div>
                    <SortIcon sortKey='roomNumber' />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-28">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      ORIGINAL<br />AMOUNT
                    </div>
                    <SortIcon sortKey='originalAmount' />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      PAID<br />AMOUNT
                    </div>
                    <SortIcon sortKey='paidAmount' />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                  <div className="flex justify-center gap-1 items-center">
                    <div>DATE</div>
                    <SortIcon sortKey='date' />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                  <div className="flex justify-center gap-1 items-center">
                    <div>NOTES</div>
                    <SortIcon sortKey='notes' />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-center font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-16">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                    No records found matching your search criteria.
                  </td>
                </tr>
              ) : (
                sortedRecords.map((record) => {
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className="truncate">{record.guestName}</div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className="truncate">{record.bookingNumber}</div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        {record.roomNumber}
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className="text-center">
                          <div>${record.originalAmount}</div>
                          <div className="text-xs text-gray-500">MXN</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className="text-center">
                          <div>${record.paidAmount}</div>
                          <div className="text-xs text-gray-500">MXN</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        {record.date.toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className=" max-w-[150px]" title={record.notes}>
                          {record.notes}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <button
                          onClick={() => handlePaymentAction(record)}
                          className="inline-flex items-center justify-center w-6 h-6  cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors"
                        >
                          <FileText size={16} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
                    )}
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          selectedRecord={selectedRecord}
          onClose={handleCloseModal}
          onAccept={handleAcceptPayment}
        />

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