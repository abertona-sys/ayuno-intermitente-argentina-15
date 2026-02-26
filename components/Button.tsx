import React from 'react';
import { BaseProps } from '../types';

interface ButtonProps extends BaseProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full 
        py-4 
        bg-[#1890FF]
        hover:bg-[#1580e3]
        active:bg-[#106bc2]
        text-white 
        font-bold 
        text-lg 
        rounded-full
        shadow-lg 
        shadow-blue-500/30 
        transition-all 
        duration-200 
        ease-in-out
        transform
        hover:-translate-y-0.5
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};