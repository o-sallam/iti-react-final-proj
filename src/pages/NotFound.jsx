import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../assets/images/error/404.svg';
import error404Dark from '../assets/images/error/404-dark.svg';

const NotFound = () => {
  return (
    <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 bg-gray-50 dark:bg-gray-900">
      {/* Centered Content */}
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 text-title-md font-bold text-gray-800 dark:text-white/90 xl:text-title-2xl">
          ERROR
        </h1>
        <img
          src={error404}
          alt="404"
          className="dark:hidden mx-auto"
        />
        <img
          src={error404Dark}
          alt="404"
          className="hidden dark:block mx-auto"
        />
        <p className="mb-6 mt-10 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          We can’t seem to find the page you are looking for!
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Back to Home Page
        </Link>
      </div>
      {/* Footer */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - المحيط
      </p>
    </div>
  );
};

export default NotFound; 