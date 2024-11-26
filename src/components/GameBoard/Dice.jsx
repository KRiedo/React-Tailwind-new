import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const Dice3D = ({ isRolling, onRollComplete }) => {
  const [diceValue, setDiceValue] = useState(1);
  const controls = useAnimation();

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  // Mapping sisi dadu ke rotasi yang sesuai
  const faceRotations = {
    1: [0, 0, 0],        // Depan
    2: [0, -90, 0],      // Kanan
    3: [90, 0, 0],       // Atas
    4: [-90, 0, 0],      // Bawah
    5: [0, 90, 0],       // Kiri
    6: [0, 180, 0],      // Belakang
  };

  useEffect(() => {
    let isMounted = true;

    const rollDice = async () => {
      if (!isRolling) return;

      const finalRoll = getRandomNumber();
      const [finalRotX, finalRotY, finalRotZ] = faceRotations[finalRoll];

      // Menggabungkan animasi rolling dan rotasi akhir dalam satu animasi
      await controls.start({
        rotateX: [0, 720 + finalRotX],
        rotateY: [0, 720 + finalRotY],
        rotateZ: [0, 720 + finalRotZ],
        y: [0, -150, 0],
        transition: {
          duration: 1.5,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        },
      });

      if (isMounted) {
        setDiceValue(finalRoll);
        if (onRollComplete) {
          onRollComplete(finalRoll);
        }
      }
    };

    if (isRolling) {
      rollDice();
    }

    return () => {
      isMounted = false;
    };
  }, [isRolling, getRandomNumber, controls, onRollComplete]);

  return (
    <div className="w-24 h-24 perspective-1000">
      <motion.div
        animate={controls}
        className="w-full h-full relative transform-style-preserve-3d"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Face 1 - Front */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg flex items-center justify-center transform-gpu"
             style={{ transform: 'translateZ(3rem)' }}>
          <div className="w-4 h-4 bg-white rounded-full"/>
        </div>

        {/* Face 2 - Right */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg flex items-center justify-center transform-gpu"
             style={{ transform: 'rotateY(90deg) translateZ(3rem)' }}>
          <div className="flex flex-col justify-between h-3/5">
            <div className="w-4 h-4 bg-white rounded-full"/>
            <div className="w-4 h-4 bg-white rounded-full"/>
          </div>
        </div>

        {/* Face 3 - Top */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols gap-2 p-4 ps-9 transform-gpu"
             style={{ transform: 'rotateX(-90deg) translateZ(3rem)' }}>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
        </div>

        {/* Face 4 - Bottom */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols-2 gap-2 p-6 transform-gpu"
             style={{ transform: 'rotateX(90deg) translateZ(3rem)' }}>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
        </div>

        {/* Face 5 - Left */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg ps-1 transform-gpu"
             style={{ transform: 'rotateY(-90deg) translateZ(3rem)' }}>
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-4">
            <div className="w-4 h-4 bg-white rounded-full"/>
            <div className="w-4 h-4 bg-white rounded-full invisible"/>
            <div className="w-4 h-4 bg-white rounded-full"/>
            <div className="w-4 h-4 bg-white rounded-full invisible"/>
            <div className="w-4 h-4 bg-white rounded-full"/>
            <div className="w-4 h-4 bg-white rounded-full invisible"/>
            <div className="w-4 h-4 bg-white rounded-full"/>
            <div className="w-4 h-4 bg-white rounded-full invisible"/>
            <div className="w-4 h-4 bg-white rounded-full"/>
          </div>
        </div>

        {/* Face 6 - Back */}
        <div className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols-2 gap-2 p-6 pt-4 transform-gpu"
             style={{ transform: 'rotateY(180deg) translateZ(3rem)' }}>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
          <div className="w-4 h-4 bg-white rounded-full"/>
        </div>
      </motion.div>
    </div>
  );
};

export default Dice3D;