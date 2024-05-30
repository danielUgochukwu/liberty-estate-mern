import { useState } from "react";
import { FaRegUser, FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { logoImg } from "../utils/index";
import { navList } from "../constants";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearchBlur = () => {
    setIsSearchVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform the search action with searchQuery
    console.log("Search query:", searchQuery);
    // Hide the search bar after submission
    setIsSearchVisible(false);
  };

  return (
    <header className="flex justify-between items-center bg-primary py-4 px-10">
      <Link to="/">
        <img src={logoImg} alt="logo" className="max-w-32 max-h-32" />
      </Link>

      <nav className="flex max-md:hidden absolute left-0 right-0">
        <ul className="flex-center w-full h-full py-4 px-12">
          {navList.map((item) => (
            <li
              key={item.name}
              className="my-0 mx-4 font-semibold cursor-pointer text-night hover:text-secondary transition-all duration-300 ease-in-out"
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-center relative">
        {!isSearchVisible ? (
          <div
            className="mx-2 bg-white p-4 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out shadow-sm cursor-pointer max-lg:hidden"
            onClick={handleSearchClick}
          >
            <FaSearch className="w-5 h-5 max-md:w-4 max-md:h-4" />
          </div>
        ) : (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ scale: 1, x: -200, width: "200px", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white rounded-full shadow-sm overflow-hidden h-10 max-lg:hidden flex items-center"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full px-2 py-1 outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
            <button
              type="submit"
              className="px-2 py-1 text-white bg-blue-500 rounded"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleSearchBlur}
              className="px-2  py-1"
            >
              <FaTimes className=" cursor-pointer text-black" />
            </button>
          </motion.form>
        )}

        <div
          className="ml-16 bg-white p-4 rounded-full hover:bg-secondary  transition-all duration-300 ease-in-out shadow-sm relative"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <FaRegUser className="w-5 h-5 max-md:w-4 hover:text-white max-md:h-4 cursor-pointer" />
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 flex-center bg-white rounded shadow-lg z-50">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/sign-in">Sign In</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/sign-up">Sign Up</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
