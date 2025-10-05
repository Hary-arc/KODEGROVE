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
    e.currentTarget.src = 'book.png';
  };

  const openBookUrl = '/books/book-1.png';
  const closedBookUrl = 'book.png';

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 md:px-20 bg-gradient-to-r from-purple-950 via-purple-950 to-blue-950 text-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 sm:gap-20">
        {/* Text content */}
        <div className="text-center md:text-left w-full md:max-w-lg space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Stay Ahead in 2025!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 drop-shadow-md">
            Discover the top digital trends shaping branding & web design, and stay ahead of the
            competition.
          </p>
          <div className="w-full sm:w-auto ">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-grow px-4 py-3 rounded-xl sm:rounded-l-2xl bg-purple-900 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400 shadow-md transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 font-bold rounded-xl sm:rounded-r-2xl hover:scale-105 transform transition-all shadow-lg flex items-center justify-center gap-2"
              >
                DOWNLOAD <FiArrowDown className="text-xl" />
              </button>
            </form>
          </div>
          {submitted && (
            <div className="text-green-400 font-semibold mt-2 animate-pulse">
              Thank you! Check your email for the download.
            </div>
          )}

          <div className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-6 py-3 rounded-full font-medium mt-4 hover:scale-105 transform transition-all shadow-lg">
            Digital Trends Guide
          </div>
        </div>

        {/* Book Images (centered on mobile) */}
        <div className="w-full flex justify-center md:justify-end items-center gap-0">
          <img
            src={closedBookUrl}
            alt="Closed Book"
            className="w-64 sm:w-24 md:w-32 animate-bounce-slow drop-shadow-2xl hover:rotate-2 transition-all"
            onError={handleImageError}
          />
          <img
            src={openBookUrl}
            alt="Open Book"
            className="w-32 sm:w-28 md:w-40 rotate-12 animate-float drop-shadow-3xl hover:rotate-6 transition-all"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-800 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -top-16 -right-32 w-60 h-60 bg-pink-600 rounded-full opacity-10 blur-2xl animate-pulse"></div>

      {/* Decorative numbers */}
      <div className="absolute -top-16 -left-16 text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold opacity-10 select-none pointer-events-none">
        20
      </div>
      <div className="absolute -bottom-16 -right-16 text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold opacity-10 select-none pointer-events-none">
        25
      </div>
    </section>
  );
};

export default DigitalTrendsSection;
