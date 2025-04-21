import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/home"); // Change to the correct route
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    toast.info("Navigating to sign-up page...");
    setTimeout(() => {
      navigate("/signup");
    }, 1500);
  };

  return (
    <div className="flex flex-col px-96 py-32 h-screen bg-gradient-to-r from-[#25AAE1] to-[#FFFFFF] overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          Log in
        </h1>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col lg:flex-row">
        <div className="flex-1 p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-300 focus:outline-none"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
            <p>
              Don’t have an account?{" "}
              <span
                onClick={handleSignupClick}
                className="text-blue-600 hover:underline hover:cursor-pointer"
              >
                Sign up
              </span>
            </p>
            <button
              type="submit"
              className="w-full py-4 text-white bg-[#5222D0] rounded-lg text-xl font-semibold shadow-lg hover:bg-[#3e1aa8] transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center p-2">
          <img
            src="login.png"
            alt="Login Illustration"
            className="rounded-xl"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
