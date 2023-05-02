import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
