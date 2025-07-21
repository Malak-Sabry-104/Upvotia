import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotBtn";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselArrowBtn";
import useEmblaCarousel from "embla-carousel-react";
import WishCard from "./WishCard";

type PropType = {
  slides: number[]; // optional, not used now
  options?: EmblaOptionsType;
};

const wishes = [
  {
    title: "Community garden project",
    description:
      "Want to transform an empty lot in our neighborhood into a community garden. Need volunteers, materials, and gardening expertise.",
    tags: ["Community", "Eco"],
    author: "Michael T.",
    stars: 89,
  },
  {
    title: "Recycling awareness campaign",
    description:
      "A local drive to raise awareness about proper recycling habits. Flyers, workshops, and school visits planned.",
    tags: ["Eco", "Education"],
    author: "Lena R.",
    stars: 72,
  },
  {
    title: "Free coding bootcamp",
    description:
      "Offer free weekend coding classes for high school students. Looking for instructors and a venue.",
    tags: ["Education", "Tech"],
    author: "Samuel N.",
    stars: 110,
  },
  {
    title: "Street art festival",
    description:
      "Plan a street art festival to beautify our neighborhood and support local artists.",
    tags: ["Art", "Community"],
    author: "Nora K.",
    stars: 65,
  },
  {
    title: "Neighborhood clean-up day",
    description:
      "Organize a clean-up day to remove trash and paint public spaces. All hands needed!",
    tags: ["Community", "Eco"],
    author: "Ahmed Z.",
    stars: 94,
  },
];

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla  ">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {wishes.map((wish, index) => (
            <div className="embla__slide p-4" key={index}>
              <WishCard {...wish} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls  ">
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <div className="embla__dots bg-red-400">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={
                'embla__dot' + (index === selectedIndex ? ' embla__dot--selected' : '')
              }
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmblaCarousel;
