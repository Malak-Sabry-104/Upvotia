import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const BlogSlider = () => {
  useEffect(() => {
    new Swiper(".blog-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });
  }, []);

  const slides = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp",
      date: "26 December 2019",
      title: "Lorem Ipsum Dolor",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp",
      date: "26 December 2019",
      title: "Lorem Ipsum Dolor2",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp",
      date: "26 December 2019",
      title: "Lorem Ipsum Dolor",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?",
    },
  ];

  return (
    <div className="blog-slider relative max-w-[800px] mx-auto bg-white shadow-xl p-6 rounded-[25px] h-[400px]">
      <div className="blog-slider__wrp swiper-wrapper">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="blog-slider__item swiper-slide flex items-center md:flex-col md:text-center"
          >
            <div className="blog-slider__img relative w-[300px] h-[300px] flex-shrink-0 rounded-[20px] overflow-hidden bg-gradient-to-r from-orange-400 to-red-500 shadow-xl transform md:w-[90%] md:translate-y-[-50%]">
              <img
                src={slide.image}
                alt="slide-img"
                className="w-full h-full object-cover rounded-[20px] opacity-0 transition-opacity duration-300"
              />
            </div>
            <div className="blog-slider__content pr-6 md:mt-[-80px] md:px-6">
              <span className="blog-slider__code block text-gray-600 font-medium mb-3">
                {slide.date}
              </span>
              <div className="blog-slider__title text-2xl font-bold text-gray-900 mb-5">
                {slide.title}
              </div>
              <div className="blog-slider__text text-gray-700 leading-relaxed mb-6">
                {slide.text}
              </div>
              <a
                href="#"
                className="blog-slider__button inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full shadow-md font-medium tracking-wide hover:shadow-lg transition w-full sm:w-auto"
              >
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-slider__pagination absolute z-[21] right-5 top-1/2 transform -translate-y-1/2 md:left-1/2 md:top-[205px] md:transform md:-translate-x-1/2 md:flex md:justify-center md:items-center w-[11px] md:w-full"></div>
    </div>
  );
};

export default BlogSlider;
