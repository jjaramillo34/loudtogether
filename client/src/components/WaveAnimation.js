import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";

const WaveAnimation = ({ waves }) => {
  const [waveItems, setWaveItems] = useState([]);

  useEffect(() => {
    setWaveItems(waves);
  }, [waves]);

  const transitions = useTransition(waveItems, {
    from: { transform: "scale(0)", opacity: 1 },
    enter: { transform: "scale(1.5)", opacity: 0 },
    leave: { transform: "scale(1.5)", opacity: 0 },
    config: { duration: 5000 },
  });

  return (
    <div className="relative w-full h-48 flex justify-center mt-6">
      {transitions((style, item) => (
        <animated.div
          key={item.id}
          style={style}
          className="absolute rounded-full border border-blue-500"
        />
      ))}
    </div>
  );
};

export default WaveAnimation;
