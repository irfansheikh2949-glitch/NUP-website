
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-6 text-center text-gray-500 border-t border-gray-200">
      <p>&copy; {new Date().getFullYear()} New United Printers. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
