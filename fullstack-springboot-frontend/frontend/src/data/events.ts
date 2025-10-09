// src/data/events.ts
import axios from "axios";

/**
 * Kiểu dữ liệu cho 1 sự kiện
 */
export interface EventResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  startAt: string;
  endAt: string | null;
  locationName: string;
  address: string;
  featured: boolean;
  status: string;
  registerUrl?: string;
  createdAt: string;
  updatedAt: string;
  categories: {
    id: number;
    name: string;
  }[];
  image?: string;
  media?: EventMedia[];
  latitude?: number;
  longitude?: number;
}

/**
 * Kiểu dữ liệu cho media trong event
 */
export interface EventMedia {
  id: string;
  url: string;
  type?: string;
}

/**
 * Cấu trúc response phân trang (nếu backend trả về Page)
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/**
 * 🔥 Hàm gọi API backend thật
 */
export async function fetchEvents(): Promise<EventResponse[]> {
  try {
    // Nếu backend trả JSON kiểu PageResponse<EventResponse>
    // => cần lấy .content thay vì toàn bộ res.data
    const res = await axios.get("http://localhost:8080/api/events");

    // Nếu backend chỉ trả mảng, bạn có thể đổi lại thành res.data
    if (Array.isArray(res.data)) {
      return res.data as EventResponse[];
    }

    // Nếu backend trả kiểu PageResponse, trả về content
    return res.data.content ?? [];
  } catch (err) {
    console.error("❌ Lỗi khi gọi API events:", err);
    return [];
  }
}
