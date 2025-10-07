"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, UserRound, UsersRound } from "lucide-react";

const roomData = [
    {
        type: "D1",
        prices: [120, 120, 120, 120, 120, 120, 120],
        altPrices: [140, 140, 140, 140, 140, 140, 140],
    },
    {
        type: "F1",
        prices: [300, 300, 300, 300, 300, 300, 300],
        altPrices: [380, 380, 380, 380, 380, 380, 380],
    },
    {
        type: "F2",
        prices: [100, 100, 100, 100, 100, 100, 100],
        altPrices: [93, 93, 93, 93, 93, 93, 93],
    },
];

// helper: generate all dates of the current month
function generateMonthDates(date: Date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: totalDays }).map((_, i) => {
        const d = new Date(year, month, i + 1);
        return { day: daysOfWeek[d.getDay()], date: d.getDate() };
    });
}

export default function Page() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const monthYear = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    // generate dynamic dates for the current month
    const dates = generateMonthDates(currentDate);

    return (
        <div className="p-6 space-y-6">
            {/* Filters */}
            <div className="flex items-end space-x-4">
                <div>
                    <label className="block text-xs text-gray-500">From:</label>
                    <input
                        type="date"
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue={today.toISOString().split("T")[0]}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500">To:</label>
                    <input
                        type="date"
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue={
                            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
                                .toISOString()
                                .split("T")[0]
                        }
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500">Rooms:</label>
                    <select className="border rounded px-2 py-1 text-sm">
                        <option>All Rooms</option>
                    </select>
                </div>
                <button className="px-4 py-1 bg-[#076DB3] text-white rounded text-sm">
                    Filter
                </button>
            </div>

            {/* Calendar */}
            <div>
                {/* Month Bar */}
                <div className="flex items-center justify-between text-white bg-gray-700 px-4 py-2 mb-2 rounded-md shadow-sm">
                    <button onClick={handlePrevMonth}>
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <span className="font-medium">{monthYear}</span>
                    <button onClick={handleNextMonth}>
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="border rounded-lg shadow overflow-x-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="border px-8 py-2 text-left text-sm">Room Type</th>
                                {dates.map((d) => (
                                    <th key={d.date} className="border px-2 py-2 text-center text-sm">
                                        {d.day} <br /> {d.date}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roomData.map((room) => (
                                <tr key={room.type}>
                                    <td className="border px-2 py-2 font-medium">{room.type}</td>
                                    {room.prices.map((price, i) => (
                                        <td key={i} className="border px-6 py-6 text-center">
                                            <div className="flex flex-col items-center text-sm">
                                                {/* Single adult */}
                                                <div className="flex items-center space-x-1">
                                                    <UserRound className="h-4 w-4 text-black" />
                                                    <span>{price}</span>
                                                </div>

                                                {/* Two adults */}
                                                <div className="flex items-center space-x-1">
                                                    <UsersRound className="h-4 w-4 text-gray-800" />
                                                    <span>{room.altPrices[i]}</span>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
