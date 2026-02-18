import React from 'react';
import { GraduationCap, PlayCircle, BookOpen, BarChart3 } from 'lucide-react';
import SpotlightLayout from './SpotlightLayout';

const EducationSpotlight = () => {
    const features = [
        { icon: <BookOpen />, text: "Data-Driven Strategy Blueprints" },
        { icon: <PlayCircle />, text: "Deep-Dive Market Psychological Frameworks" },
        { icon: <BarChart3 />, text: "Live Strategic Market Analysis" }
    ];

    const mockup = (
        <div className="flex flex-col h-full bg-[#020617]">
            <div className="bg-navy-800/50 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Education Portal v3.0</div>
                <div className="w-12"></div>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    <div className="text-[10px] text-emerald font-bold mb-2 tracking-widest uppercase">Active Module</div>
                    <div className="text-xl font-bold text-white">Institutional Liquidity & Order Blocks</div>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald w-[65%]"></div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">65% COMPLETED</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald/30 transition-colors cursor-pointer group/item">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-navy-900 border border-white/5 flex items-center justify-center group-hover/item:border-emerald/50 transition-colors">
                                <PlayCircle size={20} className="text-gray-500 group-hover/item:text-emerald" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white">Module 04: The Narrative</div>
                                <div className="text-[10px] text-gray-500">24 mins • Advanced Path</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 opacity-50 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-navy-900 border border-white/5 flex items-center justify-center">
                                <BookOpen size={20} className="text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-gray-600">Module 05: Risk Scaling</div>
                                <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest mt-1">LOCKED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SpotlightLayout
            id="education"
            badge="Education"
            headline="Data over guesswork."
            description="Access high-level market analysis, psychological frameworks, and strategic blueprints designed for the modern fintech landscape. We don't just teach trading; we build institutional minds."
            features={features}
            mockup={mockup}
            reverse={true}
        />
    );
};

export default EducationSpotlight;
