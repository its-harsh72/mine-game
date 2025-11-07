import { useState } from "react"
import {
  Star,
  Heart,
  Copy,
  MessageCircle,
  Send,
  Mail,
  X
} from "lucide-react"
import SharePopup from "./SharePopup"

export default function FooterIcons() {
  const [isFav, setIsFav] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showShare, setShowShare] = useState(false)

  // starting counts
  const [favCount, setFavCount] = useState(845)
  const [likeCount, setLikeCount] = useState(854)

  const handleFavToggle = () => {
    setIsFav(!isFav)
    setFavCount((prev) => prev + (isFav ? -1 : 1))
  }

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => prev + (isLiked ? -1 : 1))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }

  const handleComingSoon = (platform) => {
    alert(`${platform} feature coming soon!`)
  }

  return (
    <div className="relative flex items-center gap-6 text-gray-300">
      {/* ⭐ Favorite toggle */}
      <button
        onClick={handleFavToggle}
        className="flex items-center gap-2 transition cursor-pointer"
      >
        <Star
          size={22}
          fill={isFav ? "#facc15" : "none"}
          stroke={isFav ? "#facc15" : "currentColor"}
          className="text-gray-300 hover:text-yellow-400 transition-colors "
        />
        <span className="text-gray-300">{favCount}</span>
      </button>

      {/* ❤️ Like toggle */}
      <button
        onClick={handleLikeToggle}
        className="flex items-center gap-2 transition cursor-pointer"
      >
        <Heart
          size={22}
          fill={isLiked ? "#f87171" : "none"}
          stroke={isLiked ? "#f87171" : "currentColor"}
          className="text-gray-300 hover:text-red-400 transition-colors"
        />
        <span className="text-gray-300">{likeCount}</span>
      </button>

      {/* 📤 Share popup */}
      <div className="relative">
      <SharePopup className="cursor-pointer" />

        {/* Share menu popup */}
        {showShare && (
          <div className="absolute bottom-10 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 w-48">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-200">Share</span>
              <button onClick={() => setShowShare(false)}>
                <X size={16} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <Copy size={16} />
              Copy Link
            </button>

            <button
              onClick={() => handleComingSoon("WhatsApp")}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>

            <button
              onClick={() => handleComingSoon("Telegram")}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <Send size={16} />
              Telegram
            </button>

            <button
              onClick={() => handleComingSoon("Instagram")}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <Instagram size={16} />
              Instagram
            </button>

            <button
              onClick={() => handleComingSoon("Mail")}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer "
            >
              <Mail size={16} />
              Mail
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
