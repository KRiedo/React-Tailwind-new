import React from 'react';

const SnakesAndLadders = ({ position, snakes, ladders }) => {
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

  return renderSnakeOrLadder(position);
};

export default SnakesAndLadders;