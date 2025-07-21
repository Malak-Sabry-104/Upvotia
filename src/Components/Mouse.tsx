import { useState, useEffect } from "react";
import "./Mouse.css"; 

export default function MouseTrail() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="ball ball-1"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    
    </>
  );
}
