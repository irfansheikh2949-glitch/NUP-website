import React from 'react';
import Logo3D from '../ui/Logo3D';

interface HeaderProps {
    isScrolled: boolean;
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchFocus: () => void;
    onNavigate: (page: string) => void;
    onNavigateToContact: () => void;
}

// Helper component for multicolor text, mirroring the logo's style
const MulticolorText: React.FC<{text: string}> = ({ text }) => {
    const textColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#AB47BC', '#FF6D00'];
    return (
        <>
            {text.split('').map((char, i) => (
                <span key={i} style={{ color: textColors[i % textColors.length] }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </>
    );
};


const Header: React.FC<HeaderProps> = ({ isScrolled, searchTerm, onSearchChange, onSearchFocus, onNavigate, onNavigateToContact }) => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div onClick={() => onNavigate('home')} className="flex items-center space-x-3 cursor-pointer">
                <Logo3D size="small" />
            </div>
            <div className="flex-1 flex justify-center px-8">
                <div className="relative w-full max-w-md">
                   <input 
                        type="search" 
                        placeholder="Search all services..." 
                        value={searchTerm} 
                        onFocus={onSearchFocus} 
                        onChange={onSearchChange} 
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100/80 border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    />
                   <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
                <a onClick={() => onNavigate('home')} className="nav-link text-xl cursor-pointer font-semibold">
                    <MulticolorText text="Home" />
                </a>
                <a onClick={() => onNavigate('services')} className="nav-link text-xl cursor-pointer font-semibold">
                    <MulticolorText text="Services" />
                </a>
                <a onClick={() => onNavigate('about')} className="nav-link text-xl cursor-pointer font-semibold">
                    <MulticolorText text="About Us" />
                </a>
                <a onClick={onNavigateToContact} className="nav-link text-xl cursor-pointer font-semibold">
                    <MulticolorText text="Contact" />
                </a>
            </nav>
        </header>
    );
};

export default Header;