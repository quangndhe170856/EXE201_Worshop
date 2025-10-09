export interface Event {
  id: number
  title: string
  subtitle?: string
  description: string
  date: string
  time: string
  location: string
  venue: string
  image: string
  category?: string
  price: {
    min: number
    max: number
  }
  tickets: {
    type: string
    price: number
    description: string
    available: number
  }[]
  organizer: string
  rating: number
  attendees: number
  highlights: string[]
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "2025 HỒ CHÍ MINH",
    subtitle: "Đại nhạc hội âm thanh độc đáo",
    description: "Một sự kiện âm nhạc đặc biệt với sự tham gia của các nghệ sĩ hàng đầu Việt Nam và quốc tế. Trải nghiệm âm thanh vượt trội với công nghệ sân khấu hiện đại nhất. Hòa mình vào không gian âm nhạc sống động với những tiết mục biểu diễn ấn tượng, mang đến cho khán giả những phút giây thăng hoa cùng âm nhạc.",
    date: "15.11 - 16.11.2025",
    time: "15:00 - 22:00",
    location: "Thành phố Hồ Chí Minh",
    venue: "VĂN PHÒNG CITY",
    image: "https://images.unsplash.com/photo-1724285828991-e996e9cb8503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBjb2xvcmZ1bCUyMGxpZ2h0c3xlbnwxfHx8fDE3NTg4Nzc0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "FESTIVAL",
    price: { min: 500000, max: 2000000 },
    tickets: [
      {
        type: "Early Bird",
        price: 500000,
        description: "Vé ưu đãi sớm - Hạn chế số lượng",
        available: 50
      },
      {
        type: "Standard",
        price: 800000,
        description: "Vé thường - Quyền lợi cơ bản",
        available: 200
      },
      {
        type: "VIP",
        price: 1200000,
        description: "Vé VIP - Khu vực đặc biệt, đồ uống miễn phí",
        available: 100
      },
      {
        type: "VVIP",
        price: 2000000,
        description: "Vé VVIP - Quyền lợi cao cấp nhất, meet & greet",
        available: 25
      }
    ],
    organizer: "Music Entertainment Co.",
    rating: 4.8,
    attendees: 15420,
    highlights: [
      "Lineup nghệ sĩ hàng đầu Việt Nam và quốc tế",
      "Công nghệ âm thanh và ánh sáng hiện đại",
      "Khu vực ẩm thực đa dạng",
      "Hoạt động tương tác và trải nghiệm",
      "An ninh và an toàn tuyệt đối"
    ]
  },
  {
    id: 2,
    title: "VSTRA",
    subtitle: "Những thăng trầm của dòng nhạc tưởng",
    description: "Một đêm nhạc đặc biệt dành cho những tâm hồn yêu nhạc cổ điển và hiện đại. VSTRA mang đến những giai điệu du dương, sâu lắng với sự kết hợp tinh tế giữa nhạc cụ truyền thống và hiện đại. Đây là cơ hội để khán giả thưởng thức âm nhạc trong không gian lãng mạn và đầy cảm xúc.",
    date: "07.12.2025",
    time: "20:00",
    location: "Outdoor Venue",
    venue: "OUTDOOR THEATER",
    image: "https://images.unsplash.com/photo-1549047266-8d18e5f0e064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHN0YWdlJTIwdmVudWV8ZW58MXx8fHwxNzU4ODc4MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "CLASSICAL",
    price: { min: 300000, max: 1500000 },
    tickets: [
      {
        type: "General",
        price: 300000,
        description: "Vé thường - Khu vực ngồi thoải mái",
        available: 300
      },
      {
        type: "Premium",
        price: 600000,
        description: "Vé cao cấp - Vị trí ngồi tốt nhất",
        available: 150
      },
      {
        type: "Backstage",
        price: 1500000,
        description: "Vé đặc biệt - Gặp gỡ nghệ sĩ sau show",
        available: 20
      }
    ],
    organizer: "Classical Music Society",
    rating: 4.9,
    attendees: 8750,
    highlights: [
      "Dàn nhạc giao hưởng chuyên nghiệp",
      "Không gian ngoài trời lãng mạn",
      "Âm thanh acoustics tự nhiên",
      "Chương trình đa dạng từ cổ điển đến hiện đại",
      "Trải nghiệm văn hóa độc đáo"
    ]
  },
  {
    id: 3,
    title: "LẠC DƯƠNG YANGHỞ",
    subtitle: "Traditional Music Festival",
    description: "Lễ hội âm nhạc truyền thống độc đáo tôn vinh nền văn hóa dân tộc. Sự kiện mang đến những giai điệu truyền thống được kết hợp tinh tế với âm nhạc hiện đại, tạo nên một không gian văn hóa đậm đà bản sắc Việt Nam. Đây là dịp để mọi người cùng nhau khám phá và trân trọng giá trị văn hóa truyền thống.",
    date: "22.06.2025",
    time: "19:00",
    location: "Lạc Dương, Đà Lạt",
    venue: "Trung tâm Văn hóa Lạc Dương",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzU4ODU5OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "TRADITIONAL",
    price: { min: 200000, max: 800000 },
    tickets: [
      {
        type: "Student",
        price: 200000,
        description: "Vé sinh viên - Ưu đãi đặc biệt",
        available: 100
      },
      {
        type: "Adult",
        price: 400000,
        description: "Vé người lớn - Quyền lợi đầy đủ",
        available: 250
      },
      {
        type: "Family Pack",
        price: 800000,
        description: "Combo gia đình (4 người) - Tiết kiệm 20%",
        available: 50
      }
    ],
    organizer: "Lạc Dương Cultural Center",
    rating: 4.7,
    attendees: 5200,
    highlights: [
      "Nghệ sĩ dân tộc nổi tiếng",
      "Biểu diễn nhạc cụ truyền thống",
      "Không gian văn hóa đậm đà",
      "Ẩm thực địa phương đặc sắc",
      "Hoạt động trải nghiệm văn hóa"
    ]
  },
  {
    id: 4,
    title: "MIURE QUE SANG",
    subtitle: "Young Star Orchestra Vietnam Live Concert",
    description: "Đêm nhạc đặc biệt của dàn nhạc trẻ tài năng nhất Việt Nam. Những gương mặt nghệ sĩ trẻ triển vọng sẽ mang đến những tiết mục âm nhạc đa dạng từ pop, rock đến jazz. Đây là cơ hội để khán giả được thưởng thức tài năng của thế hệ nghệ sĩ mới và cảm nhận sự năng động, sáng tạo trong âm nhạc.",
    date: "28.06.2025",
    time: "20:30",
    location: "TP.HCM",
    venue: "Nhà hát Thành phố",
    image: "https://images.unsplash.com/photo-1656369895489-e24a2d0816e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NTg3OTI3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "LIVE CONCERT",
    price: { min: 350000, max: 1200000 },
    tickets: [
      {
        type: "Balcony",
        price: 350000,
        description: "Tầng 2 - Tầm nhìn tổng quan",
        available: 200
      },
      {
        type: "Orchestra",
        price: 650000,
        description: "Tầng 1 - Gần sân khấu",
        available: 150
      },
      {
        type: "VIP Box",
        price: 1200000,
        description: "Hộp VIP - Dịch vụ cao cấp",
        available: 30
      }
    ],
    organizer: "Young Star Entertainment",
    rating: 4.6,
    attendees: 7800,
    highlights: [
      "Dàn nhạc trẻ tài năng",
      "Repertoire đa dạng và hiện đại",
      "Tương tác với khán giả",
      "Không gian nhà hát sang trọng",
      "Âm thanh chất lượng cao"
    ]
  },
  {
    id: 5,
    title: "TẤT",
    subtitle: "Live Concert Series",
    description: "Series concert đặc biệt với sự tham gia của nhiều nghệ sĩ nổi tiếng. TẤT mang đến một đêm nhạc đa sắc màu với những thể loại âm nhạc khác nhau, từ ballad nhẹ nhàng đến rock sôi động. Mỗi tiết mục là một câu chuyện, mỗi giai điệu là một cảm xúc, tạo nên một trải nghiệm âm nhạc không thể quên.",
    date: "05.07.2025",
    time: "19:30",
    location: "Hà Nội",
    venue: "Cung Văn hóa Hữu nghị",
    image: "https://images.unsplash.com/photo-1737107917840-ea155fb60498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwdmVudWUlMjBsaWdodHN8ZW58MXx8fHwxNzU4ODc3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "CONCERT SERIES",
    price: { min: 400000, max: 1800000 },
    tickets: [
      {
        type: "Standing",
        price: 400000,
        description: "Khu vực đứng - Gần sân khấu",
        available: 300
      },
      {
        type: "Seated",
        price: 700000,
        description: "Khu vực ngồi - Thoải mái",
        available: 180
      },
      {
        type: "Golden Circle",
        price: 1200000,
        description: "Vòng tròn vàng - Vị trí đặc biệt",
        available: 80
      },
      {
        type: "Meet & Greet",
        price: 1800000,
        description: "Gặp gỡ nghệ sĩ + Photo",
        available: 15
      }
    ],
    organizer: "Live Music Productions",
    rating: 4.8,
    attendees: 12350,
    highlights: [
      "Lineup nghệ sĩ đa dạng",
      "Chất lượng âm thanh và ánh sáng tối ưu",
      "Tương tác đặc biệt với fan",
      "Merchandise độc quyền",
      "Trải nghiệm concert đáng nhớ"
    ]
  }
]