import React from 'react';
import { CircleUser, Search } from 'lucide-react';
import logo from '../assets/logo_mantran.png';

const Header = ({ doLogin, onSearchClick, onSearchChange }) => {
  return (
    <header className="bg-red-700 text-white px-8 py-3 sticky top-0 z-50 h-[70px] flex items-center shadow-lg">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img 
            id="logo_mantran" 
            src={logo} 
            alt="Logo Mantran" 
            className="h-[50px] w-auto"
          />
        </div>

        <div className="flex items-center">
          <div 
            onClick={onSearchClick}
            className="relative mr-6 cursor-pointer group"
          >
            <div className="bg-white/10 border border-white/20 rounded-full py-2 px-4 pr-10 text-white/60 transition-all w-60 group-hover:bg-white/20 flex items-center">
              <span>Buscar...</span>
            </div>
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
              size={20}
            />
          </div>

          <div className="flex items-center justify-center">
            <CircleUser
              className="cursor-pointer transition-transform hover:scale-110"
              size={36}
              strokeWidth={2}
              onClick={doLogin}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
