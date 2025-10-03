import { ArrowLeft, Calendar, Clock, MapPin, Share2, Heart, Star, Users, Music } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface EventDetailProps {
  event: {
    id: number
    title: string
    subtitle?: string
    description: string
    date: string
    time: string
    location: string
    venue: string
    image: string
    category?: string
    price: {
      min: number
      max: number
    }
    tickets: {
      type: string
      price: number
      description: string
      available: number
    }[]
    organizer: string
    rating: number
    attendees: number
    highlights: string[]
  }
  onBack: () => void
}

export function EventDetail({ event, onBack }: EventDetailProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative">
        <ImageWithFallback 
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Share and favorite */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Event title overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-2 mb-2">
            {event.category && (
              <Badge className="bg-red-600 text-white">{event.category}</Badge>
            )}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">{event.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{event.attendees.toLocaleString()} quan tâm</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          {event.subtitle && (
            <p className="text-xl text-gray-300">{event.subtitle}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Thông tin sự kiện</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-400">Ngày</p>
                      <p className="text-white">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-400">Thời gian</p>
                      <p className="text-white">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-400">Địa điểm</p>
                      <p className="text-white">{event.venue}</p>
                      <p className="text-sm text-gray-400">{event.location}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800 my-6" />

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Mô tả sự kiện</h3>
                  <p className="text-gray-300 leading-relaxed">{event.description}</p>
                </div>

                {event.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Điểm nổi bật</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Music className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Venue map */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Sơ đồ địa điểm</h2>
                <div className="relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1645536730110-3fcdfa300db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwdmVudWUlMjBzZWF0aW5nJTIwbWFwfGVufDF8fHx8MTc1ODg3ODA0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Venue map"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <p className="text-white text-lg">Sơ đồ địa điểm chi tiết</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">{event.venue}</strong><br />
                    {event.location}<br />
                    Dễ dàng tiếp cận bằng phương tiện giao thông công cộng
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Đơn vị tổ chức</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{event.organizer}</h3>
                    <p className="text-gray-400">Đơn vị tổ chức sự kiện uy tín</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-300">4.8 ⭐ (2,847 đánh giá)</span>
                      <span className="text-sm text-gray-300">156 sự kiện đã tổ chức</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Ticket booking */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Chọn vé</h2>
                
                <div className="space-y-4">
                  {event.tickets.map((ticket, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{ticket.type}</h3>
                        <span className="text-lg font-bold text-green-500">
                          {ticket.price.toLocaleString()}đ
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{ticket.description}</p>
                      <p className="text-xs text-gray-500">Còn lại: {ticket.available} vé</p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-800 my-6" />

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Mua vé ngay
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                    Thêm vào giỏ hàng
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-400">
                    ✓ Miễn phí hủy vé trước 24h<br />
                    ✓ Hỗ trợ 24/7<br />
                    ✓ Vé điện tử được gửi ngay lập tức
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Event stats */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Thống kê sự kiện</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lượt xem</span>
                    <span className="text-white">12,547</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quan tâm</span>
                    <span className="text-white">{event.attendees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Đã bán</span>
                    <span className="text-white">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Đánh giá</span>
                    <span className="text-white">{event.rating} ⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}