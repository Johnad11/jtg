import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calculator,
  Palette,
  GraduationCap,
  Shield,
  ArrowUpRight,
  ArrowLeft,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronDown,
  Edit3,
  X,
  Check,
  AtSign,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const EcosystemPortal = () => {
  const { user, userData, loading, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Dropdown & Modal States
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Profile Form States
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    username: '',
    tradingStyle: 'Day Trader',
    preferredPair: 'XAUUSD (Gold)',
    bio: 'Risk-first trader executing market structure and institutional order flow.'
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  const dropdownRef = useRef(null);

  const rawUsername =
    userData?.username ||
    user?.displayName?.replace(/[^a-zA-Z0-9_]/g, '') ||
    user?.email?.split('@')[0]?.replace(/[^a-zA-Z0-9_]/g, '') ||
    'Trader';
  const cleanUsername = rawUsername.replace(/^@/, '');

  // Populate profile form from active state when opening modal
  useEffect(() => {
    if (user || userData) {
      setProfileForm((prev) => ({
        ...prev,
        displayName: userData?.displayName || user?.displayName || cleanUsername,
        username: cleanUsername
      }));
    }
  }, [user, userData, cleanUsername]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowDropdown(false);
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess('');
    setIsUpdating(true);

    try {
      const cleanNewHandle = profileForm.username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
      if (!cleanNewHandle || cleanNewHandle.length < 3) {
        throw new Error('Username must contain at least 3 alphanumeric characters or underscores.');
      }
      if (cleanNewHandle.length > 20) {
        throw new Error('Username cannot exceed 20 characters.');
      }

      await updateUserProfile(profileForm.displayName, cleanNewHandle);

      setUpdateSuccess('Profile updated! Previous handle was released immediately.');
      setTimeout(() => {
        setUpdateSuccess('');
        setShowProfileModal(false);
      }, 1600);
    } catch (err) {
      setUpdateError(err.message || 'Failed to update profile. Please try another username.');
    } finally {
      setIsUpdating(false);
    }
  };

  const arms = [
    {
      id: "journal",
      title: "Journal",
      category: "RISK FORTRESS & CALCULATOR",
      description: "Precisely calculate lot sizes, enforce risk-per-trade rules, and eliminate emotional bias with institutional-grade journaling tools.",
      icon: <Calculator className="text-emerald" size={28} />,
      badge: "FREE UTILITY",
      badgeColor: "bg-emerald/10 text-emerald border-emerald/20",
      externalUrl: "https://jtgjournal.johnadtradersgroup.name.ng/",
      cta: "Launch Journal",
      features: ["Live Risk-to-Reward Ratio", "Lot Size Calculator", "Account Drawdown Protection"]
    },
    {
      id: "themes",
      title: "Themes",
      category: "FINANCE & TRADING STOREFRONT",
      description: "Where we sell finance-grade themes and wallpapers: FX candlestick art, crypto, stocks, shares, degen & DeFi aesthetics for multi-monitor, mobile, and tablet setups.",
      icon: <Palette className="text-emerald" size={28} />,
      badge: "STOREFRONT",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      externalUrl: "https://jtg-themes.vercel.app/",
      cta: "Launch Themes Store",
      features: ["FX & Crypto OLED Wallpapers", "Degen & DeFi Terminal Themes", "Stock Market Multi-Monitor Setups"]
    },
    {
      id: "education",
      title: "Education",
      category: "ACADEMY & PSYCHOLOGY",
      description: "Data over guesswork. Access high-level market structure analysis, psychological frameworks, and strategic blueprints tailored for modern prop traders.",
      icon: <GraduationCap className="text-emerald" size={28} />,
      badge: "ACADEMY",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      externalUrl: "https://education.johnadtradersgroup.name.ng/",
      cta: "Launch Education Academy",
      features: ["Institutional Order Flow", "Trader Psychology Protocols", "Prop Firm Rule Blueprints"]
    },
    {
      id: "advisory",
      title: "Advisory",
      category: "INSTITUTIONAL RISK SUITE",
      description: "Institutional-grade risk oversight, bespoke strategy consulting, and portfolio advisory to protect capital and scale across funded prop firms.",
      icon: <Shield className="text-emerald" size={28} />,
      badge: "INSTITUTIONAL",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      externalUrl: "https://prop.johnadtradersgroup.name.ng/",
      cta: "Access Advisory Suite",
      features: ["Prop Firm Challenge Auditing", "Risk Algorithm Diagnostics", "Private Strategy Consultations"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  // If not logged in and not loading, show a clean access gate with Sign In button
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 text-center selection:bg-emerald/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="p-8 sm:p-10 max-w-md w-full bg-navy-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(27,166,87,0.3)]">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
            Ecosystem Access Required
          </h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Please sign in with Google or Email to unlock the full JTG Ecosystem Command Center and all 4 trading pillars.
          </p>
          <Link
            to="/auth"
            className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(27,166,87,0.35)] transition-all cursor-pointer"
          >
            <span>Sign In / Get Started</span>
            <ArrowUpRight size={16} />
          </Link>
          <div className="mt-4">
            <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-emerald/30 pb-20">
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Back Arrow + Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center cursor-pointer group shadow-sm"
              title="Return to Home"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform text-emerald" />
            </Link>

            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src={logo}
                alt="JTG Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
              />
              <div className="hidden sm:block">
                <span className="text-xl font-black uppercase tracking-tight text-white group-hover:text-emerald transition-colors block">
                  Johnad Traders Group
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">
                  Ecosystem Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Right: User Avatar + Dropdown Button */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 bg-navy-900/90 border border-white/10 hover:border-emerald/50 rounded-full pl-2 pr-3.5 py-1.5 shadow-md cursor-pointer transition-all"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-emerald/50 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-xs border border-emerald/40">
                    {user.displayName?.[0]?.toUpperCase() || <User size={14} />}
                  </div>
                )}
                <span className="text-sm font-bold text-emerald max-w-[120px] truncate">
                  @{cleanUsername}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-gray-400 transition-transform duration-200 ${
                    showDropdown ? 'rotate-180 text-emerald' : ''
                  }`}
                />
              </motion.button>

              {/* Dropdown Menu: Only Edit Profile and Sign Out */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-64 bg-navy-900/95 border border-white/10 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-50 text-white"
                  >
                    {/* User Summary Pill */}
                    <div className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-xs border border-emerald/40 shrink-0">
                          {cleanUsername[0]?.toUpperCase() || 'T'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">
                            {user?.displayName || cleanUsername}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate font-mono">
                            @{cleanUsername}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Options: Edit Profile & Sign Out Only */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setShowProfileModal(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left cursor-pointer"
                      >
                        <Edit3 size={15} className="text-emerald" />
                        <span>Edit Profile</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-left cursor-pointer"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.header>

      {/* Main Hub Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Welcome Header Banner: "Welcome username" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-900 to-navy-800/80 border border-white/10 shadow-2xl overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs font-bold tracking-wide uppercase mb-3">
                <ShieldCheck size={14} />
                <span>Verified Member Dashboard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                Welcome <span className="text-emerald">{cleanUsername}</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Your authenticated access portal to all 4 pillars of the Johnad Traders Group ecosystem. Select any arm below to launch its live terminal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 self-start md:self-center">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://jtgjournal.johnadtradersgroup.name.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald hover:bg-emerald/90 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(27,166,87,0.3)]"
              >
                <span>Launch Journal</span>
                <ExternalLink size={15} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://jtg-themes.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles size={15} className="text-emerald" />
                <span>Themes Storefront</span>
                <ExternalLink size={14} className="text-gray-400" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* The 4 Arms Grid */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald mb-1">
              Active Ecosystem Arms
            </h2>
            <p className="text-2xl font-black uppercase text-white">
              Direct Access Terminals
            </p>
          </div>
          <span className="text-xs text-gray-500 font-mono hidden sm:inline-block">
            4 OF 4 SYSTEMS ONLINE
          </span>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {arms.map((arm) => (
            <motion.div
              key={arm.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-navy-900/70 border border-white/10 hover:border-emerald/40 rounded-3xl p-8 backdrop-blur-xl transition-colors shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3.5 bg-navy-950 rounded-2xl border border-white/5 group-hover:border-emerald/30 group-hover:shadow-[0_0_20px_rgba(27,166,87,0.25)] transition-all">
                    {arm.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${arm.badgeColor}`}>
                    {arm.badge}
                  </span>
                </div>

                <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1">
                  {arm.category}
                </p>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald transition-colors flex items-center gap-2">
                  <span>{arm.title}</span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {arm.description}
                </p>

                {/* Key feature pills */}
                <div className="space-y-2 mb-8">
                  {arm.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 size={13} className="text-emerald shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={arm.externalUrl}
                  target={arm.externalUrl.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald hover:bg-emerald/90 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(27,166,87,0.2)] cursor-pointer"
                >
                  <span>{arm.cta}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-navy-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald/10 text-emerald border border-emerald/20">
                    <Edit3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase">Edit Trader Profile</h3>
                    <p className="text-xs text-gray-400">Change your unique handle and trader identity</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {updateError && (
                <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-start gap-2.5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{updateError}</span>
                </div>
              )}

              {updateSuccess && (
                <div className="mb-4 p-3.5 bg-emerald/10 border border-emerald/20 text-emerald text-xs font-semibold rounded-xl flex items-center gap-2">
                  <Check size={16} />
                  <span>{updateSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Unique Handle / Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald">
                      <AtSign size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={profileForm.username}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
                        })
                      }
                      maxLength={20}
                      className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-emerald"
                      placeholder="new_unique_handle"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Changing your handle checks for uniqueness and releases your previous handle immediately.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Display Name / Trader Alias
                  </label>
                  <input
                    type="text"
                    value={profileForm.displayName}
                    onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                      Trading Style
                    </label>
                    <select
                      value={profileForm.tradingStyle}
                      onChange={(e) => setProfileForm({ ...profileForm, tradingStyle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald"
                    >
                      <option value="Scalper">Scalper (M1-M5)</option>
                      <option value="Day Trader">Day Trader (M15-H1)</option>
                      <option value="Swing Trader">Swing Trader (H4-D1)</option>
                      <option value="Position Trader">Position Trader (Weekly)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                      Primary Asset
                    </label>
                    <select
                      value={profileForm.preferredPair}
                      onChange={(e) => setProfileForm({ ...profileForm, preferredPair: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald"
                    >
                      <option value="XAUUSD (Gold)">XAUUSD (Gold)</option>
                      <option value="EURUSD (Euro)">EURUSD (Euro)</option>
                      <option value="BTCUSD (Bitcoin)">BTCUSD (Crypto)</option>
                      <option value="NAS100 (Nasdaq)">NAS100 (Indices)</option>
                      <option value="US30 (Dow Jones)">US30 (Indices)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Trading Bio / Motto
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald resize-none"
                    placeholder="Short bio or strategy rules"
                  />
                </div>

                <div className="pt-3 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2.5 bg-emerald hover:bg-emerald/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Verifying & Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Save Profile Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcosystemPortal;
