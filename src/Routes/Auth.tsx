import React, { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import type { LoginCredentials, RegisterData } from "../types";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  placeholder: string;
  type?: string;
  error?: string;
}

/* ---------- main component ---------- */
export default function AuthCard() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* ── login form hooks ── */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginCredentials>();

  /* ── register form hooks ── */
  const {
    register: regRegister,
    handleSubmit: handleRegSubmit,
    formState: { errors: regErrors },
  } = useForm<RegisterData>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.hash === "#register") {
      setIsRegister(true);
    } else if (location.hash === "#login") {
      setIsRegister(false);
    }
  }, [location]);

  const handleLogin = async (data: LoginCredentials) => {
    setLoading(true);
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    try {
      await register(data);
      setIsRegister(false);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="auth"
      style={{ minHeight: "100vh", width: "100%", position: "relative" }}
      className="flex justify-center items-center pb-8"
    >
      <div className="framer-container">
        <div className="framer-blur-top-left"></div>
        <div className="framer-blur-horizontal"></div>
        <div className="framer-radial-bottom"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full
      
      max-w-4xl bg-black/20 rounded-3xl 
      mt-[7rem] shadow-lg overflow-hidden flex md:flex-row  flex-col
      transition-all duration-700 ease-in-out md:h-[80vh] h-[120vh]">
        {/* Side panel */}
        <div className="greeny-bg md:mt-0 mt-[2rem] text-white
         w-full md:w-1/2 p-10 flex flex-col justify-center items-center
         rounded-[4rem] 
          md:rounded-tr-[4rem] md:rounded-br-[4rem]">
          <h2 className="text-3xl font-bold mb-2">
            {isRegister ? "Welcome Back!" : "Hello, Welcome!"}
          </h2>
          <p className="mb-6 text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="px-5 py-2 ring-2 ring-white/10 rounded-full bg-black/30 hover:text-[#39a476] transition cursor-pointer hover:shadow-lg hover:shadow-[#184a34] transform hover:-translate-y-1 hover:scale-100"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>

        {/* Forms */}
        <div className="w-full md:pt-0 pt-[25rem] md:w-1/2 p-30 relative overflow-hidden">
          {/* ───── Login ───── */}
          <div
            className={`absolute flex flex-col justify-center top-0 left-0 w-full h-full px-10 py-6 transition-all duration-700 ease-in-out ${
              isRegister
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <h2 className="text-3xl text-white/60 mb-6">Login</h2>
            <form
              id="login"
              onSubmit={handleLoginSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <Input
                icon={<FaUser />}
                placeholder="Username"
                {...loginRegister("username", {
                  required: "Username is required",
                })}
                error={loginErrors.username?.message as string}
              />
              <Input
                icon={<FaLock />}
                placeholder="Password"
                type="password"
                {...loginRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={loginErrors.password?.message as string}
              />
              <SubmitButton label="Login" />
            </form>
            <SocialLogin />
          </div>

          {/* ───── Register ───── */}
          <div
            id="register"
            className={`absolute flex flex-col justify-center top-0 left-0 w-full h-full px-10 py-6 transition-all duration-700 ease-in-out ${
              isRegister
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <h2 className="text-3xl text-white/60 mb-6">Register</h2>
            <form
              onSubmit={handleRegSubmit(handleRegister)}
              className="flex flex-col gap-4"
            >
              <Input
                icon={<FaUser />}
                placeholder="Username"
                {...regRegister("username", {
                  required: "Username is required",
                })}
                error={regErrors.username?.message as string}
              />
              <Input
                icon={<MdEmail />}
                placeholder="Email"
                type="email"
                {...regRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                error={regErrors.email?.message as string}
              />
              <Input
                icon={<FaLock />}
                placeholder="Password"
                type="password"
                {...regRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={regErrors.password?.message as string}
              />
              <Input
                icon={<FaLock />}
                placeholder="Confirm Password"
                type="password"
                {...regRegister("password_confirm", {
                  required: "Please confirm your password",
                })}
                error={regErrors.password_confirm?.message as string}
              />
              <SubmitButton label="Register" loading={loading} />
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Input ---------- */
function Input({
  icon,
  placeholder,
  type = "text",
  error,
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-transparent 
      ring-1 ring-white/10 mt-2 rounded-md px-3 py-2
       transition-all duration-400 focus-within:ring-2 
       focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]">
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
          {...rest}
        />
      </div>
      {error && <p className="text-sm text-red-400 mt-1 ml-1">{error}</p>}
    </div>
  );
}

/* ---------- Button ---------- */
function SubmitButton({ label, loading = false }: SubmitButtonProps) {
  return (
    <div className="relative z-10 mt-2">
      <button
        type="submit"
        disabled={loading}
        className={`w-full relative z-20 bg-main-green greeny-inset-shadowing ring-1 ring-white text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 hover:scale-100 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Loading...' : label}
      </button>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-[100px] h-[50px] bg-greeny-custom rounded-full blur-md z-10"></span>
    </div>
  );
}

/* ---------- Social Icons ---------- */
function SocialLogin() {
  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!');
  };

  const handleFacebookLogin = () => {
    toast.info('Facebook login coming soon!');
  };

  return (
    <>
      <p className="text-center text-gray-400 mt-6 mb-2 text-sm">
        or login with social platforms
      </p>
      <div className="flex justify-center gap-4 pt-3">
        <FaGoogle 
          onClick={handleGoogleLogin}
          className="cursor-pointer text-white/40 w-[36px] h-[36px] py-2 bg-[#123727] rounded-md hover:text-white/60 transition-colors" 
        />
        <FaFacebookF 
          onClick={handleFacebookLogin}
          className="cursor-pointer text-white/40 w-[36px] h-[36px] py-2 bg-[#123727] rounded-md hover:text-white/60 transition-colors" 
        />
      </div>
    </>
  );
}
