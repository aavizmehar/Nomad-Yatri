"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import AuthButton from "./AuthButton";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [commOpen, setCommOpen] = useState(false);

  // Handler to close mobile menu
  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
    setExpOpen(false);
    setCommOpen(false);
  };
  // 

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu after link click
  };
  // New: Profile Icon (Replacement for Host/Volunteer Buttons)
  const UserProfileIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
  );
  // 
  return (
    <nav className="w-full bg-white backdrop-blur-md shadow-md fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-5 ">
        <Link href="/" className="flex items-center" onClick={handleMobileLinkClick}>
          <Image src="/nomadlogo.svg" height={80} width={80} alt="Nomad Yatra Logo" />
          <span className=" font-[1000] text-3xl text-[#cd7643] tracking-wide"><i>Nomad Yatra</i></span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-[#1a2627] font-bold">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
              Experiences <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <ul className="flex flex-col py-3 px-4 space-y-2 text-sm">
                <li><Link href="/experiences/volunteer-programs" className="hover:text-blue-600">Volunteer Programs</Link></li>
                <li><Link href="/experiences/work-exchange" className="hover:text-blue-600">Work Exchange</Link></li>
                <li><Link href="/experiences/digital-nomad-stays" className="hover:text-blue-600">Digital Nomad Stays</Link></li>
                <li><Link href="/experiences/cultural-experiences" className="hover:text-blue-600">Cultural Experiences</Link></li>
              </ul>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
              Community <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <ul className="flex flex-col py-3 px-4 space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>

          <Link href="/pricing" className="hover:text-blue-600 transition-colors duration-200">Pricing</Link>

          {/* Auth Buttons */}
          <div className="relative inline-block">
            {/* Profile Icon Button - Primary Trigger */}
            <button
              onClick={handleToggle}
              className="p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <UserProfileIcon />
              <IoIosArrowDown className={`ml-1 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Dropdown Menu Content */}
            {isOpen && (
              <div
                className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 p-2 
                                transition duration-300 transform origin-top-right animate-fade-in"
              >
                <ul className="flex flex-col space-y-1">

                  {/* Host Actions Group */}
                  <p className="text-xs text-gray-500 uppercase font-semibold pt-1 px-2">Host</p>
                  <li className="rounded-lg overflow-hidden">
                    <AuthButton type="host" action="login" onClick={handleLinkClick}>Host Login</AuthButton>
                  </li>
                  <li className="rounded-lg overflow-hidden">
                    <AuthButton type="host" action="register" onClick={handleLinkClick}>Host Register</AuthButton>
                  </li>

                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Volunteer Actions Group */}
                  <p className="text-xs text-gray-500 uppercase font-semibold px-2">Volunteer</p>
                  <li className="rounded-lg overflow-hidden">
                    <AuthButton type="volunteer" action="login" onClick={handleLinkClick}>Volunteer Login</AuthButton>
                  </li>
                  <li className="rounded-lg overflow-hidden">
                    <AuthButton type="volunteer" action="register" onClick={handleLinkClick}>Volunteer Register</AuthButton>
                  </li>
                </ul>
              </div>
            )}

            {/* Optional: Click outside listener (using simple window click for context) */}
            {isOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              ></div>
            )}

          </div>
          {/*  */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden h-[100vh] bg-white/95 backdrop-blur-md shadow-lg px-6 py-4 space-y-3 transition-all duration-300">

          <Link href="/" className="block py-2 font-medium" onClick={handleMobileLinkClick}>Home</Link>

          {/* Experiences Dropdown */}
          <div>
            <button
              onClick={() => setExpOpen(!expOpen)}
              className="flex justify-between w-full py-2 font-medium"
            >
              Experiences <IoIosArrowDown className={`transition-transform duration-200 ${expOpen ? 'rotate-180' : ''}`} />
            </button>
            {expOpen && (
              <ul className="pl-4 space-y-2 text-sm">
                {[
                  { href: "/experiences/volunteer-programs", label: "Volunteer Programs" },
                  { href: "/experiences/work-exchange", label: "Work Exchange" },
                  { href: "/experiences/digital-nomad-stays", label: "Digital Nomad Stays" },
                  { href: "/experiences/cultural-experiences", label: "Cultural Experiences" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={handleMobileLinkClick}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Community Dropdown */}
          <div>
            <button
              onClick={() => setCommOpen(!commOpen)}
              className="flex justify-between w-full py-2 font-medium"
            >
              Community <IoIosArrowDown className={`transition-transform duration-200 ${commOpen ? 'rotate-180' : ''}`} />
            </button>
            {commOpen && (
              <ul className="pl-4 space-y-2 text-sm">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={handleMobileLinkClick}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href="/pricing" className="block py-2 font-medium" onClick={handleMobileLinkClick}>Pricing</Link>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3 mt-2" onClick={handleMobileLinkClick}>
            <AuthButton type="host" action="login"  className="px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition" />
            <AuthButton type="host" action="register"  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition" />
            <AuthButton type="volunteer" action="login" className="px-4 py-2 rounded-lg border border-green-600 hover:bg-green-50 transition" />
            <AuthButton type="volunteer" action="register" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
