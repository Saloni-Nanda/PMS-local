"use client";

import { useState, useEffect } from "react";

// Define Rates type
export interface Rates {
  adult1: string;
  adult2: string;
  adult3: string;
  adult4: string;
  extraAdults: string;
  child: string;
}

interface EditRoomRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (rates: Rates) => void;   // ✅ Strongly typed
  initialRates?: Rates;               // ✅ Matches Rates type
}

export default function EditRoomRateModal({
  isOpen,
  onClose,
  onAccept,
  initialRates,
}: EditRoomRateModalProps) {
  const [rates, setRates] = useState<Rates>({
    adult1: "",
    adult2: "",
    adult3: "",
    adult4: "",
    extraAdults: "",
    child: "",
  });

  // Prefill when modal opens
  useEffect(() => {
    if (initialRates) {
      setRates({
        adult1: initialRates.adult1 ?? "",
        adult2: initialRates.adult2 ?? "",
        adult3: initialRates.adult3 ?? "",
        adult4: initialRates.adult4 ?? "",
        extraAdults: initialRates.extraAdults ?? "",
        child: initialRates.child ?? "",
      });
    }
  }, [initialRates]);

  if (!isOpen) return null;

  const handleChange = (key: keyof Rates, value: string) => {
    setRates((prev) => ({ ...prev, [key]: value }));
  };

  const handleAccept = () => {
    onAccept(rates);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative z-10">
        <h2 className="text-xl font-semibold mb-4">Edit Room Rate</h2>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          {(Object.keys(rates) as (keyof Rates)[]).map((key) => (
            <div key={key}>
              <label className="block mb-1">
                {key === "adult1" ? "1 adult" :
                 key === "adult2" ? "2 adults" :
                 key === "adult3" ? "3 adults" :
                 key === "adult4" ? "4 adults" :
                 key === "extraAdults" ? "Extra adults" :
                 "Child"}
              </label>
              <input
                type="number"
                value={rates[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ))}
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
            className="px-4 py-2 bg-[#076DB3] text-white rounded-lg hover:bg-[#054f80]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
