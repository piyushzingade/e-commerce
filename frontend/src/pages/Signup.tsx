import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

 const handleSignup = async (e: React.FormEvent) => {
   e.preventDefault();

   const name = nameRef.current?.value;
   const email = emailRef.current?.value;
   const password = passwordRef.current?.value;
   const confirmPassword = confirmPasswordRef.current?.value;

   if (!name || !email || !password || !confirmPassword) {
     toast.error("All fields are required.");
     return;
   }

   if (password !== confirmPassword) {
     toast.error("Passwords do not match.");
     return;
   }

   try {
     setLoading(true);

     const response = await axios.post(`${BACKEND_URL}/api/signup`, {
       name,
       email,
       password,
     });

     const data = response.data; // ✅ Correct way to get the response data

     toast.success("Signup successful! Redirecting to login...");
     setTimeout(() => {
       navigate("/login");
     }, 2000);
   } catch (error: any) {
     toast.error(
       error.response?.data?.error || "Something went wrong. Please try again."
     );
   } finally {
     setLoading(false);
   }
 };


  const handleLoginClick = () => {
    toast.info("Navigating to login page...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#25AAE1] to-[#FFFFFF] overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Sign up</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 p-8">
          <form className="space-y-6" onSubmit={handleSignup}>
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-300 focus:outline-none"
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm password"
              className="w-full px-5 py-4 border border-gray-200 rounded-3xl shadow-2xl focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
            <p>
              Already have an account?{" "}
              <span
                onClick={handleLoginClick}
                className="text-blue-600 hover:underline hover:cursor-pointer"
              >
                Login
              </span>
            </p>
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#5222D0] rounded-lg text-xl font-semibold shadow-lg hover:bg-[#3e1aa8] transition"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-2">
          <img
            src="Signup.png"
            alt="Signup Illustration"
            className="rounded-xl"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
