import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import React from 'react';
import { HoverLift, MagneticHover } from '../components/animations/MicroInteractions';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

function VideoHoverLift() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <HoverLift liftDistance={16} scale={1.02}>
      <div className="relative overflow-hidden rounded-3xl shadow-xl border border-white/20">
        {/* Video or Thumbnail */}
        {!isPlaying ? (
          <>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
              alt="CodeFlow showcase"
              className="w-full aspect-[16/9] object-cover rounded-3xl"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Glass Section over Thumbnail */}
            <motion.div
              className="absolute bottom-2 right-2 left-2 glass rounded-xl p-4 border border-white/20 max-w-md mx-auto mt-4 backdrop-blur z-20"
              animate={{ y: isPlaying ? -20 : 0, opacity: isPlaying ? 0 : 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              <div className="text-white font-semibold mb-1">Watch Our Process</div>
              <div className="text-gray-300 text-sm">See how we create digital magic</div>
            </motion.div>

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
          </>
        ) : (
          <video
            src="/your-video.mp4"
            className="w-full aspect-[16/9] object-cover rounded-3xl"
            controls
            autoPlay
            playsInline
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </HoverLift>
  );
}

export default VideoHoverLift;
