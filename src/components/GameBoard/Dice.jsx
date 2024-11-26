import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const Dice = ({ onRollComplete, isRolling, setIsRolling }) => {
  const diceContainerRef = useRef(null);
  const rollDiceRef = useRef(null);

  useEffect(() => {
    let cam, scene, renderer, dice;
    const container = diceContainerRef.current;

    const init = () => {
      scene = new THREE.Scene();
      cam = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      cam.position.set(1, 1, 10);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(5, 5, 8);
      scene.add(light);

      const geo = new THREE.BoxGeometry(2, 2, 2);
      const materials = [];
      for (let i = 1; i <= 6; i++) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 256;

        context.fillStyle = "#6F4E37";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#fc0303";
        context.font = "bold 150px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(i, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        materials.push(new THREE.MeshLambertMaterial({ map: texture }));
      }

      dice = new THREE.Mesh(geo, materials);
      dice.position.set(0, -10, 0);
      scene.add(dice);

      const render = () => {
        renderer.render(scene, cam);
      };

      rollDiceRef.current = () => {
        if (isRolling) return;
        setIsRolling(true);
        const randomResult = Math.floor(Math.random() * 6) + 1;

        let bounceCount = 3;
        let velocityY = 0.5;
        let gravity = 0.02;

        const animate = () => {
          if (bounceCount > 0) {
            dice.position.y += velocityY;
            velocityY -= gravity;

            if (dice.position.y <= 0) {
              bounceCount--;
              velocityY = 0.5 * Math.pow(0.7, 3 - bounceCount);
            }

            dice.rotation.x += 0.1;
            dice.rotation.y += 0.1;

            requestAnimationFrame(animate);
          } else {
            dice.position.y = 0;
            dice.rotation.set(0, 0, 0);
            onRollComplete(randomResult);
          }

          render();
        };

        animate();
      };

      render();
    };

    init();

    return () => {
      container.innerHTML = ""; // Clean up on unmount
    };
  }, [onRollComplete, isRolling, setIsRolling]);

  return (
    <div className="w-full h-64 relative">
      <div ref={diceContainerRef} className="w-full h-full"></div>
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={isRolling}
        onClick={() => rollDiceRef.current && rollDiceRef.current()}
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
};

export default Dice;