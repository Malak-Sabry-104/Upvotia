import placeholder from "../assets/placeholder.png";

const Hero = () => {
  return (
    <section className="relative z-10 h-screen w-full overflow-hidden flex items-center justify-center text-center px-6">
      {/* Top-left green blur */}
      <div className="gradient-blur-top-left absolute z-0"></div>

      {/* Horizontal blur across screen */}
      <div className="gradient-blur-horizontal absolute z-0"></div>

      {/* Bottom radial gradient */}
      <div className="gradient-radial-bottom-center absolute z-0"></div>

      {/* Grid pattern background */}
      <div
        className="pattern-wrapper absolute inset-0 z-0"
        style={{ transform: "rotate(-360deg)", opacity: "10%" }}
      >
        <div className="pattern-inner" style={{ transform: "rotate(180deg)" }}>
          <div
            style={{
              position: "absolute",
              borderRadius: "inherit",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage:
                "url(https://framerusercontent.com/images/5AXsK3MyGYovv57LsfY0T3kRQU.png)",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
              backgroundSize: "40.5px auto",
            }}
            data-framer-background-image-wrapper="true"
          ></div>
        </div>
        <div className="pattern-bg-bottom-layer"></div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-center gap-9 w-full h-full">
        {/* Left side */}
        <div className="left w-[50%] py-5">
          <div className="relative z-10 flex flex-col items-start py-3">
            <h1 className="capitaize md:text-7xl font-semibold w-[90%] text-start mx-3 text-white mb-2">
              Your Voice
            </h1>
            <h1 className="capitaize md:text-7xl font-semibold w-[90%] text-start mx-3 text-white mb-10">
              Their Code..
            </h1>
            <p className="text-gray-300 text-lg md:text-sm mb-5 px-2 w-[70%] text-start">
              Upvotia connects dreamers with those who can help. Whether it's a
              personal goal, community project, or wild fantasy, share it with
              the world
            </p>
            <p
              className="text-gray-300 text-lg md:text-sm mb-6 px-2 w-[70%] text-start
            italic"
            >
              {" "}
            -  Share your ideas, support your favorites, and watch them come
              true.
            </p>

            <div className="btns-group flex justify-center gap-4">
              {/* Get Started */}
              <div className="relative">
                <button
                  className="bg-[#144D35]/50 backdrop-blur-2xl 
                z-10 relative text-white  py-3 rounded-lg font-semibold 
                transition duration-300 hover:-translate-y-1 hover:shadow-lg 
                hover:shadow-[#144D35]/30 transform px-6"
                >
                  Explore
                </button>
                <span className="w-[100px] h-[60px] bg-greeny-custom absolute rounded-full blur-lg left-1/2 -translate-x-1/2 z-0 -bottom-1/2"></span>
              </div>

              {/* Browse Wishes */}
              <div className="relative z-10">
                <button
                  className="relative z-20 bg-main-green greeny-inset-shadowing ring-1 ring-white text-white  py-3 rounded-lg font-semibold 
    transition duration-300 ease-in-out hover:bg-white  hover:shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 hover:scale-100 px-9"
                >
                  Ignite It
                </button>

                {/* Blur glow effect behind button */}
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-[100px] h-[50px] bg-greeny-custom rounded-full blur-md z-10"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="right w-[50%] mt-[5rem] relative z-10 h-[90%] flex items-end right-[-40px]">
          <div className="relative z-10 ring-10 ring-white/10 rounded-lg">
            <img
              src={placeholder}
              alt="Dreamy Illustration"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
