import logo from "../../../../public/icon.webp";
import { memo } from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-5 pb-10 m-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Movie Pulse Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
              Movie Pulse
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <a
                href="#"
                className="hover:underline text-lg font-medium text-blue-700 dark:text-blue-400 me-4 md:me-6 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
              >
                Subscribe
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-600 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a
            href="/"
            className="hover:underline text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            MoviePulse
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default memo(Footer);
