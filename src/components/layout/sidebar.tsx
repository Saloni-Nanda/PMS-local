'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Calendar,
  Users,
  Bed,
  Wrench,
  CreditCard,
  LogOut,
  CalendarCheck,
  ChevronsLeftRightIcon,
  CoinsIcon,
} from 'lucide-react'
import Image from 'next/image'

const navigation = [
  {
    name: 'Bookings',
    href: '/bookings/search',
    icon: Calendar,
    children: [
      { name: 'Search', href: '/bookings/search' },
      { name: 'New', href: '/bookings/new' },
    ],
  },
  {
    name: 'Frontdesk',
    href: '/frontdesk/advance-payments',
    icon: Users,
    children: [
      { name: 'Advance Payments', href: '/frontdesk/advance-payments' },
      { name: 'Stay Extension', href: '/inventory/inventory-management' },
      { name: 'Room Assignment', href: '/frontdesk/room-assignment' },
      { name: 'Cash', href: '/frontdesk/cash' },
      { name: 'Room Change', href: '/frontdesk/room-change' },
      { name: 'Check-in', href: '/frontdesk/check-in' },
      { name: 'Check-out', href: '/frontdesk/check-out' },
      { name: 'Account Receivable', href: '/frontdesk/account-receivable' },
    ],
  },
  {
    name: 'House Keeping',
    href: '/house-keeping/room-status',
    icon: Bed,
    children: [{ name: 'Room Status', href: '/house-keeping/room-status' }],
  },
  {
    name: 'Maintainance',
    href: '/maintainance',
    icon: Wrench,
    children: [],
  },
  {
    name: 'Inventory',
    href: '/inventory/inventory-management',
    icon: CalendarCheck,
    children: [
      { name: 'Inventory Management', href: '/inventory/inventory-management' },
      { name: 'Check Inventory and Rates', href: '/inventory/check-inventory-rates' },
    ],
  },
  {
    name: 'Rates',
    href: '/rates/rate-plan',
    icon: CreditCard,
    children: [
      { name: 'Rate Plan', href: '/rates/rate-plan' },
      { name: 'Rate Relation', href: '/rates/rate-relation' },
      { name: 'Price Per Room', href: '/rates/price-per-room' },
      { name: 'Prices', href: '/rates/prices' },
    ],
  },
  {
    name: 'Finance',
    href: '/finance/commissions',
    icon: CoinsIcon,
    children: [
      { name: 'Commissions', href: '/finance/commissions' },
      { name: 'Payments', href: '/finance/payments' }
    ],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const themeColor = '#076DB3'

  // Collapse by default if screen < md (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setCollapsed(true) // collapse on small screens
      } else {
        setCollapsed(false) // open on medium+ screens
      }
    }

    handleResize() // run on mount
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (
    <div
      className={cn(
        'flex flex-col border-r transition-all duration-300 h-screen overflow-hidden',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: themeColor,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 border-b flex-shrink-0 h-18"
        style={{ borderColor: themeColor }}
      >
        {!collapsed && (
          <div className="flex items-center space-x-2 justify-center">

            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={24}
              className="p-2 w-24 h-auto"
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn('p-1 focus:outline-none', collapsed && 'w-full')}
          style={{ color: themeColor }}
        >
          <ChevronsLeftRightIcon
            className={cn(
              'h-4 w-4 transition-transform',
              collapsed && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/') ||
                  (item.children &&
                    pathname.startsWith(
                      item.href.split('/')[1] ? `/${item.href.split('/')[1]}` : ''
                    ))

                return (
                  <div key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-start mb-1',
                          collapsed ? 'px-2' : 'px-3',
                          isActive ? 'shadow-sm' : ''
                        )}
                        style={
                          isActive
                            ? { backgroundColor: '#E6F0FA', color: themeColor }
                            : { color: '#2C3E50' }
                        }
                      >
                        <Icon className={cn('h-4 w-4', !collapsed && 'mr-3')} />
                        {!collapsed && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </Button>
                    </Link>

                    {/* Sub-navigation */}
                    {item.children && !collapsed && isActive && (
                      <div className="ml-10 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link key={child.name} href={child.href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                'w-full justify-start text-sm transition-colors font',
                                pathname === child.href
                                  ? 'font-medium'
                                  : 'hover:bg-opacity-10'
                              )}
                              style={
                                pathname.startsWith(child.href)
                                  ? { fontWeight: 'bold', color: themeColor }
                                  : { color: '#2C3E50' }
                              }
                            >
                              {child.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div
        className="p-3 border-t flex-shrink-0"
        style={{ borderColor: themeColor }}
      >
        <button
          className={cn(
            'w-full justify-start flex items-center p-2 rounded',
            collapsed ? 'px-2' : 'px-3'
          )}
          style={{ color: '#2C3E50' }}
        >
          <LogOut className={cn('h-4 w-4', !collapsed && 'mr-3')} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  )
}
