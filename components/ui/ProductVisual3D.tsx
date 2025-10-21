import React, { useRef } from 'react';
import { ServiceItem } from '../../types';

interface ProductVisual3DProps {
  item: ServiceItem;
}

const ProductVisual3D: React.FC<ProductVisual3DProps> = ({ item }) => {
    const visualRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!visualRef.current) return;
        const rect = visualRef.current.getBoundingClientRect();
        const x = (e.clientY - rect.top - rect.height / 2) / -25;
        const y = (e.clientX - rect.left - rect.width / 2) / 25;
        visualRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    };

    const handleMouseLeave = () => {
         if (!visualRef.current) return;
        visualRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    const renderVisual = () => {
        const frontFaceClasses = "absolute w-full h-full flex items-center justify-center text-center p-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl";
        
        switch (item.type) {
            case 'letterhead':
                return (
                    <div className="relative w-40 h-56" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-black/10 rounded-lg" style={{ transform: 'translateZ(-5px) rotateX(5deg) rotateY(-5deg)', filter: 'blur(8px)' }}></div>
                        <div className={`${frontFaceClasses} flex-col items-start p-6 rounded-lg`} style={{ transform: 'translateZ(1px)' }}>
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-full mb-6"></div>
                            <div className="w-3/4 h-2.5 bg-gray-200 rounded-full mb-3"></div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full mb-3"></div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full mb-3"></div>
                            <div className="w-1/2 h-2.5 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                );
            case 'envelope':
                return (
                     <div className="relative w-52 h-36" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-gray-50 border border-gray-200/80 rounded-md" style={{ transform: 'translateZ(-1px)' }}></div>
                        <div className="absolute w-full h-full bg-gray-200/90 rounded-md" style={{ transform: 'translateZ(-2px)' }}>
                             <div className="absolute w-[102%] h-[55%] -top-[1px] -left-[1%] origin-top bg-gradient-to-b from-white to-gray-200 border-b-2 border-gray-300" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 90%)', transform: 'translateZ(2px)' }}></div>
                        </div>
                        <div className={`${frontFaceClasses} w-full h-full rounded-md`}></div>
                    </div>
                );
            case 'notepad':
                return (
                    <div className="relative w-40 h-56" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-gray-700 rounded-lg" style={{ transform: 'translateZ(-20px)' }}></div>
                        {Array.from({ length: 12 }).map((_, i) => (
                             <div key={i} className="absolute w-full h-full bg-white border-b border-gray-200/50 rounded-lg" style={{ transform: `translateZ(${i * -1.5}px)` }}></div>
                        ))}
                        <div className={`${frontFaceClasses} bg-yellow-50/95 rounded-lg p-6 items-start justify-start`} style={{ transform: 'translateZ(1px)'}}>
                            <div className="w-full h-3 bg-red-400/80 mb-5 rounded-full"></div>
                             {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="w-full h-2 bg-blue-300/70 mb-3 rounded-full"></div>
                             ))}
                        </div>
                         <div className="absolute -left-4 top-0 h-full w-4" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)'}}>
                             {Array.from({ length: 12 }).map((_, i) => (
                                 <div key={i} className="absolute w-9 h-4 bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-gray-500 rounded-full" style={{ left: '-10px', top: `${(i * 1.2) + 0.8}rem`, transform: 'rotateX(90deg) rotateY(0deg) translateZ(-10px)', boxShadow: '0 2px 3px rgba(0,0,0,0.3)' }}></div>
                             ))}
                         </div>
                    </div>
                );
            case 'folder':
                 return (
                    <div className="relative w-44 h-60 group" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-cyan-800/90 rounded-lg shadow-inner" style={{transform: 'translateZ(-2px)'}}></div>
                        <div className="absolute bottom-0 left-0 w-[55%] h-1/3 bg-cyan-700/80 rounded-tr-3xl border-t-2 border-l-2 border-white/20" style={{ transform: 'translateZ(-1px)'}}></div>
                        <div className="absolute w-full h-full bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-r-lg origin-left transition-transform duration-500 ease-in-out group-hover:rotate-Y-[-65deg] shadow-2xl" style={{ transform: 'rotateY(-20deg)' }}>
                             <div className="w-16 h-16 bg-white/20 rounded-full absolute top-8 left-8"></div>
                             <h3 className="absolute bottom-8 right-8 text-white font-bold text-xl [text-shadow:1px_1px_3px_rgba(0,0,0,0.2)]">{item.name}</h3>
                        </div>
                    </div>
                 );
            case 'book':
                 return (
                    <div className="relative w-40 h-56" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-black/20 rounded-lg" style={{ transform: 'translateZ(-15px) rotateX(10deg) rotateY(-5deg)', filter: 'blur(15px)' }}></div>
                        <div className="absolute w-[96%] h-[97%] top-[1.5%] left-[2%]" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-1px)' }}>
                            <div className="absolute w-full h-full" style={{ transform: 'rotateY(90deg) translateZ(182px) translateX(10px)', backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #E0E0E0, #FFFFFF)' }}></div>
                            <div className="absolute w-full h-[102%] bg-gray-100" style={{ transform: 'rotateX(-90deg) translateZ(213px) translateY(10px)' }}></div>
                            {Array.from({ length: 15 }).map((_, i) => (
                                 <div key={i} className="absolute w-full h-full bg-white rounded-r-sm" style={{ boxShadow: 'inset -2px 0 5px -3px rgba(0,0,0,0.15)', transform: `translateZ(${i * -1}px)` }}></div>
                            ))}
                        </div>
                        <div className="absolute w-full h-full bg-blue-800 rounded-md" style={{ transform: `translateZ(-15px)`}}></div>
                        <div className="absolute w-8 h-full bg-blue-900 -left-4 rounded-l-md" style={{ transform: 'rotateY(-90deg) translateZ(0px) translateX(-15px)'}}>
                            <div className="w-full h-full flex flex-col items-center justify-between py-8" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.4))'}}>
                                <span className="text-white/50 text-xs transform -rotate-90">Printers</span>
                                <span className="text-white font-bold transform -rotate-90 tracking-widest">{item.name}</span>
                                <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                        <div className={`${frontFaceClasses} bg-gradient-to-br from-blue-500 to-blue-700 text-white flex-col justify-between p-6 rounded-md`} style={{ transform: 'translateZ(1px)' }}>
                            <h3 className="font-bold text-2xl [text-shadow:1px_1px_3px_rgba(0,0,0,0.3)]">{item.name}</h3>
                            <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                            <p className="text-sm font-semibold">New United Printers</p>
                        </div>
                    </div>
                );
            case 'paperbag':
                 return (
                    <div className="relative w-44 h-52" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full bg-amber-100" style={{ transform: 'translateZ(22px)' }}>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-800 text-3xl" style={{fontFamily:"'Rouge Script', cursive"}}>NUP</div>
                             <div className="absolute w-full h-0.5 bg-black/10 top-10"></div>
                             <div className="absolute h-full w-0.5 bg-black/10 left-10"></div>
                             <div className="absolute h-full w-0.5 bg-black/10 right-10"></div>
                        </div>
                        <div className="absolute w-10 h-full bg-amber-200/90 -left-5" style={{ transform: 'rotateY(-90deg) translateX(-22px)'}}></div>
                         <div className="absolute w-44 h-10 bg-amber-200/90 -top-5" style={{ transform: 'rotateX(90deg) translateY(-22px)'}}></div>
                         <div className="absolute -top-10 left-10 w-12 h-20 border-4 border-gray-600 rounded-full border-b-transparent border-l-transparent" style={{ transform: 'translateZ(22px) rotate(45deg)'}}></div>
                         <div className="absolute -top-10 right-10 w-12 h-20 border-4 border-gray-600 rounded-full border-b-transparent border-r-transparent" style={{ transform: 'translateZ(22px) rotate(-45deg)'}}></div>
                    </div>
                );
            default: // Represents Business Cards / Flyers
                return (
                    <div className="relative w-48 h-32" style={{ transformStyle: 'preserve-3d' }}>
                         <div className="absolute w-full h-full bg-black/10 rounded-xl" style={{ transform: 'translateZ(-15px) rotateX(10deg)', filter: 'blur(10px)' }}></div>
                         {Array.from({ length: 15 }).map((_, i) => (
                             <div key={i} className="absolute w-full h-full bg-white rounded-lg shadow-sm border border-gray-200/50" style={{ transform: `translateZ(${i * -1}px) rotateX(${i*0.2}deg) translateY(${i*0.2}px)` }}></div>
                         ))}
                        <div className={`${frontFaceClasses} flex-col justify-between items-start p-4 rounded-lg`} style={{ transform: 'translateZ(1px)'}}>
                            <div className='w-full'>
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-full mb-2"></div>
                                <h3 className="font-bold text-gray-700 text-left">{item.name}</h3>
                            </div>
                            <div className='w-full text-right'>
                                <div className="w-3/4 h-1.5 bg-gray-200 rounded-full mb-1 ml-auto"></div>
                                <div className="w-1/2 h-1.5 bg-gray-200 rounded-full ml-auto"></div>
                            </div>
                        </div>
                    </div>
                );
        }
    };
    
    return (
         <div 
            className="w-full h-64 flex items-center justify-center cursor-pointer"
            style={{ perspective: '1200px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
         >
            <div
                ref={visualRef}
                className="relative transition-transform duration-200 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {renderVisual()}
            </div>
        </div>
    );
};

export default ProductVisual3D;
