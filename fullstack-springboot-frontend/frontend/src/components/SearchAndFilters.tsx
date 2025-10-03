import { useState } from 'react'
import { Search, Filter, X, Calendar, MapPin, DollarSign, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar as CalendarComponent } from './ui/calendar'
import { Slider } from './ui/slider'
import { Checkbox } from './ui/checkbox'
import { Separator } from './ui/separator'

export interface FilterState {
  searchQuery: string
  categories: string[]
  dateRange: {
    from?: Date
    to?: Date
  }
  priceRange: [number, number]
  locations: string[]
  sortBy: string
}

interface SearchAndFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  eventCount: number
}

export function SearchAndFilters({ filters, onFiltersChange, onClearFilters, eventCount }: SearchAndFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const categories = [
    'Nhạc sống',
    'Sân khấu & Nghệ thuật',
    'Thể Thao',
    'Hội thảo',
    'Lễ hội',
    'Triển lãm',
    'Khác'
  ]

  const locations = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Phòng',
    'Nha Trang',
    'Đà Lạt',
    'Vũng Tàu'
  ]

  const sortOptions = [
    { value: 'date', label: 'Ngày diễn ra' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'popularity', label: 'Phổ biến nhất' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'name', label: 'Tên A-Z' }
  ]

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value })
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location]
    onFiltersChange({ ...filters, locations: newLocations })
  }

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({ ...filters, priceRange: [values[0], values[1]] })
  }

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.searchQuery) count++
    if (filters.categories.length > 0) count++
    if (filters.locations.length > 0) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) count++
    return count
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-white mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Danh mục
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Locations */}
      <div>
        <h3 className="text-white mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Địa điểm
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={() => handleLocationToggle(location)}
              />
              <label
                htmlFor={`location-${location}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Price Range */}
      <div>
        <h3 className="text-white mb-3 flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          Khoảng giá
        </h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={5000000}
            min={0}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Date Range */}
      <div>
        <h3 className="text-white mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Thời gian
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {filters.dateRange.from.toLocaleDateString('vi-VN')} -{' '}
                    {filters.dateRange.to.toLocaleDateString('vi-VN')}
                  </>
                ) : (
                  filters.dateRange.from.toLocaleDateString('vi-VN')
                )
              ) : (
                'Chọn ngày'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
            <CalendarComponent
              mode="range"
              selected={{
                from: filters.dateRange.from,
                to: filters.dateRange.to,
              }}
              onSelect={(range) =>
                onFiltersChange({
                  ...filters,
                  dateRange: { from: range?.from, to: range?.to }
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  return (
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Tìm kiếm sự kiện, nghệ sĩ, địa điểm..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 h-12"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left side - Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden bg-gray-800 border-gray-600 text-white"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Bộ lọc
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 bg-green-600 text-white">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-600 text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    Danh mục
                    {filters.categories.length > 0 && (
                      <Badge className="ml-2 bg-green-600 text-white">
                        {filters.categories.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gray-900 border-gray-700 p-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <label
                          htmlFor={`desktop-category-${category}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-600 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Địa điểm
                    {filters.locations.length > 0 && (
                      <Badge className="ml-2 bg-green-600 text-white">
                        {filters.locations.length}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gray-900 border-gray-700 p-4 max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-location-${location}`}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={() => handleLocationToggle(location)}
                        />
                        <label
                          htmlFor={`desktop-location-${location}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-600 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Thời gian
                    {(filters.dateRange.from || filters.dateRange.to) && (
                      <Badge className="ml-2 bg-green-600 text-white">1</Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{
                      from: filters.dateRange.from,
                      to: filters.dateRange.to,
                    }}
                    onSelect={(range) =>
                      onFiltersChange({
                        ...filters,
                        dateRange: { from: range?.from, to: range?.to }
                      })
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  onClick={onClearFilters}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Sort and Results */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{eventCount} sự kiện</span>
            </div>
            
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full lg:w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.searchQuery && (
              <Badge variant="secondary" className="bg-gray-800 text-white">
                Tìm kiếm: "{filters.searchQuery}"
                <button
                  onClick={() => handleSearchChange('')}
                  className="ml-2 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="bg-green-600 text-white">
                {category}
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="ml-2 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {filters.locations.map((location) => (
              <Badge key={location} variant="secondary" className="bg-blue-600 text-white">
                {location}
                <button
                  onClick={() => handleLocationToggle(location)}
                  className="ml-2 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            
            {(filters.dateRange.from || filters.dateRange.to) && (
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {filters.dateRange.from && filters.dateRange.to
                  ? `${filters.dateRange.from.toLocaleDateString('vi-VN')} - ${filters.dateRange.to.toLocaleDateString('vi-VN')}`
                  : filters.dateRange.from
                  ? `Từ ${filters.dateRange.from.toLocaleDateString('vi-VN')}`
                  : `Đến ${filters.dateRange.to?.toLocaleDateString('vi-VN')}`
                }
                <button
                  onClick={() => onFiltersChange({ ...filters, dateRange: {} })}
                  className="ml-2 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="lg:hidden mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white">Bộ lọc</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <FilterContent />
            <div className="mt-6 flex gap-3">
              <Button
                onClick={onClearFilters}
                variant="outline"
                className="flex-1 border-gray-600 text-white"
              >
                Xóa bộ lọc
              </Button>
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Áp dụng
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}