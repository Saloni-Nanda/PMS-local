import { X } from 'lucide-react';
import React from 'react';
import { CustomListbox } from '@/components/ui/Listbox';

type AdvancePaymentData = {
  advancePaymentType: string;
  amountAvailable: string;
  amountAssigned: string;
};

interface AdvancePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  data: AdvancePaymentData;
  setData: (data: AdvancePaymentData) => void;
  paymentTypes: string[];
}



const AdvancePaymentModal: React.FC<AdvancePaymentModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  data,
  setData,
  paymentTypes
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

        <h2 className="text-lg font-semibold text-center text-gray-800">
          Assign Advance Payment on Check-in
        </h2>

        <CustomListbox
          label="Advance Payment Folio"
          value={data.advancePaymentType}
            onChange={(val) => setData({ ...data, advancePaymentType: val })}
          options={paymentTypes}
          //placeholder='select'
        />


        <h2 className="text-sm font-normal text-gray-800">Available Amount</h2>
        <div className="col-span-1 sm:col-span-2">
          <input
            type="number"
            step="0.01"
            value={data.amountAvailable}
            onChange={(e) => setData({ ...data, amountAvailable: e.target.value })}
            placeholder="Amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <h2 className="text-sm font-normal text-gray-800">Assigned Amount</h2>
        <div className="col-span-1 sm:col-span-2">
          <input
            type="number"
            step="0.01"
            value={data.amountAssigned}
            onChange={(e) => setData({ ...data, amountAssigned: e.target.value })}
            placeholder="Amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

export default AdvancePaymentModal;