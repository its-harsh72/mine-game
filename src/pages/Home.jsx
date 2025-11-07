import React, { useState, useCallback, useEffect, useRef } from "react"
import GamePanel from "../components/GamePanel"
import ControlsPanel from "../components/ControlsPanel"
import PurpleDiamond from "../components/PurpleDiamond"
import BombIcon from "../components/BombIcon"
import FooterIcons from "../components/FooterIcons"
import gameSound from "../assets/Game_S.mp3"
import { Music, Volume2 } from "lucide-react"
import mineSound from "../assets/Mine.mp3"
import blastSound from "../assets/Blast.mp3"
// ============================================================================
// GAME STATE & TYPES
// ============================================================================

const TOTAL_TILES = 25

// ============================================================================
// MAIN GAME COMPONENT
// ============================================================================

export default function Home() {

  const [state, setState] = useState({
    balance: 10000,
    bet: 100,
    mines: 2,
    gameActive: false,
    gameWon: false,
    revealedTiles: Array(TOTAL_TILES).fill(false),
    forcedReveal: Array(TOTAL_TILES).fill(false),
    tileTypes: Array(TOTAL_TILES).fill("gem"),
    currentMultiplier: 1,
    revealedGemsCount: 0,
    potentialWinnings: 0,
    mode: "manual",
      history: [], 
  })

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("history")) || [];
  setState(prev => ({ ...prev, history: saved }));
}, []);


// near the top of Home component
const lastSavedRef = useRef(null);

const saveHistory = useCallback((value) => {
  try {
    const prev = JSON.parse(localStorage.getItem("history")) || [];

    // Prevent duplicate consecutive entries
    if (prev.length > 0 && prev[0] === value) {
      // already latest, skip
      // console.debug("saveHistory: duplicate skip", value);
      return;
    }

    // Optional guard: if same as last saved in this render session, skip
    if (lastSavedRef.current === value) {
      return;
    }

    const updated = [value, ...prev].slice(0, 10);
    localStorage.setItem("history", JSON.stringify(updated));
    lastSavedRef.current = value;

    // update state once
    setState(p => ({ ...p, history: updated }));
    // console.debug("saveHistory: saved", value);
  } catch (err) {
    console.error("saveHistory error", err);
  }
}, []);


  const [amount, setAmount] = useState(100)
const [isMusicPlaying, setIsMusicPlaying] = useState(true)   // background music
const [isSfxEnabled, setIsSfxEnabled] = useState(true)       // tile click sounds
const [blastIndex, setBlastIndex] = useState(null);


  const [mines, setMines] = useState(2)
  const [autoSettings, setAutoSettings] = useState({
    numberOfBets: null,
    onWinIncrease: 0,
    onLossIncrease: 0,
    stopOnWin: false,
  })
  const audioRef = useRef(null)
  const mineAudioRef = useRef(null)
  const blastAudioRef = useRef(null)

  const generateBoard = useCallback((numMines) => {
    const board = Array(TOTAL_TILES).fill("gem")
    const mineIndices = new Set()

    while (mineIndices.size < numMines) {
      mineIndices.add(Math.floor(Math.random() * TOTAL_TILES))
    }

    mineIndices.forEach((idx) => {
      board[idx] = "mine"
    })

    return board
  }, [])

  const calculateMultiplier = useCallback((revealedCount, safeTilesCount) => {
    if (revealedCount === 0) return 1.0

    const remainingSafe = safeTilesCount - revealedCount
    const remainingTotal = TOTAL_TILES - revealedCount

    if (remainingTotal === 0) return 1.06

    const probabilityOfSafe = remainingSafe / remainingTotal
    const multiplierIncrease = 1 / probabilityOfSafe


    return Math.pow(multiplierIncrease, revealedCount)
  }, [])
// ✅ Auto start music on load
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0.5
    audioRef.current.play().catch(() => {})
  }
}, [])

