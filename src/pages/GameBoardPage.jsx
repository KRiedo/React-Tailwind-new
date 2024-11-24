import React, { useState, useEffect } from "react";
import BlackSnake from "../assets/Black-Snake.png";
import BlueSnake from "../assets/Blue-Snake.png";
import BrownSnake from "../assets/Brown-Snake.png";
import MuddSnake from "../assets/Mudd-Snake.png";
import PythonSnake from "../assets/Python-Snake.png";
import CenterLadder from "../assets/Center-Ladder.png";
import LeftLadder from "../assets/Left-Ladder.png";
import RightLadder from "../assets/Right-Ladder.png";
import BinusLogo from "../assets/Logo-Binus.png";

export default function GameBoardPage() {
  const [squares, setSquares] = useState([]);

  const snakes = [
    { from: 99, to: 62, image: BlackSnake, x: 80, y: 5, width: 200, height: 200, rotation: 300, zIndex: 1 },
    { from: 93, to: 75, image: BlueSnake, x: 660, y: -30, width: 235, height: 235, rotation: -16, zIndex: 1 },
    { from: 73, to: 54, image: BrownSnake, x: 755, y: 105, width: 180, height: 180, rotation: 140, zIndex: 1 },
    { from: 68, to: 52, image: PythonSnake, x: 900, y: 180, width: 125, height: 125, rotation: -11, zIndex: 1 },
    { from: 56, to: 38, image: MuddSnake, x: 300, y: 210, width: 230, height: 220, rotation: 110, zIndex: 1 },
    { from: 46, to: 12, image: BlueSnake, x: 670, y: 205, width: 360, height: 360, rotation: 230, zIndex: 1 },
    { from: 35, to: 17, image: BlackSnake, x: 415, y: 295, width: 245, height: 235, rotation: -30, zIndex: 1 },
  ];

  const ladders = [
    { from: 61, to: 81, image: CenterLadder, x: -15, y: 70, width: 150, height: 140, rotation: 0, zIndex: 2 },
    { from: 78, to: 85, image: RightLadder, x: 373, y: -25, width: 95, height: 270, rotation: 50, zIndex: 2 },
    { from: 58, to: 65, image: CenterLadder, x: 380, y: 90, width: 85, height: 270, rotation: 70, zIndex: 2 },
    { from: 32, to: 48, image: LeftLadder, x: 900, y: 280, width: 120, height: 110, rotation: -15, zIndex: 2 },
    { from: 21, to: 39, image: RightLadder, x: 60, y: 335, width: 120, height: 110, rotation: 23, zIndex: 2 },
    { from: 15, to: 27, image: RightLadder, x: 660, y: 392, width: 120, height: 110, rotation: 23, zIndex: 2 },
  ];

  useEffect(() => {
    const newSquares = [];
    let count = 100;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let x = row % 2 === 0 ? col * 120 : (9 - col) * 120;
        let y = row * 56;
        newSquares.push({ id: count, x, y });
        count--;
      }
    }
    setSquares(newSquares);
  }, []);

  const renderSnakeOrLadder = (position) => {
    const foundSnake = snakes.find((snake) => snake.from === position);
    const foundLadder = ladders.find((ladder) => ladder.from === position);

    if (foundSnake) {
      return (
        <image
          key={`snake-${position}`}
          href={foundSnake.image}
          x={foundSnake.x}
          y={foundSnake.y}
          width={foundSnake.width}
          height={foundSnake.height}
          style={{ zIndex: foundSnake.zIndex }}
          transform={`rotate(${foundSnake.rotation}, ${foundSnake.x + foundSnake.width / 2}, ${foundSnake.y + foundSnake.height / 2})`}
        />
      );
    }

    if (foundLadder) {
      return (
        <image
          key={`ladder-${position}`}
          href={foundLadder.image}
          x={foundLadder.x}
          y={foundLadder.y}
          width={foundLadder.width}
          height={foundLadder.height}
          style={{ zIndex: foundLadder.zIndex }}
          transform={`rotate(${foundLadder.rotation}, ${foundLadder.x + foundLadder.width / 2}, ${foundLadder.y + foundLadder.height / 2})`}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full p-2 flex items-center">
        <div className="w-24 md:w-32 lg:w-48">
          <img src={BinusLogo} alt="Snake and Ladders" className="w-full" />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold flex items-baseline">
            <span className="pb-4">Accountin</span>
            <span className="text-2xl md:text-4xl lg:text-5xl">G</span>
            <span className="pt-2">et Success</span>
          </h2>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-12 md:w-16 lg:w-20 relative flex-shrink-0">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm md:text-base lg:text-lg"
            style={{ transformOrigin: 'center center', width: 'max-content' }}
          >
            Accounting Laboratory
          </div>
        </div>
        <div className="flex-1 relative flex justify-center items-center p-0 min-w-0">
          <div className="w-full h-[80vh] max-w-[90vw] md:max-w-[80vw] lg:max-w-[1200px]">
            <svg
              viewBox="0 0 1200 570"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <g>
                {squares.map((square) => (
                  <g key={square.id}>
                    <rect
                      x={square.x}
                      y={square.y}
                      width="120"
                      height="56"
                      stroke="black"
                      fill={["aqua", "turquoise", "yellow", "pink"][(100 - square.id) % 4]}
                    />
                    <text
                      x={square.x + 60}
                      y={square.y + 30}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="Poppins"
                      fontSize="22"
                      fontWeight="900"
                      fill="black"
                    >
                      {square.id}
                    </text>
                  </g>
                ))}

                <g className="snakes-and-ladders">
                  {squares.map((square) => renderSnakeOrLadder(square.id))}
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-12 md:w-16 lg:w-20 relative flex-shrink-0">
          <div
            className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-sm md:text-base lg:text-lg"
            style={{ transformOrigin: 'center center', width: 'max-content' }}
          >
            School of Accounting, BINUS University
          </div>
        </div>
      </div>
    </div>
  );
}