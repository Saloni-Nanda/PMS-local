import React from 'react';
import { X } from 'lucide-react';
import { CustomListbox } from '@/components/ui/Listbox';

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

interface PaymentModalProps {
  isOpen: boolean;
  selectedRecord: AccountReceivableData | null;
  onClose: () => void;
  onAccept: () => void;
}

interface PaymentFormData {
  type: string;
  currency: string;
  amount: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  selectedRecord,
  onClose,
  onAccept
}) => {
  const paymentTypes = ["Advance Payment", "Full Payment", "Partial Payment"];
  const currencies = ["MXN (Mexican Peso)", "USD (US Dollar)", "EUR (Euro)"];

  const [paymentData, setPaymentData] = React.useState<PaymentFormData>({
    type: paymentTypes[0],
    currency: currencies[0],
    amount: '15.00'
  });

  if (!isOpen || !selectedRecord) return null;

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

        {/* Payment Type Listbox */}
        <CustomListbox
          label="Add Payment"
          value={paymentData.type}
          onChange={(val) => setPaymentData({ ...paymentData, type: val })}
          options={paymentTypes}
        />

        {/* Currency Listbox */}
        <CustomListbox
          label="Currency"
          value={paymentData.currency}
          onChange={(val) => setPaymentData({ ...paymentData, currency: val })}
          options={currencies}
        />

        {/* Amount Input */}
        <div>
          <h2 className="text-sm font-normal text-gray-800 mb-2">Amount</h2>
          <input
            type="number"
            step="0.01"
            value={paymentData.amount}
            onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
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

export default PaymentModal;