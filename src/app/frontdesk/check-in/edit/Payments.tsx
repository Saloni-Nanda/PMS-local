"use client"
import { Search, FileText } from 'lucide-react';
import React, { useState } from 'react';
import PaymentModal from './modals/PaymentModal';
import AdvancePaymentModal from './modals/AdvancePaymentModal';
import DepositModal from './modals/DepositModal';

interface PaymentRecord {
  id: number;
  paymentMethod: string;
  amount: string;
  currency: string;
  date: string;
}

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setCurrentPage] = useState(1);

  const paymentTypes = ["Advance Payment", "Full Payment", "Partial Payment"];
  const currencies = ["MXN (Mexican Peso)", "USD (US Dollar)", "EUR (Euro)"]

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdvancePaymentOpen, setIsAdvancePaymentOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
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

  const paymentData: PaymentRecord[] = [];

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

  const handleAcceptPayment = () => {
    console.log('Payment data:', paymentModalData);
    setIsPaymentModalOpen(false);
  };

  const handleAcceptAdvancePayment = () => {
    console.log('Advance payment data:', advancePaymentData);
    setIsAdvancePaymentOpen(false);
  };

  const handleAcceptDeposite = () => {
    console.log('Deposit data:', depositeModalData);
    setIsDepositeModalOpen(false);
  };

  const SortIcon: React.FC = () => (
    <span className="ml-1 text-gray-400 text-xs">⇅</span>
  );

  return (
    <div className="">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-1 sm:p-2 lg:p-5 border-b border-gray-200">
          {/* Export and Search Row */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col lg:flex-row gap-2 order-2 sm:order-1">
              <button 
                className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
                onClick={handlePaymentAction}
              >
                Add Payment
              </button>
              <button 
                className="px-4 sm:px-5 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer"
                onClick={handleAdvancePayment}
              >
                Assign Advance Payment
              </button>
              <button 
                className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
                onClick={handleDepositeAction}
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

        {/* Table Section */}
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
                    <div className="leading-tight">AMOUNT</div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">CURRENCY</div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-3 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">DATE</div>
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
                  <td colSpan={5} className="px-3 py-8 text-center text-gray-500">
                    No records found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
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
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors">
                        <FileText size={16} className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onAccept={handleAcceptPayment}
          data={paymentModalData}
          setData={setPaymentModalData}
          paymentTypes={paymentTypes}
          currencies={currencies}
        />

        <AdvancePaymentModal
          isOpen={isAdvancePaymentOpen}
          onClose={() => setIsAdvancePaymentOpen(false)}
          onAccept={handleAcceptAdvancePayment}
          data={advancePaymentData}
          setData={setAdvancePaymentData}
          paymentTypes={paymentTypes}
        />

        <DepositModal
          isOpen={isDepositeModalOpen}
          onClose={() => setIsDepositeModalOpen(false)}
          onAccept={handleAcceptDeposite}
          data={depositeModalData}
          setData={setDepositeModalData}
          paymentTypes={paymentTypes}
          currencies={currencies}
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

export default Payments;