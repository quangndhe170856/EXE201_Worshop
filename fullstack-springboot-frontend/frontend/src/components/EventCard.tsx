import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EventCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  startAt?: string;
  location?: string;
  onClick?: (id: string) => void;
}

export function EventCard({
  id,
  image,
  title,
  description,
  startAt,
  location,
  onClick,
}: EventCardProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      {/* Image */}
      <div className="relative">
        <ImageWithFallback
          src="/images/banner4.jpg"
          alt={title}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Date + Location */}
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          {location && <p className="font-medium">{location}</p>}
          {startAt && <p>{formatDate(startAt)}</p>}
        </div>

        {/* Title */}
        <h3 className="text-orange-600 font-bold text-base mb-2 leading-tight uppercase tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
}

// Optional helper to format ISO date or timestamp
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
