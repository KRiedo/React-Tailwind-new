import React, { useState } from 'react';

const GameControls = () => {
  const [message, setMessage] = useState('');

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setMessage(`You rolled a ${roll}!`);
  };

  return (
    <>
      {/* Mobile/Tablet Layout */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 w-full max-w-md">
        <div className="flex flex-col items-center justify-center p-4 rounded-lg space-y-4">
            {message && (
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-gray-800 font-medium text-center">{message}</p>
                </div>
            )}

          <button
            onClick={handleRollDice}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Roll Dice
          </button>

        </div>
      </div>
    </>
  );
};

export default GameControls;