import { useState } from "react";
import { FaRegUser, FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { logoImg } from "../utils/index";
import { navList } from "../constants";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearchBlur = () => {
    setIsSearchVisible(false);
  };

  return (
    <header className="flex justify-between items-center bg-primary p-4">
      <Link to="/">
        <img src={logoImg} alt="logo" className="max-w-32 max-h-32" />
      </Link>

      <nav className="flex max-md:hidden">
        <ul className="flex-center w-full h-full py-4 px-12  [nth-child(1)]:text-secondary">
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
            className="mx-2 bg-white p-4 rounded-sm hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out shadow-sm cursor-pointer max-lg:hidden"
            onClick={handleSearchClick}
          >
            <FaSearch className="w-5 h-5 max-md:w-4 max-md:h-4" />
          </div>
        ) : (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ scale: 1, x: -200, width: "200px", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white rounded shadow-sm overflow-hidden h-10 max-lg:hidden"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full px-2 py-1 outline-none"
              onBlur={handleSearchBlur}
            />
          </motion.div>
        )}

        <div className="ml-16 bg-white p-4 rounded-sm hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out shadow-sm">
          <FaRegUser className="w-5 h-5 max-md:w-4 max-md:h-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
