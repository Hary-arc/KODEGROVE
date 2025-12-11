'use client';

import React from 'react';
import { siteConfig } from '../data/site-config';

export function Footer() {
    return (
        <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-white/10">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
                {/* Top Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Logo & Description */}
                    <div className="lg:border-r lg:border-white/10 lg:pr-8">
                        <a href="/" className="flex items-center gap-4 group mb-6">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <svg
                                    className="w-7 h-7 text-white z-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M12 2L8 8l4 6 4-6-4-6z" />
                                    <path d="M8 8l-2 3 2 3" />
                                    <path d="M16 8l2 3-2 3" />
                                    <path d="M6 14l-2 2 2 2" />
                                    <path d="M18 14l2 2-2 2" />
                                    <path d="M12 14v8" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-glass-shine" />
                            </div>
                            <span className="text-3xl font-bold font-outfit bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
                                {siteConfig.name}
                            </span>
                        </a>

                        <p className="text-gray-400 leading-relaxed mb-6 max-w-sm text-lg">
                            {siteConfig.description}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[
                                { name: 'LinkedIn', icon: 'in', link: 'https://linkedin.com' },
                                { name: 'Twitter', icon: 'tw', link: 'https://twitter.com' },
                                { name: 'GitHub', icon: 'gh', link: 'https://github.com' },
                                { name: 'Dribbble', icon: 'dr', link: 'https://dribbble.com' },
                            ].map(social => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="relative w-12 h-12 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition group overflow-hidden bg-white/5 backdrop-blur-sm"
                                >
                                    <span className="z-10 text-sm font-semibold">{social.icon}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Main Services */}
                    <div className="lg:border-r lg:border-white/10 lg:px-8">
                        <h3 className="font-outfit font-bold text-white text-xl mb-6">Main Services</h3>
                        <ul className="space-y-4 text-gray-300">
                            {[
                                { name: 'Custom Web Design', path: '/services/custom-web-design' },
                                { name: 'Branding Services', path: '/services/branding' },
                                { name: 'eCommerce Design', path: '/services/ecommerce-design' },
                                { name: 'Shopify Website Design', path: '/services/shopify' },
                                { name: 'WordPress Web Design', path: '/services/wordpress' },
                                { name: 'Digital Marketing', path: '/services/digital-marketing' },
                            ].map(item => (
                                <li key={item.name}>
                                    <a href={item.path} className="hover:text-white transition">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Apps & Development */}
                    <div className="lg:border-r lg:border-white/10 lg:px-8">
                        <h3 className="font-outfit font-bold text-white text-xl mb-6">
                            Apps & Development
                        </h3>
                        <ul className="space-y-4 text-gray-300">
                            {[
                                { name: 'Website Cost Calculator', path: '/apps/cost-calculator' },
                                { name: 'Conversion Rate Calculator', path: '/apps/conversion-calculator' },
                                { name: 'Custom Web Development', path: '/development/custom' },
                                { name: 'Magento Development', path: '/development/magento' },
                                { name: 'eCommerce Development', path: '/development/ecommerce' },
                                { name: 'WooCommerce Development', path: '/development/woocommerce' },
                            ].map(item => (
                                <li key={item.name}>
                                    <a href={item.path} className="hover:text-white transition">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:pl-8">
                        <h3 className="font-outfit font-bold text-white text-xl mb-6">Company</h3>
                        <ul className="space-y-4 text-gray-300">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'Case Studies', path: '/case-studies' },
                                { name: 'Digital Trends', path: '/blog/digital-trends' },
                                { name: 'Top Companies', path: '/top-companies' },
                                { name: 'Reviews', path: '/reviews' },
                                { name: 'Sitemap', path: '/#/coming-soon' },
                                { name: 'Locations', path: '/locations' },
                                { name: 'Contact Us', path: '/contact' },
                            ].map(item => (
                                <li key={item.name}>
                                    <a href={item.path} className="hover:text-white transition">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Locations Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-gray-300 border-t border-white/10 pt-12">
                    <div className="lg:border-r lg:border-white/10 lg:pr-8 mb-8 lg:mb-0">
                        <p className="text-3xl font-bold text-white">MI</p>
                        <p className="font-semibold">Miami</p>
                        <p>17975 Collins Avenue</p>
                        <p>Sunny Isles Beach, FL 33160</p>
                    </div>
                    <div className="lg:border-r lg:border-white/10 lg:px-8 mb-8 lg:mb-0">
                        <p className="text-3xl font-bold text-white">NY</p>
                        <p className="font-semibold">New York</p>
                        <p>18 West 18th Street</p>
                        <p>New York, NY 10011</p>
                    </div>
                    <div className="lg:border-r lg:border-white/10 lg:px-8 mb-8 lg:mb-0">
                        <p className="text-3xl font-bold text-white">CH</p>
                        <p className="font-semibold">Chicago</p>
                        <p>625 W Adams St</p>
                        <p>Chicago, IL 60661</p>
                    </div>
                    <div className="lg:pl-8">
                        <p className="text-3xl font-bold text-white">CA</p>
                        <p className="font-semibold">California</p>
                        <p>600 B St</p>
                        <p>San Diego, CA 92101</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © 2025 {siteConfig.name}. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
                        <button
                            onClick={() => {
                                window.location.hash = '/privacy-policy';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="hover:text-white transition"
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => {
                                window.location.hash = '/cookie-policy';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="hover:text-white transition"
                        >
                            Manage Your Consent
                        </button>
                        <button
                            onClick={() => {
                                window.location.hash = '/refund-policy';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="hover:text-white transition"
                        >
                            Accessibility
                        </button>
                        <a href="tel:+91 7817942713" className="hover:text-white transition">
                            Call us at (781) 794-2713
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
