// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CalendarDays, 
  Users, 
  Bed, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign 
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: "Today's Arrivals",
      value: "24",
      icon: CalendarDays,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Current Occupancy",
      value: "87%",
      icon: Bed,
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Total Guests",
      value: "156",
      icon: Users,
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Revenue Today",
      value: "$12,450",
      icon: DollarSign,
      trend: "+15%",
      trendUp: true
    }
  ]

  const recentBookings = [
    {
      id: "MX120043-W2200002",
      guest: "Benjamin Bravo Lopez",
      status: "New",
      arrival: "17/03/2022",
      nights: 1,
      room: "RACK"
    },
    {
      id: "MX120043-W2200001",
      guest: "Javier Ibarra",
      status: "Confirmed",
      arrival: "09/02/2022",
      nights: 2,
      room: "RACK"
    },
    {
      id: "MX120043-W2200003",
      guest: "Maria Rodriguez",
      status: "Checked In",
      arrival: "19/09/2025",
      nights: 3,
      room: "DELUXE"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'checked in': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your hotel today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Live Updates
          </Button>
          <Button size="sm">
            View All Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className={`h-3 w-3 mr-1 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend} from yesterday
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
            <Button variant="outline" size="sm">
              View All Bookings
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-gray-900">{booking.guest}</p>
                        <p className="text-sm text-gray-500">Booking: {booking.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">
                        Arrival: {booking.arrival}
                      </span>
                      <span className="text-sm text-gray-600">
                        {booking.nights} night{booking.nights > 1 ? 's' : ''}
                      </span>
                      <span className="text-sm text-gray-600">
                        Room: {booking.room}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              New Booking
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Check In Guest
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertCircle className="w-4 h-4 mr-2" />
              Check Out Guest
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bed className="w-4 h-4 mr-2" />
              Room Status
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CalendarDays className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Housekeeping Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Clean Rooms</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dirty Rooms</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Out of Order</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Today's Departures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">18</div>
            <p className="text-sm text-gray-600">Expected check-outs by 11:00 AM</p>
            <Button variant="link" className="px-0 mt-2">
              View departure list →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
            <p className="text-sm text-gray-600">Pending maintenance tasks</p>
            <Button variant="link" className="px-0 mt-2">
              View all requests →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}