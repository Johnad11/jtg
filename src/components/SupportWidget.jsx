import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Gamepad2,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Show floating widget after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactMethods = [
    {
      name: "Discord Community",
      label: "Live Trading Floor & Active Support",
      icon: <Gamepad2 size={22} className="text-emerald" />,
      link: "https://discord.gg/Zd6nzv9AJy",
      badge: "LIVE COMMUNITY",
      badgeColor: "bg-emerald/10 text-emerald border-emerald/20",
      cta: "Join Discord"
    },
    {
      name: "Email Support Desk",
      label: "nwabuezejohnad11@gmail.com",
      icon: <Mail size={22} className="text-emerald" />,
      link: "mailto:nwabuezejohnad11@gmail.com?subject=JTG%20Support%20Inquiry",
      badge: "DIRECT EMAIL",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      cta: "Send Email"
    }
  ];

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setFormData({ name: '', email: '', message: '' });
      setIsOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Floating Trigger Shape at bottom right */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(27,166,87,0.5)" }}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-navy-900/95 backdrop-blur-xl border border-emerald/50 text-white shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer group"
              aria-label="Open JTG Support"
            >
              {/* Online Ping Indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>

              <Headphones size={18} className="text-emerald group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-xs font-bold tracking-wide text-gray-200 group-hover:text-white transition-colors">
                Support
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-md bg-navy-900/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-10 text-white"
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 right-10 -mt-10 w-48 h-48 bg-emerald/15 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/5 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-[11px] font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={13} />
                    <span>JTG Help & Inquiries</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                    Contact Support
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Reach our official team via Discord or Direct Email.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Only Discord & Email Channels */}
              <div className="space-y-3.5 mb-6">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={idx}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-navy-950/80 border border-white/5 hover:border-emerald/40 transition-all group cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-emerald/30 group-hover:bg-emerald/10 transition-colors">
                        {method.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-emerald transition-colors">
                            {method.name}
                          </h4>
                          <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border ${method.badgeColor}`}>
                            {method.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">
                          {method.label}
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-500 group-hover:text-emerald transition-colors pr-1">
                      <ExternalLink size={16} />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Message Box */}
              <div className="pt-5 border-t border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald" />
                  <span>Send Direct Note</span>
                </h4>

                {messageSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald/10 border border-emerald/30 text-emerald text-xs flex items-center gap-3 font-semibold"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>Your note has been received! Our support team will follow up via email.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-3.5 py-2.5 bg-navy-950/90 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald font-medium"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="px-3.5 py-2.5 bg-navy-950/90 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald font-medium"
                      />
                    </div>
                    <textarea
                      required
                      rows={2}
                      placeholder="How can we assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-navy-950/90 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald resize-none font-medium"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 bg-emerald hover:bg-emerald/90 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(27,166,87,0.3)] transition-all cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Send Direct Note</span>
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportWidget;
