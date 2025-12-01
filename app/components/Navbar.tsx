"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [commOpen, setCommOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
        <Image
         src="/nomadlogo.svg"
         height={140}
         width={140}
         />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">

          <Link href="/" className="hover:text-blue-600">Home</Link>

          {/* Experiences Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600">
              Experiences <IoIosArrowDown />
            </button>

            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white shadow-lg py-3 px-4 rounded-lg w-56 mt-2">
              <ul className="space-y-2 text-sm">
                <li><Link href="/experiences/volunteer-programs" className="hover:text-blue-600">Volunteer Programs</Link></li>
                <li><Link href="/experiences/work-exchange" className="hover:text-blue-600">Work Exchange</Link></li>
                <li><Link href="/experiences/digital-nomad-stays" className="hover:text-blue-600">Digital Nomad Stays</Link></li>
                <li><Link href="/experiences/cultural-experiences" className="hover:text-blue-600">Cultural Experiences</Link></li>
              </ul>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600">
              Community <IoIosArrowDown />
            </button>

            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white shadow-lg py-3 px-4 rounded-lg w-56 mt-2">
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>

          {/* Become a Host Button */}
          <Link 
            href="/host/become"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Become a Host
          </Link>

          {/* Login/Register */}
          <Link href="/login" className="hover:text-blue-600">Login</Link>
          <Link 
            href="/register"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-5 py-4 space-y-4">

          <Link href="/" className="block py-2">Home</Link>

          {/* Mobile Experiences Dropdown */}
          <div>
            <button
              onClick={() => setExpOpen(!expOpen)}
              className="flex justify-between w-full py-2"
            >
              Experiences <IoIosArrowDown />
            </button>
            {expOpen && (
              <ul className="pl-4 space-y-2 text-sm">
                <li><Link href="/experiences/volunteer-programs">Volunteer Programs</Link></li>
                <li><Link href="/experiences/work-exchange">Work Exchange</Link></li>
                <li><Link href="/experiences/digital-nomad-stays">Digital Nomad Stays</Link></li>
                <li><Link href="/experiences/cultural-experiences">Cultural Experiences</Link></li>
              </ul>
            )}
          </div>

          {/* Mobile Community Dropdown */}
          <div>
            <button
              onClick={() => setCommOpen(!commOpen)}
              className="flex justify-between w-full py-2"
            >
              Community <IoIosArrowDown />
            </button>
            {commOpen && (
              <ul className="pl-4 space-y-2 text-sm">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            )}
          </div>

          <Link href="/pricing" className="block py-2">Pricing</Link>

          <Link 
            href="/host/become"
            className="block bg-blue-600 text-white text-center py-2 rounded-lg"
          >
            Become a Host
          </Link>

          <Link href="/login" className="block py-2">Login</Link>
          <Link 
            href="/register"
            className="block bg-gray-800 text-white text-center py-2 rounded-lg"
          >
            Register
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
