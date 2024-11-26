import React, { useState, useCallback } from "react";
import Dice3D from "./Dice";

const GameControls = ({ onDiceRoll }) => {
  const [message, setMessage] = useState("");
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0); // Use counter instead of boolean for key

  const handleRollDice = useCallback(() => {
    if (!isDiceRolling) {
      setIsDiceRolling(true);
      setMessage("");
      setRollCount(prev => prev + 1); // Increment counter to force remount
    }
  }, [isDiceRolling]);

  const handleRollComplete = useCallback((roll) => {
    // Debug output
    console.log('Roll completed with value:', roll);
    
    // Delay the message update to match animation
    setTimeout(() => {
      setMessage(`You rolled a ${roll}!`);
      setIsDiceRolling(false);
      if (onDiceRoll) {
        onDiceRoll(roll);
      }
    }, 1900);
  }, [onDiceRoll]);

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="relative">
        {/* Dice container */}
        <div className="absolute bottom-24 left-[25%] -translate-x-1/2">
          <Dice3D 
            isRolling={isDiceRolling} 
            onRollComplete={handleRollComplete}
            key={`dice-${rollCount}`} // Use counter in key to ensure remount
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 w-full max-w-md">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg space-y-4">
            <div className={`transition-opacity duration-300 ${message ? 'opacity-100' : 'opacity-0'}`}>
              {message && (
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                  <p className="text-gray-800 font-medium text-center">{message}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleRollDice}
              disabled={isDiceRolling}
              className={`px-6 py-3 text-white rounded-lg shadow transition-colors duration-200 ${
                isDiceRolling
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isDiceRolling ? "Rolling..." : "Roll Dice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;