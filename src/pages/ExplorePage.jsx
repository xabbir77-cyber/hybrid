import React, { useState } from 'react';
import { Search, Compass, Zap, Users, Globe, Grid } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const ExplorePage = () => {
    const [query, setQuery] = useState('');
    const categories = ['Trending', 'Tech', 'Art', 'Music', 'Gaming', 'AI'];

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto no-scrollbar bg-[#050505] p-4">
            <div className="max-w-7xl mx-auto">
                {/* Search & Header */}
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-4">
                        <Compass className="text-purple-500" size={32} /> EXPLORE
                    </h2>
                    <div className="w-full max-w-2xl relative">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-3xl focus-within:border-purple-500 transition-all shadow-2xl">
                            <Search size={22} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Discover the next big thing..."
                                className="w-full bg-transparent border-none focus:outline-none text-white px-4 text-lg font-light placeholder-gray-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar mb-12 justify-center">
                    {categories.map(cat => (
                        <button key={cat} className="px-6 py-2 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/50 rounded-full text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all whitespace-nowrap">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid of Discovery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className={`relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-[3/4] ${
                                i % 5 === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                        >
                            <img src={`https://picsum.photos/400/600?sig=${i + 500}`} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" alt="explore" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-purple-600 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest text-white mb-2 inline-block">Trending</span>
                                <h4 className="text-white font-bold text-sm">Visual Symphony #{i}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

import { motion } from 'framer-motion';
export default ExplorePage;
