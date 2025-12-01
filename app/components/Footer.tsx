"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="text-sm leading-6">
              Nomad Yatri is India’s purpose-driven travel community connecting
              volunteers, hosts, and digital nomads with meaningful experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">

              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="/volunteer-programs" className="hover:text-white">
                  Volunteer Programs
                </Link>
              </li>

              <li>
                <Link href="/work-exchange" className="hover:text-white">
                  Work Exchange
                </Link>
              </li>

              <li>
                <Link href="/host/become" className="hover:text-white">
                  Host Registration
                </Link>
              </li>

              <li>
                <Link href="/membership" className="hover:text-white">
                  Membership
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms-of-use" className="hover:text-white">
                  Terms of Use
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>

            <p className="text-sm mb-2">
              <a
                href="mailto:support@nomadyatri.com"
                className="hover:text-white"
              >
                support@nomadyatri.com
              </a>
            </p>

            <p className="text-sm">
              <a href="tel:+918894108119" className="hover:text-white">
                +91 88941 08119
              </a>
            </p>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
          <p>© {new Date().getFullYear()} Nomad Yatri. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
