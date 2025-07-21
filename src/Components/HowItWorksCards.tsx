import React from "react";
import { FaLightbulb, FaThumbsUp, FaCode } from "react-icons/fa";

const steps = [
  { text: "User submits an idea", icon: <FaLightbulb size={36} /> },
  { text: "Community votes and supports", icon: <FaThumbsUp size={36} /> },
  { text: "Developers get to work", icon: <FaCode size={36} /> },
];

export default function HowItWorksCards() {
  return (
    <>
      <section
        style={{
          minHeight: "80vh",
          width: "100%",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }}
        className=" animate-on-scroll py-6  section-gradient-center 
         flex flex-col justify-center items-center  mx-auto px-8  rounded-xl"
      >

        <h2
          className="text-3xl text-center font-bold mb-[5rem] text-green-300/10"
          style={{ textShadow: "0 0 4px #00ff88" }}
        >
          How does Upvotia work?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mx-[5rem]">
          {steps.map(({ text, icon }, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow-lg flex flex-col items-center"
              style={{
                background: "hsla(155, 100%, 75%, 0.15)",
        
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            
              }}
            >
              <div
                className="mb-4 text-green-300/50 shadow-md"
                style={{  textShadow: "0 0 3px #00ff88" }}
              >
                {icon}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  textShadow: "0 0 3px #00ff88",
                  marginBottom: "0.75rem",
                }}
              >
                Step {i + 1}
              </div>
              <p className="text-center text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
