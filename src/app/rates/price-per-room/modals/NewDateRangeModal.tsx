"use client";

import { useState } from "react";

interface NewDateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (from: string, to: string) => void;
}

export default function NewDateRangeModal({
  isOpen,
  onClose,
  onAccept,
}: NewDateRangeModalProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  if (!isOpen) return null;

  const handleAccept = () => {
    if (fromDate && toDate) {
      onAccept(fromDate, toDate);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">New Range</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">From :</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">To :</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
