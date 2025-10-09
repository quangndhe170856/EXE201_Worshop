import { EventCard } from "./EventCard";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventResponse } from "../data/events";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SpecialEventsProps {
  events: EventResponse[];
  loading?: boolean;
  onEventClick?: (event: EventResponse) => void;
}

interface EventCarouselProps {
  title: string;
  color: string;
  description: string;
  events: EventResponse[];
  onEventClick: (event: EventResponse) => void;
}

export function EventCarousel({
  title,
  color,
  description,
  events,
  onEventClick,
}: EventCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  if (!events.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 mb-16">
      {/* Tiêu đề & mô tả */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2
              className="font-[Alatsi] font-normal text-[40px]"
              style={{ color }}
            >
              {title}
            </h2>
            <svg
              width="60"
              height="40"
              viewBox="0 0 75 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M74.9057 46.2334L74.6135 24.3763C74.4469 22.0658 72.221 20.4384 69.7994 20.4577L58.2783 20.6817C54.9564 18.5967 52.5826 15.6595 49.3799 13.5615C48.2496 12.8241 47.3716 11.9968 46.7458 11.0796C44.707 7.78959 45.8636 3.89058 42.9937 1.29217C37.27 -0.673963 30.4854 2.36418 28.6243 6.96081C27.1633 10.7135 28.2253 14.4068 30.1478 17.6587C23.3469 17.7813 16.5468 17.9604 9.74661 18.1234C4.21478 18.5823 0.309428 21.8265 0.332857 26.3307C0.40863 30.8688 5.05727 34.0797 9.95967 34.0658L17.9605 33.9102C18.2451 35.242 18.7813 36.4443 19.5693 37.5171C19.1584 40.3214 20.2207 43.0422 22.2299 44.9797C23.5337 61.0947 48.2838 51.0376 57.5979 50.6162L70.1993 50.3711C72.9391 50.2076 74.9006 48.3018 74.9057 46.2334ZM57.7439 46.5672C50.2907 46.8484 24.9454 56.9212 27.2073 43.1488C24.495 41.9666 23.4136 38.6825 25.0385 36.5608C22.4991 34.5052 21.7486 31.8753 24.147 29.7438C21.7468 29.7905 19.3731 29.8253 17.0258 29.8483C13.505 29.8828 12.3049 29.9061 9.90468 29.9528C7.15725 29.9571 5.23062 28.2817 5.17337 26.2366C5.20381 23.817 7.34383 22.241 9.80063 22.1685C19.1104 21.9871 28.2869 21.7419 36.9225 21.5731C36.0744 16.2878 28.5362 9.23516 36.0795 4.91183C37.2892 4.38044 38.2592 4.146 39.5327 4.31761C39.7473 4.40411 39.8685 4.49243 39.8964 4.58256C39.9243 4.6727 39.9662 4.81922 40.0223 5.02211C40.8859 9.20784 41.6959 13.3941 45.5723 16.1006C49.835 18.7719 52.3847 23.0583 57.2516 24.7139L57.4516 24.71L57.7438 46.5672L57.7439 46.5672Z"
                fill={color}
              />
            </svg>
          </div>

          <p className="font-[Alatsi] text-[20px] leading-[30px] text-black mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Swiper hiển thị sự kiện */}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        loop
        centeredSlides
        autoplay={{ delay: 5000 }}
        breakpoints={{ 768: { slidesPerView: 3 } }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ padding: "0 20px 100px 20px" }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={event.id}>
            <div
              className={`transition-transform duration-700 ease-in-out ${
                index === activeIndex
                  ? "translate-y-10 scale-105 z-10 opacity-100"
                  : "translate-y-0 scale-100 opacity-80"
              }`}
            >
              <EventCard
                id={event.id}
                title={event.title}
                description={event.description}
                image="/placeholder.svg"
                location={event.locationName}
                startAt={event.startAt}
                onClick={() => onEventClick(event)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng */}
      <div className="flex justify-center gap-12 mt-6">
        <button
          onClick={handlePrev}
          className="p-3 border border-gray-400 rounded-full hover:bg-gray-800 hover:text-white transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 border border-gray-400 rounded-full hover:bg-gray-800 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export function SpecialEvents({
  events,
  loading,
  onEventClick,
}: SpecialEventsProps) {
  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Đang tải sự kiện...
      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="py-16 text-center text-gray-500">
        Không có sự kiện nào để hiển thị.
      </section>
    );
  }

  // Lấy tất cả category có trong events
  const categoriesMap: Record<number, { id: number; name: string }> = {};
  events.forEach((event) => {
    event.categories.forEach((cat) => {
      categoriesMap[cat.id] = cat;
    });
  });
  const categories = Object.values(categoriesMap);

  return (
    <section className="bg-white py-8">
      {categories.map((cat) => {
        const eventsByCategory = events.filter((e) =>
          e.categories.some((c) => c.id === cat.id)
        );
        return (
          <EventCarousel
            key={cat.id}
            title={cat.name} // dùng tên category
            color="#F1724B" // có thể gán màu khác nhau nếu muốn
            description={`Các sự kiện thuộc nhóm ${cat.name}`}
            events={eventsByCategory}
            onEventClick={onEventClick!}
          />
        );
      })}
    </section>
  );
}
