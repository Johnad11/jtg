import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User, ShieldCheck, LayoutDashboard, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, userData, loading, logout } = useAuth();
    const navigate = useNavigate();

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setDropdownOpen(false);
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const displayHandle = userData?.username
        ? `@${userData.username}`
        : user?.displayName
        ? `@${user.displayName.replace(/\s+/g, '').toLowerCase()}`
        : '@trader';

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo & Name */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.img
                            src={logo}
                            alt="JTG Logo"
                            className="h-10 w-auto"
                            whileHover={{ scale: 1.06, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase group-hover:text-emerald transition-colors">
                            Johnad Traders Group
                        </span>
                    </Link>

                    {/* Right side: Login Button OR User Profile */}
                    <div className="flex items-center gap-4">
                        {loading ? (
                            <div className="h-10 w-28 bg-white/5 animate-pulse rounded-full" />
                        ) : user ? (
                            <div className="relative" ref={dropdownRef}>
                                <motion.button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-white/10 hover:border-emerald/50 transition-all text-left focus:outline-none focus:ring-1 focus:ring-emerald cursor-pointer group shadow-lg shadow-black/40"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User avatar"}
                                            className="w-8 h-8 rounded-full object-cover border border-emerald/50 group-hover:border-emerald"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold border border-emerald/40 text-xs">
                                            {user.displayName?.[0]?.toUpperCase() || <User size={16} />}
                                        </div>
                                    )}

                                    <span className="text-sm font-bold text-white group-hover:text-emerald transition-colors hidden sm:inline-block pr-1">
                                        {displayHandle}
                                    </span>

                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-400 group-hover:text-white transition-transform duration-200 ${
                                            dropdownOpen ? 'rotate-180 text-emerald' : ''
                                        }`}
                                    />
                                </motion.button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute right-0 mt-2 w-64 rounded-2xl bg-navy-900/95 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] py-2 z-50 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                                <div className="flex items-center gap-3">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt="Avatar"
                                                            className="w-10 h-10 rounded-full border border-emerald/40"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold border border-emerald/40">
                                                            {user.displayName?.[0]?.toUpperCase() || <User size={18} />}
                                                        </div>
                                                    )}
                                                    <div className="overflow-hidden">
                                                        <p className="text-sm font-bold text-white truncate">
                                                            {user.displayName || 'Trader'}
                                                        </p>
                                                        <p className="text-xs font-bold text-emerald truncate">
                                                            {displayHandle}
                                                        </p>
                                                        <p className="text-[11px] text-gray-400 truncate">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald/10 text-emerald text-[11px] font-semibold">
                                                    <ShieldCheck size={14} />
                                                    <span>Verified JTG Identity</span>
                                                </div>
                                            </div>

                                            <div className="py-1.5">
                                                <Link
                                                    to="/ecosystem"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="w-full text-left px-4 py-2.5 text-xs text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors font-medium"
                                                >
                                                    <span className="text-emerald font-bold">Launch Ecosystem Portal</span>
                                                    <LayoutDashboard size={14} className="text-emerald" />
                                                </Link>
                                            </div>

                                            <div className="pt-1 border-t border-white/5">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                                                >
                                                    <LogOut size={14} />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/auth">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(27,166,87,0.45)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(27,166,87,0.35)] cursor-pointer"
                                >
                                    <LogIn size={16} />
                                    <span>Login</span>
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
