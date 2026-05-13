import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:bg-white focus:ring-2 focus:ring-[#eef2ff]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await loginUser(formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.type);
      localStorage.setItem('firstName', response.data.firstName);

      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form className="space-y-5" onSubmit={handleSubmit}>
        {message && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {message}
          </div>
        )}

        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-[#374151]">
            Email Address
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-[#374151]">
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={inputClasses}
            required
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
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#4f46e5] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4338ca] shadow-md hover:shadow-lg"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
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
