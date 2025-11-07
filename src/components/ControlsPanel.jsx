import ManualBettingForm from "./ManualBettingForm";
import AutoBettingForm from "./AutoBettingForm";

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

        {/* ✅ Mode Tabs (Manual / Auto) */}
        <div className="flex w-full border-b border-slate-700/50 relative">
          {["manual", "auto"].map((mode) => (
            <button
              key={mode}
              onClick={() => setState((prev) => ({ ...prev, mode }))} // ✅ Switch game mode
              className={`w-1/2 text-center pb-3 transition-all font-semibold text-sm relative cursor-pointer
                ${
                  state.mode === mode
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-300"
                }
              `}
            >
              {mode === "manual" ? "Manual" : "Auto"}

              {/* ✅ Active tab underline with gradient */}
              {state.mode === mode && (
                <span
                  className="absolute bottom-0 left-0 w-full h-[3px] rounded-full
                    bg-linear-to-r from-[#27ee89] to-[#89e976]
                    shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                ></span>
              )}
            </button>
          ))}
        </div>

        {/*  Mode-based Form Rendering */}
        {state.mode === "manual" ? (
          <ManualBettingForm
            amount={amount}                  // ✅ Bet amount
            setAmount={setAmount}
            mines={mines}                    // ✅ Mines count
            setMines={setMines}
            handleBet={handleBet}            // ✅ Start bet button
            active={state.gameActive}        // ✅ Blocks bet when game active
            state={state}
            pickRandomTile={pickRandomTile}  // ✅ Random tile picker
            cashOut={cashOut}                // ✅ Cashout function
          />
        ) : (
          <AutoBettingForm
            amount={amount}                       // ✅ Bet amount
            setAmount={setAmount}
            mines={mines}                         // ✅ Mines count
            setMines={setMines}
            autoSettings={autoSettings}           // ✅ Auto configuration
            setAutoSettings={setAutoSettings}
            handleStartAutoBet={handleStartAutoBet} // ✅ Start/stop auto mode
            isAutoBettingActive={isAutoBettingActive} // ✅ Disables UI when running
          />
        )}
      </div>
    </div>
  );
}
