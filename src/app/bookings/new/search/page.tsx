"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, Edit, Trash2 } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  available: number;
  price: number;
  expanded: boolean;
  guests: Guest[];
}

interface Guest {
  id: string;
  adults: number;
  children: number;
}

export default function BookingPage() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'DOBLE',
      available: 6,
      price: 120,
      expanded: true,
      guests: [{ id: 'g1', adults: 1, children: 0 }]
    },
    {
      id: '2',
      name: 'FAMILIAR',
      available: 7,
      price: 150,
      expanded: false,
      guests: [{ id: 'g2', adults: 1, children: 0 }]
    },
    {
      id: '3',
      name: 'H2',
      available: 7,
      price: 180,
      expanded: false,
      guests: [{ id: 'g3', adults: 1, children: 0 }]
    }
  ]);

  const toggleRoom = (id: string) => {
    setRooms(rooms.map(room =>
      room.id === id ? { ...room, expanded: !room.expanded } : room
    ));
  };

  const updateAdults = (roomId: string, guestId: string, value: string) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? {
          ...room,
          guests: room.guests.map(guest =>
            guest.id === guestId ? { ...guest, adults: parseInt(value) } : guest
          )
        }
        : room
    ));
  };

  const updateChildren = (roomId: string, guestId: string, value: string) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? {
          ...room,
          guests: room.guests.map(guest =>
            guest.id === guestId ? { ...guest, children: parseInt(value) } : guest
          )
        }
        : room
    ));
  };

  const addGuest = (roomId: string) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? {
          ...room,
          guests: [...room.guests, { id: Date.now().toString(), adults: 1, children: 0 }]
        }
        : room
    ));
  };

  const deleteGuest = (roomId: string, guestId: string) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? {
          ...room,
          guests: room.guests.filter(guest => guest.id !== guestId)
        }
        : room
    ));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-52 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4">
        <nav className="flex md:flex-col md:space-y-4 space-x-4 md:space-x-0 text-sm overflow-x-auto md:overflow-x-auto">
          <div className="text-[#076DB3] font-medium cursor-pointer whitespace-nowrap">RACK</div>
          <div className="text-gray-700 hover:text-[#076DB3] cursor-pointer transition-colors whitespace-nowrap">AGEN</div>
          <div className="text-gray-700 hover:text-[#076DB3] cursor-pointer transition-colors whitespace-nowrap">COMERCIAL</div>
          <div className="text-gray-700 hover:text-[#076DB3] cursor-pointer transition-colors whitespace-nowrap">HEALTH INSURANCE</div>
          <div className="text-gray-700 hover:text-[#076DB3] cursor-pointer transition-colors whitespace-nowrap">HOTELREZ</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1 sm:p-1 lg:p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Availability From 31/08/2022 To 01/09/2022
        </h1>

        <div className="space-y-3 max-w-4xl">
          {rooms.map((room) => (
            <Card key={room.id} className="border border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-[#076DB3] font-semibold text-base">{room.name}</h3>
                    <p className="text-xs text-gray-500">Left {room.available}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRoom(room.id)}
                    className="bg-[#076DB3] hover:bg-[#054f80] text-white rounded h-7 w-7"
                  >
                    {room.expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>

                {room.expanded && (
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="text-lg font-semibold text-gray-800">${room.price}</div>

                    {room.guests.map((guest, index) => (
                      <div key={guest.id} className="space-y-2">
                        {index > 0 && <div className="border-t border-gray-200 pt-2" />}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Adult</label>
                            <Select
                              value={guest.adults.toString()}
                              onValueChange={(value) => updateAdults(room.id, guest.id, value)}
                            >
                              <SelectTrigger className="w-full bg-gray-50 h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Children</label>
                            <Select
                              value={guest.children.toString()}
                              onValueChange={(value) => updateChildren(room.id, guest.id, value)}
                            >
                              <SelectTrigger className="w-full bg-gray-50 h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex gap-1 pt-5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-[#076DB3] text-[#076DB3] hover:bg-blue-50"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-[#076DB3] text-[#076DB3] hover:bg-blue-50 hover:border-red-400 hover:text-red-400"
                              onClick={() => deleteGuest(room.id, guest.id)}
                              disabled={room.guests.length === 1}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-[#076DB3] text-[#076DB3] hover:bg-blue-50"
                              onClick={() => addGuest(room.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-6 bg-[#076DB3] hover:bg-[#054f80] text-white px-10 py-4 text-base">
          Book
        </Button>
      </main>
    </div>
  );
}