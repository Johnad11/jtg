import React from 'react';
import { Calculator, Shovel, ShieldCheck, Target } from 'lucide-react';
import SpotlightLayout from './SpotlightLayout';

const JournalSpotlight = () => {
    const features = [
        { icon: <Target />, text: "Precise Lot Size Calculator" },
        { icon: <ShieldCheck />, text: "Risk-Per-Trade Enforcement" },
        { icon: <Shovel />, text: "Performance Deep-Dive Metrics" }
    ];

    const mockup = (
        <div className="flex flex-col h-full">
            <div className="bg-navy-800/50 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest">RISK FORTRESS v2.0</div>
                <div className="w-12"></div>
            </div>

            <div className="p-8 font-mono">
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-gray-500 mb-1">ACCOUNT BALANCE</div>
                        <div className="text-xl font-bold text-white">$50,000.00</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-gray-500 mb-1">RISK PERCENT</div>
                        <div className="text-xl font-bold text-emerald">1.00%</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Stop Loss (Pips)</span>
                        <span className="text-white font-bold">25.0</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Pair Selection</span>
                        <span className="text-white font-bold">XAUUSD</span>
                    </div>
                    <div className="mt-8 p-6 rounded-xl bg-emerald/10 border border-emerald/50 flex flex-col items-center justify-center">
                        <div className="text-[10px] text-emerald font-bold mb-1 tracking-widest">RECOMMENDED POSITION</div>
                        <div className="text-4xl font-black text-white">2.00 LOTS</div>
                        <div className="text-[10px] text-gray-400 mt-2">TOTAL RISK: $500.00</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SpotlightLayout
            id="journal"
            badge="JTG Journal"
            headline="Your digital risk fortress."
            description="Precisely calculate lot sizes, track performance metrics, and eliminate emotional bias with institutional-grade journaling tools. Built for traders who take their capital seriously."
            features={features}
            mockup={mockup}
        />
    );
};

export default JournalSpotlight;
