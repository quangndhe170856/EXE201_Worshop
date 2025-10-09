import { useState } from "react";
import {
  Search,
  Filter,
  X,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

export interface FilterState {
  searchQuery: string;
  categories: number[]; // đổi từ categoryId
  dateRange: {
    from?: Date;
    to?: Date;
  };
  sortBy: string;
}

interface SearchAndFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  eventCount: number;
}

export function SearchAndFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  eventCount,
}: SearchAndFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ✅ Demo categories có id để khớp với backend
  const categories = [
    { id: 1, name: "Nhạc sống" },
    { id: 2, name: "Sân khấu & Nghệ thuật" },
    { id: 3, name: "Thể Thao" },
    { id: 4, name: "Hội thảo" },
    { id: 5, name: "Lễ hội" },
    { id: 6, name: "Triển lãm" },
    { id: 7, name: "Khác" },
  ];

  const sortOptions = [
    { value: "date", label: "Ngày diễn ra" },
    { value: "newest", label: "Mới nhất" },
    { value: "name", label: "Tên A-Z" },
  ];

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleCategoryChange = (id: number) => {
    const newCategories = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.categories.length > 0) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    return count;
  };

  return (
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Tìm kiếm sự kiện..."
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

            <div className="hidden lg:flex items-center gap-3">
              {/* Category Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-600 text-white"
                  >
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
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={filters.categories.includes(category.id)}
                          onCheckedChange={(
                            checked: boolean | "indeterminate"
                          ) => handleCategoryChange(category.id)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-600 text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Thời gian
                    {(filters.dateRange.from || filters.dateRange.to) && (
                      <Badge className="ml-2 bg-green-600 text-white">1</Badge>
                    )}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-gray-800 border-gray-700"
                  align="start"
                >
                  <CalendarComponent
                    mode="range"
                    selected={{
                      from: filters.dateRange.from,
                      to: filters.dateRange.to,
                    }}
                    onSelect={(range: { from?: Date; to?: Date }) =>
                      onFiltersChange({
                        ...filters,
                        dateRange: { from: range?.from, to: range?.to },
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
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
