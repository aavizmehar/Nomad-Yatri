"use client";

import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5c2e1d] text-white pt-26 mt-16">
      <div className="container mx-auto pb-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: About */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-tighter uppercase italic">
              Nomad <span className="text-orange-400 not-italic">Yatri</span>
            </h3>
            <p className="text-base leading-relaxed text-white font-medium">
              We connect travelers with local hosts across India for
              volunteering, work exchange, and meaningful stays.
              Travel with a purpose.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <SocialIcon
                href="https://www.instagram.com/nomad_yatri_official/"
                icon={<FaInstagram size={24} />}
                label="Instagram"
              />
              <SocialIcon
                href="https://facebook.com"
                icon={<FaFacebookF size={22} />}
                label="Facebook"
              />
              <SocialIcon
                href="https://twitter.com"
                icon={<FaTwitter size={24} />}
                label="Twitter"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/experiences/volunteer-programs">Volunteer</FooterLink>
              <FooterLink href="/experiences/work-exchange">Work Exchange</FooterLink>
              <FooterLink href="/experiences/digital-nomad-stays">Nomad Stays</FooterLink>
              <FooterLink href="/user/register">Become a Host</FooterLink>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              {/* <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-use">Terms of Use</FooterLink> */}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a href="mailto:support@nomadyatri.com" className="flex items-center gap-3 hover:text-orange-400 transition">
                <FaEnvelope />
                <span className="text-sm font-medium">support@nomadyatri.com</span>
              </a>
              <a href="tel:+918894108119" className="flex items-center gap-3 hover:text-orange-400 transition">
                <FaPhoneAlt />
                <span className="text-sm font-medium">+91 88941 08119</span>
              </a>
              <Link
                href="/admin/login"
                className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded font-bold transition"
              >
                Staff Login
              </Link>
            </div>
          </div>
        </div>


      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-16 pt-2 ">
        <p className="text-sm font-medium text-center">
          © {currentYear} Nomad Yatri. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

/* --- Helpers --- */

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-white hover:text-orange-400 font-medium text-sm transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-orange-500 hover:scale-110 transition-all duration-200"
  >
    {icon}
  </Link>
);

export default Footer;