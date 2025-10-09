import { useState } from "react";
import { Search, MessageCircle, Bell, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Login } from "./Login";

interface HeaderProps {
  onSearch?: (query: string) => void; // 🟢 thêm prop này để truyền ra ngoài
}

export function Header({ onSearch }: HeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value); // 🟢 gọi callback truyền từ App
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="Campusia Logo"
                className="w-20 h-20"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-8">
            <a
              href="home"
              className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
            >
              Về chúng tôi
            </a>
            <button className="flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors font-medium">
              CLB
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors font-medium">
              Workshop
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors font-medium">
              EXE
              <ChevronDown className="w-4 h-4" />
            </button>
          </nav>

          {/* 🔍 Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => setIsLoginOpen(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-6 font-medium"
            >
              LOG IN
            </Button>
          </div>
        </div>
      </header>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
