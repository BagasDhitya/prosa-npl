import React from "react";

const BottomNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-900 rounded-lg shadow-md mx-96 my-10">
      <ul className="flex justify-around py-4 px-8">
        <li>
          <a href="/" className="font-bold text-gray-200 hover:text-white">
            Home
          </a>
        </li>
        <li>
          <a
            href="/setting"
            className="font-bold text-gray-200 hover:text-white"
          >
            Setting
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavbar;
