import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const Dice3D = ({ isRolling, onRollComplete }) => {
  const [diceValue, setDiceValue] = useState(1);
  const controls = useAnimation();

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const rollDice = async () => {
      if (!isRolling) return;

      await controls.set({
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        y: 0,
      });

      await controls.start({
        rotateX: [0, 720, 1440, 2160],
        rotateY: [0, 540, 1080, 1620],
        rotateZ: [0, 360, 720, 1080],
        y: [0, -150, -50, 0],
        transition: {
          duration: 2,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut",
        },
      });

      const finalRoll = getRandomNumber();

      if (isMounted) {
        setDiceValue(finalRoll);
        setTimeout(() => {
          if (isMounted && onRollComplete) {
            onRollComplete(finalRoll);
          }
        }, 200);
      }
    };

    if (isRolling) {
      rollDice();
    }

    return () => {
      isMounted = false;
    };
  }, [isRolling, getRandomNumber, controls, onRollComplete]);

  const faces = {
    1: "•",
    2: "••",
    3: "•••",
    4: "••••",
    5: "•••••",
    6: "••••••",
  };

  return (
    <motion.div
      animate={controls}
      className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-lg border-2 border-gray-200"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <span className="text-2xl">{faces[diceValue]}</span>
    </motion.div>
  );
};

export default Dice3D;
