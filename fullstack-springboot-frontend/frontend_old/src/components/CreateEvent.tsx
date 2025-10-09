import { useState } from 'react'
import { ArrowLeft, Upload, X, Plus, MapPin, Calendar, Clock, Users, Tag } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface CreateEventProps {
  onBack: () => void
}

interface TicketType {
  id: string
  name: string
  price: string
  description: string
  quantity: string
}

export function CreateEvent({ onBack }: CreateEventProps) {
  const [eventImages, setEventImages] = useState<string[]>([])
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { id: '1', name: '', price: '', description: '', quantity: '' }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    organizer: '',
    highlights: ['']
  })


  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    // For demo, we'll add a placeholder image
    const placeholderImage = "https://images.unsplash.com/photo-1640218381874-0b568d9e5bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cGxvYWQlMjBpbWFnZSUyMHBsYWNlaG9sZGVyfGVufDF8fHx8MTc1ODg0OTg4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
    setEventImages([...eventImages, placeholderImage])
  }

  const removeImage = (index: number) => {
    setEventImages(eventImages.filter((_, i) => i !== index))
  }

  const addTicketType = () => {
    const newId = (ticketTypes.length + 1).toString()
    setTicketTypes([...ticketTypes, { id: newId, name: '', price: '', description: '', quantity: '' }])
  }

  const removeTicketType = (id: string) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id))
    }
  }

  const updateTicketType = (id: string, field: keyof TicketType, value: string) => {
    setTicketTypes(ticketTypes.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ))
  }

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] })
  }

  const removeHighlight = (index: number) => {
    if (formData.highlights.length > 1) {
      setFormData({ 
        ...formData, 
        highlights: formData.highlights.filter((_, i) => i !== index) 
      })
    }
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = value
    setFormData({ ...formData, highlights: newHighlights })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Event Data:', formData, ticketTypes, eventImages)
    alert('Sự kiện đã được tạo thành công!')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-2xl">Tạo sự kiện mới</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Lưu nháp
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Xuất bản sự kiện
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>Thông tin cơ bản</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-white">Tên sự kiện *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Nhập tên sự kiện"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle" className="text-white">Tiêu đề phụ</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Tiêu đề phụ (tùy chọn)"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-white">Danh mục *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Chọn danh mục sự kiện" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="text-white">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Mô tả sự kiện *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Mô tả chi tiết về sự kiện của bạn..."
                      className="bg-gray-800 border-gray-700 text-white min-h-32"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-white">Điểm nổi bật</Label>
                    <div className="space-y-3">
                      {formData.highlights.map((highlight, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            value={highlight}
                            onChange={(e) => updateHighlight(index, e.target.value)}
                            placeholder="Nhập điểm nổi bật"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          {formData.highlights.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHighlight(index)}
                              className="text-red-400 hover:bg-red-900/20"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addHighlight}
                        className="border-gray-600 text-white hover:bg-gray-800"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm điểm nổi bật
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Images */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Hình ảnh sự kiện</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {eventImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <ImageWithFallback 
                          src={image}
                          alt={`Event image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                    >
                      <Upload className="w-8 h-8 mb-2" />
                      <span>Thêm ảnh</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Tải lên tối đa 10 hình ảnh. Định dạng: JPG, PNG. Dung lượng tối đa: 5MB/ảnh.
                  </p>
                </CardContent>
              </Card>

              {/* Location & Time */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Thời gian và địa điểm</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-white">Ngày tổ chức *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">Thời gian *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="venue" className="text-white">Tên địa điểm *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Ví dụ: Nhà hát Thành phố"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white">Địa chỉ chi tiết *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Số nhà, tên đường, quận/huyện, thành phố"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Organizer Info */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Thông tin tổ chức</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="organizer" className="text-white">Đơn vị tổ chức *</Label>
                    <Input
                      id="organizer"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      placeholder="Tên công ty/tổ chức"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Types */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Loại vé và giá</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={ticket.id} className="p-4 border border-gray-700 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white">Loại vé {index + 1}</h4>
                        {ticketTypes.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTicketType(ticket.id)}
                            className="text-red-400 hover:bg-red-900/20"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <Input
                        value={ticket.name}
                        onChange={(e) => updateTicketType(ticket.id, 'name', e.target.value)}
                        placeholder="Tên loại vé (VD: Early Bird)"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      
                      <Input
                        value={ticket.price}
                        onChange={(e) => updateTicketType(ticket.id, 'price', e.target.value)}
                        placeholder="Giá vé (VND)"
                        type="number"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      
                      <Input
                        value={ticket.quantity}
                        onChange={(e) => updateTicketType(ticket.id, 'quantity', e.target.value)}
                        placeholder="Số lượng vé"
                        type="number"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      
                      <Textarea
                        value={ticket.description}
                        onChange={(e) => updateTicketType(ticket.id, 'description', e.target.value)}
                        placeholder="Mô tả quyền lợi"
                        className="bg-gray-800 border-gray-700 text-white"
                        rows={2}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTicketType}
                    className="w-full border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm loại vé
                  </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Xem trước</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trạng thái:</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        Nháp
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loại vé:</span>
                      <span className="text-white">{ticketTypes.length} loại</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hình ảnh:</span>
                      <span className="text-white">{eventImages.length} ảnh</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-800 my-4" />
                  
                  <div className="text-xs text-gray-400">
                    <p className="mb-2">⚠️ Lưu ý:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Sự kiện sẽ được duyệt trong 24h</li>
                      <li>Thông tin cần chính xác và đầy đủ</li>
                      <li>Hình ảnh cần rõ nét và phù hợp</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}