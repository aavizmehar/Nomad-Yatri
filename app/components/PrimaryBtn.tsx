import Link from "next/link";

interface PrimaryBtnProps {
  text: string;
  action: string;
  className?: string;
}

export default function PrimaryBtn({ text, action, className  }: PrimaryBtnProps) {
  const href = `/${action}`;

  return (
    <Link
      href={href}
      className={`
        inline-block 
        px-7 py-2.5 
        text-sm font-semibold 
        rounded-full 
        bg-[#cd7643]
        text-white 
        shadow-md 
        hover:bg-[#d49159] 
        hover:shadow-lg 
        transition-all 
        duration-300 
        w-fit
        ${className}
      `}
    >
      {text}
    </Link>
  );
}
