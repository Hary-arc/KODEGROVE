import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon?: LucideIcon;
  Icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  color?: string;
  delay?: number;
}

export function QuickActionButton({
  icon,
  Icon,
  label,
  onClick,
  variant = 'primary',
  className,
  color,
  delay,
}: QuickActionButtonProps) {
  const IconComponent = Icon || icon;
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center justify-center w-12 h-12 rounded-full
        ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        transition-colors duration-200 shadow-lg
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {IconComponent && <IconComponent size={20} />}
    </motion.button>
  );
}
