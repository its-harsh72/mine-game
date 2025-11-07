import React, { useState } from "react";
import { Info } from 'lucide-react';

// This component handles the Auto Betting settings. 
// All actual betting logic will be controlled from the parent using props.
export default function AutoBettingForm({ 
    amount, setAmount, 
    mines, setMines, 
    autoSettings, setAutoSettings, 
    handleStartAutoBet, 
    isAutoBettingActive 
}) {
    // Local state for toggling the "win" and "loss" actions (Reset or Increase)
    const [winAction, setWinAction] = useState('increase');
    const [lossAction, setLossAction] = useState('increase');

    // Update individual fields inside autoSettings
    const handleSettingChange = (field, value) => {
        setAutoSettings(prev => ({ ...prev, [field]: value }));
    };

    // Helper to render quick-select buttons for Number of Bets
    const renderNumberBetsButton = (value, display) => (
        <button
            key={value}
            onClick={() => handleSettingChange('numBets', value)}
            className={`
                py-2 rounded-lg text-xs font-medium transition  cursor-pointer
                ${autoSettings.numBets === value ? 'bg-green-500 text-black' : 'bg-[#2a2d31] hover:bg-[#34373c] border border-[#3a3d42] text-slate-300'}
                ${isAutoBettingActive ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isAutoBettingActive}
        >
            {display}
        </button>
    );

    return (
        <div className="space-y-5 shadow-inner w-full max-w-sm">
            
            {/* Amount Box (similar to ManualBettingForm layout) */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 flex items-center gap-2 font-medium">
                    Amount <span className="text-xs text-slate-500"><Info className="h-4 w-4" /></span>
                </label>

                {/* Amount input with quick controls */}
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    
                    {/* Currency Icon + Main input */}
                    <div className="flex items-center gap-2 px-3 border-r border-[#3a3d42]">
                        <span className="text-green-400 text-xl">
                            <img
                                src="https://flagcdn.com/in.svg"
                                alt="India Flag"
                                width="20"
                            />
                        </span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                            className="w-20 bg-transparent text-white text-sm focus:outline-none"
                            disabled={isAutoBettingActive} 
                        />
                    </div>

                    {/* Half, Double, Up, Down buttons */}
                    <button
                        onClick={() => setAmount(amount / 2)}
                        className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c] cursor-pointer"
                        disabled={isAutoBettingActive}
                    >1/2</button>

                    <button
                        onClick={() => setAmount(amount * 2)}
                        className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c] cursor-pointer"
                        disabled={isAutoBettingActive}
                    >2×</button>

                    <div className="flex flex-col">
                        <button
                            onClick={() => setAmount(amount + 1)}
                            className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c] border-b border-[#3a3d42] cursor-pointer"
                            disabled={isAutoBettingActive}
                        >▲</button>
                        <button
                            onClick={() => setAmount(Math.max(0, amount - 1))}
                            className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c] cursor-pointer"
                            disabled={isAutoBettingActive}
                        >▼</button>
                    </div>
                </div>

                {/* Pre-set amount buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {[10, 100, 1000, 10000].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`bg-[#2a2d31] hover:bg-[#34373c] border border-[#3a3d42] text-slate-300 cursor-pointer
                                py-2 rounded-lg text-xs font-medium transition ${isAutoBettingActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isAutoBettingActive}
                        >
                            {val >= 1000 ? `${val / 1000}.0k` : val}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mines slider section */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Mines</label>
                <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">{mines}</span>

                    <div className="relative w-full h-4 flex items-center">
                        {/* Track background */}
                        <div className="absolute w-full h-1.5 bg-[#2f3237] rounded-full"></div>

                        {/* Filled progress bar */}
                        <div
                            className="absolute h-1.5 rounded-full bg-linear-to-r from-[#27ee89] to-[#89e976]"
                            style={{ width: `${(mines / 24) * 100}%` }}
                        ></div>

                        {/* Actual range slider */}
                        <input
                            type="range"
                            min="1"
                            max="24"
                            value={mines}
                            onChange={(e) => setMines(Number(e.target.value))}
                            disabled={isAutoBettingActive}
                            className={`
                                w-full h-4 appearance-none bg-transparent cursor-pointer relative z-10
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow-lg
                                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-300 [&::-moz-range-thumb]:shadow
                                ${isAutoBettingActive ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        />
                    </div>

                    <span className="text-slate-400 text-sm">24</span>
                </div>
            </div>

            {/* Number of bets (quick selection buttons) */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Number of Bets</label>
                <div className="grid grid-cols-4 gap-2">
                    {renderNumberBetsButton(Infinity, '∞')}
                    {renderNumberBetsButton(Infinity, '∞')} 
                    {renderNumberBetsButton(10, '10')}
                    {renderNumberBetsButton(100, '100')}
                </div>
            </div>

            {/* Win action settings */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">On win</label>
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    
                    {/* Toggle between Reset and Increase */}
                    <div className="flex border-r border-[#3a3d42]">
                        <button
                            onClick={() => setWinAction('reset')}
                            className={`px-3 py-2 cursor-pointer text-sm font-bold transition ${winAction === 'reset' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Reset
                        </button>

                        <button
                            onClick={() => setWinAction('increase')}
                            className={`px-3 py-2 text-sm cursor-pointer font-bold transition ${winAction === 'increase' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c] border-l border-[#3a3d42]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Increase by
                        </button>
                    </div>

                    {/* Percentage input for increment */}
                    <input
                        type="number"
                        value={autoSettings.winIncrease}
                        onChange={(e) => handleSettingChange('winIncrease', Number(e.target.value))}
                        className="w-16 bg-transparent text-white text-sm cursor-pointer focus:outline-none text-right px-2"
                        disabled={isAutoBettingActive}
                    />
                    <span className="px-3 py-2 text-sm text-slate-300  border-l border-[#3a3d42]">%</span>
                </div>
            </div>

            {/* Loss action settings */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">On loss</label>
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    
                    {/* Toggle between Reset and Increase */}
                    <div className="flex border-r border-[#3a3d42]">
                        <button
                            onClick={() => setLossAction('reset')}
                            className={`px-3 py-2 text-sm font-bold transition cursor-pointer ${lossAction === 'reset' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setLossAction('increase')}
                            className={`px-3 py-2 text-sm font-bold transition cursor-pointer ${lossAction === 'increase' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c] border-l border-[#3a3d42]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Increase by
                        </button>
                    </div>

                    {/* Percentage input */}
                    <input
                        type="number"
                        value={autoSettings.lossIncrease}
                        onChange={(e) => handleSettingChange('lossIncrease', Number(e.target.value))}
                        className="w-16 bg-transparent text-white text-sm focus:outline-none text-right px-2"
                        disabled={isAutoBettingActive}
                    />
                    <span className="px-3 py-2 text-sm text-slate-300 border-l border-[#3a3d42]">%</span>
                </div>
            </div>

            {/* Stop on win / Stop on loss */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Stop on win</label>
                <input
                    type="number"
                    value={autoSettings.stopOnWin}
                    onChange={(e) => handleSettingChange('stopOnWin', Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full bg-[#2a2d31] border border-[#3a3d42] text-white text-sm py-2 px-3 rounded-lg focus:outline-none"
                    disabled={isAutoBettingActive}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Stop on loss</label>
                <input
                    type="number"
                    value={autoSettings.stopOnLoss}
                    onChange={(e) => handleSettingChange('stopOnLoss', Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full bg-[#2a2d31] border border-[#3a3d42] text-white text-sm py-2 px-3 rounded-lg focus:outline-none"
                    disabled={isAutoBettingActive}
                />
            </div>

            {/* Main Start/Stop Auto-bet button */}
            <div>
                <button
                    onClick={handleStartAutoBet}
                    disabled={true}
                    className={`w-full font-bold text-lg py-2 rounded-lg transition-all cursor-pointer
                        ${isAutoBettingActive 
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-linear-to-r from-[#27ee89] to-[#89e976] text-black hover:from-[#1fd676] hover:to-[#7dd663]"
                        }`}
                >
                    {isAutoBettingActive ? "Stop Auto Bet" : "Start Auto Bet"}
                </button>

                {/* Small reminder message */}
                <div className="text-xs text-slate-400 bg-[#314c41] border border-[#3a3d42] p-3 rounded-lg mt-1 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Betting with 0 will enter demo mode.
                </div>
            </div>
        </div>
    );
}
