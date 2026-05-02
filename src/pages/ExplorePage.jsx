import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Zap, Users, Globe, Grid, Sparkles, TrendingUp, Heart, MessageSquare, Play } from 'lucide-react';

const ExplorePage = () => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Trending');
    const categories = ['Trending', 'Neural Art', 'Digital Audio', 'Virtual Spaces', 'Crypto', 'AI'];

    return (
        <div className="h-full overflow-y-auto no-scrollbar bg-[#020205] p-10">
            <div className="max-w-[1920px] mx-auto">
                {/* Search & Header Hub */}
                <div className="flex flex-col items-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="p-4 bg-purple-500/10 rounded-[24px] text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                            <Compass size={40} className="animate-spin-slow" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">Discovery<span className="text-purple-500">Matrix</span></h1>
                    </motion.div>

                    <div className="w-full max-w-4xl relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-[3rem] blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
                        <div className="relative flex items-center bg-[#020205]/60 backdrop-blur-[80px] border border-white/10 rounded-[3rem] px-10 py-6 shadow-3xl">
                            <Search size={28} className="text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Scan the global neural network..."
                                className="w-full bg-transparent border-none focus:outline-none text-white px-8 text-2xl font-light placeholder-gray-600"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <button className="bg-purple-600 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-purple-500 transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] flex items-center gap-2">
                                    <Sparkles size={16} /> <span className="hidden sm:inline">AI Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Scrollable Hub */}
                <div className="flex gap-6 overflow-x-auto no-scrollbar mb-20 justify-center px-10">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 border relative overflow-hidden group ${
                                activeCategory === cat 
                                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                                : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            <span className="relative z-10">{cat}</span>
                            {activeCategory === cat && (
                                <motion.div 
                                    layoutId="cat-active-glow"
                                    className="absolute inset-0 bg-white opacity-10"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid Discovery Engine (Asymmetric Layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -10 }}
                            className={`relative rounded-[48px] overflow-hidden bg-white/5 border border-white/5 group shadow-2xl ${
                                i % 7 === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/5]' : 'aspect-[3/4]'
                            }`}
                        >
                            <img 
                                src={`https://picsum.photos/seed/${i + 700}/800/1200`} 
                                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
                                alt="explore" 
                            />
                            
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            {/* Status Badges */}
                            <div className="absolute top-6 left-6 flex gap-2">
                                <div className="bg-purple-600/80 backdrop-blur-xl px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-white border border-white/20">
                                    Trending
                                </div>
                                {i % 3 === 0 && (
                                    <div className="bg-cyan-500/80 backdrop-blur-xl px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-black border border-white/20">
                                        Neural
                                    </div>
                                )}
                            </div>

                            {/* Content Info */}
                            <div className="absolute bottom-10 left-10 right-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-0.5 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500">
                                        <img src={`https://i.pravatar.cc/100?u=${i + 200}`} className="w-10 h-10 rounded-lg border-2 border-black object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white uppercase tracking-tight">@NeonNode_{i}</span>
                                        <span className="text-[8px] font-bold text-purple-400 uppercase tracking-widest">Active Now</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-black text-white leading-tight mb-6 uppercase tracking-tighter italic">The Architecture of Infinite Networks</h4>
                                
                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <Heart size={16} className="text-purple-400 fill-purple-400/20" />
                                            <span className="text-[10px] font-black text-white uppercase">12.4k</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={16} className="text-cyan-400" />
                                            <span className="text-[10px] font-black text-white uppercase">482</span>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all">
                                        <Play size={16} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Matrix Pagination Hint */}
                <div className="mt-20 flex flex-col items-center gap-6 pb-20">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] animate-pulse">Scanning Deep Layers...</p>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
