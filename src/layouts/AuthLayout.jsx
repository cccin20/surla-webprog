import { Outlet, useLocation } from 'react-router-dom';
import profileImg from '../assets/CS_Profile.JPG';

const panelContent = {
  '/auth/signin': {
    badge: 'Welcome Back',
    heading: 'Good to see you again, Cindy.',
    sub: 'Sign in to manage your articles, update your portfolio, and track your progress.',
  },
  '/auth/signup': {
    badge: 'Join My Network',
    heading: 'Follow along the journey.',
    sub: 'Create an account to save articles, bookmark your favorites, and follow my dev journey.',
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();
  const panel = panelContent[pathname] || panelContent['/auth/signin'];

  return (
    <section className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">

        {/* Left Panel */}
        <div className="relative hidden lg:flex flex-col items-center justify-center bg-[#4f46e5] px-16 py-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Profile photo */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl mb-6">
              <img
                src={profileImg}
                alt="Cindy Surla"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-white px-3 py-1 rounded-full">
              {panel.badge}
            </span>

            <h2 className="text-2xl font-bold text-white leading-snug">
              {panel.heading}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#c7d2fe]">
              {panel.sub}
            </p>

            <div className="mt-8 border-t border-white/20 pt-6 w-full">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 mb-1">
                Cindy Ella Surla
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                BSIT Student · National University Manila
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <main className="flex items-center justify-center bg-white px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;