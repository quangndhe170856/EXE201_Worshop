import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface HeroCarouselProps {
  onEventClick: (eventId: string) => void;
}

export function HeroCarousel({ onEventClick }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "1",
      title: "MÊDUCA 2025: 𝐓𝐎𝐎𝐍𝐓𝐔𝐍𝐄𝐒 - ÂM THANH TỪ VŨ TRỤ ĐA SẮC",
      category: "MELODY CLUB",
      description:
        " Ngàn năm qua, vương quốc Doodles bị giam cầm trong lời nguyền vô sắc. Sắc màu biến mất, tiếng cười ngủ yên, chỉ còn bóng tối và tĩnh lặng bao trùm. Thế nhưng, truyền thuyết kể rằng khi “Âm thanh từ Vũ trụ Đa Sắc” vang lên, những Doodles mang khát vọng hồi sinh sẽ thức tỉnh.",
      date: "15.11 - 16.11.2025 (SAT-SUN)",
      location: "Công viên Long Biên",
      background:
        "linear-gradient(to right, #ffffff 0%, #faeaea 50%, #F3D7D7 100%)",
      buttonText: "Đăng ký tham gia",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-300 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full font-[Alatsi] flex relative h-full "
            style={{ background: slide.background }}
          >
            <div className="text-start max-w-1/2 text-black z-10 pt-10 pl-20">
              <div className="flex flex-col justify-between max-w-2/3 h-full z-10">
                {/* Phần trên */}
                <div>
                  <h2 className="text-6xl font-bold mb-2 text-orange-400">
                    {slide.category}
                  </h2>
                  <div className="flex my-4">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 0.75H31.5M4.5 35.25H31.5M8.25 35.25V26.25L12.534 23.679C13.5148 23.0906 14.3264 22.2583 14.89 21.2631C15.4535 20.2679 15.7497 19.1437 15.7497 18C15.7497 16.8563 15.4535 15.7321 14.89 14.7369C14.3264 13.7417 13.5148 12.9094 12.534 12.321L8.25 9.75V0.75M27.75 0.75V9.75L23.466 12.321C22.4856 12.9096 21.6743 13.7421 21.111 14.7372C20.5478 15.7324 20.2517 16.8565 20.2517 18C20.2517 19.1435 20.5478 20.2676 21.111 21.2628C21.6743 22.2579 22.4856 23.0904 23.466 23.679L27.75 26.25V35.25"
                        stroke="black"
                      />
                    </svg>
                    <div className="text-4xl">{slide.date}</div>
                  </div>
                  <div className="flex my-4">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.453 38.4425C24.5615 36.5292 26.513 34.4496 28.2885 32.2238C32.0285 27.525 34.3037 22.8922 34.4577 18.7727C34.5186 17.0985 34.2415 15.4292 33.6428 13.8644C33.0442 12.2997 32.1363 10.8717 30.9734 9.66576C29.8105 8.45978 28.4165 7.50055 26.8746 6.84539C25.3327 6.19022 23.6746 5.85255 21.9992 5.85255C20.3239 5.85255 18.6658 6.19022 17.1239 6.84539C15.582 7.50055 14.188 8.45978 13.0251 9.66576C11.8622 10.8717 10.9543 12.2997 10.3557 13.8644C9.75702 15.4292 9.47989 17.0985 9.54083 18.7727C9.69666 22.8922 11.9737 27.525 15.7118 32.2238C17.4873 34.4496 19.4388 36.5292 21.5473 38.4425C21.7502 38.6259 21.9012 38.7591 22.0002 38.8422L22.453 38.4425ZM20.6472 40.5784C20.6472 40.5784 7.3335 29.3657 7.3335 18.3327C7.3335 14.4428 8.87873 10.7123 11.6293 7.96178C14.3798 5.21125 18.1103 3.66602 22.0002 3.66602C25.89 3.66602 29.6205 5.21125 32.3711 7.96178C35.1216 10.7123 36.6668 14.4428 36.6668 18.3327C36.6668 29.3657 23.3532 40.5784 23.3532 40.5784C22.6125 41.2604 21.3933 41.253 20.6472 40.5784ZM22.0002 23.466C23.3616 23.466 24.6673 22.9252 25.63 21.9625C26.5927 20.9998 27.1335 19.6941 27.1335 18.3327C27.1335 16.9712 26.5927 15.6656 25.63 14.7029C24.6673 13.7402 23.3616 13.1993 22.0002 13.1993C20.6387 13.1993 19.333 13.7402 18.3703 14.7029C17.4077 15.6656 16.8668 16.9712 16.8668 18.3327C16.8668 19.6941 17.4077 20.9998 18.3703 21.9625C19.333 22.9252 20.6387 23.466 22.0002 23.466ZM22.0002 25.666C20.0552 25.666 18.19 24.8934 16.8147 23.5181C15.4394 22.1429 14.6668 20.2776 14.6668 18.3327C14.6668 16.3878 15.4394 14.5225 16.8147 13.1472C18.19 11.772 20.0552 10.9993 22.0002 10.9993C23.9451 10.9993 25.8103 11.772 27.1856 13.1472C28.5609 14.5225 29.3335 16.3878 29.3335 18.3327C29.3335 20.2776 28.5609 22.1429 27.1856 23.5181C25.8103 24.8934 23.9451 25.666 22.0002 25.666Z"
                        fill="black"
                      />
                    </svg>

                    <div className="text-4xl mb-6">{slide.location}</div>
                  </div>

                  <h2 className="text-5xl mb-2" style={{ color: "#088284" }}>
                    {slide.title}
                  </h2>
                  <p className="text-2xl text-[20px] mb-4">
                    {slide.description}
                  </p>
                  <div className="flex items-center">
                    <svg
                      width="108"
                      height="108"
                      viewBox="0 0 108 108"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M79.47 50.4C78.435 49.05 77.175 47.88 76.005 46.71C72.99 44.01 69.57 42.075 66.69 39.24C59.985 32.67 58.5 21.825 62.775 13.5C58.5 14.535 54.765 16.875 51.57 19.44C39.915 28.8 35.325 45.315 40.815 59.49C40.995 59.94 41.175 60.39 41.175 60.975C41.175 61.965 40.5 62.865 39.6 63.225C38.565 63.675 37.485 63.405 36.63 62.685C36.3746 62.4711 36.161 62.2117 36 61.92C30.915 55.485 30.105 46.26 33.525 38.88C26.01 45 21.915 55.35 22.5 65.115C22.77 67.365 23.04 69.615 23.805 71.865C24.435 74.565 25.65 77.265 27 79.65C31.86 87.435 40.275 93.015 49.32 94.14C58.95 95.355 69.255 93.6 76.635 86.94C84.87 79.47 87.75 67.5 83.52 57.24L82.935 56.07C81.99 54 79.47 50.4 79.47 50.4ZM65.25 78.75C63.99 79.83 61.92 81 60.3 81.45C55.26 83.25 50.22 80.73 47.25 77.76C52.605 76.5 55.8 72.54 56.745 68.535C57.51 64.935 56.07 61.965 55.485 58.5C54.945 55.17 55.035 52.335 56.25 49.23C57.105 50.94 58.005 52.65 59.085 54C62.55 58.5 67.995 60.48 69.165 66.6C69.345 67.23 69.435 67.86 69.435 68.535C69.57 72.225 67.95 76.275 65.25 78.75Z"
                        fill="#A16DB4"
                      />
                    </svg>
                    <Button
                      className="btn-custom-purple px-10 py-8 text-lg rounded-xl"
                      onClick={() => onEventClick(slide.id)}
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>

                {/* Phần dưới */}
                <div className="flex text-center ">
                  <img
                    src="/images/banner3.jpg"
                    alt="abc"
                    className="max-w-2/3 mr-4"
                  />
                  <img
                    src="/images/banner2.jpg"
                    alt="abc"
                    className="max-w-2/3 ml-4"
                  />
                </div>
              </div>
            </div>

            <div className="items-end max-w-full pr-20">
              <img src="/images/banner1.jpg" alt="abc" className="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
