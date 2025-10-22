import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
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
    const [chat, setChat] = useState<Chat | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }, [messages]);

    useEffect(() => {
      const initializeChat = () => {
          try {
              const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

              const serviceDetails = serviceList.map(category => 
                  `- ${category.name}: ${category.desc} Includes: ${category.subServices.map(s => s.name).join(', ')}.`
              ).join('\n');

              const systemInstruction = `You are a friendly and helpful AI assistant for New United Printers. Your name is NUP Copilot.
              Your goal is to answer questions about the company's printing services and help users find what they need.
              Be concise and friendly.
              If asked about pricing or a quote, you MUST direct the user to click the "Get a Free Quote" button.
              If asked for contact details, provide: Address: Plot No 2, Near Patel Hostel, Shobhagpura, Udaipur -313001, Mobile: 9829433936, Email: United.313001@gmail.com.
              
              Here is a list of our services:
              ${serviceDetails}
              
              Do not answer questions that are not related to New United Printers or its printing services.`;

              const chatSession = ai.chats.create({
                  model: 'gemini-2.5-flash',
                  config: {
                    systemInstruction,
                  },
                });
              setChat(chatSession);
          } catch (error) {
              console.error("Failed to initialize Gemini chat:", error);
              setMessages(prev => [...prev, {id: Date.now(), text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot'}]);
          }
      };

      initializeChat();
  }, [serviceList]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!inputValue.trim() || isTyping || !chat) return;

        const userMessageText = inputValue;
        const userMessage: Message = { id: Date.now(), text: userMessageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]); 
        setInputValue(''); 
        setIsTyping(true);
        
        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);

        try {
            const response = await chat.sendMessageStream({ message: userMessageText });

            for await (const chunk of response) {
                setMessages(prev => prev.map(msg => 
                    msg.id === botMessageId 
                        ? { ...msg, text: msg.text + chunk.text }
                        : msg
                ));
            }

        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId 
                    ? { ...msg, text: "Sorry, something went wrong. Please try again." }
                    : msg
            ));
        } finally {
            setIsTyping(false);
        }
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
                                {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                            </div>
                        </div>
                    ))}
                    {isTyping && messages[messages.length-1]?.sender === 'user' && (
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