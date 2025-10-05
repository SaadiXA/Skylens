
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center w-full max-w-7xl p-4 bg-black/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        </div>
        <span className="text-2xl font-bold text-white text-glow">Skylens</span>
      </div>
      <p className="hidden sm:block text-sm text-blue-200">AI-Powered Atmospheric Insights</p>
    </header>
  );
};

export default Header;
