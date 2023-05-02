import React from 'react';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 p-3 flex justify-between items-center">
      {/* Your logo or app name */}
      <a href="/" className="text-xl font-bold">
        Habit Tracker!
      </a>
      {/* Logout Button */}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
