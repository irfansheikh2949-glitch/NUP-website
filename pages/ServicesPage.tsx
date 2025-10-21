import React, { useState } from 'react';
import { ServiceCategory, ServiceItemWithCategory } from '../types';

interface ServicesPageProps {
  serviceData: ServiceCategory[] | ServiceItemWithCategory[];
  onServiceClick: (service: ServiceCategory | ServiceItemWithCategory) => void;
  isSearchActive: boolean;
  searchTerm: string;
}

const SearchListView = ({ services, onServiceClick }: { services: ServiceItemWithCategory[], onServiceClick: (service: ServiceItemWithCategory) => void }) => (
     <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
        <ul className="space-y-2">
            {services.map((item, itemIndex) => (
                <li key={itemIndex} onClick={() => onServiceClick(item)} className="p-3 border-b border-gray-200 flex items-center justify-between hover:bg-cyan-50 rounded-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="text-lg text-gray-800 group-hover:text-cyan-600">{item.name}</span>
                    <span className="text-sm text-cyan-600 font-semibold">{item.categoryName}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ExperimentalView = ({ serviceData, onServiceClick }: { serviceData: ServiceCategory[], onServiceClick: (service: ServiceCategory) => void }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const toggleCategory = (categoryName: string) => setOpenCategory(openCategory === categoryName ? null : categoryName);

    return (
        <div className="space-y-4">
            {serviceData.map((category) => (
                <div key={category.name} className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
                    <button onClick={() => toggleCategory(category.name)} className="w-full p-6 text-left flex justify-between items-center cursor-pointer">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
                            <p className="text-gray-600">{category.desc}</p>
                        </div>
                        <svg className={`w-6 h-6 text-cyan-600 transform transition-transform duration-300 ${openCategory === category.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out grid ${openCategory === category.name ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="p-6 border-t border-gray-200">
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {category.subServices.map((item) => (
                                        <li key={item.name} onClick={() => onServiceClick(category)} className="p-3 hover:bg-cyan-50 rounded-md cursor-pointer text-gray-700 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:text-cyan-600">{item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
    
const SimpleListView = ({ services, onServiceClick }: { services: ServiceCategory[], onServiceClick: (service: ServiceCategory) => void }) => (
     <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
        <ul className="space-y-6">
            {services.map((category, catIndex) => (
                <li key={catIndex}>
                    <h3 className="font-bold text-2xl text-gray-800 mb-3 border-b-2 border-cyan-200 pb-2">{category.name}</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1 pl-4">
                        {category.subServices.map((item, itemIndex) => (
                            <li key={itemIndex} className="block p-2 rounded-md text-gray-700 hover:text-cyan-600 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-white/50" onClick={() => onServiceClick(category)}>{item.name}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
);


const ServicesPage: React.FC<ServicesPageProps> = ({ serviceData, onServiceClick, isSearchActive, searchTerm }) => {
    const [viewMode, setViewMode] = useState('experimental');

    return (
        <section id="services-page" className="py-20 px-6 min-h-screen pt-32">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                     <h2 className="text-5xl font-bold text-cyan-600">Our Services</h2>
                    {!isSearchActive && (
                        <div className="flex space-x-2 bg-white/60 backdrop-blur-md p-1 rounded-lg">
                            <button onClick={() => setViewMode('experimental')} className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${viewMode === 'experimental' ? 'bg-cyan-500 text-white' : 'text-gray-600'}`}>Experimental</button>
                            <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-gray-600'}`}>See Full List</button>
                        </div>
                    )}
                </div>
                 <p className="text-gray-600 text-center mt-4 mb-8 max-w-2xl mx-auto">
                    {isSearchActive ? `Showing results for "${searchTerm}"` : "Click on any category to expand the list of services we offer."}
                 </p>
                {isSearchActive ? 
                    <SearchListView services={serviceData as ServiceItemWithCategory[]} onServiceClick={onServiceClick as (service: ServiceItemWithCategory) => void} /> : 
                    (viewMode === 'experimental' ? 
                        <ExperimentalView serviceData={serviceData as ServiceCategory[]} onServiceClick={onServiceClick as (service: ServiceCategory) => void} /> : 
                        <SimpleListView services={serviceData as ServiceCategory[]} onServiceClick={onServiceClick as (service: ServiceCategory) => void} />
                    )
                }
            </div>
        </section>
    );
};

export default ServicesPage;