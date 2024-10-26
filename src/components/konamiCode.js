import React, { useState, useEffect } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const KonamiEasterEgg = () => {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          setShowVideo(true);
          playEasterEggSound();
        }
        setKonamiIndex((prevIndex) => prevIndex + 1);
      } else {
        setKonamiIndex(0);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [konamiIndex]);

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        setShowEasterEgg(true);
      }, 3000); // Adjust this value to match your video length
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  const playEasterEggSound = () => {
    // const audio = new Audio("/path-to-your-sound-file.mp3");
    // audio.play();
  };

  if (!showVideo && !showEasterEgg) return null;

  return (
    <div className="easter-egg-container">
      {showVideo && !showEasterEgg && (
        <img
          src="/nyan-cat.gif"
          alt="Nyan Cat"
          className="nyan-cat-background"
        />
      )}
      {showEasterEgg && (
        <div className="easter-egg-content">
          <p className="rotating-element color-changing">SILENCE</p>

          <img
            src="/zakaria.jpeg"
            alt="Easter Egg"
            className="rotating-element"
          />
          <p className="rotating-element color-changing">-1 point</p>
          <p className="rotating-element color-changing">OUUUUOUUUUOUUUU</p>
        </div>
      )}
    </div>
  );
};
