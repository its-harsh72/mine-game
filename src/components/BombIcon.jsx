export default function BombIcon({ width = 80, height = 80, blasting = false }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        margin: "0 auto",
      }}
    >
      {/* Flash animation that plays whenever the bomb explodes */}
      {blasting && (
        <circle cx="70" cy="90" r="5" fill="yellow">
          <animate
            attributeName="r"
            from="5"
            to="80"
            dur="0.35s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="0.9"
            to="0"
            dur="0.35s"
            fill="freeze"
          />
        </circle>
      )}

      {/* Soft glow behind the spark */}
      <circle cx="105" cy="35" r="16" fill="gold" opacity="0.55" />

      {/* Spark on top of the fuse */}
      <polygon
        points="105,18 112,28 125,30 112,36 105,48 98,36 85,30 98,28"
        fill="#FFD93D"
      >
        {/* Little flicker effect to make the spark feel alive */}
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </polygon>

      {/* Fuse with a subtle wiggle animation */}
      <path
        d="M95 45 C92 55, 75 55, 73 45"
        stroke="#C2B280"
        strokeWidth="4.5"
        fill="none"
      >
        <animate
          attributeName="stroke-width"
          values="4.5;3;4.5"
          dur="0.25s"
          repeatCount="indefinite"
        />
      </path>

      {/* Main bomb body */}
      <circle cx="70" cy="90" r="40" fill="url(#bombGradient)">
        {/* Shrinks quickly during the blast animation */}
        {blasting && (
          <animate
            attributeName="r"
            from="40"
            to="0"
            dur="0.35s"
            fill="freeze"
          />
        )}
      </circle>

      <defs>
        <radialGradient id="bombGradient" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#666" />
          <stop offset="60%" stopColor="#2E2E2E" />
          <stop offset="100%" stopColor="#141414" />
        </radialGradient>
      </defs>

      {/* Skull face visible only when the bomb is NOT blasting */}
      {!blasting && (
        <>
          <path
            d="M58 82 a9 9 0 1 1 18 0 v9 h-18z"
            fill="#CCCCCC"
            opacity="0.9"
          />
          <circle cx="62" cy="84" r="2.8" fill="#555" />
          <circle cx="72" cy="84" r="2.8" fill="#555" />
          <rect x="66" y="90" width="5" height="5" fill="#555" />
        </>
      )}
    </svg>
  );
}
