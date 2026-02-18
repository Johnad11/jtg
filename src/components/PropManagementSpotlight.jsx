import React from 'react';
import { ShieldCheck, Eye, Zap, Shield } from 'lucide-react';
import SpotlightLayout from './SpotlightLayout';

const PropManagementSpotlight = () => {
    const features = [
        { icon: <Eye />, text: "24/7 Automated Drawdown Monitoring" },
        { icon: <Zap />, text: "Instant Profit Injection Safeguards" },
        { icon: <ShieldCheck />, text: "Multi-Account Synchronization" }
    ];

    const mockup = (
        <div className="flex flex-col h-full bg-[#020617]">
            <div className="bg-navy-800/50 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Institutional Shield v1.4</div>
                <div className="w-12"></div>
            </div>

            <div className="p-8 font-mono">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-[10px] text-gray-500 mb-1">PROFIT TARGET</div>
                        <div className="text-3xl font-black text-emerald">9.6% <span className="text-gray-600 text-lg">/ 10%</span></div>
                    </div>
                    <div className="h-16 w-16 rounded-full border-4 border-emerald/20 border-t-emerald animate-pulse"></div>
                </div>

                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 uppercase">Current Progress</span>
                            <span className="text-xs text-emerald font-bold">96%</span>
                        </div>
                        <div className="w-full h-2 bg-navy-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald w-[96%] animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald/5 border border-emerald/20 flex flex-col items-center">
                            <Shield className="text-emerald mb-2" size={20} />
                            <div className="text-[10px] text-emerald font-bold">SHIELD ACTIVE</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                            <Zap className="text-gray-500 mb-2" size={20} />
                            <div className="text-[10px] text-gray-500">AUTO-CLOSE OFF</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SpotlightLayout
            id="management"
            badge="Prop Management"
            headline="Institutional-grade risk oversight."
            description="Deploy advanced algorithms and automated safeguards to protect capital and maintain growth across multiple prop firm accounts. We monitor the data so you can focus on the trade."
            features={features}
            mockup={mockup}
            reverse={true}
        />
    );
};

export default PropManagementSpotlight;
