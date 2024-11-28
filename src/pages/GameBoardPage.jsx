import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameBoard from "../components/GameBoard/GameBoard";
import GameControls from "../components/GameBoard/GameControls";

import BlackSnake from "../assets/images/Black-Snake.png";
import BlueSnake from "../assets/images/Blue-Snake.png";
import BrownSnake from "../assets/images/Brown-Snake.png";
import MuddSnake from "../assets/images/Mudd-Snake.png";
import RedSnake from "../assets/images/Red-Snake.png";
import CenterLadder from "../assets/images/Center-Ladder.png";
import LeftLadder from "../assets/images/Left-Ladder.png";
import RightLadder from "../assets/images/Right-Ladder.png";
import BinusLogo from "../assets/images/Logo-Binus.png";

export default function GameBoardPage() {
  const location = useLocation();
  const numPlayers = location.state?.numPlayers || 2;
  
  const [squares, setSquares] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [moveQueue, setMoveQueue] = useState([]);

  // Initialize players
  useEffect(() => {
    const playerColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F6'];
    const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
      id: index,
      position: 0,
      color: playerColors[index]
    }));
    setPlayers(initialPlayers);
  }, [numPlayers]);

  const snakes = [
    { from: 99, to: 62, image: BlackSnake, x: 80, y: 5, width: 200, height: 200, rotation: 300, zIndex: 1 },
    { from: 93, to: 75, image: BlueSnake, x: 660, y: -30, width: 235, height: 235, rotation: -16, zIndex: 1 },
    { from: 73, to: 54, image: BrownSnake, x: 755, y: 105, width: 180, height: 180, rotation: 140, zIndex: 1 },
    { from: 68, to: 52, image: RedSnake, x: 900, y: 180, width: 105, height: 105, rotation: 40, zIndex: 1 },
    { from: 56, to: 38, image: MuddSnake, x: 300, y: 210, width: 230, height: 220, rotation: 110, zIndex: 1 },
    { from: 46, to: 12, image: BlueSnake, x: 670, y: 205, width: 360, height: 360, rotation: 230, zIndex: 1 },
    { from: 35, to: 17, image: BlackSnake, x: 415, y: 295, width: 245, height: 235, rotation: -30, zIndex: 1 },
  ];

  const ladders = [
    { from: 61, to: 81, image: CenterLadder, x: -15, y: 70, width: 150, height: 140, rotation: 0, zIndex: 2 },
    { from: 78, to: 85, image: RightLadder, x: 373, y: -25, width: 95, height: 270, rotation: 50, zIndex: 2 },
    { from: 58, to: 65, image: RightLadder, x: 373, y: 87, width: 95, height: 270, rotation: 50, zIndex: 2 },
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

  // Check for snake or ladder at position
  const checkSnakeOrLadder = (position) => {
    const snake = snakes.find(s => s.from === position);
    if (snake) return { type: 'snake', to: snake.to };
    
    const ladder = ladders.find(l => l.from === position);
    if (ladder) return { type: 'ladder', to: ladder.to };
    
    return null;
  };

  // Generate steps between two positions
  const generateSteps = (from, to) => {
    const steps = [];
    if (from < to) {
      for (let i = from + 1; i <= to; i++) {
        steps.push(i);
      }
    } else {
      for (let i = from - 1; i >= to; i--) {
        steps.push(i);
      }
    }
    return steps;
  };

  // Process the move queue
  useEffect(() => {
    if (moveQueue.length > 0 && !isMoving) {
      const currentStep = moveQueue[0];
      setIsMoving(true);
      
      // Update player position
      setPlayers(prevPlayers => {
        const newPlayers = [...prevPlayers];
        newPlayers[currentPlayer] = {
          ...newPlayers[currentPlayer],
          position: currentStep
        };
        return newPlayers;
      });

      // Remove processed step from queue after animation
      setTimeout(() => {
        setMoveQueue(prev => prev.slice(1));
        setIsMoving(false);

        // If no more moves in queue, check for snake/ladder or move to next player
        if (moveQueue.length === 1) {
          const finalPosition = currentStep;
          const snakeOrLadder = checkSnakeOrLadder(finalPosition);
          
          if (snakeOrLadder) {
            // Directly move to the snake/ladder destination
            setPlayers(prevPlayers => {
              const newPlayers = [...prevPlayers];
              newPlayers[currentPlayer] = {
                ...newPlayers[currentPlayer],
                position: snakeOrLadder.to
              };
              return newPlayers;
            });
            // Move to next player after snake/ladder movement
            setTimeout(() => {
              setCurrentPlayer(prev => (prev + 1) % numPlayers);
            }, 300);
          } else {
            // Move to next player
            setCurrentPlayer(prev => (prev + 1) % numPlayers);
          }
        }
      }, 300);
    }
  }, [moveQueue, isMoving, currentPlayer, numPlayers]);

  const handleDiceRoll = (roll) => {
    if (isMoving || moveQueue.length > 0) return;

    const currentPlayerData = players[currentPlayer];
    let targetPosition = currentPlayerData.position + roll;

    // Ensure we don't exceed 100
    if (targetPosition > 100) {
      targetPosition = 100;
    }

    // Generate steps for the normal movement
    const steps = generateSteps(currentPlayerData.position, targetPosition);
    
    // Add steps to queue
    setMoveQueue(steps);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fff4ea" }}>
      {/* Header Section */}
      <div className="w-full p-2 flex items-center relative">
        <div className="w-16 md:w-32 lg:w-48">
          <img src={BinusLogo} alt="Snake and Ladders" className="w-full" />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-3xl md:text-5xl lg:text-7xl flex items-baseline">
            <span className="font-arsenica font-normal pb-4" style={{ transform: "translateY(-11px)" }}>Accountin</span>
            <span className="font-arsenica font-medium text-3xl md:text-5xl lg:text-7xl">G</span>
            <span className="font-arsenica font-normal pt-2">et Success</span>
          </h2>
        </div>

        {/* Current Player Indicator */}
        <div className="absolute top-4 ss:top-14 sm:top-18 md:top-20 right-4 bg-white shadow-md rounded-lg p-3">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Current Player:</span>
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ 
                backgroundColor: players[currentPlayer]?.color || '#FF5733',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Board and Controls Section */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-12 md:w-16 lg:w-20 relative flex-shrink-0">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold font-fredoka"
            style={{ transformOrigin: 'center center', width: 'max-content' }}
          >
            Accounting Laboratory
          </div>
        </div>
        
        {/* Game Board */}
        <GameBoard
          squares={squares}
          snakes={snakes}
          ladders={ladders}
          players={players}
        />
        
        {/* Right Sidebar */}
        <div className="w-12 md:w-16 lg:w-20 relative flex-shrink-0">
          <div
            className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-sm md:text-base lg:text-lg font-medium font-workSans"
            style={{ transformOrigin: 'center center', width: 'max-content' }}
          >
            School of Accounting, BINUS University
          </div>
        </div>
      </div>
      
      {/* Game Controls */}
      <GameControls 
        onDiceRoll={handleDiceRoll}
        currentPlayer={currentPlayer}
        players={players}
        disabled={isMoving || moveQueue.length > 0}
      />
    </div>
  );
}