import React from 'react';
import { Gamepad2, Mail } from 'lucide-react';
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
                                Johnad Traders Group
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://discord.gg/Zd6nzv9AJy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-emerald transition-colors flex items-center gap-2 font-bold text-xs uppercase"
                        >
                            <Gamepad2 size={18} className="text-emerald" />
                            <span>Discord</span>
                        </a>

                        <a
                            href="mailto:nwabuezejohnad11@gmail.com"
                            className="text-gray-400 hover:text-emerald transition-colors flex items-center gap-2 font-bold text-xs uppercase"
                        >
                            <Mail size={18} className="text-emerald" />
                            <span>Support Email</span>
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-medium">
                        © 2026 Johnad Traders Group. TRADING INVOLVES RISK.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
