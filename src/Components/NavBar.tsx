import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import person from "../assets/images.png";
import {
  LogIn,
  UserPlus,
  Sparkle,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import IgniteItForm from "../Routes/IgniteForm";
import { FaMagic } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const MobileProfileDropdown = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    onClose();
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="ring-2 ring-black/40 w-12 h-12 rounded-full overflow-hidden"
        aria-label="Open profile menu"
      >
        <img 
          src={user?.profile?.avatar || person} 
          alt="Profile" 
          className="w-full h-full object-cover" 
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-black rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-3">
            <img
              src={user?.profile?.avatar || person}
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-gray-400 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user?.username}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>

          <Link
            to={`/profile/${user?.id}`}
            onClick={() => {
              onClose();
              setOpen(false);
            }}
            className=" px-4 py-2 hover:bg-white/20 text-white flex items-center gap-2"
          >
            <User className="w-4 h-4" /> My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-700 text-red-500 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      )}
    </div>
  );
};

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore ", href: "/ideas" },
    { name: "DevHub", href: "/devhub" },
    { name: "Contact", href: "/#contact" },
    { name: "About", href: "/about-us" },
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

  useEffect(() => {
    document.body.style.overflowY = showForm ? "hidden" : "auto";
  }, [showForm]);

  const handleMobileMenuClick = (item: { name: any; href?: string }) => {
    setActiveLink(item.name);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleIgniteClick = () => {
    if (isAuthenticated) {
      setShowForm(true);
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      {/* Main NavBar */}
      <nav
        className={`
          bg-transparent backdrop-blur-md z-50 flex justify-between items-center 
          px-4 sm:px-6 py-3 fixed top-0 w-full transition-opacity duration-500 ease-in-out
          ${showMiniNav ? "md:opacity-0 md:pointer-events-none" : "opacity-100"}
        `}
      >
        <a href="/" className="flex items-center gap-2">
                      <FaMagic className="text-secondary text-2xl mr-2" />
        
          {/* <img src={logo} alt="Upvotia Logo" className="w-[50px] sm:w-[60px]" /> */}
          <h4 className="text-white text-lg sm:text-xl font-bold">Upvotia</h4>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex justify-between items-center text-gray-300/70 gap-6 xl:gap-8 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <HashLink
                to={item.href}
                smooth={true}
                className="hover:text-white/90 transition-colors"
                onClick={() => setActiveLink(item.name)}
              >
                {item.name}
              </HashLink>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 text-white/90">
          {!isAuthenticated && (
            <>
              <Link
                to="/auth#login"
                className="group relative overflow-hidden bg-black/50 
                backdrop-blur-2xl inline-flex items-center px-3 lg:px-4 py-2 font-medium 
                rounded-lg shadow-sm uppercase gap-1 lg:gap-2 text-xs transition-all duration-300
                ease-in-out hover:scale-100 text-white z-10
                hover:-translate-y-1 hover:shadow-lg 
                hover:shadow-[#144D35]/30 transform"
              >
                <span
                  className="absolute inset-0 opacity-10 blur-lg
                  group-hover:opacity-20 transition-all duration-500"
                ></span>
                <LogIn className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>

              <Link
                to="/auth#register"
                className="group relative overflow-hidden bg-black/50 
                backdrop-blur-2xl inline-flex items-center px-3 lg:px-4 py-2 font-medium 
                rounded-lg shadow-sm uppercase gap-1 lg:gap-2 text-xs transition-all duration-300
                ease-in-out hover:scale-100 text-white z-10
                hover:-translate-y-1 hover:shadow-lg 
                hover:shadow-[#144D35]/30 transform"
              >
                <span
                  className="absolute inset-0 opacity-10 blur-lg
                  group-hover:opacity-20 transition-all duration-500"
                ></span>
                <UserPlus className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </>
          )}

          {/* Ignite It Button - Always visible */}
          <HashLink
            onClick={handleIgniteClick}
            to="#"
            className="bg-black
            inline-flex items-center px-2 lg:px-3 py-2 text-xs font-medium
            rounded-md text-white/90 pink-gradient-bg shadow-sm uppercase gap-1 lg:gap-2
            backdrop-blur-2xl 
            z-10 relative  
            transition duration-300 hover:-translate-y-1 hover:shadow-lg 
            hover:shadow-[#144D35]/30 transform"
          >
            <Sparkle className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Ignite It</span>
          </HashLink>

          {isAuthenticated && (
            <>
              {/* Profile Dropdown */}
              <div className="profile-dropdown relative" ref={dropdownRef}>
                <button
                  className="avatar-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={user?.profile?.avatar || person}
                    className="ring-2 ring-black/40 w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                    alt="Profile"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-content absolute right-0 mt-2 w-48 lg:w-56 bg-black rounded-lg shadow-lg z-50">
                    <div className="dropdown-header flex items-center px-4 py-3 border-b border-gray-700">
                      <img
                        src={user?.profile?.avatar || person}
                        className="header-avatar w-8 h-8 lg:w-10 lg:h-10 rounded-full flex-shrink-0"
                        alt="Profile"
                      />
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="font-bold text-sm lg:text-base text-white truncate">
                          {user?.username}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-400 truncate">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/profile/${user?.id}`}
                      className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-white"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-sm dropdown-item px-4 py-2 hover:bg-white/20 flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 
          transition-opacity duration-300 ease-in-out
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          ${showMiniNav ? "opacity-0 pointer-events-none" : ""}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <HashLink
              key={item.name}
              to={item.href}
              smooth={true}
              onClick={() => handleMobileMenuClick(item)}
              className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              {item.name}
            </HashLink>
          ))}

          {!isAuthenticated && (
            <div className="flex flex-col space-y-4 mt-8">
              <Link
                to="/auth#login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black/50 backdrop-blur-2xl inline-flex items-center justify-center px-6 py-3 font-medium 
                rounded-lg shadow-sm uppercase gap-2 text-sm transition-all duration-300 text-white"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/auth#register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black/50 backdrop-blur-2xl inline-flex items-center justify-center px-6 py-3 font-medium 
                rounded-lg shadow-sm uppercase gap-2 text-sm transition-all duration-300 text-white"
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Ignite It Button */}
          <HashLink
            onClick={() => {
              handleIgniteClick();
              setIsMobileMenuOpen(false);
            }}
            to="#"
            className="bg-black inline-flex items-center justify-center px-6 py-3 font-medium
            rounded-md text-white pink-gradient-bg shadow-sm uppercase gap-2 text-sm"
          >
            <Sparkle className="w-5 h-5" />
            Ignite It
          </HashLink>

          {isAuthenticated && (
            <>
              {/* Mobile Profile Dropdown */}
              <MobileProfileDropdown
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mini NavBar */}
      <nav
        className={`
          fixed top-6 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-md 
          z-50 ring-2 ring-white/20 flex justify-center items-center gap-3 sm:gap-4 lg:gap-6 rounded-lg 
          px-3 sm:px-4 lg:px-6 py-3 w-auto transition-opacity duration-500 ease-in-out max-w-[90vw]
          ${showMiniNav ? "opacity-0 md:opacity-100" : "opacity-0 md:opacity-0 md:pointer-events-none"}
        `}
      >
        <a href="/">
          {/* <img src={logo} alt="Upvotia Logo" className="w-[40px] sm:w-[50px]" /> */}
                        <FaMagic  className="text-white/50 text-2xl mr-2" />

        </a>

        {/* Desktop Mini Nav Items */}
        <ul className="hidden sm:flex justify-center items-center text-gray-300/70 gap-4 lg:gap-6 xl:gap-8 font-medium text-sm lg:text-base">
          {navItems.map((item) => (
            <li key={item.name}>
              <HashLink
                to={item.href}
                smooth={true}
                onClick={() => setActiveLink(item.name)}
                className={`px-2 lg:px-3 py-1 rounded-md transition-colors duration-200 hover:text-white/90 whitespace-nowrap ${activeLink === item.name
                    ? "bg-white/10 py-2 text-white"
                    : ""
                  }`}
              >
                {item.name}
              </HashLink>
            </li>
          ))}
        </ul>

        {/* Mobile Mini Nav - Just dots or abbreviated */}
        <div className="sm:hidden flex items-center gap-2">
          {navItems.map((item) => (
            <HashLink
              key={item.name}
              to={item.href}
              smooth={true}
              onClick={() => setActiveLink(item.name)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${activeLink === item.name
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </nav>

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
    </>
  );
};

export default NavBar;
