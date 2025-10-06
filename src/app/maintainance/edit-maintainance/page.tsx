"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { CustomListbox } from '@/components/ui/Listbox';

const Page: React.FC = () => {
  // Form state
  const [roomNumber, setRoomNumber] = useState("101");
  const [assignedTo, setAssignedTo] = useState("Borja de la Fuente");
  const [causeReason, setCauseReason] = useState("Leaks");
  const [priority, setPriority] = useState("High");
  const [statusAfterMaintenance, setStatusAfterMaintenance] = useState("Clean");
  const [nights, setNights] = useState("10");
  const [notes, setNotes] = useState("Reparar puerta");
  const [outOfOrder, setOutOfOrder] = useState(true);

  // Dropdown options
  const roomNumbers = ["101", "102", "103", "104", "105"];
  const assignedToOptions = ["Borja de la Fuente", "Maria Garcia", "Carlos Rodriguez", "Ana Martinez"];
  const causeReasonOptions = ["Leaks", "Electrical Issues", "Plumbing", "HVAC", "Furniture Repair", "Cleaning"];
  const priorityOptions = ["High", "Medium", "Low"];
  const statusOptions = ["Clean", "Dirty", "Needs Inspection", "Ready"];

  const router = useRouter()

  const handleSubmit = (action: string) => {
    router.back()
  };

  return (
    <div className="bg-white rounded-lg p-1 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-3xl font-extrabold tracking-wide
    text-[#076DB3] mb-6 relative inline-block
    after:content-[''] after:block  after:h-[3px]
    after:bg-[#076DB3] after:mt-2 after:mr-5 after:rounded-lg">Update Maintenance Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Room Number */}
          <CustomListbox
            label="Room Number"
            value={roomNumber}
            onChange={setRoomNumber}
            options={roomNumbers}
          />

          {/* Cause/Reason */}
          <CustomListbox
            label="Cause/Reason"
            value={causeReason}
            onChange={setCauseReason}
            options={causeReasonOptions}
          />

          {/* Status After Maintenance */}
          <CustomListbox
            label="Status After Maintenance"
            value={statusAfterMaintenance}
            onChange={setStatusAfterMaintenance}
            options={statusOptions}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 focus:border-[#076DB3] focus:outline-none resize-none"
              rows={4}
              placeholder="Enter maintenance notes..."
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Assigned To */}
          <CustomListbox
            label="Assigned To"
            value={assignedTo}
            onChange={setAssignedTo}
            options={assignedToOptions}
          />

          {/* Priority */}
          <CustomListbox
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={priorityOptions}
          />

          {/* Nights */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Nights</label>
            <input
              type="number"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 focus:border-[#076DB3] focus:outline-none"
              placeholder="Enter number of nights"
            />
          </div>

          {/* Out of Order */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Out of Order</label>
            <div className="flex items-center">
              <div
                onClick={() => setOutOfOrder(!outOfOrder)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${outOfOrder ? 'bg-[#076DB3]' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${outOfOrder ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </div>
              <span className="ml-3 text-sm text-gray-600">
                {outOfOrder ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => handleSubmit('Maintenance Completed')}
          className="px-2 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer transition-colors"
        >
          Maintenance Completed
        </button>
        <button
          onClick={() => handleSubmit('Accept')}
          className="px-6 py-2 bg-[#076DB3] hover:bg-[#054773] rounded-md text-white text-sm font-normal cursor-pointer transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Page;