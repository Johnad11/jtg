import { Calculator, Users, Shield, GraduationCap, ArrowUpRight, Lock } from 'lucide-react';

const Ecosystem = () => {
    const products = [
        {
            title: "JTG Journal",
            icon: (
                <div className="relative">
                    <Calculator className="text-emerald" size={24} />
                    <Lock size={12} className="absolute -bottom-1 -right-1 text-emerald bg-navy-900 rounded-full" />
                </div>
            ),
            text: "Your digital risk fortress. Precisely calculate lot sizes, track performance metrics, and eliminate emotional bias with institutional-grade journaling tools.",
            badge: "FREE UTILITY",
            link: "https://jtg-journals.vercel.app/",
            cta: "Open App"
        },
        {
            title: "Prop Management",
            icon: <Shield className="text-emerald" size={24} />,
            text: "Institutional-grade risk oversight. Deploy advanced algorithms and automated safeguards to protect capital and maintain growth across multiple prop firm accounts.",
            badge: "NEW",
            link: "https://johnadtradersgroup.vercel.app/",
            cta: "Manage Risk"
        },
        {
            title: "Project Hive",
            icon: <Users className="text-emerald" size={24} />,
            text: "A revolutionary community-owned trading floor. Join a collective mission where we pool intelligence and capital to dominate the markets as a single unit.",
            badge: "LIVE",
            link: "https://jtg-project-hive.vercel.app/",
            cta: "Launch App"
        },
        {
            title: "Education",
            icon: <GraduationCap className="text-emerald" size={24} />,
            text: "Data over guesswork. Access high-level market analysis, psychological frameworks, and strategic blueprints designed for the modern fintech landscape.",
            badge: null,
            link: "#",
            cta: "Coming Soon"
        },
    ];

    return (
        <section id="ecosystem" className="py-24 bg-navy-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-navy-800/40 backdrop-blur-xl border border-white/5 hover:border-emerald/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-navy-900 rounded-xl border border-white/5 group-hover:border-emerald/30 group-hover:shadow-[0_0_15px_rgba(27,166,87,0.2)] transition-all">
                                    {product.icon}
                                </div>
                                {product.badge && (
                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald/10 text-emerald border border-emerald/20">
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald transition-colors flex items-center gap-1">
                                    {product.title}
                                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                    {product.text}
                                </p>
                            </div>

                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-emerald hover:border-emerald hover:text-white transition-all duration-300 gap-2"
                            >
                                {product.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
