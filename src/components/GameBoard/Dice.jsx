import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const Dice3D = ({ isRolling, onRollComplete }) => {
  const [diceValue, setDiceValue] = useState(1);
  const controls = useAnimation();

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  const faceRotations = {
    1: [0, 0, 0],
    2: [0, -90, 0],
    3: [90, 0, 0],
    4: [-90, 0, 0],
    5: [0, 90, 0],
    6: [0, 180, 0],
  };

  useEffect(() => {
    let isMounted = true;

    const rollDice = async () => {
      if (!isRolling) return;

      const finalRoll = getRandomNumber();
      const [finalRotX, finalRotY, finalRotZ] = faceRotations[finalRoll];

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

  const dotClasses = "w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-white rounded-full";
  const cubeSize = "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24";
  
  // Fungsi untuk menghitung translateZ berdasarkan ukuran dadu
  const getTranslateZ = () => {
    return {
      small: "1.7rem",   // untuk mobile
      medium: "2rem", // untuk tablet
      large: "2.5rem"    // untuk desktop
    };
  };

  const translateZ = getTranslateZ();

  return (
    <div className={`${cubeSize} [perspective:1000px]`}>
      <motion.div
        animate={controls}
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Face 1 - Front */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg flex items-center justify-center transform-gpu"
          style={{ 
            transform: `translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className={dotClasses}/>
        </div>

        {/* Face 2 - Right */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg flex items-center justify-center transform-gpu"
          style={{ 
            transform: `rotateY(90deg) translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className="flex flex-col justify-between h-3/5">
            <div className={dotClasses}/>
            <div className={dotClasses}/>
          </div>
        </div>

        {/* Face 3 - Top */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols gap-2 p-3 ss:px-7 sm:px-9 lg:px-10 transform-gpu"
          style={{ 
            transform: `rotateX(-90deg) translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
        </div>

        {/* Face 4 - Bottom */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols-2 gap-5 p-3 ss:pt-4 ps-4 sm:ps-5 sm:pt-5 lg:px-5 transform-gpu"
          style={{ 
            transform: `rotateX(90deg) translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
        </div>

        {/* Face 5 - Left */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols-3 ss:grid-rows-3 ss:gap-4 grid-rows-2 p-4 ss:p-3 ss:px-1 ss:pt-2 lg:px-3 transform-gpu"
          style={{ 
            transform: `rotateY(-90deg) translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className={dotClasses}/>
            <div className={`${dotClasses} invisible`}/>
            <div className={dotClasses}/>
            <div className={`${dotClasses} invisible`}/>
            <div className={dotClasses}/>
            <div className={`${dotClasses} invisible`}/>
            <div className={dotClasses}/>
            <div className={`${dotClasses} invisible`}/>
            <div className={dotClasses}/>
        </div>

        {/* Face 6 - Back */}
        <div 
          className="absolute w-full h-full bg-[#B8001F] border-1 border-orange-200 rounded-lg grid grid-cols-2 gap-2 p-3 ss:px-5 sm:px-6 lg:px-7 transform-gpu"
          style={{ 
            transform: `rotateY(180deg) translateZ(var(--dice-translate-z, ${translateZ.large}))`,
            '--dice-translate-z': `clamp(${translateZ.small}, 5vw, ${translateZ.large})`
          }}
        >
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
          <div className={dotClasses}/>
        </div>
      </motion.div>
    </div>
  );
};

export default Dice3D;