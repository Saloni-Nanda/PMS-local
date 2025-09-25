"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const roomsData = [
  { number: 143, category: "D1", color: "bg-sky-400", data: [7, 1, 5, 9, 11, 2, 1, 5, 9, 4, 9, 4, 5, 2, 7, 6, 7, 7, 7, 8, 9, 1, 8, 1, 8, 1, 8, 3] },
  { number: 117, category: "F1", color: "bg-green-400", data: [11, 2, 1, 7, 5, 9, 4, 9, 2, 6, 2, 9, 7, 3, 3, 7, 8, 7, 8, 7, 9, 9, 9, 9, 9, 9, 9, 9] },
  { number: 80, category: "H2", color: "bg-blue-400", data: [7, 7, 3, 8, 9, 8, 9, 8, 7, 3, 7, 8, 9, 8, 7, 8, 9, 8, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9] },
  { number: 132, category: "K1K", color: "bg-purple-500", data: [9, 13, 4, 9, 8, 12, 8, 12, 9, 7, 3, 7, 6, 9, 7, 13, 4, 9, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8] },
  { number: 119, category: "MST", color: "bg-cyan-500", data: [7, 1, 5, 9, 11, 2, 1, 5, 9, 4, 9, 4, 5, 2, 7, 6, 7, 7, 7, 8, 9, 1, 8, 1, 8, 1, 8, 3] },
];

export default function InventoryPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  // Format month like "August 2022"
  const currentMonthStr = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Handle previous month
  const handlePrev = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  // Handle next month
  const handleNext = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  // Get first and last day strings
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const dateRangeStr = `${firstDay.getDate()} ${firstDay.toLocaleString("default", { month: "long" })} ${firstDay.getFullYear()} – ${lastDay.getDate()} ${lastDay.toLocaleString("default", { month: "long" })} ${lastDay.getFullYear()}`;

  // Number of days in the month
  const daysInMonth = lastDay.getDate();

  return (
    <div className="p-4 relative">
      {/* Top Bar */}
      <div className="flex flex-col bg-gray-800 text-white rounded p-4 mb-2">
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button onClick={handlePrev}>
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Month */}
          <div className="text-lg font-semibold">{currentMonthStr}</div>

          {/* Right Arrow */}
          <button onClick={handleNext}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dropdown below month */}
        <div className="mt-2 flex justify-center">
          <span className="text-white text-md">Show Room Type </span>
          <select className="bg-gray-700 text-white px-3 py-1 rounded">
            <option>All</option>
            <option>D1</option>
            <option>F1</option>
            <option>H2</option>
            <option>K1K</option>
            <option>MST</option>
          </select>
        </div>
      </div>

      {/* Date Range */}
      <div className="text-center text-sm text-gray-600 my-2">{dateRangeStr}</div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-4 w-24">Number</th>
              <th className="border px-2 py-4 w-32">Room Category</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="border p-2 w-10 text-xs">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roomsData.map((room, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-6 text-center">{room.number}</td>
                <td className="border px-2 py-6 text-center">{room.category}</td>
                {room.data.slice(0, daysInMonth).map((val, dayIdx) => (
                  <td
                    key={dayIdx}
                    className={`border p-2 text-center text-white relative cursor-pointer ${room.color}`}
                    onMouseEnter={(e) => {
                      const parentRect = (e.currentTarget.closest("div.relative") as HTMLElement)?.getBoundingClientRect();
                      const cellRect = e.currentTarget.getBoundingClientRect();

                      setTooltip({
                        x: cellRect.left - (parentRect?.left || 0) + cellRect.width / 2,
                        y: cellRect.top - (parentRect?.top || 0),
                        content: `Open Available: ${val}\nTotal: 09`,
                      });
                    }}

                    onMouseLeave={() => setTooltip(null)}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-white text-black text-xs shadow-md px-3 py-1 rounded-md"
          style={{
            top: tooltip.y - 40,
            left: tooltip.x,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          {tooltip.content.split("\n").map((line, i) => (
            <div key={i}>
              {line.includes(":") ? (
                <>
                  {line.split(":")[0]}:{" "}
                  <span className="font-bold">{line.split(":")[1]}</span>
                </>
              ) : (
                line
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
