// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Marquee section */}
      <div className="bg-blue-100 py-2 overflow-hidden">
        <marquee className="text-blue-800 font-semibold text-sm" scrollamount="6">
          🔔 Stay updated with the latest headlines • Get personalized news alerts • Choose from categories like Health, Technology, Sports, Business, and more!
        </marquee>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">NewsHunt</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Your one-stop platform for personalized, real-time news alerts tailored to your interests.
        </p>

        <div className="flex items-center space-x-4">
          <Link to="/news">
            <Button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Explore News
            </Button>
          </Link>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-12 h-12 rounded-full border-4 border-gray-300"
          />
          <Link to="/dashboard?tab=profile">
               <Button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
             Go to Profile
               </Button>
          </Link>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose NewsHunt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-sky-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">🔎 Personalized Alerts</h3>
            <p className="text-gray-600">Choose topics that matter to you and get updates when they happen.</p>
          </div>
          <div className="bg-sky-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">⚡ Real-Time Notifications</h3>
            <p className="text-gray-600">Get instant alerts via email based on your selected frequency.</p>
          </div>
          <div className="bg-sky-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">📰 Curated News</h3>
            <p className="text-gray-600">Top stories from reliable sources in categories you prefer.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;