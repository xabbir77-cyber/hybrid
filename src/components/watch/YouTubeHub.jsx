import React, { useState } from 'react';
import { Search, Play, Plus, Send } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const YouTubeHub = () => {
    const [query, setQuery] = useState('');
    const [videos] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (
        <div className="h-full flex flex-col bg-[#050505] p-4 overflow-y-auto no-scrollbar">
            {/* YouTube Search Bar */}
            <div className="max-w-3xl mx-auto w-full mb-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-3xl focus-within:border-purple-500 transition-all shadow-2xl">
                        <Search size={22} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search YouTube with Hybrid Intelligence..."
                            className="w-full bg-transparent border-none focus:outline-none text-white px-4 text-lg font-light placeholder-gray-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="bg-purple-600 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-purple-500 transition-colors shadow-[0_0_15px_#a855f7]">Search</button>
                    </div>
                </div>
            </div>

            {/* Video Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
                {videos.map(i => (
                    <GlassCard key={i} className="group cursor-pointer border-none shadow-none bg-transparent">
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                            <img src={`https://picsum.photos/800/450?sig=${i + 100}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white">12:45</div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"><Play size={24} fill="white" /></div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <img src={`https://i.pravatar.cc/150?img=${i + 50}`} className="w-10 h-10 rounded-full border border-white/10" />
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-white line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">Building a High-End Social Media App with Hybrid View</h4>
                                <p className="text-[10px] text-gray-400 mt-1 font-bold">Hybrid Tech • 1.2M views • 2 hours ago</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-[10px] bg-white/5 hover:bg-purple-500/20 px-2 py-1 rounded border border-white/10 text-gray-400 hover:text-purple-400 transition-all flex items-center gap-1">
                                        <Plus size={10} /> Save
                                    </button>
                                    <button className="text-[10px] bg-white/5 hover:bg-blue-500/20 px-2 py-1 rounded border border-white/10 text-gray-400 hover:text-blue-400 transition-all flex items-center gap-1">
                                        <Send size={10} /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default YouTubeHub;
