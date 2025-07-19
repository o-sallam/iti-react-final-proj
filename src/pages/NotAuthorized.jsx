import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 text-title-md font-bold text-gray-800 dark:text-white/90 xl:text-title-2xl">
          NOT AUTHORIZED
        </h1>
        <div className="flex justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <rect width="100%" height="100%" rx="60" fill="#e5e7eb" className="dark:fill-gray-800" />
            <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-7V8a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2ZM8 8a4 4 0 1 1 8 0v2H8V8Zm10 10H6v-6h12v6Z" fill="#667085" className="dark:fill-gray-400" />
          </svg>
        </div>
        <p className="mb-6 mt-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          You are not authorized to view this page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Back to Home Page
        </Link>
      </div>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - المحيط
      </p>
    </div>
  );
};

export default NotAuthorized; 