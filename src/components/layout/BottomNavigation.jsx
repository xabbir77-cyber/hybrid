import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Play, Search, MessageCircle, User, Compass } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
    const [isGlowing, setIsGlowing] = useState(false);

    // Glow cycle: 5s idle, 1.5s glow
    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlowing(true);
            setTimeout(() => setIsGlowing(false), 1500);
        }, 6500); // 5000 + 1500

        return () => clearInterval(interval);
    }, []);

    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'watch', icon: Play, label: 'Watch' },
        { id: 'explore', icon: Compass, label: 'Explore' },
        { id: 'messages', icon: MessageCircle, label: 'Chat' },
        { id: 'profile', icon: User, label: 'Me' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 z-[100] px-4 sm:px-10 flex items-center justify-between pb-4 transition-all duration-500">
            {/* Background with Glassmorphism */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[15px] border-t border-white/10" />

            {/* Glowing Border Pulse */}
            <AnimatePresence>
                {isGlowing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 border-t-2 border-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_auto] animate-gradient-x pointer-events-none"
                        style={{ maskImage: 'linear-gradient(to bottom, black, transparent 2px)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 2px)' }}
                    />
                )}
            </AnimatePresence>

            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex flex-col items-center justify-center transition-all duration-300 w-12 z-10 ${
                            isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {/* Active Indicator Glow */}
                        {isActive && (
                            <motion.div 
                                layoutId="nav-glow" 
                                className="absolute -top-2 w-12 h-12 bg-purple-500/20 rounded-full blur-xl" 
                            />
                        )}

                        {/* Icon with scaling effect during glow */}
                        <motion.div
                            animate={isGlowing ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.75, repeat: isGlowing ? 1 : 0, repeatType: "reverse" }}
                        >
                            <Icon 
                                size={24} 
                                strokeWidth={isActive ? 2.5 : 2} 
                                className={`${isActive ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}`}
                            />
                        </motion.div>

                        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">{tab.label}</span>

                        {/* Active Dot */}
                        {isActive && (
                            <motion.div 
                                layoutId="nav-dot"
                                className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" 
                            />
                        )}
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavigation;
