import React from 'react';
import { Calculator, Users } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy-950">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-5xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-8 uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                    </span>
                    JTG ECOSYSTEM IS LIVE
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8">
                    STOP GAMBLING. <br />
                    <span className="bg-gradient-to-r from-emerald to-electric-blue bg-clip-text text-transparent">
                        START SCALING.
                    </span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    The ultimate command center for Prop Firm traders. We provide the Tools, the Capital, and the Community to get you funded.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://jtg-journals.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald hover:bg-emerald/90 text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105"
                    >
                        <Calculator size={20} />
                        Open Journal App
                    </a>
                    <a
                        href="https://jtg-project-hive.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105"
                    >
                        <Users size={20} />
                        Join The Hive
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
