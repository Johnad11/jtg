import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectHive = () => {
    const [equity, setEquity] = useState(100245.50);

    useEffect(() => {
        const interval = setInterval(() => {
            setEquity(prev => prev + (Math.random() * 2 - 0.5));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="hive" className="py-24 bg-gradient-to-b from-navy-950 to-navy-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side: Content */}
                    <motion.div
                        className="flex-1 text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.h2 variants={itemVariants} className="text-emerald font-bold tracking-widest text-sm mb-4">
                            PROJECT HIVE
                        </motion.h2>
                        <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            COMMUNITY-OWNED <br />
                            PROP FIRM ACCOUNT.
                        </motion.h3>
                        <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Experience the power of collective trading. Project Hive is our institutional-grade account managed by the JTG community. We pool expertise, data, and risk management to scale together.
                        </motion.p>
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                                    <Target size={14} className="text-emerald" />
                                </div>
                                <span className="text-gray-300 font-medium">Shared Capital & Risk</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                                    <Zap size={14} className="text-emerald" />
                                </div>
                                <span className="text-gray-300 font-medium">Real-time Trading Insights</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Terminal Mockup */}
                    <motion.div
                        className="flex-1 w-full max-w-2xl"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative group">
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-emerald/50 to-electric-blue/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            ></motion.div>

                            <motion.div
                                className="relative bg-[#020617] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Terminal Header */}
                                <div className="bg-navy-800/50 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest">LIVE TRADING TERMINAL</div>
                                    <div className="w-12"></div>
                                </div>

                                {/* Terminal Content */}
                                <div className="p-6 font-mono">
                                    <div className="mb-8">
                                        <div className="text-gray-500 text-xs mb-1">TOTAL EQUITY</div>
                                        <div className="text-3xl font-bold text-white tracking-tight">
                                            ${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-sm">
                                        {/* Pair 1 */}
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <TrendingUp size={16} className="text-emerald" />
                                                <div>
                                                    <div className="text-white font-bold">XAUUSD</div>
                                                    <div className="text-[10px] text-emerald font-bold">BUY</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-emerald font-bold">+$1,420.00</div>
                                                <div className="text-[10px] text-gray-500">0.50 LOTS</div>
                                            </div>
                                        </div>

                                        {/* Pair 2 */}
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <TrendingDown size={16} className="text-red-500" />
                                                <div>
                                                    <div className="text-white font-bold">US30</div>
                                                    <div className="text-[10px] text-red-500 font-bold">SELL</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-red-500 font-bold">-$450.20</div>
                                                <div className="text-[10px] text-gray-500">2.00 LOTS</div>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="https://jtg-project-hive.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mt-6 py-3 bg-emerald/10 hover:bg-emerald/20 border border-emerald/30 text-emerald text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        Login to View Live
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProjectHive;
