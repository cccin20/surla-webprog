import { NavLink } from 'react-router-dom';
import logo from '../assets/CS_LOGO.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200',
    isActive
      ? 'text-white bg-[#4f46e5] rounded-full'
      : 'text-[#64748b] hover:text-[#4f46e5]',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e8f0] bg-[#f8fafc]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="CS Logo" className="h-10 w-10 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#1e293b]">
              Cindy Surla
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#64748b] mt-0.5">
              Frontend Developer
            </span>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/auth/signin"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#4f46e5] transition-all duration-200"
          >
            Sign In
          </NavLink>
          <a
            href="mailto:inquiry.cindy111@gmail.com"
            className="inline-flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[11px] font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Hire Me
          </a>
        </div>

      </div>
    </header>
  );
};

export default NavBar;