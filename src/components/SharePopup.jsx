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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("✅ Link copied to clipboard!")
  }

  const handleComingSoon = (platform) => {
    alert(`${platform} feature coming soon!`)
  }

  return (
    <div className="relative">
      {/* Share button */}
      <button
        onClick={() => setShowShare(true)}
        className="flex items-center gap-2 hover:text-white transition"
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
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
              >
                <Copy size={18} /> Copy Link
              </button>

              <button
                onClick={() => handleComingSoon("WhatsApp")}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
              >
                <MessageCircle size={18} /> WhatsApp
              </button>

              <button
                onClick={() => handleComingSoon("Telegram")}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
              >
                <Send size={18} /> Telegram
              </button>

              <button
                onClick={() => handleComingSoon("Instagram")}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
              >
                <Instagram size={18} /> Instagram
              </button>

              <button
                onClick={() => handleComingSoon("Mail")}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
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
