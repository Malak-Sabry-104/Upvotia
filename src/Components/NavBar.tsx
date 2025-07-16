import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import person from "../assets/images.png";
import { LogIn, UserPlus, Bell, Sparkle, User, LogOut } from "lucide-react";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = false; 

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore Wishes", href: "#" },
    { name: "Dashboard", href: "#" },
    { name: "Contact", href: "#" },
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
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
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
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Upvotia Logo" className="w-[60px]" />
            <h4 className="text-white text-xl font-bold">Upvotia</h4>
          </a>

          <ul className="flex justify-between items-center text-gray-300/70 gap-8 font-medium">
            <li><a href="/" className="hover:text-white/90">Home</a></li>
            <li><a href="#" className="hover:text-white/90">Explore Wishes</a></li>
            {isLoggedIn && (
              <li><a href="#" className="hover:text-white/90">Dashboard</a></li>
            )}
            <li><a href="#" className="hover:text-white/90">Contact</a></li>
          </ul>

          <div className="flex items-center gap-3 text-white/90">
            <a href="#" className="group relative overflow-hidden bg-black/50 backdrop-blur-2xl inline-flex items-center px-4 py-2 font-medium rounded-lg shadow-sm uppercase gap-2 text-xs transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-100 text-white">
              <span className="absolute inset-0 opacity-10 blur-lg group-hover:opacity-20 transition-all duration-500"></span>
              <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              Login
            </a>

            <a href="#" className="group relative overflow-hidden bg-black/50 backdrop-blur-2xl inline-flex items-center px-4 py-2 font-medium rounded-lg shadow-sm uppercase gap-2 text-xs transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-100 text-white">
              <span className="absolute inset-0 opacity-10 blur-lg group-hover:opacity-20 transition-all duration-500"></span>
              <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              Sign Up
            </a>

            {isLoggedIn && (
              <>
                {/* Notification Button */}
                <div className="relative" ref={notifRef}>
                  <div
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="notification-container w-10 h-10 rounded-full bg-black/20 ring-1 ring-white/50 flex items-center justify-center cursor-pointer"
                  >
                    <Bell className="text-white/70 w-5 h-5" />
                    <div className="notification-badge absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full" />
                  </div>

                  {isNotificationOpen && (
                    <div className="notification-dropdown absolute right-0 mt-2 w-64 bg-black rounded-md shadow-lg z-50">
                      <div className="notification-header flex justify-between px-4 py-2 border-b">
                        <span className="font-bold">Notifications</span>
                        <span
                          className="text-sm text-[#325244]/90 cursor-pointer"
                          onClick={() => alert("Cleared!")}
                        >
                          Clear All
                        </span>
                      </div>
                      <div className="notification-list p-2 text-sm text-gray-600">
                        No notifications yet.
                      </div>
                    </div>
                  )}
                </div>

                {/* New Wish */}
                <a
                  href="#"
                  className="bg-black inline-flex items-center px-3 py-2 text-xs font-medium rounded-md text-white/90 pink-gradient-bg shadow-sm uppercase gap-2"
                >
                  <Sparkle className="w-5 h-5" /> New Wish
                </a>

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
                      <a href="#" className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-white">
                        <User className="w-4 h-4" /> My Profile
                      </a>
                      <a href="#" className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-white">
                        <Sparkle className="w-4 h-4" /> My wishes
                      </a>
                      <a href="#" className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" /> Log Out
                      </a>
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
          <a href="/" className="">
            <img src={logo} alt="Upvotia Logo" className="w-[50px]" />
          </a>

          <ul className="flex justify-center items-center text-gray-300/70 gap-8 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setActiveLink(item.name)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    activeLink === item.name
                      ? "bg-white/10 py-2 text-white"
                      : "hover:text-white/90"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
