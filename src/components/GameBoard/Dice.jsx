import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const Dice3D = ({ isRolling, onRollComplete }) => {
  const [diceValue, setDiceValue] = useState(1);
  const controls = useAnimation();

  // Memisahkan fungsi random ke fungsi terpisah
  const getRandomNumber = useCallback(() => {
    const timestamp = new Date().getTime();
    const random = Math.sin(timestamp) * 10000;
    return Math.floor((random - Math.floor(random)) * 6) + 1;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const rollDice = async () => {
      if (!isRolling) return;

      // Generate multiple random numbers during animation
      let finalRoll;
      const rollInterval = setInterval(() => {
        finalRoll = getRandomNumber();
        setDiceValue(finalRoll);
      }, 100);

      // Reset position
      await controls.set({
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        y: 0
      });

      // Animate with more rotations for more randomness
      await controls.start({
        rotateX: [0, 720, 1440, 2160],
        rotateY: [0, 540, 1080, 1620],
        rotateZ: [0, 360, 720, 1080],
        y: [0, -150, -50, 0],
        transition: {
          duration: 2,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut"
        }
      });

      // Clear interval after animation
      clearInterval(rollInterval);

      if (isMounted) {
        // Generate one final random number
        const lastRoll = getRandomNumber();
        setDiceValue(lastRoll);
        
        // Notify parent with delay
        setTimeout(() => {
          if (isMounted && onRollComplete) {
            onRollComplete(lastRoll);
          }
        }, 100);
      }
    };

    rollDice();

    return () => {
      isMounted = false;
    };
  }, [isRolling, onRollComplete, getRandomNumber]);

  const Face = ({ dots, rotation = [0, 0, 0], translate = [0, 0, 0] }) => (
    <div
      className="absolute w-16 h-16 bg-white rounded-lg shadow-inner border-2 border-gray-200"
      style={{
        transform: `translate3d(${translate[0]}px, ${translate[1]}px, ${translate[2]}px) 
                   rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) rotateZ(${rotation[2]}deg)`,
        backfaceVisibility: "hidden"
      }}
    >
      <div className="relative w-full h-full">
        {dots}
      </div>
    </div>
  );

  const Dot = ({ className }) => (
    <div className={`absolute w-3 h-3 bg-black rounded-full ${className}`} />
  );

  const faces = {
    front: {
      dots: <Dot className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />,
      rotation: [0, 0, 0],
      translate: [0, 0, 32]
    },
    back: {
      dots: (
        <>
          <Dot className="top-2 left-2" />
          <Dot className="top-2 right-2" />
          <Dot className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Dot className="bottom-2 left-2" />
          <Dot className="bottom-2 right-2" />
        </>
      ),
      rotation: [0, 180, 0],
      translate: [0, 0, -32]
    },
    right: {
      dots: (
        <>
          <Dot className="top-2 left-2" />
          <Dot className="top-2 right-2" />
          <Dot className="bottom-2 left-2" />
        </>
      ),
      rotation: [0, 90, 0],
      translate: [32, 0, 0]
    },
    left: {
      dots: (
        <>
          <Dot className="top-2 left-2" />
          <Dot className="top-2 right-2" />
          <Dot className="bottom-2 left-2" />
          <Dot className="bottom-2 right-2" />
        </>
      ),
      rotation: [0, -90, 0],
      translate: [-32, 0, 0]
    },
    top: {
      dots: (
        <>
          <Dot className="top-2 left-2" />
          <Dot className="top-2 right-2" />
          <Dot className="bottom-2 right-2" />
        </>
      ),
      rotation: [90, 0, 0],
      translate: [0, -32, 0]
    },
    bottom: {
      dots: (
        <>
          <Dot className="top-2 left-2" />
          <Dot className="top-2 right-2" />
          <Dot className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Dot className="bottom-2 left-2" />
          <Dot className="bottom-2 right-2" />
          <Dot className="bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2" />
        </>
      ),
      rotation: [-90, 0, 0],
      translate: [0, 32, 0]
    }
  };

  const getActiveFace = (value) => {
    switch (value) {
      case 1: return faces.front;
      case 2: return faces.back;
      case 3: return faces.right;
      case 4: return faces.left;
      case 5: return faces.top;
      case 6: return faces.bottom;
      default: return faces.front;
    }
  };

  const activeFace = getActiveFace(diceValue);

  // Debug output
  console.log('Current dice value:', diceValue);

  return (
    <motion.div
      animate={controls}
      className="relative"
      style={{
        width: "64px",
        height: "64px",
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease"
        }}
      >
        {Object.entries(faces).map(([key, { dots, rotation, translate }]) => (
          <Face key={key} dots={dots} rotation={rotation} translate={translate} />
        ))}
      </div>
    </motion.div>
  );
};

export default Dice3D;