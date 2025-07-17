import React from "react";
import "./embla.css";
import Hero from "./Components/Hero";
import TrendingWishes from "./Components/TrendingWishes";
import Contact from "./Components/Contact";
// import Slider from "./Components/Slider";
const App: React.FC = () => (
  <>
    <Hero />
    <TrendingWishes />
    <Contact />
    {/* <Slider/> */}
  </>
);

export default App;
