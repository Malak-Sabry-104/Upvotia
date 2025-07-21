import React from "react";
import EmblaCarousel from "./Carousel";
import type { EmblaOptionsType } from "embla-carousel";
import "../embla.css";
import WishesGrid from "./WishesGrid";
const OPTIONS: EmblaOptionsType = { axis: "y" };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const TrendingWishes: React.FC = () => (
  <>
    <section
      style={{  width: "100%" }}
      className="animate-on-scroll section-gradient-top-left md:h-[110vh] min-h-[130vh]"
    >

      <h1
        className="capitalize text-4xl pt-7 pb-2 text-center font-semibold"
        style={{ fontFamily: "'Bebas Neue', cursive" }}
      >
        Trending Ideas
      </h1>
      <WishesGrid/>

      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  </>
);

export default TrendingWishes;
