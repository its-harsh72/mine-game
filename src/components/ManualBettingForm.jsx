import { Info, WandSparkles } from 'lucide-react';

// Added 'active', 'cashOut', and 'pickRandomTile' to props
export default function ManualBettingForm({ state,amount, setAmount, mines, setMines, handleBet, active, cashOut, pickRandomTile }) {
  // Determine if we are in 'betting' or 'game active' state
  const isGameActive = active;

  return (
    <div className="space-y-5 shadow-inner w-full max-w-sm">
      
      {/* Amount (Remains the same) */}
      <div className="space-y-2">
        <label className="text-sm text-slate-300 flex items-center gap-2 font-medium">
          Amount <span className="text-xs text-slate-500"><Info /></span>
        </label>

        {/* Full Control Bar */}
        <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
          {/* LEFT: Coin Icon + Input */}
          <div className="flex items-center gap-2 px-3 border-r border-[#3a3d42]">
            <span className="text-green-400 text-xl"><img
                src="https://flagcdn.com/in.svg"
                alt="India Flag"
                width="20"
              /></span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-20 bg-transparent text-white text-sm focus:outline-none"
              // Disable input if game is active
              disabled={isGameActive} 
            />
          </div>

          {/* 1/2 Button */}
          <button
            onClick={() => setAmount(amount / 2)}
            className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c] cursor-pointer"
            // Disable button if game is active
            disabled={isGameActive}
          >
            1/2
          </button>

          {/* 2× Button */}
          <button
            onClick={() => setAmount(amount * 2)}
            className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c] cursor-pointer"
            // Disable button if game is active
            disabled={isGameActive}
          >
            2×
          </button>

          {/* UP/DOWN Increment Box */}
          <div className="flex flex-col">
            <button
              onClick={() => setAmount(amount + 1)}
              className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c] border-b border-[#3a3d42] cursor-pointer"
              // Disable button if game is active
              disabled={isGameActive}
            >
              ▲
            </button>

            <button
              onClick={() => setAmount(Math.max(0, amount - 1))}
              className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c] cursor-pointer"
              // Disable button if game is active
              disabled={isGameActive}
            >
              ▼
            </button>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 10, 100, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`bg-[#2a2d31] hover:bg-[#34373c] border border-[#3a3d42] text-slate-300 cursor-pointer
                        py-2 rounded-lg text-xs font-medium transition ${isGameActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              // Disable button if game is active
              disabled={isGameActive} 
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Mines Slider (Remains the same) */}
      <div className="space-y-2">
        <label className="text-sm text-slate-300 font-medium">Mines</label>

        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">{mines}</span>
          <div className="relative w-full h-4 flex items-center">

            {/* Dark background track */}
            <div className="absolute w-full h-1.5 bg-[#2f3237] rounded-full"></div>

            {/* Gradient filled track */}
            <div
              className="absolute h-1.5 rounded-full bg-linear-to-r from-[#27ee89] to-[#89e976]"
              style={{ width: `${(mines / 24) * 100}%` }}
            ></div>

            {/* Actual slider (thumb on top) */}
            <input
              type="range"
              min="1"
              max="24"
              value={mines}
              onChange={(e) => setMines(Number(e.target.value))}
              // Disable slider if game is active
              disabled={isGameActive} 
              className={`
              w-full h-4 appearance-none bg-transparent cursor-pointer relative z-10

              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border
              [&::-webkit-slider-thumb]:border-gray-300
              [&::-webkit-slider-thumb]:shadow-lg

              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border
              [&::-moz-range-thumb]:border-gray-300
              [&::-moz-range-thumb]:shadow
              ${isGameActive ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            />
          </div>

          <span className="text-slate-400 text-sm">24</span>
        </div>
      </div>


      <div>
        {/* Conditional Buttons based on game active state */}
        {isGameActive ? (
          <>
            {/* Pick a Tile Randomly Button */}
            <button
              onClick={pickRandomTile}
              className="w-full cursor-pointer bg-[#34373c] text-slate-200 font-bold text-base py-3 rounded-lg hover:bg-[#43464c] transition-all mb-2 flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="pickaxe"><WandSparkles /></span> Pick a Tile Randomly
            </button>

            {/* Cash Out Button - Orange/Gold gradient */}
            <button
              onClick={cashOut}
              disabled={state.potentialWinnings <= 0}
              className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all text-lg shadow-lg"
            >
              Cash out ₹{state.potentialWinnings.toFixed(0)}
            </button>
          </>
        ) : (
          /* Bet Button - Green gradient (Only shown when game is NOT active) */
          <button
            onClick={handleBet}
            disabled={amount <= 0}
            className="w-full cursor-pointer bg-linear-to-r from-[#27ee89] to-[#89e976] text-black font-bold text-lg py-2 rounded-lg hover:from-[#1fd676] hover:to-[#7dd663] active:from-[#17be63] active:to-[#6dc450] transition-all"
          >
            Bet 
          </button>
        )}

        {/* Disclaimer - Now conditionally renders based on game state for "Betting with 0" or "Current Bet" */}
        {isGameActive ? (
            /* Match screenshot: Green/Blue info box showing game state (like current profit/multiplier) */
            
            <div className="text-xs  text-slate-400 bg-[#314c41] border border-[#3a3d42] p-3 rounded-lg mt-1 flex items-center gap-2">
                <Info />
                Current bet:  ₹{amount.toFixed(2)} 
                
            </div>
            
        ) : (
            /* Original disclaimer: Betting with 0 will enter demo mode */
            <div className="text-xs text-slate-400 bg-[#314c41] border border-[#3a3d42] p-3 rounded-lg mt-1 flex items-center gap-2">
              <Info />
              Betting with 0 will enter demo mode.
            </div>
        )}
        {/* Game Info: Total Win & Gems Remaining */}
        {isGameActive && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {/* Total Win */}
            <div className="text-xs text-slate-400 bg-[#314c41] border border-[#3a3d42] p-2 rounded-lg flex flex-col items-center">
              <span className="font-medium text-white">Total Win</span>
              <span className="text-green-400 font-bold text-sm">
                ₹{state.potentialWinnings.toFixed(0)}
              </span>
            </div>

      {/* Gems Remaining */}  
            <div className="text-xs text-slate-400 bg-[#314c41] border border-[#3a3d42] p-2 rounded-lg flex flex-col items-center">
              <span className="font-medium text-white">Gems Remaining</span>
              <span className="text-blue-400 font-bold text-sm">
                {state.tileTypes.filter((t, i) => t === "gem" && !state.revealedTiles[i]).length}
              </span>
            </div>
          </div>
        )}
        {/* Game Info: Total Win & Gems Remaining (styled like the image) */}

          {isGameActive && (
            <div className="flex flex-col gap-2 mt-3">
              {/* Gems Remaining */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-300 mb-1">Gems Remaining</label>
                <div className="bg-[#1e1f24] border border-[#3a3d42] text-white text-sm px-3 py-2 rounded-md">
                  {state.tileTypes.filter((t, i) => t === "gem" && !state.revealedTiles[i]).length}
                </div>
              </div>

              {/* Total Profit & Multiplier */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-300 mb-1">
                  Total Profit ({amount > 0 ? (state.potentialWinnings / amount).toFixed(2) : "0"}x)
                </label>
                <div className="bg-[#1e1f24] border border-[#3a3d42] text-white text-sm px-3 py-2 rounded-md">
                  ₹{state.potentialWinnings.toFixed(0)}
                </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}