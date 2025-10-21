
import React, { useState } from 'react';
import { ServiceCategory } from '../../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceList: ServiceCategory[];
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, serviceList }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        // In a real application, this would trigger an API call to a backend service.
        console.log("Quote Request:", formData); 
        setIsSubmitted(true); 
    };
    const handleClose = () => { 
        onClose(); 
        setTimeout(() => { 
            setIsSubmitted(false); 
            setFormData({ name: '', email: '', phone: '', service: '' }); 
        }, 300); 
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full relative">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
                {!isSubmitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-cyan-600 mb-2">Request a Quote</h2>
                        <p className="text-gray-600 mb-6">Fill out your details and we'll get back to you shortly.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/></div>
                            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/></div>
                            <div><label htmlFor="service" className="block text-sm font-medium text-gray-700">Service of Interest (Optional)</label><select name="service" id="service" onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"><option value="">Select a service...</option>{serviceList.map(service => (<optgroup key={service.name} label={service.name}>{service.subServices.map(sub => (<option key={sub.name} value={sub.name}>{sub.name}</option>))}</optgroup>))}</select></div>
                            <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors cursor-pointer">Submit Request</button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-cyan-600 mb-2">Thank You!</h2>
                        <p className="text-gray-700">Your quote request has been received. Our representative will connect with you shortly.</p>
                        <button onClick={handleClose} className="mt-6 bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors cursor-pointer">Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteModal;
