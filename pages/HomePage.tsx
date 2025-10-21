import React from 'react';
import Logo3D from '../components/ui/Logo3D';
import FloatingProducts from '../components/ui/FloatingProducts';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onQuoteClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuoteClick }) => (
    <>
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <FloatingProducts />
          <div className="relative z-10 bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg">
            <Logo3D size="large" />
            <p className="text-2xl md:text-3xl mt-8 max-w-2xl text-cyan-700 font-semibold tracking-widest [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]">Ideas in Print</p>
            <p className="text-xl md:text-2xl mt-2 max-w-2xl text-gray-800 font-medium [text-shadow:1px_1px_3px_rgba(0,0,0,0.1)]">Comprehensive printing solutions in Udaipur since 1983.</p>
            <button onClick={onQuoteClick} className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 cursor-pointer">Get a Free Quote</button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4 text-center text-cyan-600">Our Services</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">From business cards to large format banners, we offer a complete range of printing services to meet your needs. Explore our categories to find the perfect solution.</p>
            <button onClick={() => onNavigate('services')} className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 cursor-pointer">View All Services</button>
          </div>
        </section>
    </>
);

export default HomePage;