import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, AtSign, AlertCircle, Loader2, LogOut } from 'lucide-react';

const UsernameModal = ({ isOpen, onSubmit, onLogout, userEmail, initialSuggestedUsername = '' }) => {
  const [username, setUsername] = useState(initialSuggestedUsername);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const validateUsername = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Username cannot be empty.';
    }
    if (trimmed.length < 3) {
      return 'Username must be at least 3 characters.';
    }
    if (trimmed.length > 20) {
      return 'Username cannot exceed 20 characters.';
    }
    // Only alphanumeric and underscore
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return 'Only letters, numbers, and underscores (_) are allowed.';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(val);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(username.trim());
      // Upon claiming username, navigate immediately to dashboard!
      navigate('/ecosystem');
    } catch (err) {
      setError(err.message || 'Failed to claim username. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-navy-900/95 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(27,166,87,0.25)] text-white">
        {/* Glow effect */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald shadow-[0_0_20px_rgba(27,166,87,0.3)]">
            <UserCheck size={28} />
          </div>

          <h2 className="text-2xl font-black text-center tracking-tight text-white mb-2">
            Claim Your Unique Handle
          </h2>
          <p className="text-sm text-center text-gray-400 mb-6">
            Welcome to the JTG Ecosystem! Choose your unique <span className="text-emerald font-semibold">@username</span> before entering your dashboard.
          </p>

          {userEmail && (
            <div className="mb-6 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-400 text-center truncate">
              Signed in as <span className="text-gray-200 font-medium">{userEmail}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Choose Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald">
                  <AtSign size={18} />
                </div>
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="your_handle"
                  maxLength={20}
                  autoFocus
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-navy-950/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all font-mono text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                3–20 characters. Alphanumeric and underscores only.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !username.trim()}
              className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_25px_rgba(27,166,87,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying & Setting Up Dashboard...</span>
                </>
              ) : (
                <span>Claim Handle & Launch Dashboard</span>
              )}
            </button>
          </form>

          {onLogout && (
            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <button
                type="button"
                onClick={onLogout}
                className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={13} />
                <span>Cancel and Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;
