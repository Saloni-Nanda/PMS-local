'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-3.5 h-18 bg-white border-b border-[#076DB3]"
    >
      {/* Logo/Brand Space */}
      <div className="flex items-center">
       
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="relative text-gray-600 hover:text-[#054f80] hover:bg-gray-50 transition-all duration-200 rounded-full h-10 w-10 p-0"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white shadow-sm animate-pulse"
            >
              3
            </Badge>
          </Button>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#054f80]/20 focus:outline-none group"
            >
              <Avatar className="h-9 w-9 ring-2 ring-gray-200 group-hover:ring-[#054f80]/30 transition-all duration-200">
                <AvatarImage src="/avatars/brian-dass.png" alt="Brian Dass" />
                <AvatarFallback className="bg-gradient-to-br from-[#054f80] to-[#0a6ba8] text-white font-semibold text-sm border-0">
                  BD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-[#054f80] transition-colors">
                  Brian Dass
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Hotel Manager
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#054f80] transition-colors hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-2" align="end">
            <DropdownMenuLabel className="p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                  <AvatarImage src="/avatars/brian-dass.png" alt="Brian Dass" />
                  <AvatarFallback className="bg-gradient-to-br from-[#054f80] to-[#0a6ba8] text-white font-semibold">
                    BD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Brian Dass</p>
                  <p className="text-xs text-gray-500 font-medium">Hotel Manager</p>
                  <p className="text-xs text-gray-400 mt-0.5">brian.dass@hotelstar.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="rounded-lg hover:bg-gray-50 transition-colors cursor-pointer p-3">
              <User className="mr-3 h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-700">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg hover:bg-gray-50 transition-colors cursor-pointer p-3">
              <Settings className="mr-3 h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-700">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer rounded-lg p-3">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}