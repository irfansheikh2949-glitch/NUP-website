import React from 'react';

// Define the shape of our floating image objects
interface FloatingImage {
    url: string;
    alt: string;
    maxWidth: number;
}

// A curated list of high-quality, relevant product images.
const floatingImages: FloatingImage[] = [
    { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop', alt: 'Open story book', maxWidth: 250 },
    { url: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?q=80&w=800&auto=format&fit=crop', alt: 'Spiral notebook with pen', maxWidth: 260 },
    { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop', alt: 'Workstation with a stack of books', maxWidth: 270 },
    { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', alt: 'Stack of school books', maxWidth: 270 },
    { url: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=800&auto=format&fit=crop', alt: 'Person writing in a diary', maxWidth: 260 },
];


const FloatingProducts: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {floatingImages.map((item, index) => {
                const duration = Math.random() * 25 + 35; // Animation duration between 35s and 60s
                const delay = Math.random() * -60; // Negative delay to start animations at different times
                const top = Math.random() * 90; // Vertical position between 0% and 90%
                const scale = Math.random() * 0.6 + 0.7; // Random scale between 70% and 130%

                return (
                    <div
                        key={`${item.alt}-${index}`}
                        className="absolute will-change-transform"
                        style={{
                            top: `${top}%`,
                            right: `-${item.maxWidth + 150}px`, // Start off-screen
                            animation: `float-right-to-left ${duration}s ${delay}s linear infinite`,
                        }}
                    >
                        <img
                            src={item.url}
                            alt={item.alt}
                            loading="lazy"
                            className="rounded-lg shadow-xl"
                            style={{
                                transform: `scale(${scale})`,
                                opacity: 0.75,
                                maxWidth: `${item.maxWidth}px`,
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingProducts;