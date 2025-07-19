import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const interactiveClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${interactiveClasses} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}