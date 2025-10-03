import React from 'react'

import { default as CreativeSolutionsSection } from '../components/extra-sections/CreativeSolutionsSection';
import { default as ClientsAcrossIndustriesSection } from '../components/extra-sections/ClientsAcrossIndustriesSection'; 
import { default as CompanyInfoSection } from '../components/extra-sections/CompanyInfoSection';
import { default as ProcessMethodologySection } from '../components/extra-sections/ProcessMethodologySection';
import { default as IndustryRecognitionSection } from '../components/extra-sections/IndustryRecognitionSection';
import { default as SecurityComplianceSection } from '../components/extra-sections/SecurityComplianceSection';
import { default as TrustAndCredibilitySection } from '../components/extra-sections/TrustAndCredibilitySection';

export const ComingSoonPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-0 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent animate-gradient">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          We're working on something amazing. Stay tuned for updates!
        </p>
        
        {/* Newsletter Signup */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200">
              Notify Me
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-6">
          {[
            { name: 'Twitter', icon: 'tw' },
            { name: 'LinkedIn', icon: 'in' },
            { name: 'Instagram', icon: 'ig' }
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
              aria-label={social.name}
            >
              <span className="text-sm font-semibold">{social.icon}</span>
            </a>
          ))}
        </div>
     
        {/* <div className="relative z-10 text-center px-4 mt-20 w-full">
      <section>
      <CreativeSolutionsSection />
      <ClientsAcrossIndustriesSection />
      <CompanyInfoSection />
      <ProcessMethodologySection />
      <IndustryRecognitionSection />
      <SecurityComplianceSection />
      <TrustAndCredibilitySection />
      </section>
      </div> */}
       </div>
    </div>
  )
}