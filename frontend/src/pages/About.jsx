import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 py-12 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 animate-fade-in">
        About <span className="text-gray-800">NewsHunt</span>
      </h1>

      <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-10">
        <strong>NewsHunt</strong> is your personalized real-time news companion. Whether you're into politics, sports, technology, or health — NewsHunt lets you tailor alerts to your interests. Stay informed with immediate, hourly, or daily updates directly to your inbox.
      </p>

      <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-8 mb-12 animate-slide-in-up">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">🌟 Why Choose NewsHunt?</h2>
        <ul className="list-disc text-left text-gray-700 pl-5 space-y-2">
          <li>📬 Real-time News Alerts via Email</li>
          <li>⚙️ Customizable Alert Preferences (Category & Frequency)</li>
          <li>📊 User Dashboard to View Alert History</li>
          <li>🔒 Secure Sign-In with Google Authentication</li>
          <li>📱 Mobile Responsive Design</li>
        </ul>
      </div>

      <div className="bg-blue-100 rounded-xl shadow-md max-w-3xl mx-auto p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">📞 Contact Us</h2>
        <div className="flex flex-col items-center space-y-3 text-gray-700">
          <p><FaMapMarkerAlt className="inline mr-2" />146/5 Kurinchi Malar Street, Tiruvanmiyur, Chennai 600041</p>
          <p><FaEnvelope className="inline mr-2" />newshuntofficial@gmail.com</p>
          <p><FaPhone className="inline mr-2" />+91 0463422134</p>
        </div>
      </div>

      <footer className="text-sm text-gray-500 mt-10">
        ©2025 <span className="font-semibold text-blue-600">NewsHunt</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
