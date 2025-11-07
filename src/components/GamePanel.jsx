import gameBG from "../assets/game_BG.png";

export default function GamePanel({ state, getTileContent, revealTile }) {
  return (
    <div
      className="bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${gameBG})`,
        width: "100%",
        height: "650px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      
<div className="backdrop-blur-sm px-6 py-3 flex justify-center gap-2 flex-row-reverse">
  {(state.history || []).map((h, i) => {
    const isWin = h !== "0x";  // ✅ any value except 0x = win

    return (
      <button
        key={i}
        className={`
          px-4 py-2 rounded-lg font-bold whitespace-nowrap text-sm shadow-md shadow-black/30
          ${isWin
            ? "bg-emerald-500 text-black"      // ✅ green for wins
            : "bg-[#1e2121]/80 text-gray-200"  // ✅ gray for 0x
          }
        `}
      >
        {h}
      </button>
    );
  })}
</div>


      {/* Game Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="
            grid grid-cols-5
            gap-x-2 gap-y-2
            p-6 rounded-[28px]
            bg-[#00000090] backdrop-blur-md
            w-[90%] max-w-[520px]
          "
        >
          {state.revealedTiles.map((_, index) => {
            const isRevealed = state.revealedTiles[index];
            const isForced = state.forcedReveal?.[index];
            const tileType = state.tileTypes[index];
            const isGem = tileType === "gem";
            const isMine = tileType === "mine";

            return (
              <button
                key={index}
                onClick={() => revealTile(index)}
                disabled={!state.gameActive || isRevealed}
                className={`
                  aspect-square rounded-xl flex items-center justify-center
                  transition-all duration-200
                  ${
                    isRevealed && isGem
                      ? "bg-[#7d40cf]"
                      : isRevealed && isMine
                      ? "bg-[#1c1e1e]"
                      : isForced && isGem
                      ? "bg-[#8a4fff22]"
                      : isForced && isMine
                      ? "bg-[#1c1e1e99]"
                      : "bg-[#2b2f30] hover:bg-[#35393a]"
                  }
                `}
              >
                {getTileContent(index)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
