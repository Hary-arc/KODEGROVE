import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
//import { Subscriber } from '@/entities/Subscriber';
import { CheckCircle } from 'lucide-react';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const resp = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || 'Signup failed');

      setSubmitted(true);
    } catch (err: any) {
      console.error('Subscription failed:', err);
      setErrorMsg(err.message || 'Subscription failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [errorMsg, setErrorMsg] = useState('');

  return (
    <section className="bg-gradient-to-r from-fuchsia-900 via-purple-900 to-slate-600 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center lg:text-left">
            Sign Up To Get The
            <br />
            Latest Digital Trends
          </h2>

          <div className="w-full max-w-md">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center text-center p-4 bg-gradient-to-r from-fuchsia-900 via-purple-900 to-slate-600 text-green-300 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 mr-3" />
                <p className="font-semibold">Thank you for subscribing!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                  <div className="absolute -top-px -left-px w-0 h-0 border-t-[16px] border-t-cyan-400 border-r-[16px] border-r-transparent transition-all duration-300 group-hover:scale-110"></div>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-6 pr-36 bg-black/30 text-white placeholder:text-gray-400 border-2 border-purple-800/50 focus:border-cyan-400 transition-colors duration-300 rounded-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-purple-600 to-cyan-400 hover:from-purple-500 hover:to-cyan-500 text-black font-bold rounded-md transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? 'Signing Up...' : 'SIGN UP'}
                </Button>
                {errorMsg && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
