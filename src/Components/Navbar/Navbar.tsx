import { JSX, SetStateAction, useEffect, useState } from "react";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTv } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isDarkMode, setIsDarkMode] = useState(true); // For dark mode
  const [inputValue, setInputValue] = useState(""); // For search input
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Movies",
    link: "/searchMovies",
  }); // For selected category
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For category dropdown

  // Categories array
  const categories = [
    { name: "Movies", icon: <BiCameraMovie />, link: "/searchMovies" },
    { name: "TV Series", icon: <BsTv />, link: "/searchSeries" },
  ];

  // Handle input change
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category: {
    name: string;
    icon: JSX.Element;
    link: string;
  }) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Initialize theme on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
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
          <Link to="">
            <h1 className="text-2xl cursor-pointer font-bold">MoviePulse</h1>
          </Link>

          {/* Search Input with Dropdown */}
          <div className="relative flex-grow max-w-xl lg:w-96 xl:w-[50rem]">
            <div className="relative">
              <input
                type="search"
                placeholder={`Search ${selectedCategory.name.toLowerCase()}...`}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                onChange={handleInputChange}
                value={inputValue}
              />
              {/* Dropdown Icon */}
              <div
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaCaretDown size={20} />
              </div>
              {/* Search Icon */}
              <Link
                to={inputValue ? `${selectedCategory.link}/${inputValue}` : "#"}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 ${
                  inputValue
                    ? "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "text-gray-600  cursor-not-allowed"
                } rounded-lg`}
              >
                <FaSearch size={20} />
              </Link>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links & Theme Toggle */}
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-8 text-lg font-medium">
              <Link
                to="/Movies"
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                Movies
              </Link>

              <Link
                to="/Series"
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                TV Series
              </Link>
              <li
                className="relative cursor-pointer text-gray-700 dark:text-white hover:text-blue-500 
              before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] 
              before:bg-blue-600 before:transition-all before:duration-300 
              hover:before:w-full hover:before:left-0"
              >
                Watchlist
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
              className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden z-50 px-5 py-7 flex justify-between items-center bg-white dark:bg-gray-900 dark:text-white shadow-md transition-colors">
        <Link to="">
          <h1 className="text-2xl cursor-pointer font-bold">MoviePulse</h1>
        </Link>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1"
          aria-label="Toggle mobile menu"
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
          {/* Mobile Search with Dropdown */}
          <div className="flex justify-center">
            <div className="relative w-11/12 max-w-md">
              <input
                type="search"
                placeholder={`Search ${selectedCategory.name.toLowerCase()}...`}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                onChange={handleInputChange}
                value={inputValue}
              />
              {/* Dropdown Icon */}
              <div
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaCaretDown size={20} />
              </div>
              {/* Search Icon */}
              <Link
                to={inputValue ? `${selectedCategory.link}/${inputValue}` : "#"}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 ${
                  inputValue
                    ? "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "text-gray-600  cursor-not-allowed"
                } rounded-lg`}
              >
                <FaSearch size={20} />
              </Link>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleCategorySelect(category)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col items-center gap-4 pt-6 text-lg font-medium">
            <Link to="/Movies" className="hover:text-blue-500 cursor-pointer">
              Movies
            </Link>
            <Link to="/Series" className="hover:text-blue-500 cursor-pointer">
              TV Series
            </Link>
            <li className="hover:text-blue-500 cursor-pointer">Watchlist</li>
            <li className="text-red-500 hover:text-red-700 cursor-pointer">
              Logout
            </li>
          </ul>

          {/* Dark Mode Toggle Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label=" Toggle dark mode"
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
