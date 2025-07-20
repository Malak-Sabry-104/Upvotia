import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import IgniteItForm from "../Routes/IgniteForm";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = true;

  useEffect(() => {
    document.body.style.overflowY = showForm ? "hidden" : "auto";
  }, [showForm]);

  return (
    <>
    {/* Modal */}
        {showForm && (
          <div className="fixed w-full h-full z-50 pt-4 sm:pt-10 overflow-y-auto flex justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-lg">
              <button
                onClick={() => setShowForm(false)}
                className="absolute -top-4 md:right-4 right-[0px] bg-black/60
     text-white rounded-full w-7 h-7 flex items-center 
     justify-center font-bold hover:bg-black/80 transition"
              >
                ✕
              </button>
              <IgniteItForm />
            </div>
          </div>
        )}

      {/* Hero Section */}
      <section className="relative mb-0 z-10 h-screen w-full overflow-hidden flex items-center justify-center text-center px-6">
        {/* Background effects */}
        <div className="gradient-blur-top-left absolute z-0"></div>
        <div className="gradient-blur-horizontal absolute z-0"></div>
        <div className="gradient-radial-bottom-center absolute z-0"></div>
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
        </div>

        <div className="flex md:flex-row md:mt-0 mt-[6rem] flex-col justify-between items-center gap-9 w-full h-full">
          {/* Left side */}
          <div className="left w-full md:w-[50%] py-5">
            <div className="relative z-10 flex flex-col items-start py-3">
              <h1 className="capitalize md:text-7xl text-4xl font-semibold md:w-[90%] w-[60%] text-start mx-3 text-white mb-2">
                Your Voice
              </h1>
              <h1 className="capitalize md:text-7xl text-4xl font-semibold md:w-[90%] w-[60%] text-start mx-3 text-white mb-10">
                Their Code..
              </h1>
              <p className="text-gray-300 text-sm md:text-sm mb-5 px-2 w-[70%] text-start">
                Upvotia connects dreamers with those who can help. Whether it's a
                personal goal, community project, or wild fantasy, share it with
                the world
              </p>
              <p className="text-gray-300 text-xs md:text-sm mb-6 px-2 w-[70%] text-start italic">
                - Share your ideas, support your favorites, and watch them come
                true.
              </p>

              <div className="btns-group flex justify-center gap-4">
                {/* Explore button */}
                <div className="relative">
                  <button
                    className="bg-[#144D35]/50 backdrop-blur-2xl z-10 relative text-white py-3 rounded-lg font-semibold transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30 transform px-6"
                  >
                    Explore
                  </button>
                  <span className="w-[100px] h-[60px] bg-greeny-custom absolute rounded-full blur-lg left-1/2 -translate-x-1/2 z-0 -bottom-1/2"></span>
                </div>

                {/* Ignite It button */}
                <div className="relative z-10">
                  <button
                    className="relative z-20 bg-main-green greeny-inset-shadowing ring-1 ring-white text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 hover:scale-100 px-9"
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate("#"); 
                        setShowForm(true);
                      } else {
                        navigate("/auth#login");
                      }
                    }}
                  >
                    Ignite It
                  </button>
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-[100px] h-[50px] bg-greeny-custom rounded-full blur-md z-10"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="right w-full md:w-[50%] md:mt-[5rem] relative z-10 md:h-full flex items-end right-0 md:right-[-40px]">
            <div className="relative z-10 ring-10 ring-white/10 rounded-lg">
              <img
                src={placeholder}
                alt="Dreamy Illustration"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
