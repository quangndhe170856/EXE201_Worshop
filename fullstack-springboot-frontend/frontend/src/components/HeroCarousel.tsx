import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

interface HeroCarouselProps {
  onEventClick: (eventId: number) => void
}

export function HeroCarousel({ onEventClick }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "2025",
      subtitle: "HỒ CHÍ MINH",
      date: "15.11 - 16.11.2025 (SAT-SUN)",
      time: "15:00-22:00",
      location: "VĂN PHÒNG CITY",
      background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)",
      buttonText: "Xem Chi tiết"
    },
    {
      id: 2,
      title: "VSTRA",
      subtitle: "Những thăng chảm của và bạn nhạc tưởng",
      date: "07.12.2025",
      time: "20:00",
      location: "OUTDOOR",
      background: "linear-gradient(135deg, #f97316 0%, #eab308 50%, #84cc16 100%)",
      buttonText: "Xem Chi tiết"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-80 overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="min-w-full h-full flex items-center justify-center relative"
            style={{ background: slide.background }}
          >
            <div className="text-center text-white z-10">
              <h2 className="text-6xl font-bold mb-2">{slide.title}</h2>
              <h3 className="text-2xl mb-4">{slide.subtitle}</h3>
              <div className="text-lg mb-2">{slide.date}</div>
              <div className="text-lg mb-2">{slide.time}</div>
              <div className="text-lg mb-6">{slide.location}</div>
              <Button 
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => onEventClick(slide.id)}
              >
                {slide.buttonText}
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}