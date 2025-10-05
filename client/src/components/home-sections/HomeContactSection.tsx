import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Instagram,
  Linkedin,
  ChevronRight,
  Send,
  CheckCircle,
  Loader2,
} from 'lucide-react';
// Update the import path to the correct relative location, for example:
//import { SendEmail } from "../../integrations/Core";

type InputFieldProps = {
  icon: React.ReactNode;
  [key: string]: any;
};

const InputField = ({ icon, ...props }: InputFieldProps) => (
  <div className="flex items-center gap-4 border-b border-white/20 focus-within:border-cyan-400 transition-colors duration-300 py-2">
    {icon}
    <Input
      className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 w-full p-0 h-auto"
      {...props}
    />
  </div>
);

export default function HomeContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await SendEmail({
        to: 'harysoftware@gmail.com', // Your receiving email
        subject: `New Message from ${formData.name}`,
        body: `
          Name: ${formData.name}
          Company: ${formData.company}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Message: ${formData.message}
        `,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Optionally show an error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[400px]">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for starting a conversation. We'll be in touch soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-fuchsia-900 via-blue-600 to-blue-500



 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
               STEP INTO THE FUTURE WITH
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              <span className="text-cyan-400">Next-Gen Solutions</span> That Drive Results
            </h2>
            <div className="flex items-center justify-right lg:justify-start gap-6">
              <span className="text-gray-300 font-semibold">Follow Us</span>
              <div className="w-10 h-px bg-cyan-400"></div>
              <div className="flex gap-4">
                <a
                  href="#"
                  title="Instagram"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Start A Conversation With Us</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                icon={<User className="w-5 h-5 text-gray-400" />}
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <InputField
                icon={<Building2 className="w-5 h-5 text-gray-400" />}
                type="text"
                name="company"
                placeholder="Company Name*"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
              <InputField
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <InputField
                icon={<Phone className="w-5 h-5 text-gray-400" />}
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <div className="flex items-start gap-4 border-b border-white/20 focus-within:border-cyan-400 transition-colors duration-300 py-2">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                <Textarea
                  name="message"
                  placeholder="Your Message*"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 w-full p-0 h-auto min-h-[60px] resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-slate-800 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-fuchsia-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative flex items-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        SUBMIT
                        <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SendEmail(arg0: {
  to: string; // Your receiving email
  subject: string;
  body: string;
}) {
  throw new Error('Function not implemented.');
}
