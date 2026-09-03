import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  AtSign,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Send,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    userData,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    resendVerificationEmail,
    checkEmailVerified,
    resetPassword,
    logout
  } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const redirectTarget = searchParams.get('redirect') || '/ecosystem';

  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Email verification screen state
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [verificationEmailTarget, setVerificationEmailTarget] = useState('');
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Status & feedback
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleGoogleAuth = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      const res = await loginWithGoogle();
      // If user already has an established custom handle, navigate directly.
      // If new Google user, UsernameModal is opened by AuthContext to prompt for unique username.
      if (res?.profile?.username) {
        navigate(redirectTarget);
      }
    } catch (err) {
      setError(err.message || 'Google sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
        if (!cleanUsername || cleanUsername.length < 3) {
          throw new Error('Please choose a valid username with at least 3 characters.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }

        const res = await signUpWithEmail(email.trim(), password, cleanUsername);
        if (res?.needsEmailVerification) {
          setVerificationEmailTarget(email.trim());
          setNeedsEmailVerification(true);
        } else {
          navigate(redirectTarget);
        }
      } else {
        const res = await loginWithEmail(email.trim(), password);
        // Check if email is verified
        if (res?.user && !res.user.emailVerified) {
          setVerificationEmailTarget(email.trim());
          setNeedsEmailVerification(true);
        } else {
          navigate(redirectTarget);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
        msg = 'Invalid email or password. Please check your credentials.';
      } else if (msg.includes('auth/email-already-in-use')) {
        msg = 'An account with this email already exists. Try signing in instead.';
      } else if (msg.includes('auth/weak-password')) {
        msg = 'Password is too weak. Please use at least 6 characters.';
      }
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check email verification link status
  const handleCheckEmailVerified = async () => {
    setError('');
    setSuccessMessage('');
    setIsCheckingVerification(true);
    try {
      const isVerified = await checkEmailVerified();
      if (isVerified) {
        navigate(redirectTarget);
      } else {
        setError('Your email is not verified yet. Please open the link sent to your inbox, then click this button again.');
      }
    } catch (err) {
      setError(err.message || 'Could not verify email status. Please try again.');
    } finally {
      setIsCheckingVerification(false);
    }
  };

  // Resend email verification link
  const handleResendVerification = async () => {
    setError('');
    setSuccessMessage('');
    setIsResending(true);
    try {
      await resendVerificationEmail();
      setSuccessMessage(`A fresh verification link has been dispatched to ${verificationEmailTarget}.`);
    } catch (err) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email address above to receive a password reset link.');
      return;
    }
    setIsResetting(true);
    setError('');
    try {
      await resetPassword(email.trim());
      setSuccessMessage(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setIsResetting(false);
    }
  };

  const activeHandle = userData?.username
    ? userData.username
    : user?.displayName
    ? user.displayName
    : user?.email;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-emerald/30">
      {/* Background ambient lighting */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-emerald/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Brand Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="inline-flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="JTG Logo"
            className="h-12 w-auto"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-2xl font-black tracking-tight text-white uppercase group-hover:text-emerald transition-colors">
            Johnad Traders Group
          </span>
        </Link>
        <p className="text-sm text-gray-400 mt-2 font-medium">
          Sign in or create an account to access all arms of the JTG Ecosystem
        </p>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-navy-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10"
      >
        {/* Email Verification Pending Screen */}
        {needsEmailVerification ? (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(27,166,87,0.3)]">
              <Mail size={32} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Verify Your Email
              </h2>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                We sent a secure activation link to: <br />
                <span className="font-bold text-white font-mono">{verificationEmailTarget}</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Please click the link inside the email before proceeding to your dashboard. Check your spam or promotions folder if needed.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-start gap-2.5 text-left"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 bg-emerald/10 border border-emerald/20 rounded-xl text-xs text-emerald flex items-start gap-2.5 text-left"
                >
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <motion.button
                type="button"
                onClick={handleCheckEmailVerified}
                disabled={isCheckingVerification}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald/90 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(27,166,87,0.35)] cursor-pointer"
              >
                {isCheckingVerification ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Status...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>I've Verified My Email</span>
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="text-xs text-gray-400 hover:text-emerald underline cursor-pointer font-medium flex items-center gap-1"
                >
                  {isResending ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  <span>Resend Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNeedsEmailVerification(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-gray-500 hover:text-white cursor-pointer font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Already logged-in banner */}
            {user && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald/10 border border-emerald/30 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald">Active Account</span>
                    <p className="text-sm font-bold truncate text-white">{activeHandle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="text-xs text-red-400 hover:text-red-300 underline font-medium cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
                <Link
                  to="/ecosystem"
                  className="w-full py-2.5 px-4 bg-emerald hover:bg-emerald/90 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(27,166,87,0.3)] transition-all"
                >
                  <LayoutDashboard size={14} />
                  <span>Continue to Dashboard</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Toggle Sign In / Sign Up */}
            <div className="grid grid-cols-2 p-1.5 bg-navy-950/80 rounded-2xl border border-white/5 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'signin'
                    ? 'bg-emerald text-white shadow-lg shadow-emerald/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'signup'
                    ? 'bg-emerald text-white shadow-lg shadow-emerald/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <UserPlus size={15} />
                <span>Create Account</span>
              </button>
            </div>

            {/* Google Quick Login */}
            <motion.button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald/40 text-white font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-3 cursor-pointer mb-6 shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-navy-900 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                Or with Email
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            {/* Feedback Alerts */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-start gap-2.5"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3.5 bg-emerald/10 border border-emerald/20 rounded-xl text-xs text-emerald flex items-start gap-2.5"
                >
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Auth Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Claim Unique Handle
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald">
                      <AtSign size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="chosen_handle"
                      maxLength={20}
                      className="w-full pl-10 pr-4 py-3 bg-navy-950/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald font-mono text-sm"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Alphanumeric & underscores only. Your permanent JTG identity.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@domain.com"
                    className="w-full pl-10 pr-4 py-3 bg-navy-950/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isResetting}
                      className="text-xs text-emerald hover:underline cursor-pointer font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full pl-10 pr-10 py-3 bg-navy-950/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-3.5 px-4 bg-emerald hover:bg-emerald/90 disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(27,166,87,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Create Account & Send Verification' : 'Sign In to Dashboard'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield size={14} className="text-emerald" />
              <span>Secured by Firebase Auth</span>
            </div>
          </>
        )}
      </motion.div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          &larr; Back to JTG Home
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