// ✅ Play / pause based on music toggle
useEffect(() => {
  if (!audioRef.current) return

  if (isMusicPlaying) {
    audioRef.current.play().catch(() => {})
  } else {
    audioRef.current.pause()
  }
}, [isMusicPlaying])



  const startBet = useCallback(
    (betAmount, numMines) => {
      if (betAmount <= 0 || betAmount > state.balance) return false
      if (numMines < 1 || numMines >= TOTAL_TILES) return false

      const newBoard = generateBoard(numMines)

      setState((prev) => ({
        ...prev,
        balance: prev.balance - betAmount,
        bet: betAmount,
        mines: numMines,
        gameActive: true,
        gameWon: false,
        revealedTiles: Array(TOTAL_TILES).fill(false),
          forcedReveal: Array(TOTAL_TILES).fill(false), 
        tileTypes: newBoard,
        currentMultiplier: 1.0,
        revealedGemsCount: 0,
        potentialWinnings: betAmount,
      }))

      return true
    },
    [state.balance, generateBoard],
  )

    const revealTile = useCallback(
      (index) => {
        setState((prev) => {
          if (!prev.gameActive || prev.revealedTiles[index]) return prev

          const isMineTile = prev.tileTypes[index] === "mine"

          // ✅ Play sound effects (only when enabled)
       if (isSfxEnabled) {
            if (isMineTile) {
              blastAudioRef.current?.play().catch(() => {})
            } else {
              mineAudioRef.current?.play().catch(() => {})
            }
          }

          const newRevealed = [...prev.revealedTiles]
          newRevealed[index] = true

if (isMineTile) {

  // ✅ trigger blast animation for this tile only
  setBlastIndex(index);
  setTimeout(() => setBlastIndex(null), 700); // remove after 0.7 sec

  const newForcedReveal = [...prev.forcedReveal];

  prev.tileTypes.forEach((_, idx) => {
    newForcedReveal[idx] = true;   // ✅ reveal but dimmed
  });
saveHistory("0x");
  return {
    ...prev,
    gameActive: false,
    forcedReveal: newForcedReveal,
    revealedTiles: prev.revealedTiles,
    potentialWinnings: 0,
  };
}




          const newRevealedCount = prev.revealedGemsCount + 1
          const safeTilesCount = prev.tileTypes.filter((t) => t === "gem").length
          const newMultiplier = calculateMultiplier(newRevealedCount, safeTilesCount)
          const newWinnings = prev.bet * newMultiplier

          if (newRevealedCount === safeTilesCount) {
            return {
              ...prev,
              gameActive: false,
              gameWon: true,
              revealedTiles: Array(TOTAL_TILES).fill(true),
              revealedGemsCount: newRevealedCount,
              currentMultiplier: newMultiplier,
              potentialWinnings: newWinnings,
              balance: prev.balance + newWinnings,
            }
          }

          return {
            ...prev,
            revealedTiles: newRevealed,
            revealedGemsCount: newRevealedCount,
            currentMultiplier: newMultiplier,
            potentialWinnings: newWinnings,
          }
        })
      },
      [calculateMultiplier, isSfxEnabled]
    )


  const cashOut = useCallback(() => {
    setState((prev) => {
      if (!prev.gameActive || prev.potentialWinnings <= 0) return prev
  saveHistory(`${prev.currentMultiplier.toFixed(2)}x`);
      return {
        ...prev,
        gameActive: false,
        gameWon: true,
        revealedTiles: Array(TOTAL_TILES).fill(true),
        balance: prev.balance + prev.potentialWinnings,
      }
    })
  }, [])

  const resetRound = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gameActive: false,
      gameWon: false,
      revealedTiles: Array(TOTAL_TILES).fill(false),
      tileTypes: Array(TOTAL_TILES).fill("gem"),
      currentMultiplier: 1.0,
      revealedGemsCount: 0,
      potentialWinnings: 0,
    }))
  }, [])

  const pickRandomTile = useCallback(() => {
    if (!state.gameActive) return

    let randomIndex
    let attempts = 0
    do {
      randomIndex = Math.floor(Math.random() * TOTAL_TILES)
      attempts++
    } while (state.revealedTiles[randomIndex] && attempts < 50)

    if (!state.revealedTiles[randomIndex]) {
      revealTile(randomIndex)
    }
  }, [state.gameActive, state.revealedTiles, revealTile])

