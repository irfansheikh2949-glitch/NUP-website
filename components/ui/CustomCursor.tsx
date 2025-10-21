
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${posX}px`;
                cursorDotRef.current.style.top = `${posY}px`;
            }

            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        const handleMouseEnter = (e: MouseEvent) => {
            if ((e.target as Element).closest('a, button, .cursor-pointer')) {
                if (cursorOutlineRef.current) {
                    cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutlineRef.current.style.borderColor = '#F4B400';
                }
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
             if ((e.target as Element).closest('a, button, .cursor-pointer')) {
                if (cursorOutlineRef.current) {
                    cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutlineRef.current.style.borderColor = '#06b6d4';
                }
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className="fixed w-3 h-3 bg-cyan-500 rounded-full z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" style={{ mixBlendMode: 'difference' }}></div>
            <div ref={cursorOutlineRef} className="fixed w-10 h-10 border-2 border-cyan-500 rounded-full z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform,border-color duration-200"></div>
        </>
    );
};

export default CustomCursor;
