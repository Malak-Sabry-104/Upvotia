import {
  FaMagic,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Footer({
  isLoggedIn,
  setShowForm,
}: {
  isLoggedIn: boolean;
  setShowForm: (value: boolean) => void;
}) {
  const navigate = useNavigate();

  const handleIgniteClick = () => {
    if (isLoggedIn) {
      setShowForm(true);
      navigate("#")
    } else {
      navigate("/auth#login");
    }
  };

  return (
    <footer className="section-gradient-bottom-right" style={{ minHeight: "50vh", width: "100%" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <FaMagic className="text-secondary text-2xl mr-2" />
              <span className="text-xl font-bold text-white">Upvotia</span>
            </a>
            <p className="text-gray-400 mb-6">
              Where dreams find their wings and wishes become reality through
              the power of community.
            </p>
            <div className="flex space-x-4">
              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ideas" className="text-gray-400 hover:text-white transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/devhub" className="text-gray-400 hover:text-white transition-colors">
                  Developer Hub
                </Link>
              </li>
              <li>
                <button
                  onClick={handleIgniteClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ignite an Idea
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Upvotia. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
