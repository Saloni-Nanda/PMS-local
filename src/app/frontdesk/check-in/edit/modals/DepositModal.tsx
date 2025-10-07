import { X } from 'lucide-react';
import React from 'react';
//import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { CustomListbox } from '@/components/ui/Listbox';

interface DepositData {
  type: string;
  currency: string;
  amount: string;
  folio: string;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  data: DepositData;
  setData: (data: DepositData) => void;
  paymentTypes: string[];
  currencies: string[];
}


const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  data,
  setData,
  paymentTypes,
  currencies
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000055] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4 pr-6">Add Deposit</h2>

        <div className="space-y-4">
          <div>
            <CustomListbox
              label="Payment Type"
              value={data.type}
              onChange={(val) => setData({ ...data, type: val })}
              options={paymentTypes}
            //placeholder='select'
            />
          </div>

          <div>
            <CustomListbox
              label="Currency"
              value={data.currency}
              onChange={(val) => setData({ ...data, currency: val })}
              options={currencies}
            //placeholder='select'
            />
          </div>
          <div>
            <h3 className="text-sm font-normal text-gray-800 mb-2">Amount</h3>
            <input
              type="number"
              step="0.01"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
              placeholder="Amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <h3 className="text-sm font-normal text-gray-800 mb-2">Internal Folio</h3>
            <input
              type="text"
              value={data.folio}
              onChange={(e) => setData({ ...data, folio: e.target.value })}
              placeholder="Internal Folio"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-3 py-2 bg-[#076DB3] hover:bg-[#054f80] text-white rounded-md text-sm transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;