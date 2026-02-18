import React from 'react';

const SpotlightLayout = ({ badge, headline, description, features, mockup, reverse = false, id }) => {
    return (
        <section id={id} className="py-24 bg-navy-950 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    {/* Content Side */}
                    <div className="flex-1 text-left">
                        <h2 className="text-emerald font-bold tracking-widest text-sm mb-4 uppercase">{badge}</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                            {headline}
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            {description}
                        </p>
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center flex-shrink-0">
                                        {React.cloneElement(feature.icon, { size: 14, className: "text-emerald" })}
                                    </div>
                                    <span className="text-gray-300 font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mockup Side */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald/40 to-electric-blue/40 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-[#020617] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                {mockup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpotlightLayout;
