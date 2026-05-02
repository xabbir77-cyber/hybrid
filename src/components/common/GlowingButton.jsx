import React from 'react';

const GlowingButton = ({ children, className = "", onClick }) => (
    <button 
        onClick={onClick} 
        className={`relative group overflow-hidden rounded-xl font-bold transition-all ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative flex items-center justify-center gap-2 px-4 py-2 text-white">
            {children}
        </div>
    </button>
);

export default GlowingButton;
