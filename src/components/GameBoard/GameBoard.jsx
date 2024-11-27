import React from "react";
import Square from "./Square";
import SnakesAndLadders from "./SnakeAndLadder";
import PlayerPiece from "./Player";

const GameBoard = ({ squares, snakes, ladders, players }) => {
  return (
    <div className="flex-1 relative flex justify-center items-center p-0 min-w-0">
      <div className="w-full h-[80vh] max-w-[90vw] md:max-w-[80vw] lg:max-w-[1200px]">
        <svg viewBox="0 0 1200 570" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <g>
            {squares.map((square) => (
              <Square key={square.id} square={square} />
            ))}

            <g className="snakes-and-ladders">
              {squares.map((square) => (
                <SnakesAndLadders 
                  key={`sl-${square.id}`} 
                  position={square.id} 
                  snakes={snakes} 
                  ladders={ladders} 
                />
              ))}
            </g>

            <g className="players">
              {players?.map((player, index) => (
                <PlayerPiece
                  key={player.id}
                  position={player.position}
                  color={player.color}
                  index={index}
                  totalPlayers={players.length}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GameBoard;