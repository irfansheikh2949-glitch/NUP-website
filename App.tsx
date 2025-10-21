import React, { useState, useEffect } from 'react';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceShowcasePage from './pages/ServiceShowcasePage';
import AboutPage from './pages/AboutPage';
import QuoteModal from './components/modals/QuoteModal';
import AICopilot from './components/chatbot/AICopilot';
import { serviceList } from './data/serviceData';
import { ServiceCategory, ServiceItemWithCategory } from './types';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const allSubServices: ServiceItemWithCategory[] = serviceList.flatMap(category => 
    category.subServices.map(sub => ({ ...sub, categoryName: category.name }))
  );
  
  const servicesToDisplay = isSearchActive 
    ? allSubServices.filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    : serviceList;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setIsSearchActive(searchTerm.length > 0);
  }, [searchTerm]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (page: string) => {
    setSearchTerm('');
    setIsSearchActive(false);
    setCurrentPage(page);
  };

  const handleNavigateToContact = () => {
    handleNavigate('about');
    setTimeout(() => scrollToSection('contact'), 100);
  }

  const handleServiceClick = (service: ServiceCategory | ServiceItemWithCategory) => {
    const fullServiceData = serviceList.find(s => s.name === ('categoryName' in service ? service.categoryName : service.name));
    if (fullServiceData) {
      setSelectedService(fullServiceData);
      setCurrentPage('showcase');
    }
  };

  const handleBackToServices = () => {
    handleNavigate('services');
  };

  const handleSearchFocus = () => {
    setCurrentPage('services');
    setIsSearchActive(true);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if(!isSearchActive) setIsSearchActive(true);
    if(currentPage !== 'services') setCurrentPage('services');
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
        case 'home':
            return <HomePage onNavigate={handleNavigate} onQuoteClick={() => setIsQuoteModalOpen(true)} />;
        case 'services':
            return <ServicesPage serviceData={servicesToDisplay} onServiceClick={handleServiceClick} isSearchActive={isSearchActive} searchTerm={searchTerm} />;
        case 'showcase':
            if (selectedService) {
                return <ServiceShowcasePage service={selectedService} onBack={handleBackToServices} />;
            }
            // Fallback to services page if no service is selected
            handleNavigate('services');
            return null;
        case 'about':
            return <AboutPage onQuoteClick={() => setIsQuoteModalOpen(true)} />;
        default:
            return <HomePage onNavigate={handleNavigate} onQuoteClick={() => setIsQuoteModalOpen(true)} />;
    }
  }

  return (
    <div className="text-gray-800 font-sans animated-multicolor-bg">
      <CustomCursor />
      <Header 
        isScrolled={isScrolled}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onNavigate={handleNavigate}
        onNavigateToContact={handleNavigateToContact}
      />
      <main>
        {renderCurrentPage()}
      </main>
      <AICopilot serviceList={serviceList} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} serviceList={serviceList} />
      <Footer />
    </div>
  );
}
