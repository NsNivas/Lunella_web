import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';
import { useStore } from '@/store/StoreContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', remember: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      login(form.name || 'New Customer', form.email);
    } else {
      login(form.email.split('@')[0] || 'Welcome Back', form.email);
    }
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush via-cream to-lavender flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><Logo className="mx-auto" /></Link>
        </div>

        <div className="bg-white rounded-3xl p-8 card-shadow-lg">
          {/* Tabs */}
          <div className="flex bg-blush rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                mode === 'login' ? 'bg-plum text-white' : 'text-charcoal'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                mode === 'signup' ? 'bg-plum text-white' : 'text-charcoal'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="font-display text-2xl font-bold text-plum mb-1">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-deep-mauve mb-6">
            {mode === 'login' ? 'Sign in to continue shopping with LUNELLE.' : 'Join LUNELLE for a personalized shopping experience.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-semibold text-charcoal block mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                    placeholder="Your full name" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-semibold text-charcoal block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
                <input type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-charcoal block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
                <input type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-deep-mauve hover:text-plum">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-semibold text-charcoal block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-mauve" />
                  <input type="password" required value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-blush focus:border-plum text-charcoal focus:outline-none"
                    placeholder="••••••••" />
                </div>
              </div>
            )}
            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.remember}
                    onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                    className="w-4 h-4 accent-burgundy" />
                  <span className="text-charcoal">Remember me</span>
                </label>
                <button type="button" className="text-burgundy font-semibold hover:text-plum">Forgot password?</button>
              </div>
            )}
            <button type="submit" className="btn-primary rounded-lg w-full">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-deep-mauve mt-6">
            This is a demo. No real authentication is performed.
          </p>
        </div>

        <p className="text-center text-sm text-deep-mauve mt-6">
          <Link to="/" className="hover:text-plum font-semibold">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
