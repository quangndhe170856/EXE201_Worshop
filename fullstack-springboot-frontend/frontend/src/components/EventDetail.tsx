import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { EventResponse } from "../data/events";

interface EventDetailProps {
  event: EventResponse;
  onBack: () => void;
}

export function EventDetail({ event, onBack }: EventDetailProps) {
  const startDate = event.startAt ? new Date(event.startAt) : null;
  const endDate = event.endAt ? new Date(event.endAt) : null;

  const formattedDate = startDate?.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = startDate?.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endDate?.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="min-h-screen text-black"
      style={{
        background:
          "linear-gradient(to right, #ffffff 0%, #faeaea 50%, #F3D7D7 100%)",
      }}
    >
      {/* Banner Image */}
      <div className="relative">
        <ImageWithFallback
          src="/images/banner4.jpg"
          alt={event.title}
          className="w-full h-[500px] object-cover rounded-b-3xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-3xl" />

        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 left-6 text-white hover:bg-white/30 backdrop-blur-sm rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Share + Favorite */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/30 backdrop-blur-sm rounded-full"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/30 backdrop-blur-sm rounded-full"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {event.categories?.map((cat) => (
              <Badge
                key={cat.id}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm font-medium rounded-full"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-5xl font-bold mb-3 text-white drop-shadow-lg">
            {event.title}
          </h1>
          <p className="text-lg text-gray-100 line-clamp-2 max-w-3xl drop-shadow-md">
            {event.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Info Card */}
          <Card className="bg-white border-none shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Thông tin sự kiện
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formattedDate && (
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
                    <div className="p-3 bg-red-500 rounded-full">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Ngày
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                )}

                {formattedTime && (
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                    <div className="p-3 bg-orange-500 rounded-full">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Thời gian
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {formattedTime}{" "}
                        {formattedEndTime && `- ${formattedEndTime}`}
                      </p>
                    </div>
                  </div>
                )}

                {event.locationName && (
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                    <div className="p-3 bg-pink-500 rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Địa điểm
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {event.locationName}
                      </p>
                      {event.address && (
                        <p className="text-sm text-gray-500 mt-1">
                          {event.address}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Separator className="bg-gray-200" />

              {/* Description */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Mô tả chi tiết
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>

              {/* Registration Button */}
              {event.registerUrl && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Đăng ký tham dự
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Media Gallery */}
          {event.media?.length ? (
            <Card className="bg-white border-none shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Hình ảnh sự kiện
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.media.map((m) => (
                    <img
                      key={m.id}
                      src={m.url || "/placeholder.svg"}
                      alt={m.type ?? "media"}
                      className="w-full h-48 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white border-none shadow-xl rounded-2xl sticky top-6">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thông tin nhanh
              </h3>
              <div className="space-y-3 text-black">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Trạng thái:</span>
                  <Badge
                    className={
                      event.status === "published"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {event.status === "published"
                      ? "Đang mở đăng ký"
                      : "Đã lưu nháp"}
                  </Badge>
                </div>

                {event.latitude && event.longitude && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">Tọa độ:</p>
                    <p className="text-sm text-gray-600">
                      {event.latitude}, {event.longitude}
                    </p>
                  </div>
                )}

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-1">ID:</p>
                  <p className="text-sm text-gray-600">{event.id}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-1">Slug:</p>
                  <p className="text-sm text-gray-600 break-all">
                    {event.slug}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
