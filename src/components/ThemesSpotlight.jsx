import React from 'react';
import { Palette, Check, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemesSpotlight = () => {
    const themes = [
        {
            title: "OLED Midnight Candlesticks",
            category: "FX & CHARTS",
            device: "Desktop & iPhone",
            tag: "BESTSELLER",
            accent: "from-emerald/30 to-emerald/10",
            border: "border-emerald/40"
        },
        {
            title: "Cyberpunk Degen Liquidation",
            category: "CRYPTO & DEFI",
            device: "Multi-Monitor",
            tag: "HOT",
            accent: "from-purple-500/30 to-blue-500/10",
            border: "border-purple-500/30"
        },
        {
            title: "Wall Street Institutional Bull",
            category: "STOCKS & EQUITIES",
            device: "Desktop & iPad",
            tag: "MINIMALIST",
            accent: "from-blue-500/30 to-emerald/10",
            border: "border-blue-500/30"
        }
    ];

    const features = [
        "Curated for FX, Crypto, Stocks, Shares, Degen & DeFi traders",
        "Deep pitch-black OLED wallpapers (saves battery & reduces eye strain)",
        "Handcrafted lockscreen widgets, app icons, and matching terminal schemes",
        "Instant digital delivery + cross-device responsive setups"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section id="themes" className="py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side: Copy */}
                    <motion.div
                        className="flex-1 text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs font-bold uppercase tracking-wider mb-4">
                            <Palette size={14} />
                            <span>Themes</span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                            Themes for <br />
                            <span className="bg-gradient-to-r from-emerald via-teal-300 to-electric-blue bg-clip-text text-transparent">
                                FX, Crypto & Equities
                            </span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Stop staring at generic wallpapers. Themes is your dedicated digital marketplace for high-performance trader setups — featuring ultra-crisp 4K/6K OLED candlestick art, cyberpunk crypto/degen aesthetics, stocks & equities themes, and minimalist DeFi dark modes.
                        </motion.p>

                        <motion.div variants={itemVariants} className="space-y-3">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-3"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="h-6 w-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0">
                                        <Check size={14} className="text-emerald" />
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Visual Showcase Deck */}
                    <motion.div
                        className="flex-1 w-full max-w-2xl"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative group">
                            {/* Ambient Glow with motion */}
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-emerald/40 via-purple-500/30 to-electric-blue/40 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 pointer-events-none"
                                animate={{ opacity: [0.25, 0.45, 0.25] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <motion.div
                                className="relative bg-navy-950/90 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Top bar */}
                                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-emerald/60" />
                                    </div>
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald font-bold">
                                        FEATURED PACKS
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                                        <Monitor size={14} />
                                        <Smartphone size={14} />
                                    </div>
                                </div>

                                {/* Themes List */}
                                <div className="space-y-4">
                                    {themes.map((theme, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            transition={{ duration: 0.2 }}
                                            className={`p-4 rounded-xl bg-gradient-to-r ${theme.accent} border ${theme.border} hover:border-emerald transition-all duration-300 flex items-center justify-between group/card`}
                                        >
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-black/40 text-emerald uppercase">
                                                        {theme.category}
                                                    </span>
                                                    <span className="text-[10px] font-semibold text-gray-400">
                                                        {theme.device}
                                                    </span>
                                                </div>
                                                <h4 className="text-base font-bold text-white group-hover/card:text-emerald transition-colors">
                                                    {theme.title}
                                                </h4>
                                            </div>

                                            <div className="text-right">
                                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald text-navy-950 uppercase block font-mono">
                                                    {theme.tag}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Banner Bottom */}
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5 text-emerald font-medium">
                                        <Sparkles size={14} />
                                        <span>Instant Automated Digital Delivery</span>
                                    </span>
                                    <span className="text-gray-500 font-mono text-[11px]">
                                        4K OLED & 6K Multi-Monitor
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ThemesSpotlight;
