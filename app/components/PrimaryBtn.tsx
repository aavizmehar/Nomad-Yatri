import Link from 'next/link';
import { ReactNode } from 'react';

interface PrimaryBtnProps {
  text: ReactNode;
  action: string;
  className?: string;
}

export default function PrimaryBtn({ text, action, className }: PrimaryBtnProps) {
  const href = action.startsWith('/') ? action : `/${action}`;

  return (
    <Link
      href={href}
      className={`
        mt-8 md:mt-12 
        flex items-center justify-center gap-2 md:gap-3 
        bg-[#ffcc00] text-black 
        px-5 py-3 md:px-8 md:py-4 
        rounded-full font-bold transition-all 
        shadow-xl shadow-[#431404]/10
        text-sm md:text-base
        w-full sm:w-max
        ${className}
      `}
    >
      {text}
    </Link>
  );
}