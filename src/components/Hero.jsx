import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy-950">
            {/* Background Blob Animation */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="relative max-w-5xl mx-auto px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-8 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                    </span>
                    JOHNAD TRADERS GROUP IS LIVE
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
                >
                    STOP GAMBLING. <br />
                    <span className="bg-gradient-to-r from-emerald via-teal-300 to-electric-blue bg-clip-text text-transparent inline-block">
                        START SCALING.
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    The institutional command center for modern traders. Precision journaling, digital workstation themes, proprietary risk management, and market intelligence.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/auth">
                        <motion.button
                            className="flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-emerald/20 hover:shadow-emerald/40 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Get Started</span>
                            <ArrowRight size={20} />
                        </motion.button>
                    </Link>
                    <a href="#ecosystem">
                        <motion.button
                            className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 cursor-pointer"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Sparkles size={20} className="text-emerald" />
                            <span>Explore Ecosystem</span>
                        </motion.button>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
