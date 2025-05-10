import { useState } from "react";
import { Button } from "./button";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "918200653998"; // Format: country code + number without + or spaces

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      // Create WhatsApp URL with phone number and message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");
      // Reset the form
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <IoLogoWhatsapp size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">WhatsApp Chat</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20"
              >
                <RiCloseLine size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-5">
            <p className="mb-4 text-sm text-gray-600">
              Send us a message and we'll get back to you shortly!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full rounded-xl border-0 bg-gray-50 p-4 text-sm text-black shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                  rows={3}
                  placeholder="👋 Hi there! How can we help you today? Type your message here and we'll respond as soon as possible..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-3 text-white shadow-md transition-all hover:from-green-600 hover:to-green-700 hover:shadow-lg"
              >
                <IoLogoWhatsapp className="mr-2" size={18} />
                Send via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <IoLogoWhatsapp size={32} color="white" />
      </Button>
    </div>
  );
} 