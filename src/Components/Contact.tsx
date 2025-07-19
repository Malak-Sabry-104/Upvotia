import React from "react";
import { ArrowRight, Mail, Phone, MapPin, SendHorizontal } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      style={{ height: "100vh", width: "100%" }}
      className=" section-gradient-top-right min-h-screen  text-white px-6 py-12 md:px-20 flex flex-col md:flex-row gap-10 "
    >
      {/* Left: Contact Info */}
      <div className="  flex-1 relative left-[-45px] ">
        <button className="flex items-center justify-start gap-2  py-1 rounded-md text-sm mb-4 ring-1 ring-white/10 pr-4">
          <SendHorizontal className="bg-[#10543F] py-1 rounded-sm w-7 h-7 " />
          <span className="text-white/80 font-semibold text-xs">Contact</span>
        </button>

        <h1 className="text-6xl font-semibold mb-4 tracking-tight">
          Let's Talk!
        </h1>
        <p className=" mb-10 w-[50%] text-white/50">
          Send us a message and we will get back to you within 24 hours to
          arrange a call!
        </p>

        <div className="space-y-3">
          {/* Email */}
          <div className="bg-[#0e0d0dad] ring-1 ring-white/10 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mail className="text-white bg-[#1f1c1cad] py-3 w-[50px] h-[50px] px-1 rounded-lg ring-2 ring-white/10" />
              <div>
                <p className=" text-white font-semibold text-md">Email us</p>
                <p className="text-gray-400">nuovakit@gmail.com</p>
              </div>
            </div>
            <div
              className="text-white py-3 w-[50px] h-[50px] px-1    cursor-pointer

  rounded-lg bg-[#1f1c1cad] ring-2 ring-white/10 flex justify-center items-center"
            >
              <ArrowRight
                className="
  cursor-pointer
      transition-all duration-700 
      hover:rotate-[-45deg] 
      hover:opacity-100
    "
              />
            </div>
          </div>

          {/* Call */}
          <div className="bg-[#0e0d0dad] ring-1 ring-white/10  p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Phone className="text-white  bg-[#1f1c1cad]  py-3 w-[50px] h-[50px] px-1 rounded-lg ring-2 ring-white/10" />
              <div>
                <p className="text-white font-semibold text-md">Call us</p>
                <p className="text-gray-400">+359 988 777 80</p>
              </div>
            </div>
            <div
              className="text-white py-3 w-[50px] h-[50px] px-1 
  rounded-lg bg-[#1f1c1cad] ring-2 ring-white/10 flex justify-center items-center   cursor-pointer
"
            >
              <ArrowRight
                className="
      transition-all duration-700 
      hover:rotate-[-45deg] 
      hover:opacity-100
    "
              />
            </div>{" "}
          </div>

          {/* Location */}
          <div className="bg-[#0e0d0dad] ring-1 ring-white/10 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MapPin className="text-white  py-3 w-[50px] h-[50px] px-1 rounded-lg  bg-[#1f1c1cad] ring-2 ring-white/10" />
              <div>
                <p className="text-white font-semibold text-md">
                  Our location 1
                </p>
                <p className="text-gray-400">Sofia, Bulgaria</p>
              </div>
            </div>
            <div
              className="text-white py-3 w-[50px] h-[50px] px-1 
  rounded-lg bg-[#1f1c1cad] ring-2 ring-white/10 flex justify-center items-center   cursor-pointer"
            >
              <ArrowRight
                className="

      transition-all duration-700 
      hover:rotate-[-45deg] 
      hover:opacity-100
    "
              />
            </div>{" "}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 space-y-4  pt-6  relative right-[-45px] bg-[#0D0D0D]  px-4 ring-1 ring-white/10 rounded-2xl">
        <div className="flex gap-4 ">
          <input
            type="text"
            placeholder="Marso Angelov"
            className="
 rounded-md 
 ring-1 ring-white/10
             focus:outline-none 
             focus:ring-2 focus:ring-[#123727] 
             focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] 
             transition-all duration-400      w-full p-3 bg-[#141414] text-white placeholder-gray-400 py-5    "
          />
          <input
            type="email"
            placeholder="nuovakit@gmail.com"
            className=" rounded-md 
 ring-1 ring-white/10
             focus:outline-none 
             focus:ring-2 focus:ring-[#123727] 
             focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] 
             transition-all duration-400      w-full p-3 bg-[#141414] text-white placeholder-gray-400 py-5    "
          />
        </div>
        <input
          type="text"
          placeholder="https://designedbymarso.com/"
          className=" rounded-md 
 ring-1 ring-white/10
             focus:outline-none 
             focus:ring-2 focus:ring-[#123727] 
             focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] 
             transition-all duration-400    mt-2  w-full p-3 bg-[#141414] text-white placeholder-gray-400 py-5    "
        />
        <textarea
          rows={6}
          placeholder="More about your project"
          className=" rounded-md 
 ring-1 ring-white/10
             focus:outline-none 
             focus:ring-2 focus:ring-[#123727] 
             focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] 
             transition-all duration-400    mt-2  w-full p-3 bg-[#141414] text-white placeholder-gray-400 py-5 "
        ></textarea>
        <div className="relative">
          <button
            className="w-full bg-[#0a3a23]   font-semibold py-4   
         backdrop-blur-2xl z-10 relative text-white px-6  rounded-lg 
         transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30 transform"
          >
            Get started
          </button>
          <span className="w-[300px] h-[80px] bg-greeny-custom absolute rounded-full blur-xl opacity-45 left-1/2 -translate-x-1/2 z-0 -bottom-1/2"></span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
