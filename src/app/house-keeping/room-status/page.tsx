"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import StatusModificationModal from "./status-modification/StatusModificationModal";

interface Room {
  id: string;
  status: "Vacant" | "Occupied";
  condition: "Clean" | "Dirty" | "Cleaning in Progress";
}

interface Floor {
  floorNumber: number;
  rooms: Room[];
}

interface Building {
  name: string;
  floors: Floor[];
}

const initialBuildings: Building[] = [
  {
    name: "Building 1",
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: "D1_1", status: "Vacant", condition: "Clean" },
          { id: "D1_2", status: "Occupied", condition: "Dirty" },
          { id: "D1_3", status: "Vacant", condition: "Cleaning in Progress" },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: "D2_1", status: "Vacant", condition: "Clean" },
          { id: "D2_2", status: "Occupied", condition: "Dirty" },
        ],
      },
    ],
  },
  {
    name: "Building 2",
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: "B2_1", status: "Vacant", condition: "Clean" },
          { id: "B2_2", status: "Occupied", condition: "Dirty" },
        ],
      },
    ],
  },
];

const Page: React.FC = () => {
  const [date, setDate] = useState<string>(""); // main page date
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [activeBuilding, setActiveBuilding] = useState<string>(initialBuildings[0].name);
  const [openFloor, setOpenFloor] = useState<number | null>(null);

  // Modal state
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setIsModalOpen(false);
  };

  const handleSave = (roomId: string, newStatus: Room["status"], newCondition: Room["condition"]) => {
    setBuildings((prev) =>
      prev.map((b) => ({
        ...b,
        floors: b.floors.map((f) => ({
          ...f,
          rooms: f.rooms.map((r) =>
            r.id === roomId ? { ...r, status: newStatus, condition: newCondition } : r
          ),
        })),
      }))
    );
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const currentBuilding = buildings.find((b) => b.name === activeBuilding) || buildings[0];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="bg-white rounded-lg overflow-hidden shadow mb-4">
        <div className="py-5 px-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
          {/* Export Buttons */}
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-gray-500 hover:bg-gray-700 text-white text-sm rounded-md">Export Excel</button>
            <button className="px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] text-white text-sm rounded-md">Export PDF</button>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <label className="font-normal text-gray-600 whitespace-nowrap">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] text-gray-600 focus:ring focus:ring-blue-200"
              />
            
          </div>
        </div>
      </div>

      {/* Building Tabs */}
      <div className="flex gap-2 mb-4">
        {buildings.map((building) => (
          <button
            key={building.name}
            onClick={() => {
              setActiveBuilding(building.name);
              setOpenFloor(null);
            }}
            className={`px-4 py-2 rounded-md font-medium ${
              activeBuilding === building.name ? "bg-[#076DB3] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {building.name}
          </button>
        ))}
      </div>

      {/* Floors */}
      <div className="space-y-4">
        {currentBuilding.floors.map((floor) => (
          <div key={floor.floorNumber} className="border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() =>
                setOpenFloor(openFloor === floor.floorNumber ? null : floor.floorNumber)
              }
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 text-gray-700 font-medium"
            >
              <span>Floor {floor.floorNumber}</span>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  openFloor === floor.floorNumber ? "rotate-180" : ""
                }`}
              />
            </button>

            {openFloor === floor.floorNumber && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {floor.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between border rounded-md px-3 py-2 bg-white shadow-sm"
                  >
                    <span className="font-medium text-gray-700">{room.id}</span>
                    <div className="flex gap-2 text-sm">
                      <span
                        className={`${
                          room.status === "Vacant" ? "text-[#076DB3]" : "text-red-500"
                        } cursor-pointer`}
                        onClick={() => openModal(room)}
                      >
                        {room.status}
                      </span>
                      <span
                        className={`${
                          room.condition === "Clean"
                            ? "text-green-500"
                            : room.condition === "Dirty"
                            ? "text-yellow-600"
                            : "text-orange-500"
                        } cursor-pointer`}
                        onClick={() => openModal(room)}
                      >
                        {room.condition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedRoom && (
        <StatusModificationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          roomId={selectedRoom.id}
          date={date} // pass main page date (fixed)
          initialStatus={selectedRoom.status}
          initialCondition={selectedRoom.condition}
          onSave={(newStatus, newCondition) => handleSave(selectedRoom.id, newStatus, newCondition)}
        />
      )}
    </div>
  );
};

export default Page;
