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

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" onClick={handleMobileLinkClick}>
          <Image src="/nomadlogo.svg" height={50} width={50} alt="Nomad Yatra Logo" />
          <span className="ml-2 font-bold text-xl text-gray-900 tracking-wide">Nomad Yatra</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>

          {/* Experiences Dropdown */}
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

          {/* Community Dropdown */}
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
          <div className="flex items-center gap-3">
            {/* Host Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1">
                Host <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <ul className="flex flex-col py-2">
                  <li><AuthButton type="host" action="login" className="w-full px-4 py-2 text-left" /></li>
                  <li><AuthButton type="host" action="register" className="w-full px-4 py-2 text-left" /></li>
                </ul>
              </div>
            </div>

            {/* Volunteer Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-1">
                Volunteer <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <ul className="flex flex-col py-2">
                  <li><AuthButton type="volunteer" action="login" className="w-full px-4 py-2 text-left" /></li>
                  <li><AuthButton type="volunteer" action="register" className="w-full px-4 py-2 text-left" /></li>
                </ul>
              </div>
            </div>
          </div>
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
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg px-6 py-4 space-y-3 transition-all duration-300">

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
          <div className="flex flex-col gap-3 mt-2">
            <AuthButton type="host" action="login" className="px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition" onClick={handleMobileLinkClick} />
            <AuthButton type="host" action="register" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition" onClick={handleMobileLinkClick} />
            <AuthButton type="volunteer" action="login" className="px-4 py-2 rounded-lg border border-green-600 hover:bg-green-50 transition" onClick={handleMobileLinkClick} />
            <AuthButton type="volunteer" action="register" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition" onClick={handleMobileLinkClick} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
