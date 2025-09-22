import React, { useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const DigitalTrendsSection: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Email submitted:', email);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/150?text=Book';
  };

  const openBookUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Open_book_2.svg';
  const closedBookUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Book_font_awesome.svg';

  return (
    <section className="relative overflow-hidden py-28 px-6 md:px-20 bg-gradient-to-r from-purple-950 via-purple-950 to-blue-950 text-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-20">
        {/* Text content */}
        <div className="text-center md:text-left md:max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Stay Ahead in 2025!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 drop-shadow-md">
            Discover the top digital trends shaping branding & web design, and stay ahead of the competition.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-6 py-4 rounded-l-2xl bg-purple-900 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 shadow-lg transition-all hover:scale-105 transform"
              required
            />
            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 font-bold rounded-r-2xl hover:scale-110 transform transition-all shadow-xl flex items-center justify-center gap-2"
            >
              DOWNLOAD <FiArrowDown className="text-xl" />
            </button>
          </form>

          {submitted && (
            <div className="text-green-400 font-semibold mt-2 animate-pulse">
              Thank you! Check your email for the download.
            </div>
          )}

          <div className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-6 py-3 rounded-full font-medium mt-4 hover:scale-105 transform transition-all shadow-lg">
            Digital Trends Guide
          </div>
        </div>

        {/* Book images */}
        <div className="relative flex justify-center md:justify-end items-center gap-8">
          <img
            src={closedBookUrl}
            alt="Closed Book"
            className="w-28 md:w-36 animate-bounce-slow drop-shadow-2xl hover:rotate-6 transform transition-all"
            onError={handleImageError}
          />
          <img
            src={openBookUrl}
            alt="Open Book"
            className="w-32 md:w-44 rotate-6 animate-float drop-shadow-3xl hover:rotate-12 transform transition-all"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Decorative blurred circles and gradient shapes */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-800 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -top-16 -right-32 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-2xl animate-pulse"></div>

      {/* Subtle background numbers */}
      <div className="absolute -top-16 -left-16 text-[10rem] font-bold opacity-10 select-none pointer-events-none">20</div>
      <div className="absolute -bottom-16 -right-16 text-[10rem] font-bold opacity-10 select-none pointer-events-none">25</div>
    </section>
  );
};

export default DigitalTrendsSection;