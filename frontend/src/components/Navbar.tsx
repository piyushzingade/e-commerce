import { Link } from "react-router-dom";


export default function Navbar() {
 
  return (
    <div className="w-full flex items-center justify-between px-4 md:px-6 py-2 bg-[#B5FBFF] shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left Logo */}
      <div className="flex items-center">
        <img src="Logo.png" alt="Dream Build Logo" className="h-12 w-auto" />
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center w-full max-w-lg md:max-w-2xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 text-gray-600 bg-white rounded-full shadow-md focus:outline-none text-base md:text-lg"
        />
        <img
          src="/search.png"
          alt="Search Icon"
          className="absolute left-3 h-5 w-5 md:h-6 md:w-6"
        />
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <Link to="/" className="bg-white p-2 md:p-3 rounded-lg shadow-md">
          <img src="/home.png" alt="Home" className="h-5 w-5 md:h-6 md:w-6" />
        </Link>
        <Link
          to="/cart"
          className="relative bg-white p-2 md:p-3 rounded-lg shadow-md"
        >
          <img src="/cart.png" alt="Cart" className="h-5 w-5 md:h-6 md:w-6" />
        </Link>
        <Link to="/orders" className="bg-white p-2 md:p-3 rounded-lg shadow-md">
          <img src="abc.png" alt="Orders" className="h-5 w-5 md:h-6 md:w-6" />
        </Link>
      </div>
    </div>
  );
}
