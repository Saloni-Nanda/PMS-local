import { ChevronDown, X } from 'lucide-react';
import React from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { CustomListbox } from '@/components/ui/Listbox';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  data: {
    type: string;
    currency: string;
    amount: string;
  };
  setData: (data: any) => void;
  paymentTypes: string[];
  currencies: string[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({
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
    <div className="fixed inset-0 bg-[#00000055] flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-2 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-center text-gray-800">Add Payment</h2>

        <CustomListbox
          label="Payment Type"
          value={data.type}
          onChange={(val) => setData({ ...data, type: val })}
          options={paymentTypes}
        />

        <CustomListbox
          label="Currency"
          value={data.currency}
          onChange={(val) => setData({ ...data, currency: val })}
          options={currencies}
        />

        <h2 className="text-sm font-normal text-gray-800">Amount</h2>
        <div className="col-span-1 sm:col-span-2">
          <input
            type="number"
            step="0.01"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
            placeholder="Amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#076DB3] focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 mt-2">
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
  );
};

export default PaymentModal;