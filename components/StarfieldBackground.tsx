import React, { useState, useEffect } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  animationDelay: string;
  animationDuration: string;
}

const StarfieldBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (numStars: number) => {
      const newStars: Star[] = [];
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 0.5,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        });
      }
      setStars(newStars);
    };
    
    generateStars(150);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default StarfieldBackground;
