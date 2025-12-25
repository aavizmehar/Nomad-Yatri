"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, role, logout } = useContext(AuthContext);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const [mobileComOpen, setMobileComOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
    setMobileExpOpen(false);
    setMobileComOpen(false);
  };

  const UserProfileIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <nav className="w-full bg-white/90 backdrop-blur-2xl border-b border-gray-100 fixed top-0 left-0 z-[100] transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 h-20">
        
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative shrink-0">
            <Image
              src="/logo.png"
              height={70} 
              width={70}
              alt="Nomad Yatri Logo"
              className="group-hover:rotate-[15deg] transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col items-center select-none">
            <div className="flex items-baseline">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-black transition-transform duration-300 group-hover:-translate-x-1">
                NOMAD
              </span>
            </div>
            <div className="w-full flex justify-between items-center -mt-1">
              <div className="h-[1px] flex-1 bg-gray-200"></div>
              <span className="px-2 text-[10px] md:text-xs font-black tracking-[0.4em] text-yellow-500 uppercase">
                YATRI
              </span>
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          <ul className="flex items-center space-x-8 text-[13px] font-bold uppercase tracking-widest text-gray-500">
            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>

            <li className="relative group">
              <button className="flex items-center gap-2 hover:text-black transition-colors">
                Experiences <IoIosArrowDown className="group-hover:rotate-180 transition-transform text-xs text-yellow-500" />
              </button>
              <div className="absolute top-full -left-4 mt-2 w-72 bg-white shadow-2xl rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-50 p-3">
                <ul className="text-sm font-bold tracking-wide">
                  <li><Link href="/experiences/volunteer-programs" className="block px-5 py-4 hover:bg-gray-50 hover:text-yellow-600 rounded-2xl transition">Volunteer Programs</Link></li>
                  <li><Link href="/experiences/work-exchange" className="block px-5 py-4 hover:bg-gray-50 hover:text-yellow-600 rounded-2xl transition">Work Exchange</Link></li>
                  <li><Link href="/experiences/digital-nomad-stays" className="block px-5 py-4 hover:bg-gray-50 hover:text-yellow-600 rounded-2xl transition">Digital Nomad Stays</Link></li>
                  <div className="h-px bg-gray-100 my-2 mx-4" />
                  <li><Link href="/programs" className="block px-5 py-4 bg-yellow-400 text-black font-black text-center rounded-2xl hover:bg-black hover:text-white transition-colors">View All Programs</Link></li>
                </ul>
              </div>
            </li>

            <li className="relative group">
              <button className="flex items-center gap-2 hover:text-black transition-colors">
                Community <IoIosArrowDown className="group-hover:rotate-180 transition-transform text-xs text-yellow-500" />
              </button>
              <div className="absolute top-full -left-4 mt-2 w-56 bg-white shadow-2xl rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-50 p-3">
                <ul className="text-sm font-bold tracking-wide">
                  <li><Link href="/about" className="block px-5 py-4 hover:bg-gray-50 rounded-2xl transition">About Us</Link></li>
                  <li><Link href="/blog" className="block px-5 py-4 hover:bg-gray-50 rounded-2xl transition">Journal</Link></li>
                  <li><Link href="/contact" className="block px-5 py-4 hover:bg-gray-50 rounded-2xl transition">Contact</Link></li>
                </ul>
              </div>
            </li>

            <li><Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link></li>
          </ul>

          <div className="relative border-l border-gray-100 pl-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 shadow-lg ${
                isLoggedIn ? "bg-black text-white" : "bg-yellow-400 text-black hover:bg-black hover:text-white"
              }`}
            >
              <UserProfileIcon />
              <span className="text-xs font-black uppercase tracking-widest">{isLoggedIn ? "Account" : "Join Now"}</span>
            </button>

            {isOpen && (
               <div className="absolute right-0 mt-5 w-64 bg-white border border-gray-50 shadow-2xl rounded-[2rem] p-4 z-50 animate-in fade-in zoom-in duration-200">
                  <ul className="text-sm font-bold tracking-wide">
                    {isLoggedIn ? (
                      <>
                        <li><Link href={role === "host" ? "/host/dashboard" : "/user/profile"} onClick={() => setIsOpen(false)} className="block px-5 py-4 hover:bg-gray-50 rounded-2xl transition">User Dashboard</Link></li>
                        <div className="h-px bg-gray-100 my-2 mx-4" />
                        <li><button onClick={() => { logout(); setIsOpen(false); router.push("/user/login"); }} className="w-full text-left px-5 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition">Sign Out</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link href="/user/login" onClick={() => setIsOpen(false)} className="block px-5 py-4 hover:bg-gray-50 rounded-2xl transition">Sign In</Link></li>
                        <li><Link href="/user/register" onClick={() => setIsOpen(false)} className="block px-5 py-4 bg-black text-white text-center rounded-2xl mt-2 transition">Create Account</Link></li>
                      </>
                    )}
                  </ul>
               </div>
            )}
          </div>
        </div>

        {/* 3. Mobile Hamburger */}
        <button className="lg:hidden text-3xl text-black" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* 4. Mobile Menu Overlay (Fixed with all links) */}
      {isMobileOpen && (
        <div className="fixed h-screen inset-0 top-[85px] bg-white z-[90] px-10 py-8 flex flex-col space-y-6 overflow-y-auto animate-in slide-in-from-bottom duration-500">
          <ul className="space-y-6">
            <li><Link href="/" onClick={handleMobileLinkClick} className="text-3xl font-bold tracking-tighter text-gray-900">Home</Link></li>
            {/* Experiences Accordion */}
            <li className="border-b border-gray-100 pb-4">
              <button onClick={() => setMobileExpOpen(!mobileExpOpen)} className="flex items-center justify-between w-full text-3xl font-bold tracking-tighter text-gray-900">
                Experiences <IoIosArrowDown className={`transition-transform duration-300 ${mobileExpOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileExpOpen && (
                <ul className="mt-4 space-y-4 pl-4 text-lg font-medium text-gray-500">
                  <li><Link href="/experiences/volunteer-programs" onClick={handleMobileLinkClick}>Volunteer Programs</Link></li>
                  <li><Link href="/experiences/work-exchange" onClick={handleMobileLinkClick}>Work Exchange</Link></li>
                  <li><Link href="/experiences/digital-nomad-stays" onClick={handleMobileLinkClick}>Digital Nomad Stays</Link></li>
                  <li><Link href="/programs" onClick={handleMobileLinkClick} className="text-yellow-600 font-bold">View All Programs</Link></li>
                </ul>
              )}
            </li>

            {/* Community Accordion */}
            <li className="border-b border-gray-100 pb-4">
              <button onClick={() => setMobileComOpen(!mobileComOpen)} className="flex items-center justify-between w-full text-3xl font-bold tracking-tighter text-gray-900">
                Community <IoIosArrowDown className={`transition-transform duration-300 ${mobileComOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileComOpen && (
                <ul className="mt-4 space-y-4 pl-4 text-lg font-medium text-gray-500">
                  <li><Link href="/about" onClick={handleMobileLinkClick}>About Us</Link></li>
                  <li><Link href="/blog" onClick={handleMobileLinkClick}>Journal</Link></li>
                  <li><Link href="/contact" onClick={handleMobileLinkClick}>Contact</Link></li>
                </ul>
              )}
            </li>

            <li><Link href="/pricing" onClick={handleMobileLinkClick} className="text-3xl font-bold tracking-tighter text-gray-900">Pricing</Link></li>
          </ul>

          {/* Auth Actions */}
          <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link href={role === "host" ? "/host/dashboard" : "/user/profile"} onClick={handleMobileLinkClick} className="py-6 text-center bg-black text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl">My Dashboard</Link>
                <button onClick={() => { logout(); setIsMobileOpen(false); router.push("/user/login"); }} className="py-6 text-center border-2 border-red-500 text-red-500 rounded-[2rem] text-sm font-black uppercase tracking-widest">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/user/login" onClick={handleMobileLinkClick} className="py-6 text-center border-2 border-black rounded-[2rem] text-sm font-black uppercase tracking-widest">Sign In</Link>
                <Link href="/user/register" onClick={handleMobileLinkClick} className="py-6 text-center bg-yellow-400 text-black rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl">Join Nomad Yatri</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;