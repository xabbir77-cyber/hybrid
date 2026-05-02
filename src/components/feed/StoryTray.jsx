import React from 'react';
import { Plus, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StoryTray = () => {
    return (
        <div className="relative mb-10">
            {/* Background Blur Accent */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

            <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 px-1">
                {/* Omni-Creator OS: Add Story */}
                <motion.div 
                    className="flex flex-col items-center gap-3 min-w-[85px] relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="relative w-18 h-18 md:w-20 md:h-20 rounded-full glass-effect flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-cyan-400/50 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg neon-glow-cyan">
                            <Plus size={24} className="text-white" />
                        </div>
                        {/* AI Badge */}
                        <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1 shadow-lg border border-white/20">
                            <Sparkles size={10} className="text-white" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Create</span>
                </motion.div>

                {/* Active Stories with Omni-Lens Rings */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <motion.div 
                        key={i} 
                        className="flex flex-col items-center gap-3 min-w-[85px] cursor-pointer group"
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500 animate-spin-slow group-hover:animate-none">
                            <div className="bg-[#020205] p-[3px] rounded-full">
                                <div className="relative w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden">
                                    <img 
                                        src={`https://i.pravatar.cc/150?img=${i + 15}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        alt="story"
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            
                            {/* Mood-Sync Indicator */}
                            {i % 3 === 0 && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-xl">
                                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[7px] font-black text-white uppercase tracking-tighter">LIVE</span>
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors tracking-tight">Vibe #{i}02</span>
                    </motion.div>
                ))}
            </div>

            {/* Omni-Creator Toolbar (Mini) */}
            <div className="mt-4 flex items-center justify-center gap-6 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer group">
                    <Wand2 size={12} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">AI Magic Studio</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/10"></div>
                <div className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors cursor-pointer group">
                    <Sparkles size={12} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">World-Swap</span>
                </div>
            </div>
        </div>
    );
};

export default StoryTray;
