import React from "react";
// Since the environment can be restrictive, we will use a self-contained CustomLink
// to replace next/link, preventing potential module resolution errors.
type CustomLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};
const CustomLink = ({ href, className = "", children }: CustomLinkProps) => (
    <a href={href} className={className}>
        {children}
    </a>
);

// --- SVG Icons for Social Media (Placeholders) ---
const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.753.01 3.7.073 1.05.074 1.708.243 2.274.463.552.213.987.502 1.488.983s.77 1.002.984 1.55c.22.566.389 1.224.463 2.274.062.946.073 1.269.073 3.7 0 2.43-.01 2.753-.073 3.7-.074 1.05-.243 1.708-.463 2.274-.213.552-.502.987-.983 1.488s-1.002.77-1.55.984c-.566.22-1.224.389-2.274.463-.946.062-1.269.073-3.7.073-2.43 0-2.753-.01-3.7-.073-1.05-.074-1.708-.243-2.274-.463-.552-.213-.987-.502-1.488-.983s-.77-1.002-.984-1.55c-.22-.566-.389-1.224-.463-2.274-.062-.946-.073-1.269-.073-3.7 0-2.43.01-2.753.073-3.7.074-1.05.243-1.708.463-2.274.213-.552.502-.987.983-1.488s1.002-.77 1.55-.984c.566-.22 1.224-.389 2.274-.463.946-.062 1.269-.073 3.7-.073zM12 4.315c-4.484 0-4.954.013-6.68.077-1.636.062-2.385.275-2.885.474-.523.21-.954.51-1.385.942-.43.43-.728.86-.94 1.383-.198.502-.411 1.25-.473 2.886-.064 1.726-.077 2.196-.077 6.68 0 4.484.013 4.954.077 6.68.062 1.636.275 2.385.474 2.885.21.523.51.954.942 1.385.43.43.86.728 1.383.94.502.198 1.25.411 2.886.473 1.726.064 2.196.077 6.68.077 4.484 0 4.954-.013 6.68-.077 1.636-.062 2.385-.275 2.885-.474.523-.21.954-.51 1.385-.942.43-.43.728-.86.94-1.383.198-.502.411-1.25.473-2.886.064-1.726.077-2.196.077-6.68 0-4.484-.013-4.954-.077-6.68-.062-1.636-.275-2.385-.474-2.885-.21-.523-.51-.954-.942-1.385-.43-.43-.86-.728-1.383-.94-.502-.198-1.25-.411-2.886-.473-1.726-.064-2.196-.077-6.68-.077zm0 3.65c-3.11 0-5.635 2.525-5.635 5.635s2.525 5.635 5.635 5.635 5.635-2.525 5.635-5.635-2.525-5.635-5.635-5.635zm0 9.385c-2.072 0-3.75-1.678-3.75-3.75s1.678-3.75 3.75-3.75 3.75 1.678 3.75 3.75-1.678 3.75-3.75 3.75zm5.545-9.615c-.47 0-.85.38-.85.85s.38.85.85.85.85-.38.85-.85-.38-.85-.85-.85z" clipRule="evenodd" /></svg>
);
const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.77 3.654-3.77 1.052 0 2.102.188 2.102.188v2.327h-1.215c-1.135 0-1.49.704-1.49 1.433V12h3.06l-.492 2.991h-2.568v6.987A10.025 10.025 0 0022 12z" clipRule="evenodd" /></svg>
);
const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.92 4.92 0 002.166-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.396 4.482A13.924 13.924 0 013.25 4.721a4.916 4.916 0 001.523 6.574 4.903 4.903 0 01-2.228-.616v.061a4.918 4.918 0 003.947 4.827 4.918 4.918 0 01-2.22.084 4.92 4.92 0 004.57 3.403A9.858 9.858 0 010 20.307a13.987 13.987 0 007.55 2.209c9.053 0 13.99-7.49 13.99-13.989 0-.214-.005-.426-.013-.637A10.05 10.05 0 0024 4.557z" /></svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="container bg-[#6f3925] text-white pt-20 mt-10">
      <div className=" mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-8">

          {/* Column 1: Logo & Mission */}
          <div className="col-span-2 md:col-span-2">
            <h3 className=" font-bold text-white mb-6">Nomad Yatri</h3>
            <p className="leading-6 max-w-sm">
              India’s first purpose-travel ecosystem connecting volunteers, hosts, and digital nomads with meaningful, affordable, and community-led experiences.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
                <CustomLink href="https://instagram.com" className=" hover:text-pink-500 transition">
                    <InstagramIcon />
                </CustomLink>
                <CustomLink href="https://facebook.com" className=" hover:text-blue-500 transition">
                    <FacebookIcon />
                </CustomLink>
                <CustomLink href="https://twitter.com" className=" hover:text-blue-400 transition">
                    <TwitterIcon />
                </CustomLink>
            </div>
          </div>

          {/* Column 2: Travel Experiences */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-white mb-6">Experiences</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <CustomLink href="/experiences/volunteer-programs" className="hover:text-white transition">
                  Volunteer Programs
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/experiences/work-exchange" className="hover:text-white transition">
                  Work Exchange
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/experiences/digital-nomad-stays" className="hover:text-white transition">
                  Digital Nomad Stays
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/experiences/cultural-experiences" className="hover:text-white transition">
                  Cultural Experiences
                </CustomLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Support */}
          <div className="col-span-1 md:col-span-1">
            <h3 className=" font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <CustomLink href="/about" className="hover:text-white transition">
                  About Us
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/blog" className="hover:text-white transition">
                  Blog
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/contact" className="hover:text-white transition">
                  Contact Support
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/pricing" className="hover:text-white transition">
                  Membership & Pricing
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/host/register" className="hover:text-white transition">
                  Become a Host
                </CustomLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact Details */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
                <li>
                    <CustomLink href="/privacy-policy" className="hover:text-white transition">
                        Privacy Policy
                    </CustomLink>
                </li>
                <li>
                    <CustomLink href="/terms-of-use" className="hover:text-grey transition">
                        Terms of Use
                    </CustomLink>
                </li>
            </ul>
            
            <div className="mt-6">
                <p className="uppercase font-semibold mb-2">Get Help:</p>
                <p className="">
                    <a href="mailto:support@nomadyatri.com" className="hover:text-white transition flex items-center gap-2">
                        support@nomadyatri.com
                    </a>
                </p>
                <p className="mt-1">
                    <a href="tel:+918894108119" className="hover:text-white transition flex items-center gap-2">
                        +91 88941 08119
                    </a>
                </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-1 text-center">
          <p>© {new Date().getFullYear()} Nomad Yatri. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;