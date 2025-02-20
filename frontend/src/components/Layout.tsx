import { useLocation } from "react-router-dom";
import Appbar from "./Appbar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Show Appbar only for Signin & Signup pages
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditional Header */}
      <div className="w-full z-50 bg-white shadow-md">
        {isAuthPage ? <Appbar /> : <Navbar />}
      </div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
