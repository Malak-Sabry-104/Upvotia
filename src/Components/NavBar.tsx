import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import person from "../assets/images.png";
import { LogIn, UserPlus, Sparkle, User, LogOut } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = false;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore ", href: "#" },
    { name: "DevHub", href: "#" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowMiniNav(window.scrollY >= 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main NavBar */}
      {!showMiniNav && (
        <nav className="bg-transparent backdrop-blur-md z-50 flex justify-between items-center px-6 py-3 fixed top-0 w-full">
          <HashLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Upvotia Logo" className="w-[60px]" />
            <h4 className="text-white text-xl font-bold">Upvotia</h4>
          </HashLink>

          <ul className="flex justify-between items-center text-gray-300/70 gap-8 font-medium">
            <li>
              <HashLink to="/" smooth={true} className="hover:text-white/90">
                Home
              </HashLink>
            </li>
            <li>
              <HashLink to="#" className="hover:text-white/90">
                Explore{" "}
              </HashLink>
            </li>

            <li>
              <HashLink to="#" className="hover:text-white/90">
                DevHub
              </HashLink>
            </li>

            <li>
              <HashLink
                to="/#contact"
                smooth={true}
                className="hover:text-white/90"
              >
                Contact
              </HashLink>
            </li>
          </ul>

          <div className="flex items-center gap-3 text-white/90">
            {!isLoggedIn && (
              <>
                <Link
                  to="/auth#login"
                  className="group relative overflow-hidden bg-black/50 
                  backdrop-blur-2xl inline-flex items-center px-4 py-2 font-medium 
                  rounded-lg shadow-sm uppercase gap-2 text-xs transition-all duration-300
                   ease-in-out  hover:scale-100 text-white  z-10
                  hover:-translate-y-1 hover:shadow-lg 
                hover:shadow-[#144D35]/30 transform "
                >
                  <span
                    className="absolute inset-0 opacity-10 blur-lg
                   group-hover:opacity-20 transition-all duration-500"
                  ></span>
                  <LogIn
                    className="w-5 h-5
                "
                  />
                  Login
                </Link>

                <Link
                  to="/auth#register"
                  className="group relative overflow-hidden bg-black/50 
                  backdrop-blur-2xl inline-flex items-center px-4 py-2 font-medium 
                  rounded-lg shadow-sm uppercase gap-2 text-xs transition-all duration-300
                   ease-in-out  hover:scale-100 text-white  z-10
                  hover:-translate-y-1 hover:shadow-lg 
                hover:shadow-[#144D35]/30 transform "
                >
                  <span
                    className="absolute inset-0 opacity-10 blur-lg
                   group-hover:opacity-20 transition-all duration-500"
                  ></span>
                  <UserPlus className="w-5 h-5 " />
                  Sign Up
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                {/* New Wish */}
                <HashLink
                  to="#"
                  className="bg-black inline-flex items-center px-3 py-2 text-xs font-medium rounded-md text-white/90 pink-gradient-bg shadow-sm uppercase gap-2"
                >
                  <Sparkle className="w-5 h-5" />
                  Ignite It
                </HashLink>

                {/* Profile Dropdown */}
                <div className="profile-dropdown relative" ref={dropdownRef}>
                  <button
                    className="avatar-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <img
                      src={person}
                      className="ring-2 ring-black/40 w-10 h-10 rounded-full"
                      alt="Profile"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-content absolute right-0 mt-2 w-55 bg-black rounded-lg shadow-lg z-50">
                      <div className="dropdown-header flex items-center px-4 py-3 border-b">
                        <img
                          src={person}
                          className="header-avatar w-10 h-10 rounded-full"
                          alt="Profile"
                        />
                        <div className="ml-3">
                          <div className="font-bold">Alexandra Chen</div>
                          <div className="text-sm text-gray-500">
                            alex44@gmail.com
                          </div>
                        </div>
                      </div>
                      <HashLink
                        to="#"
                        className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-white"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </HashLink>

                      <HashLink
                        to="#"
                        className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-red-600"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </HashLink>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      )}
      {/* mini nav */}
      {showMiniNav && (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-md z-50 ring-2 ring-white/20 flex justify-center items-center gap-6 rounded-lg px-6 py-3 w-[60%]">
          <HashLink to="/" className="">
            <img src={logo} alt="Upvotia Logo" className="w-[50px]" />
          </HashLink>

          <ul className="flex justify-center items-center text-gray-300/70 gap-8 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <HashLink
                  to={item.href}
                  smooth={true}
                  onClick={() => setActiveLink(item.name)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    activeLink === item.name
                      ? "bg-white/10 py-2 text-white"
                      : "hover:text-white/90"
                  }`}
                >
                  {item.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
