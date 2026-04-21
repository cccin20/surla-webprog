import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:bg-white focus:ring-2 focus:ring-[#eef2ff]';

const SignUpPage = () => {
  return (
    <>
      <div className="mb-8">
        <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
          Get Started
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
          Sign Up
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#64748b]">
          Create an account to save articles and follow my dev journey.
        </p>
      </div>

      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-[#374151]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-[#374151]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-[#374151]">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-[#374151]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#4f46e5] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4338ca] shadow-md hover:shadow-lg"
        >
          Create Account
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
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-[#4f46e5] transition hover:text-[#4338ca]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;