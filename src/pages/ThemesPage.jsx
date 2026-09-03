import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const ThemesPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState('All');

  const categories = ['All', 'FX & Charts', 'Crypto & Web3', 'DeFi & Degen', 'Stocks & Shares', 'Motivation'];
  const devices = ['All', 'Desktop 4K/6K', 'iPhone/Android', 'Dual Monitor', 'Full Bundle'];

  const products = [
    {
      id: 1,
      title: "Midnight Candlesticks OLED",
      category: "FX & Charts",
      device: "Desktop 4K/6K",
      price: "$19",
      description: "True OLED black backdrop with luminescent green and red institutional order blocks. Eliminates eye fatigue during 8-hour London/NY sessions.",
      badge: "BESTSELLER",
      badgeColor: "bg-emerald/10 text-emerald border-emerald/20",
      resolution: "4K UHD + 6K Ultrawide",
      includes: "12 OLED Wallpapers + Matching Lockscreen Widgets"
    },
    {
      id: 2,
      title: "Cyberpunk Degen Liquidation",
      category: "Crypto & Web3",
      device: "Dual Monitor",
      price: "$24",
      description: "High-octane neon cyan & hot magenta trading terminal wallpaper with live on-chain heatmaps and liquidation waterfall aesthetics.",
      badge: "POPULAR",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      resolution: "Dual 4K / 32:9 Super Ultrawide",
      includes: "16 Dual-Display Wallpapers + 20 Custom App Icons"
    },
    {
      id: 3,
      title: "Wall Street Institutional Bull",
      category: "Stocks & Shares",
      device: "Desktop 4K/6K",
      price: "$19",
      description: "Understated elegance. Matte dark-navy finish with subtle golden Fibonacci golden ratio geometry and S&P/Nasdaq market cap layouts.",
      badge: "MINIMALIST",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      resolution: "Retina 5K + 4K UHD",
      includes: "10 Wallpapers + Dark Mode Terminal Color Palettes"
    },
    {
      id: 4,
      title: "DeFi Yield Protocol Dark Suite",
      category: "DeFi & Degen",
      device: "iPhone/Android",
      price: "$14",
      description: "Sleek mobile lockscreens featuring decentralized liquidity pool vectors, gas tracking widgets, and smart contract flowcharts.",
      badge: "NEW",
      badgeColor: "bg-emerald/10 text-emerald border-emerald/20",
      resolution: "Super Retina OLED Mobile",
      includes: "8 Phone Lockscreen Wallpapers + Widget Themes"
    },
    {
      id: 5,
      title: "Golden Hour Fibonacci Master",
      category: "FX & Charts",
      device: "Full Bundle",
      price: "$39",
      description: "The complete setup. Harmonious bronze, gold, and deep charcoal themes calibrated to Fibonacci retracement levels across all devices.",
      badge: "COMPLETE PACK",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      resolution: "Universal All-Device Bundle",
      includes: "Desktop, Dual Monitor, iPad, and Phone Suite"
    },
    {
      id: 6,
      title: "Terminal Alpha & Degen Heatmaps",
      category: "Crypto & Web3",
      device: "Dual Monitor",
      price: "$22",
      description: "Inspired by Bloomberg terminals with a Web3 degen twist. Real-time volatility gradient patterns and perpetual funding rate schemes.",
      badge: "ALPHA",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      resolution: "Dual 4K + Ultrawide",
      includes: "14 Wallpapers + Code Editor Color Presets"
    }
  ];

  const filteredProducts = products.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDev = selectedDevice === 'All' || item.device === selectedDevice;
    return matchesCat && matchesDev;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-emerald/30 pb-20">
      {/* Top Bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src={logo}
                alt="JTG Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
              />
              <div>
                <span className="text-xl font-black uppercase tracking-tight text-white group-hover:text-emerald transition-colors block">
                  Themes
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">
                  Digital Storefront
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ecosystem"
              className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Ecosystem Hub</span>
              <ArrowUpRight size={13} />
            </Link>

            <Link
              to={user ? "/ecosystem" : "/auth"}
              className="bg-emerald hover:bg-emerald/90 text-white px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(27,166,87,0.3)]"
            >
              {user ? "My Account" : "Login"}
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Header */}
      <div className="relative py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs font-bold uppercase tracking-wider mb-5">
            <Palette size={14} />
            <span>Curated for FX, Crypto, Stocks & DeFi Battlestations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">
            High-Performance <br />
            <span className="bg-gradient-to-r from-emerald via-teal-300 to-electric-blue bg-clip-text text-transparent">
              Themes & Wallpapers
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            Elevate your daily workstation with handcrafted OLED candlestick art, dark-mode crypto aesthetics, Wall Street minimalist suites, and matching mobile lockscreens.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald text-white shadow-lg shadow-emerald/20'
                    : 'bg-navy-900 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-navy-900/80 border border-white/10 hover:border-emerald/40 rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-colors shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${product.badgeColor} font-mono`}>
                    {product.badge}
                  </span>
                  <span className="text-xl font-black text-white">{product.price}</span>
                </div>

                <div className="text-[11px] font-mono text-emerald font-semibold uppercase tracking-wider mb-1">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="p-3 bg-navy-950/80 rounded-xl border border-white/5 space-y-1.5 text-[11px] text-gray-300 font-mono mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Format:</span>
                    <span className="text-white">{product.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Includes:</span>
                    <span className="text-emerald">{product.includes}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-3">
                <Link
                  to={user ? "/ecosystem" : "/auth?mode=signup"}
                  className="w-full py-3 px-4 bg-emerald hover:bg-emerald/90 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(27,166,87,0.2)]"
                >
                  <ShoppingBag size={15} />
                  <span>Get Theme Pack</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ThemesPage;
