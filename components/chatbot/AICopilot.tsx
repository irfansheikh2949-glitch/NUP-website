
import React, { useState, useEffect, useRef } from 'react';
import { ServiceCategory } from '../../types';

interface AICopilotProps {
  serviceList: ServiceCategory[];
}

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
}

const AICopilot: React.FC<AICopilotProps> = ({ serviceList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ id: 1, text: "Hello! How can I help you with your printing needs today?", sender: 'bot' }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }, [messages]);

    const getBotResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        for (const category of serviceList) { 
            if (lowerInput.includes(category.name.toLowerCase())) { 
                return `Yes, we offer a wide range of services for ${category.name}. This includes ${category.subServices.slice(0, 3).map(s => s.name).join(', ')}, and more.`; 
            } 
            for (const sub of category.subServices) { 
                if (lowerInput.includes(sub.name.toLowerCase().replace(/ & /g, ' '))) { 
                    return `Absolutely! We specialize in printing high-quality ${sub.name}. You'll find this service listed under the "${category.name}" category.`; 
                } 
            } 
        }
        if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('address')) { 
            return "You can reach us at 9829433936 or visit us at Plot No 2, Near Patel Hostel, Shobhagpura, Udaipur."; 
        }
        return "I can help with questions about our services like 'brochures' or 'stickers'. For pricing or quotes, please use the 'Get a Free Quote' button.";
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!inputValue.trim()) return;
        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]); 
        setInputValue(''); 
        setIsTyping(true);
        setTimeout(() => { 
            const botResponseText = getBotResponse(inputValue); 
            const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]); 
            setIsTyping(false); 
        }, 1500);
    };

    return (
        <>
            <div className={`fixed bottom-24 right-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button onClick={() => setIsOpen(true)} className="bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            </div>
            <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white/80 backdrop-blur-md rounded-xl shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-cyan-600">AI Copilot</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">&times;</button>
                </div>
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-500 rounded-lg px-3 py-2 flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about our services..." 
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-r-md hover:bg-cyan-600 cursor-pointer">Send</button>
                </form>
            </div>
        </>
    );
};

export default AICopilot;
