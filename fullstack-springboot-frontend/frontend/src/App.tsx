import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { SpecialEvents } from "./components/SpecialEvents";
import { EventDetail } from "./components/EventDetail";
import { Footer } from "./components/Footer";
import { SearchAndFilters, FilterState } from "./components/SearchAndFilters";
import { EventResponse } from "./data/events";
import { fetchEvents } from "./data/events"; // ✅ Gọi API thật thay cho fakePageResponse

type ViewState = "home" | "eventDetail";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    categories: [],
    dateRange: {},
    sortBy: "latest",
  });
  const [loading, setLoading] = useState(false);

  const handleEventClick = (event: EventResponse) => {
    setSelectedEvent(event);
    setCurrentView("eventDetail");
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setCurrentView("home");
  };

  // ✅ Dùng backend thật thay vì fake data
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(); // gọi API http://localhost:8080/api/events
        setEvents(data);
      } catch (err) {
        console.error("❌ Lỗi tải sự kiện:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [filters]); // bạn có thể thêm filters nếu backend hỗ trợ filter

  return (
      <div className="min-h-screen bg-white">
        <Header />

        {currentView === "home" && (
            <>
              <HeroCarousel onEventClick={() => {}} />
              <SpecialEvents
                  events={events}
                  loading={loading}
                  onEventClick={handleEventClick}
              />
            </>
        )}

        {currentView === "eventDetail" && selectedEvent && (
            <EventDetail event={selectedEvent} onBack={handleBack} />
        )}

        <Footer />
      </div>
  );
}
