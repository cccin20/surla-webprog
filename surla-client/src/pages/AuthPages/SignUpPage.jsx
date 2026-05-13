import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:bg-white focus:ring-2 focus:ring-[#eef2ff]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contactNumber: '',
    age: '',
    password: '',
    gender: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setMessage('');
    setIsSuccess(false);
  };

  const validate = () => {
    if (formData.firstName.trim().length < 2) return 'First name must be at least 2 characters.';
    if (formData.lastName.trim().length < 2) return 'Last name must be at least 2 characters.';
    if (!formData.username.trim()) return 'Username is required.';
    if (/\s/.test(formData.username)) return 'Username must not contain spaces.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Enter a valid email address.';
    if (!/^\d{11}$/.test(formData.contactNumber)) return 'Contact number must be exactly 11 digits.';
    if (!/^\d+$/.test(formData.age)) return 'Age must be a number only.';
    if (!formData.gender) return 'Gender is required.';
    if (!formData.address.trim()) return 'Address is required.';
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[^A-Za-z0-9]/.test(formData.password)
    ) {
      return 'Password needs 8+ characters with uppercase, lowercase, number, and special character.';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validate();
    if (validationMessage) {
      setMessage(validationMessage);
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setIsSuccess(false);

    try {
      await registerUser({
        ...formData,
        username: formData.username.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        address: formData.address.trim(),
      });

      setIsSuccess(true);
      setMessage('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/auth/signin'), 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Account creation failed.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form className="space-y-5" onSubmit={handleSubmit}>
        {message && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              isSuccess
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-[#374151]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-[#374151]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-username" className="text-sm font-medium text-[#374151]">
            Username
          </label>
          <input
            id="signup-username"
            name="username"
            type="text"
            placeholder="cindysurla"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-[#374151]">
            Email
          </label>
          <input
            id="signup-email"
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-contact" className="text-sm font-medium text-[#374151]">
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contactNumber"
              type="tel"
              placeholder="09123456789"
              autoComplete="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="signup-age" className="text-sm font-medium text-[#374151]">
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="number"
              min="1"
              placeholder="21"
              value={formData.age}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-gender" className="text-sm font-medium text-[#374151]">
            Gender
          </label>
          <select
            id="signup-gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-medium text-[#374151]">
            Address
          </label>
          <input
            id="signup-address"
            name="address"
            type="text"
            placeholder="City, Province"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-[#374151]">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#4f46e5] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#4338ca] shadow-md hover:shadow-lg"
        >
          {isSubmitting ? 'Creating...' : 'Create Account'}
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
