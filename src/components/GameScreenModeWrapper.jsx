    // import React, { useState } from "react";
import { Rnd } from "react-rnd";
export default function GameScreenModeWrapper({ mode, children }) {
  return (
    <div>
      {/* Mode buttons */}
      <div className="flex gap-2 mb-2 absolute top-4 right-4 z-50">
       
      </div>

      {mode === "movie" && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-black flex items-center justify-center">
          {children}
        </div>
      )}

      {mode === "float" && (
        <Rnd
          default={{ x: 50, y: 50, width: 400, height: 220 }}
          minWidth={200}
          minHeight={112}
          bounds="window"
          className="bg-black shadow-lg rounded-lg overflow-hidden z-40"
        >
          {children}
        </Rnd>
      )}

      {mode === "normal" && <div>{children}</div>}
    </div>
  );
}
