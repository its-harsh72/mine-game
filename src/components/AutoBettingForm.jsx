import React, { useState } from "react";
import { Info } from 'lucide-react';

// Define a structure for the auto betting state (you'll manage this in your parent component)
// This component will receive props to manage this state.
export default function AutoBettingForm({ 
    amount, setAmount, 
    mines, setMines, 
    autoSettings, setAutoSettings, 
    handleStartAutoBet, 
    isAutoBettingActive 
}) {
    // Local state for the increment/reset toggle buttons (Win/Loss)
    const [winAction, setWinAction] = useState('increase');
    const [lossAction, setLossAction] = useState('increase');

    // Function to handle changes in nested auto settings
    const handleSettingChange = (field, value) => {
        setAutoSettings(prev => ({ ...prev, [field]: value }));
    };

    // Helper to render quick buttons for Number of Bets
    const renderNumberBetsButton = (value, display) => (
        <button
            key={value}
            onClick={() => handleSettingChange('numBets', value)}
            className={`
                py-2 rounded-lg text-xs font-medium transition 
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
            
            {/* 1. Amount (Reusing the structure from ManualBettingForm) */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 flex items-center gap-2 font-medium">
                    Amount <span className="text-xs text-slate-500"><Info className="h-4 w-4" /></span>
                </label>

                {/* Amount Control Bar */}
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    {/* LEFT: Coin Icon + Input */}
                    <div className="flex items-center gap-2 px-3 border-r border-[#3a3d42]">
                        <span className="text-green-400 text-xl">🪙</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                            className="w-20 bg-transparent text-white text-sm focus:outline-none"
                            disabled={isAutoBettingActive} 
                        />
                    </div>

                    {/* Quick Adjustment Buttons (1/2, 2x, Up/Down) */}
                    <button
                        onClick={() => setAmount(amount / 2)}
                        className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c]"
                        disabled={isAutoBettingActive}
                    >1/2</button>
                    <button
                        onClick={() => setAmount(amount * 2)}
                        className="px-4 text-sm text-slate-200 border-r border-[#3a3d42] hover:bg-[#34373c]"
                        disabled={isAutoBettingActive}
                    >2×</button>
                    <div className="flex flex-col">
                        <button
                            onClick={() => setAmount(amount + 1)}
                            className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c] border-b border-[#3a3d42]"
                            disabled={isAutoBettingActive}
                        >▲</button>
                        <button
                            onClick={() => setAmount(Math.max(0, amount - 1))}
                            className="px-3 py-1 text-xs text-slate-200 hover:bg-[#34373c]"
                            disabled={isAutoBettingActive}
                        >▼</button>
                    </div>
                </div>

                {/* Quick Buttons for Amount */}
                <div className="grid grid-cols-4 gap-2">
                    {[10, 100, 1000, 10000].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`bg-[#2a2d31] hover:bg-[#34373c] border border-[#3a3d42] text-slate-300
                                py-2 rounded-lg text-xs font-medium transition ${isAutoBettingActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isAutoBettingActive}
                        >
                            {val >= 1000 ? `${val / 1000}.0k` : val}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Mines Slider (Reusing the structure) */}
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

            {/* 3. Number of Bets */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Number of Bets</label>
                <div className="grid grid-cols-4 gap-2">
                    {renderNumberBetsButton(Infinity, '∞')}
                    {renderNumberBetsButton(Infinity, '∞')} {/* Duplicated '∞' to match screenshot layout */}
                    {renderNumberBetsButton(10, '10')}
                    {renderNumberBetsButton(100, '100')}
                </div>
            </div>

            {/* 4. On Win Settings */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">On win</label>
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    {/* Reset/Increase Toggle */}
                    <div className="flex border-r border-[#3a3d42]">
                        <button
                            onClick={() => setWinAction('reset')}
                            className={`px-3 py-2 text-sm font-bold transition ${winAction === 'reset' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setWinAction('increase')}
                            className={`px-3 py-2 text-sm font-bold transition ${winAction === 'increase' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c] border-l border-[#3a3d42]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Increase by
                        </button>
                    </div>

                    {/* Percentage Input */}
                    <input
                        type="number"
                        value={autoSettings.winIncrease}
                        onChange={(e) => handleSettingChange('winIncrease', Number(e.target.value))}
                        className="w-16 bg-transparent text-white text-sm focus:outline-none text-right px-2"
                        disabled={isAutoBettingActive}
                    />
                    <span className="px-3 py-2 text-sm text-slate-300 border-l border-[#3a3d42]">%</span>
                </div>
            </div>

            {/* 5. On Loss Settings */}
            <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">On loss</label>
                <div className="flex bg-[#2a2d31] border border-[#3a3d42] rounded-lg overflow-hidden">
                    {/* Reset/Increase Toggle */}
                    <div className="flex border-r border-[#3a3d42]">
                        <button
                            onClick={() => setLossAction('reset')}
                            className={`px-3 py-2 text-sm font-bold transition ${lossAction === 'reset' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setLossAction('increase')}
                            className={`px-3 py-2 text-sm font-bold transition ${lossAction === 'increase' ? 'bg-green-500 text-black' : 'text-slate-300 hover:bg-[#34373c] border-l border-[#3a3d42]'}`}
                            disabled={isAutoBettingActive}
                        >
                            Increase by
                        </button>
                    </div>

                    {/* Percentage Input */}
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

            {/* 6. Stop on Win/Loss (Placeholder for more complex inputs) */}
      
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

            {/* 7. Start/Stop Auto Bet Button */}
            <div>
                <button
                    onClick={handleStartAutoBet}
                    // Change text and color based on state
                    className={`w-full font-bold text-lg py-2 rounded-lg transition-all 
                        ${isAutoBettingActive 
                            ? "bg-red-500 text-white hover:bg-red-600" // Stop button
                            : "bg-linear-to-r from-[#27ee89] to-[#89e976] text-black hover:from-[#1fd676] hover:to-[#7dd663]" // Start button
                        }`}
                >
                    {isAutoBettingActive ? "Stop Auto Bet" : "Start Auto Bet"}
                </button>

                {/* Disclaimer */}
                <div className="text-xs text-slate-400 bg-[#314c41] border border-[#3a3d42] p-3 rounded-lg mt-1 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Betting with 0 will enter demo mode.
                </div>
            </div>
        </div>
    );
}