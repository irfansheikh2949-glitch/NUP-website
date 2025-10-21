// pages/AboutPage.tsx
import React from 'react';

interface AboutPageProps {
  onQuoteClick: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onQuoteClick }) => {
  return (
    <section id="about-page" className="py-20 px-6 min-h-screen pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-6xl text-cyan-700 mb-2" style={{ fontFamily: "'Rouge Script', cursive" }}>Our Story Since 1983</h2>
          <p className="text-lg text-gray-600">A Legacy of Trust, Quality & Innovation</p>
        </div>

        {/* Founder and CEO Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
          <div className="text-center">
            <img 
              src="https://storage.googleapis.com/gemini-prod/images/4097a82b-58a8-43d9-b248-22340b07788a" 
              alt="Founder - Mr. Mohamad Ishak Khan" 
              loading="lazy"
              className="rounded-full w-48 h-48 object-cover mx-auto shadow-xl border-4 border-white"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Mr. Mohamad Ishak Khan</h3>
            <p className="text-md text-gray-500">Founder</p>
          </div>
          <div className="text-center">
            <img 
              src="https://storage.googleapis.com/gemini-prod/images/c2fc167c-d6b3-4c4c-a3c3-3054b11f328a" 
              alt="CEO - Mr. Imran Khan" 
              loading="lazy"
              className="rounded-full w-48 h-48 object-cover mx-auto shadow-xl border-4 border-white"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Mr. Imran Khan</h3>
            <p className="text-md text-gray-500">CEO</p>
          </div>
        </div>

        {/* The Journey Content */}
        <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg text-gray-700 space-y-6 leading-relaxed">
          <div>
            <h3 className="font-bold text-2xl text-cyan-600 mb-2" style={{ fontFamily: "'Rouge Script', cursive" }}>The Beginning: 1983</h3>
            <p>In the heart of Udaipur, a city of lakes and heritage, a visionary entrepreneur—Mr. Mohamad Ishak Khan—planted the seeds of a dream. With a humble printing press and an unwavering belief in the power of print, he founded New United Printers. This was the start of a journey destined to redefine printing services in the region, built on a foundation of hard work and integrity.</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl text-cyan-600 mb-2" style={{ fontFamily: "'Rouge Script', cursive" }}>A Reputation Forged in Quality</h3>
            <p>What began as a modest setup quickly blossomed, earning a reputation for unmatched quality and profound customer satisfaction. Throughout the 1980s and 1990s, the name New United Printers became synonymous with reliable craftsmanship and timely service. Each project, big or small, was treated as a work of art, a testament to our dedication to excellence.</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl text-cyan-600 mb-2" style={{ fontFamily: "'Rouge Script', cursive" }}>A New Era of Innovation</h3>
            <p>As the world of print evolved, so did we. Embracing the winds of change, the next generation of leadership took the helm. Mr. Imran Khan, son of the founder, stepped in with a bold vision: to transform the traditional press into a modern printing powerhouse. He infused the company with new energy, integrating cutting-edge technology while honoring the legacy of craftsmanship that defined our past.</p>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-20 text-center">
          <h2 className="text-6xl text-cyan-700 mb-4" style={{ fontFamily: "'Rouge Script', cursive" }}>Get In Touch</h2>
          <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-2xl">
              <p className="text-lg mb-6 text-gray-700">Ready to start your next project? We are here to bring your vision to print.</p>
              <p className="text-gray-600"><strong>Address:</strong> Plot No 2, Near Patel Hostel, Shobhagpura, Udaipur -313001</p>
              <p className="text-gray-600"><strong>Mobile:</strong> 9829433936</p>
              <p className="text-gray-600"><strong>Email:</strong> United.313001@gmail.com</p>
              <p className="text-gray-600"><strong>GST No:</strong> 08ACEPM2479F1ZI</p>
              <button onClick={onQuoteClick} className="mt-8 bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 cursor-pointer">Request a Quote Online</button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;