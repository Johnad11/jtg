import { Instagram, Twitter, MessageSquare, Music2 } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer id="contact" className="bg-navy-950 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="JTG Logo" className="h-8 w-auto brightness-90 grayscale-[0.5] hover:grayscale-0 transition-all opacity-80" />
                            <span className="text-xl font-bold tracking-tighter text-white uppercase">
                                JTG Ecosystem
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://www.instagram.com/johnad_trades" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://x.com/emeka_johnad" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.tiktok.com/@johnad_trades" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald transition-colors">
                            <Music2 size={20} />
                        </a>
                        <a href="https://chat.whatsapp.com/LP4I8vHedcNIOVqzr8Qjb3" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald transition-colors flex items-center gap-1 font-bold text-xs uppercase">
                            <MessageSquare size={16} />
                            WHATSAPP
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-medium">
                        © 2026 JTG Ecosystem. TRADING INVOLVES RISK.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
