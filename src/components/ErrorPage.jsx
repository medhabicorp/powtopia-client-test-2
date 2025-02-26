import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/pet404.jpg";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      {/* Cover Image */}
      <img
        src={errorImg}
        alt="Lost Pet"
        className="w-full max-w-md h-auto rounded-xl shadow-lg mb-8 object-cover"
      />

      {/* Error Message */}
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 animate-bounce">
        Uh-oh! Page Not Found.
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        It seems you've wandered off the beaten path. Let's get you back home!
      </p>

      {/* Home Button */}
      <Link to="/">
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
