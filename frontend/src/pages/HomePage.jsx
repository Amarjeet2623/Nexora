import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export default function HomePage() {
  return (
    <section className="flex-1 p-6 overflow-y-auto bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome to Nexora
          </h1>
          <p className="text-xl text-base-content/70 mb-6 max-w-2xl mx-auto leading-relaxed">
            Your ultimate communication hub that brings people together. Experience seamless messaging, 
            crystal-clear video calls, and powerful connection tools all in one beautifully designed platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Start Chatting Now
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Watch Demo
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1M+</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-center block w-full">💬</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Instant Messaging</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Lightning-fast messaging with rich media support. Send texts, images, files, and even voice messages with end-to-end encryption.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Real-time</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Encrypted</span>
            </div>
          </div>

          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-green-100 to-green-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Smart Friends Management</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Effortlessly manage your social circle. Add friends with QR codes, organize into groups, and see who's online at a glance.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">QR Codes</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Groups</span>
            </div>
          </div>

          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📹</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">HD Video Calls</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Crystal-clear video calls with up to 50 participants. Features screen sharing, virtual backgrounds, and recording capabilities.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">HD Quality</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">50 Users</span>
            </div>
          </div>

          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Smart Notifications</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Never miss important messages with intelligent notifications. Customizable alerts, do-not-disturb modes, and priority contacts.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">Smart Alerts</span>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">DND Mode</span>
            </div>
          </div>

          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Advanced Settings</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Complete control over your experience. Customize themes, privacy settings, data usage, and sync across all your devices.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">Themes</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">Privacy</span>
            </div>
          </div>

          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Security & Privacy</h3>
            <p className="text-gray-600 text-sm mb-10 leading-relaxed">
              Your privacy is our priority. End-to-end encryption, two-factor authentication, and complete control over your data.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">E2E Encrypted</span>
              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">2FA</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
          <h2 className="text-5xl font-bold text-primary mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-base-content/70 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join millions of users who trust Nexora for their daily communication needs. 
            It's free, secure, and incredibly easy to use.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Download Nexora Now
          </button>
        </div>
      </div>
    </section>
  );
}
