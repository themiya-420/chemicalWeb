import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import Logo from "../images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility
  };

  const signOut = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  return (
    <nav className="bg-white p-4">
      {" "}
      {/* Changed to a darker background */}
      <style>
        {`
          .hamburger {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 30px;
          }

          .line {
            width: 100%;
            height: 3px;
            background-color: white;
            transition: all 0.3s ease;
          }

          .open .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }

          .open .line:nth-child(2) {
            opacity: 0; /* Hide the middle line */
          }

          .open .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
          }

          .menu {
            transition: transform 0.3s ease;
            transform: translateY(-20px); /* Start slightly above */
            opacity: 0; /* Start hidden */
          }

          .menu.open {
            transform: translateY(0); /* Slide down */
            opacity: 1; /* Fade in */
          }
        `}
      </style>
      <div className="flex items-center justify-between">
        <img src={Logo} alt="Eco_logo.png" className="w-20" />
        <div className="md:hidden " onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul
          className={`hidden md:flex md:items-center md:space-x-4 menu ${
            !isOpen ? "open" : ""
          }`}
        >
          <li>
            <Link to="/" className="text-green-500 hover:text-green-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-green-500 hover:text-green-700">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/order" className=" text-green-500 hover:text-green-700">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={signOut}
              className="bg-green-600 rounded-full px-3 py-1 text-white"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <ul
          className={`flex flex-col space-y-2 mt-2 menu ${
            isOpen ? "open" : ""
          }`}
        >
          <li>
            <Link to="/" className="text-green-500 hover:text-green-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-green-500 hover:text-green-700">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/order" className=" text-green-500 hover:text-green-700">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={signOut}
              className="bg-green-600 rounded-full px-3 py-1 text-white"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
