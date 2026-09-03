import React from 'react';
import { motion } from 'framer-motion';

const SpotlightLayout = ({ badge, headline, description, features, mockup, reverse = false, id }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section id={id} className="py-24 bg-navy-950 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    {/* Content Side */}
                    <motion.div
                        className="flex-1 text-left"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.h2 variants={itemVariants} className="text-emerald font-bold tracking-widest text-sm mb-4 uppercase">
                            {badge}
                        </motion.h2>
                        <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                            {headline}
                        </motion.h3>
                        <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-8 leading-relaxed">
                            {description}
                        </motion.p>
                        <motion.div variants={itemVariants} className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="h-6 w-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center flex-shrink-0">
                                        {React.cloneElement(feature.icon, { size: 14, className: "text-emerald" })}
                                    </div>
                                    <span className="text-gray-300 font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Mockup Side */}
                    <motion.div
                        className="flex-1 w-full max-w-2xl"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald/40 to-electric-blue/40 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-[#020617] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                {mockup}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpotlightLayout;
