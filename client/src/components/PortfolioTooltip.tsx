import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioTooltipProps {
  isVisible?: boolean;
  content?: string;
  position?: { x: number; y: number };
  totalProjects?: number;
  filteredCount?: number;
}

export function PortfolioTooltip({ isVisible = true, content, position = { x: 0, y: 0 }, totalProjects, filteredCount }: PortfolioTooltipProps) {
  const displayContent = content || (totalProjects && filteredCount ? `${filteredCount} of ${totalProjects} projects` : 'Portfolio');
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {displayContent}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}