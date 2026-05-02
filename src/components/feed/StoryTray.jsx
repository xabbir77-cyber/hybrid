import React from 'react';
import { Plus, Sparkles, Wand2, Camera, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const StoryTray = ({ stories = [], onCreate, loading }) => {
    return (
        <div className="relative mb-12">
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-[120px] pointer-events-none"></div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2">
                {/* Omni-Creator Add Story */}
                <motion.div 
                    className="flex flex-col items-center gap-4 min-w-[90px] relative group cursor-pointer"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCreate('https://picsum.photos/800/1200?sig=' + Date.now())} // Placeholder for real upload
                >
                    <div className="relative w-20 h-20 rounded-[28px] bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_10px_20px_rgba(6,182,212,0.4)] relative z-10">
                            <Plus size={24} className="text-white" />
                        </div>
                        {/* AI Mini Badge */}
                        <div className="absolute -top-1 -right-1 bg-purple-600 rounded-full p-1.5 shadow-lg border border-white/20 z-20">
                            <Sparkles size={10} className="text-white animate-pulse" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Omni-Studio</span>
                </motion.div>

                {/* Active Stories with Omni-Lens Rings */}
                {loading ? (
                    [1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-20 h-20 rounded-[28px] bg-white/5 animate-pulse min-w-[90px]"></div>
                    ))
                ) : stories.map((group, i) => (
                    <motion.div 
                        key={group.uid} 
                        className="flex flex-col items-center gap-4 min-w-[90px] cursor-pointer group"
                        whileHover={{ y: -8 }}
                    >
                        <div className="relative p-[3px] rounded-[30px] bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-600 shadow-xl transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            <div className="bg-[#020205] p-[3px] rounded-[28px]">
                                <div className="relative w-20 h-20 rounded-[24px] overflow-hidden">
                                    <img 
                                        src={group.userAvatar || `https://i.pravatar.cc/150?img=${i + 20}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        alt="story"
                                    />
                                    {/* Glass Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            
                            {/* Mood-Sync Indicator */}
                            {i === 0 && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-2xl">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">LIVE</span>
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors tracking-tight truncate w-full text-center">
                            {group.userName.split(' ')[0]}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Omni-Creator Magic Toolbar (Floating Glass) */}
            <div className="mt-2 flex items-center justify-center gap-8 border-t border-white/5 pt-6">
                <div className="flex items-center gap-2.5 text-gray-500 hover:text-cyan-400 transition-all cursor-pointer group">
                    <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                        <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Magic Studio</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                <div className="flex items-center gap-2.5 text-gray-500 hover:text-purple-400 transition-all cursor-pointer group">
                    <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                        <Globe size={14} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">World-Swap</span>
                </div>
            </div>
        </div>
    );
};

export default StoryTray;
