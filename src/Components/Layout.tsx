import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MouseTrail from "./Mouse";
import NavBar from "./NavBar";
import Footer from "./Footer";
import IgniteItForm from "../Routes/IgniteForm";

export default function Layout() {
  const location = useLocation();
  const [isLoggedIn] = useState(true); // Set your real logic here
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflowY = showForm ? "hidden" : "auto";
  }, [showForm]);

  useEffect(() => {
    document.title = "Upvotia | Where Ideas Meet Code"; 
  }, []);
  return (
    <>
      <MouseTrail />
      <NavBar isLoggedIn={isLoggedIn} />
      
      {/* 🔥 MODAL - can be opened from Hero or Footer now */}
      {showForm && (
        <div className="fixed w-full h-full z-50 pt-4 sm:pt-10 overflow-y-auto flex justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute -top-4 md:right-4 right-[0px] bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold hover:bg-black/80 transition"
            >
              ✕
            </button>
            <IgniteItForm />
          </div>
        </div>
      )}

      {/* Main Content + Passing context */}
      <Outlet context={{ isLoggedIn }} />
      <Footer isLoggedIn={isLoggedIn} setShowForm={setShowForm} />
    </>
  );
}
