import React, { useRef } from 'react';

interface Logo3DProps {
  size?: 'large' | 'small';
}

const Logo3D: React.FC<Logo3DProps> = ({ size = 'large' }) => {
    const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#FF6D00'];
    const textColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#4285F4'];
    
    const sizeClasses = {
        large: { flower: 'w-40 h-40', petal: 'w-16 h-16', centerText: 'text-7xl', mainText: 'text-5xl mt-4', shadowLayers: 5 },
        small: { flower: 'w-20 h-20', petal: 'w-8 h-8', centerText: 'text-4xl', mainText: 'text-3xl mt-2', shadowLayers: 3 }
    };
    const currentSize = sizeClasses[size];
    
    const textShadow = Array.from({ length: currentSize.shadowLayers }, (_, i) => `${i + 1}px ${i + 1}px 0px rgba(0,0,0,0.1)`).join(', ');
    
    const logoInnerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!logoInnerRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (size === 'large' ? 10 : 20);
        const y = (e.clientY - rect.top - rect.height / 2) / (size === 'large' ? -10 : -20);
        logoInnerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseLeave = () => {
         if (!logoInnerRef.current) return;
        logoInnerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    return (
        <div className={`flex flex-col items-center justify-center ${size === 'small' ? '' : 'transform-gpu'}`} style={{ perspective: '1000px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div ref={logoInnerRef} className={`${currentSize.flower} relative flex items-center justify-center transition-transform duration-300 ease-out`} style={{ transformStyle: 'preserve-3d' }}>
                {colors.map((color, i) => (
                    <div key={color} className={`absolute ${currentSize.petal} rounded-full`} style={{ background: color, transform: `rotate(${i * 60}deg) translate(${size === 'large' ? '60px' : '30px'}) rotate(-120deg)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'}}/>
                ))}
                <span className={`${currentSize.centerText} font-bold text-gray-800 z-10`} style={{ fontFamily: "'Rouge Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>NUP</span>
            </div>
            <h1 className={`${currentSize.mainText} text-center`} style={{ fontFamily: "'Rouge Script', cursive", textShadow }}>
                {'New United Printers'.split('').map((char, i) => (<span key={i} style={{ color: textColors[i % textColors.length] }}>{char}</span>))}
            </h1>
        </div>
    );
};

export default Logo3D;