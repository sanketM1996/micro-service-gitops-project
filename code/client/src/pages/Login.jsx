
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-10">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-800/80 bg-gray-900/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">

          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4 shadow-lg shadow-indigo-500/5">
              <CheckCircle2 className="h-9 w-9 text-indigo-400" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Welcome Back
              <span className="mt-1 block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sanket
              </span>
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              Sign in to your microservices todo account and manage your tasks.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400"
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Email Address
              </label>

              <div className="group relative">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-400" />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-800/70 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Password
              </label>

              <div className="group relative">
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-indigo-400" />

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700/80 bg-gray-800/70 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline"
            >
              Register here
            </Link>
          </p>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
              Connect with me
            </span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Instagram Highlight */}
          <a
            href="https://www.instagram.com/devwithsanket/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @devwithsanket on Instagram"
            className="group flex items-center gap-4 rounded-xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-amber-400/10 p-4 transition duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div className="shrink-0 rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 p-2.5 shadow-lg shadow-pink-500/20 transition-transform duration-300 group-hover:scale-105">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white text-xs font-bold text-white">
                IG
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-pink-200/80">
                Follow me on Instagram
              </p>
              <p className="mt-1 truncate font-bold tracking-wide text-white transition-colors group-hover:text-pink-200">
                @devwithsanket
              </p>
            </div>

            <ArrowRight className="h-4 w-4 shrink-0 text-pink-300 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-600">
          Built with care · Microservices Todo
        </p>
      </div>
    </div>
  );
};
