import { Button } from './ui/button'
import { Plus } from 'lucide-react'

interface NavigationProps {
  onCreateEvent?: () => void
}

export function Navigation({ onCreateEvent }: NavigationProps) {
  const navItems = [
    "Nhạc sống",
    "Sân khấu & Nghệ thuật", 
    "Thể Thao",
    "Khác"
  ]

  return (
    <nav className="bg-black text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <Button 
            onClick={onCreateEvent}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo sự kiện</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}