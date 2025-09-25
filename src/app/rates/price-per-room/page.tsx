"use client";

import { useState } from "react";
import { UserRound, UsersRound, Plus } from "lucide-react";
import NewDateRangeModal from "./modals/NewDateRangeModal";
import EditRoomRateModal from "./modals/EditRoomRateModal";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Define types
type Rates = {
    adult1: string;
    adult2: string;
    adult3: string;
    adult4: string;
    extraAdults: string;
    child: string;
};

type Room = {
    type: string;
    rates: Rates[];
};

type DateRange = {
    from: string;
    until: string;
};

// Initial room data with full rates
const initialRoomData: Room[] = [
    {
        type: "D1",
        rates: [
            { adult1: "120", adult2: "140", adult3: "150", adult4: "160", extraAdults: "50", child: "30" },
            { adult1: "140", adult2: "160", adult3: "170", adult4: "180", extraAdults: "60", child: "35" },
        ],
    },
    {
        type: "F1",
        rates: [
            { adult1: "300", adult2: "320", adult3: "340", adult4: "360", extraAdults: "80", child: "40" },
            { adult1: "320", adult2: "340", adult3: "360", adult4: "380", extraAdults: "90", child: "45" },
        ],
    },
    {
        type: "F2",
        rates: [
            { adult1: "100", adult2: "120", adult3: "130", adult4: "140", extraAdults: "40", child: "20" },
            { adult1: "120", adult2: "140", adult3: "150", adult4: "160", extraAdults: "50", child: "25" },
        ],
    },
];

// Date ranges
const initialDateRanges: DateRange[] = [
    { from: "Tuesday, January 4, 2022", until: "Wednesday, December 14, 2022" },
    { from: "Thursday, December 15, 2022", until: "Saturday, January 14, 2023" },
];

export default function Page() {
    const [roomData, setRoomData] = useState<Room[]>(initialRoomData);
    const [dateRanges, setDateRanges] = useState<DateRange[]>(initialDateRanges);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedCell, setSelectedCell] = useState<{ roomIndex: number; rangeIndex: number }>({ roomIndex: 0, rangeIndex: 0 });
    const [selectedRates, setSelectedRates] = useState<Rates | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (roomIndex: number, rangeIndex: number) => {
        setSelectedCell({ roomIndex, rangeIndex });
        setSelectedRates(roomData[roomIndex].rates[rangeIndex]);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => setIsEditModalOpen(false);

    const handleAcceptEdit = (newRates: Rates) => {
        setRoomData((prev) =>
            prev.map((room, roomIndex) =>
                roomIndex === selectedCell.roomIndex
                    ? {
                          ...room,
                          rates: room.rates.map((rate, rateIndex) =>
                              rateIndex === selectedCell.rangeIndex ? { ...newRates } : rate
                          ),
                      }
                    : room
            )
        );
    };

    const handleAcceptNewRange = (from: string, to: string) => {
        // Format the dates
        const formattedFrom = formatDate(from);
        const formattedUntil = formatDate(to);

        // Add new date range
        setDateRanges((prev) => [...prev, { from: formattedFrom, until: formattedUntil }]);

        // Add empty rates for each room
        setRoomData((prev) =>
            prev.map((room) => ({
                ...room,
                rates: [
                    ...room.rates,
                    { adult1: "", adult2: "", adult3: "", adult4: "", extraAdults: "", child: "" },
                ],
            }))
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Table Header with Button */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold ">Room Pricing</h2>
                <button
                    className="flex items-center space-x-2 px-4 py-2 bg-[#076DB3] text-white rounded-md shadow hover:bg-[#054f80] text-sm"
                    onClick={openModal}
                >
                    <Plus className="w-4 h-4" />
                    <span>New Date Range</span>
                </button>
            </div>

            {/* Table */}
            <div className="border rounded-lg shadow overflow-x-auto">
                <table className="w-full border-collapse text-md">
                    <thead>
                        <tr>
                            <th className="border px-3 py-3 text-left text-base font-semibold w-32">Room Type</th>
                            {roomData.map((room) => (
                                <th key={room.type} className="border px-2 py-2 text-center text-base font-medium w-24">
                                    {room.type}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dateRanges.map((range, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border px-3 py-3 text-left align-top">
                                    <div className="text-sm leading-5">
                                        <div className="font-medium">
                                            From : <span className="font-normal">{range.from}</span>
                                        </div>
                                        <div className="font-medium mt-1">
                                            Until : <span className="font-normal">{range.until}</span>
                                        </div>
                                    </div>
                                </td>
                                {roomData.map((room, roomIndex) => (
                                    <td
                                        key={room.type}
                                        className="border px-2 py-4 text-center w-24 cursor-pointer hover:bg-gray-100"
                                        onClick={() => openEditModal(roomIndex, rowIndex)}
                                    >
                                        <div className="flex flex-col items-center space-y-1">
                                            <div className="flex items-center space-x-1">
                                                <UserRound className="h-4 w-4 text-black" />
                                                <span>{room.rates[rowIndex].adult1 || "-"}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <UsersRound className="h-4 w-4 text-gray-800" />
                                                <span>{room.rates[rowIndex].adult2 || "-"}</span>
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* New Date Range Modal */}
            <NewDateRangeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAccept={handleAcceptNewRange}
            />

            {/* Edit Room Rate Modal */}
            <EditRoomRateModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onAccept={handleAcceptEdit}
                initialRates={selectedRates ?? { adult1: "", adult2: "", adult3: "", adult4: "", extraAdults: "", child: "" }}
            />
        </div>
    );
}
