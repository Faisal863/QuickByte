import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { bannerAssets } from '../../assets/dummydata';
import '../../index.css';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { bannerImage } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
      <section className="bg-orange-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
          {/* Left */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              We Deliver <span className="text-orange-500">Delicious Food</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
              Get your favorite meals delivered hot & fresh in just a few taps. Explore now!
            </p>
            <form onSubmit={handleSearch} className="flex items-center bg-white border rounded-full shadow-md overflow-hidden max-w-lg mx-auto md:mx-0">
            <span className="px-4 text-orange-500">
              <FaSearch />
            </span>
              <input
                  type="text"
                  className="flex-1 py-3 px-2 text-gray-700 outline-none"
                  placeholder="Search meals, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img
                src={bannerImage}
                alt="Banner"
                className="w-[320px] h-[320px] object-cover rounded-full border-4 border-orange-200 shadow-xl"
            />
          </div>
        </div>
      </section>
  );
};

export default Banner;
