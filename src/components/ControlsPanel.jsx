import ManualBettingForm from "./ManualBettingForm"
import AutoBettingForm from "./AutoBettingForm"

export default function ControlsPanel({
  state,
  setState,
  amount,
  setAmount,
  mines,
  setMines,
  autoSettings,
  setAutoSettings,
  handleBet,
  cashOut,
  pickRandomTile,
  isAutoBettingActive, 
  handleStartAutoBet,
}) {
  return (
    <div className="w-full order-first lg:order-last">
      <div className="space-y-5">
        {/* 🧭 Mode Tabs */}
        <div className="flex w-full border-b border-slate-700/50 relative">
          {["manual", "auto"].map((mode) => (
            <button
              key={mode}
              onClick={() => setState((prev) => ({ ...prev, mode }))}
              className={`w-1/2 text-center pb-3 transition-all font-semibold text-sm relative
                ${
                  state.mode === mode
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-300"
                }
              `}
            >
              {mode === "manual" ? "Manual" : "Auto"}

              {/* 🌈 Gradient underline when active */}
              {state.mode === mode && (
                <span
                  className="absolute bottom-0 left-0 w-full h-[3px] rounded-full
                   bg-linear-to-r from-[#27ee89] to-[#89e976]
                    shadow-[0_0_8px_rgba(56,189,248,0.6)]
                  "
                ></span>
              )}
            </button>
          ))}
        </div>

        {/* ⚙️ Mode-based form */}
        {state.mode === "manual" ? (
          <ManualBettingForm
            amount={amount}
            setAmount={setAmount}
            mines={mines}
            setMines={setMines}
            handleBet={handleBet}
            active={state.gameActive} // 👈 game active or not
            state={state}
            pickRandomTile={pickRandomTile}
            cashOut={cashOut}
          />
        ) : (
        <AutoBettingForm
                      // Betting parameters
                      amount={amount}
                      setAmount={setAmount}
                      mines={mines}
                      setMines={setMines}
                      // Auto settings
                      autoSettings={autoSettings}
                      setAutoSettings={setAutoSettings}
                      // Control functions and state
                      handleStartAutoBet={handleStartAutoBet}
                      isAutoBettingActive={isAutoBettingActive} // 👈 Auto active state (disables inputs)
        />
        )}
      </div>  
    </div>
  )
}
