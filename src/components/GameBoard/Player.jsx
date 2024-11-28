import React from 'react';

const PlayerPiece = ({ position, color, index, totalPlayers }) => {
  // Calculate offset based on player index for multiple pieces on same square
  const getOffset = () => {
    if (totalPlayers === 1) return { x: 0, y: 0 };
    
    const angleStep = (2 * Math.PI) / totalPlayers;
    const radius = 15; // Distance from center of square
    const angle = angleStep * index;
    
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  // Convert board position to SVG coordinates
  const getCoordinates = () => {
    // Jika posisi 0, kembalikan koordinat awal
    if (position === 0) {
      return {
        x: -20,  // Kolom pertama
        y: 532  // Baris terakhir
      };
    }

    const row = Math.floor((position - 1) / 10);
    let col = (position - 1) % 10;
    
    // Reverse direction for odd rows
    if (row % 2 === 1) {
      col = 9 - col;
    }
    
    const offset = getOffset();
    return {
      x: col * 120 + 60 + offset.x, // Center of square + offset
      y: (9 - row) * 56 + 28 + offset.y // From bottom to top
    };
  };

  const { x, y } = getCoordinates();
  
  return (
    <circle
      cx={x}
      cy={y}
      r="12"
      fill={color}
      stroke="white"
      strokeWidth="2"
      className="transition-all duration-500 ease-in-out"
    />
  );
};

export default PlayerPiece;