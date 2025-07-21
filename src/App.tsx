import React from "react";
import "./embla.css";
import Hero from "./Components/Hero";
import TrendingWishes from "./RelatedComponents/TrendingWishes";
import Contact from "./Components/Contact";
import HowItWorksCards from "./Components/HowItWorksCards";
const App: React.FC = () => {
  
  return(
  <>

    <Hero />
    <HowItWorksCards />
    <TrendingWishes />

    <Contact />
  </>);
}
export default App;
