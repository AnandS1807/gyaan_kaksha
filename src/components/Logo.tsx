
import React from 'react';
import { Book } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`${className} rounded-full bg-gradient-to-br from-saffron to-saffron-dark relative overflow-hidden flex items-center justify-center`}>
      <Book 
        className="text-white" 
        size={24} 
        strokeWidth={2.5} 
      />
    </div>
  );
};

export default Logo;