const handleBet = () => {
  resetRound();
  setTimeout(() => startBet(amount, mines), 10); // smooth reset
}

const getTileContent = (index) => {
  const isRevealed = state.revealedTiles[index];
  const isForced = state.forcedReveal?.[index];

  if (!isRevealed && !isForced) return null;

  const isMine = state.tileTypes[index] === "mine";

  if (isMine) {
    if (blastIndex === index) {
      return <BombBlastAnimation />;
    }
    return <BombIcon />;
  }

  return <PurpleDiamond size={25} />;
};


  return (
    <div
      className="min-h-screen text-white relative overflow-hidden "
  style={{
    backgroundColor: "#232626",
  }}
    >
      {/* Multiplier/History Bar (kept in Home as it uses currentMultiplier from state) */}

 <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ backgroundColor: "#232626" }}
    >
      {/* MAIN WRAPPER */}
      <div
        className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "#323738" }}
      >
        {/* LEFT SIDEBAR */}
        <div>
          <ControlsPanel
            state={state}
            setState={setState}
            amount={amount}
            setAmount={setAmount}
            mines={mines}
            setMines={setMines}
            autoSettings={autoSettings}
            setAutoSettings={setAutoSettings}
            handleBet={handleBet}
            cashOut={cashOut}
            pickRandomTile={pickRandomTile}
          />
        </div>

        {/* RIGHT FLEX PANEL */}
        <div className="flex-1">
          <GamePanel
            state={state}
            getTileContent={getTileContent}
            revealTile={revealTile}
            TOTAL_TILES={TOTAL_TILES}
          />
        </div>
      </div>

      {/* FOOTER BAR (floats inside, spans both panels) */}
      <div
        className="flex items-center justify-between px-8 py-3  mx-auto max-w-7xl rounded-t-lg"
        style={{ backgroundColor: "#2e3333" }}
      >
        {/* LEFT ICON GROUP */}
        <div className="flex items-center gap-6">
          <FooterIcons/>
        </div>
      <audio ref={audioRef} src={gameSound} loop />
      <audio ref={mineAudioRef} src={mineSound} />
      <audio ref={blastAudioRef} src={blastSound} />
        {/* RIGHT ICON GROUP */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition text-xl">📁</button>
          <button className="text-gray-400 hover:text-white transition text-xl">🔗</button>
          <button className="text-gray-400 hover:text-white transition text-xl">📊</button>
          <button
            onClick={() => setIsSfxEnabled(!isSfxEnabled)}
            className="text-gray-400 hover:text-white transition text-xl"
          >
            {isSfxEnabled ? <Volume2 size={22} className="text-green-500"/> : <Volume2 size={22}/>}
          </button>
          <button
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="text-gray-400 hover:text-white transition text-xl"
          >
            {isMusicPlaying ? <Music size={22} className="text-green-500"/> : <Music size={22}/>}
          </button>
          <button className="text-gray-400 hover:text-white transition text-xl">📋</button>
          <button className="text-gray-400 hover:text-white transition text-xl">≈</button>
          <button className="text-gray-400 hover:text-white transition text-xl">🗑️</button>
          <button className="text-gray-400 hover:text-white transition text-xl">❓</button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-black p-2 rounded-lg font-bold">
            🎧
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

function BombBlastAnimation() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Central flash */}
      <div className="absolute w-10 h-10 rounded-full bg-amber-400 opacity-90 animate-flash-blast"></div>

      {/* Expanding fire rings */}
      <div className="absolute w-10 h-10 rounded-full bg-orange-500 animate-fire-ring1"></div>
      <div className="absolute w-10 h-10 rounded-full bg-red-600 animate-fire-ring2"></div>

      {/* Smoke puffs */}
      <div className="absolute w-8 h-8 rounded-full bg-gray-500 opacity-70 animate-smoke1"></div>
      <div className="absolute w-10 h-10 rounded-full bg-gray-600 opacity-60 animate-smoke2"></div>
      <div className="absolute w-12 h-12 rounded-full bg-gray-700 opacity-50 animate-smoke3"></div>
    </div>
  )
}

