import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import People from "../assets/People-Logo.png";
import Background from "../assets/LP-Wallpaper.png";

export default function DecisionPage() {
  const [numPlayers, setNumPlayers] = useState(2);
  const navigate = useNavigate(); // Hook for navigation

  const handleStartGame = () => {
    // Navigate to the GameBoardPage when the button is clicked
    navigate("/board");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-orange-200 opacity-30"></div>

      {/* Lobby Room Section */}
      <div className="relative flex items-center justify-center h-screen">
        <div className="w-80 sm:w-96 bg-orange-200 bg-opacity-70 text-center p-6 rounded-lg shadow-lg mx-auto">
          <div className="mb-6">
            <img className="w-24 sm:w-32 mx-auto" src={People} alt="People" />
          </div>

          <p className="mb-4 text-lg font-medium text-gray-700">
            Pilih jumlah pemain (2-4):
          </p>

          <div>
            <select
              value={numPlayers}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
              className="form-select w-60 mx-auto mb-4 px-3 py-2 border rounded-lg"
            >
              <option value="2">2 Pemain</option>
              <option value="3">3 Pemain</option>
              <option value="4">4 Pemain</option>
            </select>

            {/* Start Game Button */}
            <button
              onClick={handleStartGame}
              className="w-60 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Mulai Permainan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}