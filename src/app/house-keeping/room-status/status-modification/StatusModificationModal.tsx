"use client";

import { useEffect, useState } from "react";

type StatusType = "Vacant" | "Occupied";
type ConditionType = "Clean" | "Dirty" | "Cleaning in Progress";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomId: string | null;
  date: string; // comes from main page
  initialStatus: StatusType;
  initialCondition: ConditionType;
  onSave: (status: StatusType, condition: ConditionType) => void;
}

const StatusModificationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  roomId,
  date,
  initialStatus,
  initialCondition,
  onSave,
}) => {
  const [status, setStatus] = useState<StatusType>(initialStatus);
  const [condition, setCondition] = useState<ConditionType>(initialCondition);

  useEffect(() => {
    setStatus(initialStatus);
    setCondition(initialCondition);
  }, [isOpen, initialStatus, initialCondition]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4 text-center">
          Modification of Room Status
        </h3>

        {/* Date + Room */}
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Date:</label>
            <input
              type="date"
              value={date}
              disabled
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col text-right">
            <label className="text-sm text-gray-600">Room No:</label>
            <span className="font-medium text-gray-700">{roomId}</span>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-1 block">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusType)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-400"
          >
            <option value="Vacant">Vacant</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        {/* Condition Dropdown */}
        <div className="mb-6">
          <label className="font-medium text-gray-700 mb-1 block">Condition:</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as ConditionType)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-400"
          >
            <option value="Clean">Clean</option>
            <option value="Dirty">Dirty</option>
            <option value="Cleaning in Progress">Cleaning in Progress</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#076DB3] hover:bg-[#054f80] text-white px-4 py-2 rounded-lg"
            onClick={() => onSave(status, condition)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModificationModal;
