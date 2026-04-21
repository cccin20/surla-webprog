import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:bg-white focus:ring-2 focus:ring-[#eef2ff]';

const SignInPage = () => {
  return (
    <>
      <div className="mb-8">
        <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
          Portfolio Access
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
          Log In
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#64748b]">
          Access your account to manage your portfolio and articles.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-[#374151]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-[#374151]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#64748b]">
            <input type="checkbox" className="h-4 w-4 rounded border-[#e2e8f0] accent-[#4f46e5]" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-[#4f46e5] transition hover:text-[#4338ca]">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#4f46e5] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4338ca] shadow-md hover:shadow-lg"
        >
          Log In
        </button>

        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className="w-full rounded-full border-2 border-[#e2e8f0] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b] transition hover:border-[#4f46e5] hover:text-[#4f46e5]">
            Google
          </button>
          <button type="button" className="w-full rounded-full border-2 border-[#e2e8f0] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748b] transition hover:border-[#4f46e5] hover:text-[#4f46e5]">
            Apple
          </button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#e2e8f0] pt-6 text-sm text-[#64748b]">
        No account yet?{' '}
        <Link to="/auth/signup" className="font-semibold text-[#4f46e5] transition hover:text-[#4338ca]">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;