import React from 'react';

const Square = ({ square }) => {
  // Array warna dengan urutan sesuai instruksi
  const colors = ['#98dbc6', '#5bc8ac', '#e6d72a', '#f18d9e'];

  return (
    <g key={square.id}>
      <rect
        x={square.x}
        y={square.y}
        width="120"
        height="56"
        stroke="black"
        // Gunakan warna berdasarkan indeks modulo 4
        fill={colors[(square.id - 1) % 4]}
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