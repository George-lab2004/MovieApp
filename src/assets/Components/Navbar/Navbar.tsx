import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default: Dark Mode

  // Initialize theme on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      // Default to dark mode
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Apply theme to the document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Handle theme toggle
  const handleToggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <nav className="flex justify-between items-center px-12 py-5 shadow-md bg-white dark:bg-gray-900 dark:text-white transition-colors">
          <h1 className="text-2xl font-bold">MoviePulse</h1>

          {/* Search Input */}
          <div className="relative flex-grow max-w-xl lg:w-96 xl:w-[50rem]">
            <input
              type="search"
              placeholder="Search movies..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <FaSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              size={20}
            />
          </div>

          {/* Navigation Links & Theme Toggle */}
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-8 text-lg font-medium">
              <li
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                Movies
              </li>

              <li
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                TV Series
              </li>
              <li
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                Watchlist
              </li>
              <li
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                Favourites
              </li>
              <li
                className="text-red-500 hover:text-red-700 cursor-pointer 
relative before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] before:bg-red-500 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0"
              >
                Logout
              </li>
            </ul>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden z-50 px-5 py-7 flex justify-between items-center bg-white dark:bg-gray-900 dark:text-white shadow-md transition-colors">
        <h1 className="text-xl font-bold">MoviePulse</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1"
        >
          <span
            className={`bg-gray-800 dark:bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`bg-gray-800 dark:bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`bg-gray-800 dark:bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden z-50 absolute top-20 left-0 w-full bg-white dark:bg-gray-900 dark:text-white shadow-md transition-all duration-300 ease-in-out p-5">
          <div className="flex justify-center">
            <div className="relative w-11/12 max-w-md">
              <input
                type="search"
                placeholder="Search movies..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 z-50 rounded-full outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <FaSearch
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col items-center  gap-4 pt-6 text-lg font-medium">
            <li className="hover:text-blue-500 cursor-pointer">Movies</li>
            <li className="hover:text-blue-500 cursor-pointer">TV Series</li>
            <li className="hover:text-blue-500 cursor-pointer">Watchlist</li>
            <li className="hover:text-blue-500 cursor-pointer">Favourites</li>
            <li className="text-red-500 hover:text-red-700 cursor-pointer">
              Logout
            </li>
          </ul>

          {/* Dark Mode Toggle Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
