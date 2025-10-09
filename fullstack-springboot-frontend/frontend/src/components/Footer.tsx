import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full">
      {/* Contact Form Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl font-bold">Liên hệ với</h2>
            <img
              src="/images/logo.jpg"
              alt="Campusia Logo"
              className="w-20 h-20"
            />
          </div>

          {/* Description */}
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Hãy liên hệ với Campusia Để Được hỗ trợ nhanh chóng, giải Đáp thắc
            mắc hoặc trao Đổi cơ hội hợp tác.
          </p>

          {/* Form */}
          <form className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Carter"
                  className="w-full px-6 py-3 border-2 border-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="w-full px-6 py-3 border-2 border-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Please type your message here..."
                className="w-full px-6 py-4 border-2 border-gray-900 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-12 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-gray-300 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Contact Information */}
          <div className="space-y-2 mb-6">
            <p className="text-gray-900 font-medium">Campusia@company.com</p>
            <p className="text-gray-900 font-medium">0827775001</p>
            <p className="text-gray-900 font-medium">
              Trường đại học FPT Hà Nội
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
