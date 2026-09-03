import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calculator, GraduationCap, Palette, Shield, ArrowUpRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Ecosystem = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const products = [
        {
            title: "Journal",
            icon: (
                <div className="relative">
                    <Calculator className="text-emerald" size={24} />
                    <Lock size={12} className="absolute -bottom-1 -right-1 text-emerald bg-navy-900 rounded-full" />
                </div>
            ),
            text: "Your digital risk fortress. Precisely calculate lot sizes, track performance metrics, and eliminate emotional bias with institutional-grade journaling tools.",
            badge: "FREE UTILITY",
            targetUrl: "https://jtgjournal.johnadtradersgroup.name.ng/",
            cta: "Access Journal"
        },
        {
            title: "Themes",
            icon: <Palette className="text-emerald" size={24} />,
            text: "Next-generation dark mode digital storefront and UI systems purpose-built for FX, crypto, stocks, shares, degen and DeFi trading setups.",
            badge: "STOREFRONT",
            targetUrl: "https://themes.johnadtradersgroup.name.ng/",
            cta: "Access Themes"
        },
        {
            title: "Education",
            icon: <GraduationCap className="text-emerald" size={24} />,
            text: "Data over guesswork. Access high-level market analysis, psychological frameworks, and strategic blueprints designed for the modern fintech landscape.",
            badge: "ACADEMY",
            targetUrl: "https://education.johnadtradersgroup.name.ng/",
            cta: "Access Education"
        },
        {
            title: "Advisory",
            icon: <Shield className="text-emerald" size={24} />,
            text: "Institutional-grade risk oversight, bespoke strategy consulting, and portfolio advisory to protect capital and scale across prop firms.",
            badge: "INSTITUTIONAL",
            targetUrl: "https://prop.johnadtradersgroup.name.ng/",
            cta: "Access Advisory"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    const handleArmClick = (e, targetUrl) => {
        if (!user) {
            e.preventDefault();
            // If user isn't logged in, redirect them directly to the sign up / login page
            navigate('/auth?redirect=/ecosystem');
        } else if (targetUrl.startsWith('http')) {
            e.preventDefault();
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id="ecosystem" className="py-24 bg-navy-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-emerald font-bold tracking-widest text-sm mb-3 uppercase">
                        The Core Ecosystem
                    </h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                        Engineered for High-Performance Traders
                    </h3>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {products.map((product, index) => {
                        const destination = user ? product.targetUrl : '/auth?redirect=/ecosystem';
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group relative p-8 rounded-2xl bg-navy-800/40 backdrop-blur-xl border border-white/5 hover:border-emerald/50 transition-colors flex flex-col h-full shadow-lg"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-navy-900 rounded-xl border border-white/5 group-hover:border-emerald/30 group-hover:shadow-[0_0_15px_rgba(27,166,87,0.2)] transition-all">
                                        {product.icon}
                                    </div>
                                    {product.badge && (
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald/10 text-emerald border border-emerald/20">
                                            {product.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <a
                                        href={destination}
                                        onClick={(e) => handleArmClick(e, product.targetUrl)}
                                        className="block group-hover:text-emerald transition-colors cursor-pointer"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-1">
                                            <span>{product.title}</span>
                                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald" />
                                        </h3>
                                    </a>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                        {product.text}
                                    </p>
                                </div>

                                <a
                                    href={destination}
                                    onClick={(e) => handleArmClick(e, product.targetUrl)}
                                    className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-emerald hover:border-emerald hover:text-white transition-all duration-300 gap-2 cursor-pointer group-hover:shadow-[0_0_15px_rgba(27,166,87,0.25)]"
                                >
                                    <span>{product.cta}</span>
                                    <ArrowUpRight size={16} />
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Ecosystem;
