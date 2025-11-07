export default function PurpleDiamond({ width = 80, height = 80 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DCC0FE" />
          <stop offset="40%" stopColor="#AF75FF" />
          <stop offset="100%" stopColor="#A05BFF" />
        </linearGradient>
      </defs>

      {/* Main diamond shape */}
      <polygon
        points="75,5 140,40 75,115 10,40"
        fill="url(#diamondGradient)"
      />

      {/* Top left facet */}
      <polygon points="75,5 10,40 45,40" fill="#DCC0FE" opacity="0.8" />

      {/* Top right facet */}
      <polygon points="75,5 140,40 105,40" fill="#C9A3FF" opacity="0.7" />

      {/* Center top facet */}
      <polygon points="45,40 105,40 75,55" fill="#CFAEFF" opacity="0.6" />

      {/* Left bottom facet */}
      <polygon points="10,40 75,115 75,55" fill="#AF75FF" opacity="0.6" />

      {/* Right bottom facet */}
      <polygon points="140,40 75,115 75,55" fill="#A05BFF" opacity="0.7" />
    </svg>
  );
}
