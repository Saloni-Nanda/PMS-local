"use client"
import { Search, ChevronDown, ListFilterIcon, FileText, X } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface PaymentRecord {
  id: number;
  paymentMethod: string;
  amount: string;
  currency: string;
  date: string;
}

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = ["All", "Unpaid", "Partially Paid", "Paid"];
  const paymentTypes = ["Advance Payment", "Full Payment", "Partial Payment"];
  const currencies = ["MXN (Mexican Peso)", "USD (US Dollar)", "EUR (Euro)"]

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdvancePaymentOpen, setIsAdvancePaymentOpen] = useState(false);
   const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);

  const [paymentModalData, setPaymentModalData] = useState({
    type: paymentTypes[0],
    currency: currencies[0],
    amount: '15.00'
  });

  const [advancePaymentData, setAdvancePaymentData] = useState({
    advancePaymentType: paymentTypes[0],
    amountAvailable: '0.00',
    amountAssigned: '0.00'
  });


  const [depositeModalData, setDepositeModalData] = useState({
    type: paymentTypes[0],
    currency: currencies[0],
    amount: '15.00',
    folio: ''
  });

  const paymentData: PaymentRecord[] = [
   
  ];

  // Filter records based on search term and status
  const filteredRecords = paymentData.filter(record =>
    record.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaymentAction = () => {
    setIsPaymentModalOpen(true);
  };

  const handleAdvancePayment = () => {
    setIsAdvancePaymentOpen(true);
  };

  const handleDepositeAction = () => {
    setIsDepositeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  const advancePaymentCloseModal = () => {
    setIsAdvancePaymentOpen(false);
  };

  const handleDepositeCloseModal = () => {
    setIsDepositeModalOpen(false);
  };

  const handleAcceptPayment = () => {
    handleCloseModal();
  };

  const handleAcceptAdvancePayment = () => {
    advancePaymentCloseModal();
  };

  const handleAcceptDeposite = () => {
    handleDepositeCloseModal();
  };


  const SortIcon: React.FC = () => (
    <span className="ml-1 text-gray-400 text-xs">⇅</span>
  );

  return (
    <div className="">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">
         
          {/* Export and Search Row */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
              <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
              onClick={() => handlePaymentAction()}
              >
                Add Payment
              </button>
              <button className="px-4 sm:px-5 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer"
              onClick={() => handleAdvancePayment()}
              >
                Assign Advance Payment
              </button>
              <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
              onClick={() => handleDepositeAction()}
              >
                Add Deposite
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
                  className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:min-w-[200px] focus:ring focus:ring-blue-200"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section - Always Visible with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full border-1 min-w-[900px]">
            <thead>
              <tr>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-32">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      PAYMENT<br />METHOD
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-40">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      AMOUNT
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      CURRENCY
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      DATE
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                    No records found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => {
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle">
                        <div className="truncate">{record.paymentMethod}</div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle">
                        <div className="truncate">{record.amount}</div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        {record.currency}
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <div className="text-center">
                          <div>${record.date}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-b border-gray-100 text-xs align-middle text-center">
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
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
        </div>

        {/* Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-[#00000055] flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg p-4 w-full max-w-md mx-2 relative space-y-4">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold text-center text-gray-800">Add Payment</h2>

              {/* Payment Type Listbox */}
              <h2 className="text-sm font-normal text-gray-800">Add Payment</h2>
              <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                <Listbox
                  value={paymentModalData.type}
                  onChange={(val) => setPaymentModalData({ ...paymentModalData, type: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {paymentModalData.type}
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                    {paymentTypes.map((type) => (
                      <ListboxOption
                        key={type}
                        value={type}
                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                      >
                        {type}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>

              {/* Currency Listbox */}
              <h2 className="text-sm font-normal text-gray-800">Currency</h2>
              <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                <Listbox
                  value={paymentModalData.currency}
                  onChange={(val) => setPaymentModalData({ ...paymentModalData, currency: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {paymentModalData.currency}
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                    {currencies.map((currency) => (
                      <ListboxOption
                        key={currency}
                        value={currency.split(" ")[0]}
                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                      >
                        {currency}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>

              {/* Amount Input */}
              <h2 className="text-sm font-normal text-gray-800">Amount</h2>
              <div className="col-span-1 sm:col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={paymentModalData.amount}
                  onChange={(e) => setPaymentModalData({ ...paymentModalData, amount: e.target.value })}
                  placeholder="Amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptPayment}
                  className="flex-1 px-3 py-2 bg-[#076DB3] hover:bg-[#054f80] text-white rounded-md text-sm transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

        {isAdvancePaymentOpen && (
          <div className="fixed inset-0 bg-[#00000055] flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg p-4 w-full max-w-md mx-2 relative space-y-4">
              <button
                onClick={advancePaymentCloseModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold text-center text-gray-800">Assign Advance Payment on Check-in</h2>

              {/* Payment Type Listbox */}
              <h2 className="text-sm font-normal text-gray-800">Advance Payment Folio</h2>
              <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                <Listbox
                  value={paymentModalData.type}
                  onChange={(val) => setAdvancePaymentData({ ...advancePaymentData, advancePaymentType: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {paymentModalData.type}
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                    {paymentTypes.map((type) => (
                      <ListboxOption
                        key={type}
                        value={type}
                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                      >
                        {type}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>


              {/* Amount Input */}
              <h2 className="text-sm font-normal text-gray-800">Available Amount</h2>
              <div className="col-span-1 sm:col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={advancePaymentData.amountAvailable}
                  onChange={(e) => setAdvancePaymentData({ ...advancePaymentData, amountAvailable: e.target.value })}
                  placeholder="Amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

               {/* Amount Input */}
              <h2 className="text-sm font-normal text-gray-800">Available Amount</h2>
              <div className="col-span-1 sm:col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={advancePaymentData.amountAssigned}
                  onChange={(e) => setAdvancePaymentData({ ...advancePaymentData, amountAssigned: e.target.value })}
                  placeholder="Amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={advancePaymentCloseModal}
                  className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptAdvancePayment}
                  className="flex-1 px-3 py-2 bg-[#076DB3] hover:bg-[#054f80] text-white rounded-md text-sm transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

        {isDepositeModalOpen && (
          <div className="fixed inset-0 bg-[#00000055] flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg p-4 w-full max-w-md mx-2 relative space-y-4">
              <button
                onClick={handleDepositeCloseModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold text-center text-gray-800">Add Payment</h2>

              {/* Payment Type Listbox */}
              <h2 className="text-sm font-normal text-gray-800">Add Payment</h2>
              <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                <Listbox
                  value={depositeModalData.type}
                  onChange={(val) => setDepositeModalData({ ...depositeModalData, type: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {depositeModalData.type}
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                    {paymentTypes.map((type) => (
                      <ListboxOption
                        key={type}
                        value={type}
                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                      >
                        {type}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>

              {/* Currency Listbox */}
              <h2 className="text-sm font-normal text-gray-800">Currency</h2>
              <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                <Listbox
                  value={depositeModalData.currency}
                  onChange={(val) => setDepositeModalData({ ...depositeModalData, currency: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {depositeModalData.currency}
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                    {currencies.map((currency) => (
                      <ListboxOption
                        key={currency}
                        value={currency.split(" ")[0]}
                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                      >
                        {currency}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>

              {/* Amount Input */}
              <h2 className="text-sm font-normal text-gray-800">Amount</h2>
              <div className="col-span-1 sm:col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={depositeModalData.amount}
                  onChange={(e) => setPaymentModalData({ ...depositeModalData, amount: e.target.value })}
                  placeholder="Amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <h2 className="text-sm font-normal text-gray-800">Internal Folio</h2>
              <div className="col-span-1 sm:col-span-2">
                <input
                  type="text"
                  value={depositeModalData.folio}
                  onChange={(e) => setDepositeModalData({ ...depositeModalData, folio: e.target.value })}
                  placeholder="Internal Folio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleDepositeCloseModal}
                  className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptDeposite}
                  className="flex-1 px-3 py-2 bg-[#076DB3] hover:bg-[#054f80] text-white rounded-md text-sm transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

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

export default Payments;