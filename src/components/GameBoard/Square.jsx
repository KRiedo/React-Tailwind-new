import React from 'react';

const Square = ({ square }) => {
  return (
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
  );
};

export default Square;