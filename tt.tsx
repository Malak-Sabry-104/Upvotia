import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function LoginCard() {
  return (
    <>
      <section
        id="login"
        style={{ height: "100vh", width: "100%", position: "relative" }}
        className="flex  justify-center items-center  "
      >
        <div className="framer-container ">
          <div className="framer-blur-top-left"></div>
          <div className="framer-blur-horizontal"></div>
          <div className="framer-radial-bottom"></div>
        </div>

        <div className="flex items-center justify-center relative z-10 px-4 mt-[6rem]">
          <div className="w-full max-w-4xl flex bg-black/20 rounded-2xl shadow-lg overflow-hidden">
            {/* Left Side */}
            <div className="blacky-bg text-white w-1/2 p-10 flex flex-col justify-center items-center rounded-tr-[4rem] rounded-br-[4rem]">
              <h2 className="text-3xl font-bold mb-2">Hello, Welcome!</h2>
              <p className="mb-6 text-sm">Don’t have an account?</p>
              <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-blue-500 transition">
                Register
              </button>
            </div>

            {/* Right Side */}
            <div className="w-1/2 p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:underline text-right"
                >
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </form>
              <p className="text-center text-gray-400 mt-6 mb-2 text-sm">
                or login with social platforms
              </p>
              <div className="flex justify-center gap-4 text-blue-600">
                <FaGoogle className="cursor-pointer hover:text-blue-800" />
                <FaFacebookF className="cursor-pointer hover:text-blue-800" />
                <FaGithub className="cursor-pointer hover:text-blue-800" />
                <FaLinkedin className="cursor-pointer hover:text-blue-800" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
