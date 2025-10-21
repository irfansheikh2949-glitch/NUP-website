

import React from 'react';
import { ServiceCategory } from '../types';
import ProductVisual3D from '../components/ui/ProductVisual3D';

interface ServiceShowcasePageProps {
  service: ServiceCategory;
  onBack: () => void;
}

const ServiceShowcasePage: React.FC<ServiceShowcasePageProps> = ({ service, onBack }) => (
    <section id="service-showcase" className="py-20 px-6 min-h-screen pt-32">
        <div className="max-w-6xl mx-auto">
            <div className="relative mb-12">
                <h2 className="text-4xl font-bold text-center text-cyan-600">{service.name}</h2>
                <button onClick={onBack} className="absolute -top-2 left-0 text-cyan-600 hover:text-cyan-700 text-lg transition-colors flex items-center group cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Services
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {service.subServices.map((item, index) => (
                    <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center justify-start p-4">
                        <div className="w-full">
                            <ProductVisual3D item={item} />
                        </div>
                        <h3 className="font-bold text-gray-800 text-center text-lg mt-2">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ServiceShowcasePage;
