"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [commOpen, setCommOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Desktop profile dropdown

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Logged out from server successfully");
      }
    } catch (error) {
      console.error("Server logout error:", error);
    } finally {
      localStorage.clear();
      setIsLoggedIn(false);
      setUserRole(null);
      setIsOpen(false);
      setIsMobileOpen(false);

      router.push("/user/login");
      router.refresh();
    }
  };

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
    setExpOpen(false);
    setCommOpen(false);
  };

  const UserProfileIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <nav className="w-full bg-white backdrop-blur-md shadow-md fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-5 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={handleMobileLinkClick}>
          <Image src="/nomadlogo.svg" height={60} width={60} alt="Nomad Yatra Logo" />
          <span className="font-extrabold text-2xl text-[#cd7643] tracking-wide ml-2">
            Nomad <span className="text-[#396a6b]">Yatra</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-[#1a2627] font-bold">
          <Link href="/" className="hover:text-[#d49159] transition-colors">Home</Link>

          {/* Experiences Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#d49159]">
              Experiences <IoIosArrowDown className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
              <ul className="py-2 text-sm font-semibold">
                <li><Link href="/experiences/volunteer-programs" className="block px-4 py-2 hover:bg-gray-50 hover:text-[#d49159]">Volunteer Programs</Link></li>
                <li><Link href="/experiences/work-exchange" className="block px-4 py-2 hover:bg-gray-50 hover:text-[#d49159]">Work Exchange</Link></li>
                <li><Link href="/experiences/digital-nomad-stays" className="block px-4 py-2 hover:bg-gray-50 hover:text-[#d49159]">Digital Nomad Stays</Link></li>
                <li><Link href="/experiences/cultural-experiences" className="block px-4 py-2 hover:bg-gray-50 hover:text-[#d49159]">Cultural Experiences</Link></li>
              </ul>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#d49159] transition-colors duration-200">
              Community <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <ul className="flex flex-col py-3 px-4 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-[#d49159]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#d49159]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#d49159]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/pricing"
            className="hover:text-[#d49159] transition-colors duration-200"
          >
            Pricing
          </Link>

          {/* Auth Button/Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full shadow-md transition-all flex items-center justify-center ${
                isLoggedIn ? "bg-[#396a6b] text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <UserProfileIcon />
              <IoIosArrowDown className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)}></div>
                <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 p-2 overflow-hidden">
                  <ul className="text-sm font-semibold">
                    {isLoggedIn ? (
                      <>
                        <li className="px-4 py-2 text-[10px] text-gray-400 uppercase tracking-widest border-b mb-1">Account</li>
                        <li><Link href={userRole === "host" ? "/host/dashboard" : "/user/profile"} onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-50 rounded-lg transition">Dashboard</Link></li>
                        <li><button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link href="/user/login" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-50 rounded-lg transition">User Login</Link></li>
                        <li><Link href="/user/register" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-gray-50 rounded-lg transition">Register</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-3xl text-gray-700" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-white z-40 px-6 py-6 flex flex-col space-y-4 animate-in slide-in-from-right">
          <Link href="/" className="text-lg font-bold border-b pb-2" onClick={handleMobileLinkClick}>Home</Link>
          
          <div className="space-y-2">
            <button onClick={() => setExpOpen(!expOpen)} className="flex justify-between w-full text-lg font-bold">
              Experiences <IoIosArrowDown className={expOpen ? "rotate-180" : ""} />
            </button>
            {expOpen && (
              <div className="pl-4 flex flex-col space-y-2 text-gray-600 font-semibold">
                <Link href="/experiences/volunteer-programs" onClick={handleMobileLinkClick}>Volunteer Programs</Link>
                <Link href="/experiences/work-exchange" onClick={handleMobileLinkClick}>Work Exchange</Link>
                <Link href="/experiences/digital-nomad-stays" onClick={handleMobileLinkClick}>Digital Nomad Stays</Link>
                <Link href="/experiences/cultural-experiences" onClick={handleMobileLinkClick}>Cultural Experiences</Link>
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-lg font-bold border-b pb-2" onClick={handleMobileLinkClick}>Pricing</Link>

          <div className="pt-4 space-y-4">
            {isLoggedIn ? (
              <>
                <Link href={userRole === "host" ? "/host/dashboard" : "/user/profile"} onClick={handleMobileLinkClick} className="block w-full py-3 text-center bg-[#396a6b] text-white rounded-xl font-bold">My Dashboard</Link>
                <button onClick={handleLogout} className="w-full py-3 text-center border-2 border-red-500 text-red-500 rounded-xl font-bold">Logout</button>
              </>
            ) : (
              <>
                <Link href="/user/login" onClick={handleMobileLinkClick} className="block w-full py-3 text-center border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold">Login</Link>
                <Link href="/user/register" onClick={handleMobileLinkClick} className="block w-full py-3 text-center bg-indigo-600 text-white rounded-xl font-bold">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;