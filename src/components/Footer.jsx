import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          {/* Left — branding */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-[#0f172a] tracking-wide">
              Cindy Ella Surla
            </p>
            <p className="text-xs text-[#64748b] mt-1">
              BSIT Student · Learning in Public
            </p>
          </div>

          {/* Center — nav links */}
          <div className="flex gap-6 text-sm text-[#64748b]">
            <Link to="/" className="hover:text-[#4f46e5] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#4f46e5] transition-colors">About</Link>
            <Link to="/articles" className="hover:text-[#4f46e5] transition-colors">Articles</Link>
          </div>

          {/* Right — social links */}
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/cccin20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] hover:text-[#4f46e5] transition-colors font-medium"
            >
              GitHub
            </a>
            
            <a
              href="https://www.linkedin.com/in/cindy-ella-surla-b2575926b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] hover:text-[#4f46e5] transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-[#e2e8f0] pt-6 text-center">
          <p className="text-xs text-[#94a3b8]">
            &copy; {new Date().getFullYear()} Cindy Ella Surla. Built with React, Vite & Tailwind CSS.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;