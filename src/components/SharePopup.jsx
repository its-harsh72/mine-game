import { useState } from "react"
import {
  Send,
  Copy,
  MessageCircle,
  Instagram,
  Mail,
  X,
} from "lucide-react"

export default function SharePopup() {
  const [showShare, setShowShare] = useState(false)

  const shareUrl = window.location.href
  const shareMessage = `🎮 Check out this fun game! Play here: ${shareUrl}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("✅ Link copied to clipboard!")
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent("🎮 Check out this fun game!")}`
    window.open(telegramUrl, "_blank")
  }

  const handleInstagramShare = () => {
    // Instagram does not support direct URL sharing like WhatsApp/Telegram
    // You can redirect to your profile or app
    window.open("https://www.instagram.com/", "_blank") // replace with your IG handle if you want
  }

  const handleEmailShare = () => {
    const mailUrl = `mailto:?subject=${encodeURIComponent(
      "Fun Game to Try!"
    )}&body=${encodeURIComponent(shareMessage)}`
    window.open(mailUrl)
  }

  return (
    <div className="relative">
      {/* Share button */}
      <button
        onClick={() => setShowShare(true)}
        className="flex items-center gap-2 hover:text-white transition cursor-pointer"
      >
        <Send size={22} />
      </button>

      {/* Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-80 p-4 relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
              <h2 className="text-lg font-semibold text-gray-200">Share this game</h2>
              <button onClick={() => setShowShare(false)}>
                <X size={18} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition cursor-pointer"
              >
                <Copy size={18} /> Copy Link
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-green-700 hover:bg-green-600 text-gray-100 transition cursor-pointer"
              >
                <MessageCircle size={18} /> WhatsApp
              </button>

              <button
                onClick={handleTelegramShare}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-gray-100 transition cursor-pointer"
              >
                <Send size={18} /> Telegram
              </button>

              <button
                onClick={handleInstagramShare}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-pink-700 hover:bg-pink-600 text-gray-100 transition cursor-pointer"
              >
                <Instagram size={18} /> Instagram
              </button>

              <button
                onClick={handleEmailShare}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition cursor-pointer"
              >
                <Mail size={18} /> Mail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
