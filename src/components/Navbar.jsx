import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/50 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="JTG Logo" className="h-10 w-auto" />
                        <span className="text-2xl font-black tracking-tight text-white uppercase">
                            JTG Ecosystem
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8 text-sm font-medium">
                            <a href="#ecosystem" className="text-gray-400 hover:text-white transition-colors">Ecosystem</a>
                            <a href="#hive" className="text-gray-400 hover:text-white transition-colors">The Hive</a>
                            <a href="#education" className="text-gray-400 hover:text-white transition-colors">Education</a>
                            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <a
                            href="https://jtg-journals.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex bg-emerald hover:bg-emerald/90 text-white px-6 py-2 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(27,166,87,0.4)] items-center justify-center"
                        >
                            Launch App
                        </a>
                        <button
                            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-navy-900 border-t border-white/5 px-4 py-8 space-y-6 flex flex-col items-center text-center">
                    <div className="flex flex-col space-y-4 w-full">
                        <a href="#ecosystem" className="text-xl text-gray-400 hover:text-white transition-colors py-2" onClick={() => setIsOpen(false)}>Ecosystem</a>
                        <a href="#hive" className="text-xl text-gray-400 hover:text-white transition-colors py-2" onClick={() => setIsOpen(false)}>The Hive</a>
                        <a href="#education" className="text-xl text-gray-400 hover:text-white transition-colors py-2" onClick={() => setIsOpen(false)}>Education</a>
                        <a href="#contact" className="text-xl text-gray-400 hover:text-white transition-colors py-2" onClick={() => setIsOpen(false)}>Contact</a>
                    </div>
                    <a
                        href="https://jtg-journals.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs bg-emerald text-white px-8 py-4 rounded-xl font-bold text-center shadow-[0_0_20px_rgba(27,166,87,0.2)] active:scale-95 transition-transform"
                    >
                        Launch App
                    </a>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
