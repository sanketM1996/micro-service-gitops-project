import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  User,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await register(name, email, password, role);

      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b14] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#101421]/90 shadow-2xl shadow-black/40 lg:grid-cols-2">

          {/* Left branding panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 p-10 lg:flex xl:p-14">
            <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-12 -top-8 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

            <div className="relative">
              <div className="mb-10 flex items-center gap-3">
                <div className="rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  TaskFlow
                </span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-50">
                <Sparkles className="h-3.5 w-3.5" />
                YOUR PRODUCTIVITY JOURNEY
              </span>

              <h1 className="mt-6 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Organize your work.
                <span className="mt-2 block text-indigo-200">
                  Achieve more.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-indigo-100/80">
                Create your account and experience a smarter way to manage
                tasks, collaborate, and stay on top of everything.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  'Keep all your tasks in one place',
                  'Stay focused on what matters',
                  'Build better productivity habits',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-200" />
                    <span className="text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlighted Instagram profile */}
            <a
              href="https://www.instagram.com/devwithsanket/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-12 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 transition duration-300 hover:border-white/40 hover:bg-white/15"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 p-2.5 shadow-lg">
                 <span className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white text-xs font-bold text-white">
  IG
</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-indigo-100/80">
                    FOLLOW ME ON INSTAGRAM
                  </p>
                  <p className="mt-1 truncate font-bold tracking-wide text-white">
                    @devwithsanket
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/80" />
            </a>
          </div>

          {/* Registration form */}
          <div className="p-6 sm:p-10 lg:p-10 xl:p-14">
            {/* Mobile brand */}
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-indigo-500/15 p-2">
                  <CheckCircle2 className="h-6 w-6 text-indigo-400" />
                </div>
                <span className="text-lg font-bold">TaskFlow</span>
              </div>

              <a
                href="https://www.instagram.com/devwithsanket/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram profile @devwithsanket"
                className="flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20"
              >
                <span className="text-xs font-bold">IG</span>
                @devwithsanket
              </a>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                GET STARTED FOR FREE
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Join the microservices todo ecosystem and get started today.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300"
              >
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full name
                </label>
                <div className="group relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#171c2b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#171c2b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />
                  <input
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#171c2b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="register-role"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Account role
                </label>
                <div className="group relative">
                  <ShieldAlert className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />
                  <select
                    id="register-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#171c2b] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  >
                    <option value="User">User</option>
                    {/* <option value="Manager">Manager</option> */}
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-300 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create your account
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">ALREADY A MEMBER?</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Instagram footer for desktop */}
            <div className="mt-8 border-t border-white/10 pt-5 text-center">
              <p className="text-xs text-slate-500">
                Built with passion by{' '}
                <a
                  href="https://www.instagram.com/devwithsanket/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-pink-400 transition hover:text-pink-300 hover:underline"
                >
                  <span className="text-[10px] font-bold">IG</span>
                  @devwithsanket
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
