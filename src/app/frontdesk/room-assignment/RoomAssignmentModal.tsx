import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

import { RoomData } from '@/types';
import { CustomListbox } from '@/components/ui/Listbox';

interface RoomAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    currentBooking: RoomData | null;
    selectedRoom: string;
    setSelectedRoom: (room: string) => void;
    roomOptions: string[];
}

const RoomAssignmentModal: React.FC<RoomAssignmentModalProps> = ({
    isOpen,
    onClose,
    onAccept,
    currentBooking,
    selectedRoom,
    setSelectedRoom,
    roomOptions
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0000005c] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] mx-4">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Select Room</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Current Room Info */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Current Room</span>
                        <span className="text-gray-900 font-medium">
                            Room {currentBooking?.roomNumber}
                        </span>
                    </div>

                    {/* Room Selection Dropdown */}
                    <div className="mb-6 relative">
                        <CustomListbox
                            label=""
                            value={selectedRoom}
                            onChange={setSelectedRoom}
                            options={roomOptions}
                        />
                    </div>

                    {/* Modal Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                            onClick={onAccept}
                            className="flex-1 px-6 py-2 bg-[#076DB3] text-white rounded-lg hover:bg-[#054f80] font-medium cursor-pointer"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomAssignmentModal;