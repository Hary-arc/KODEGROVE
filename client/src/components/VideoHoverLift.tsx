import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import React from 'react';
import { HoverLift, MagneticHover } from '../components/animations/MicroInteractions';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
//import { useVideoInViewPause } from '../hooks/useInViewPause';

function VideoHoverLift() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Automatically pause/play main video when in/out of view
  // Disabled for modal video - it's controlled by user interaction
  // useVideoInViewPause(videoRef, { amount: 0.3 });

  // Automatically pause/play preview video when in/out of view
  //useVideoInViewPause(previewVideoRef, { amount: 0.3 });

  // Prevent body scroll when video is playing
  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPlaying]);

  return (
    <>
      {/* Preview Container */}
      <HoverLift liftDistance={16} scale={1.02}>
        <div className="relative overflow-hidden rounded-3xl shadow-xl border border-white/20">
          {/* Preview Video Loop (muted, auto-playing, faded) */}
          <video
            ref={previewVideoRef}
            src="/output2.mp4"
            className="w-full aspect-[16/9] object-cover rounded-3xl blur-sm"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Glass Section over Thumbnail */}
          <div className="absolute bottom-2 right-2 left-2 glass rounded-xl p-4 border border-white/20 max-w-md mx-auto mt-4 backdrop-blur z-20">
            <div className="text-white font-semibold mb-1">Watch Our Process</div>
            <div className="text-gray-300 text-sm">See how we create digital magic</div>
          </div>

          {/* Play Button */}
          <motion.button
            className="absolute inset-0 flex items-center justify-center group z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(true)}
            aria-label="Play video"
          >
            <div className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-white transition duration-300 shadow-2xl">
              <Play className="w-8 h-8 text-slate-900 ml-1" />
            </div>
          </motion.button>
        </div>
      </HoverLift>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
            />

            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-6xl z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <motion.video
                  ref={videoRef}
                  src="/output2.mp4"
                  className="w-full aspect-[16/9] object-cover"
                  controls
                  autoPlay
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </div>

              {/* Close Button */}
              <motion.button
                className="absolute -top-12 right-0 sm:-top-14 sm:-right-14 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition border border-white/20"
                onClick={() => setIsPlaying(false)}
                aria-label="Close video"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default VideoHoverLift;
