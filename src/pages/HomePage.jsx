import React, { useState, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Bookmark, Clock, Users2, ShoppingBag, Gift, TrendingUp, Sparkles, Filter } from 'lucide-react';
import StatusPostBox from '../components/feed/StatusPostBox';
import FeedPost from '../components/feed/FeedPost';
import StoryTray from '../components/feed/StoryTray';
import { SkeletonPost } from '../components/common/SkeletonLoader';

const HomePage = ({ posts, onPost, setTab, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('For You (AI)');

    const filters = ['Friends', 'For You (AI)', 'Global Trends'];

    return (
        <div className="bg-[#020205] min-h-screen">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 px-6 pb-24 h-[calc(100vh-80px)] overflow-hidden">
                
                {/* Left Sidebar (Shortcuts) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-0 h-max overflow-y-auto no-scrollbar pr-4">
                    <div className="glass-card rounded-[24px] p-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 px-3">Shortcuts</h3>
                        <nav className="space-y-1">
                            {[
                                { icon: Users, label: 'Friends', color: 'text-blue-400', tab: 'friends' },
                                { icon: Clock, label: 'Memories', color: 'text-purple-400', tab: 'explore' },
                                { icon: Bookmark, label: 'Saved', color: 'text-cyan-400', tab: 'profile' },
                                { icon: Users2, label: 'Groups', color: 'text-indigo-400', tab: 'explore' },
                                { icon: ShoppingBag, label: 'Marketplace', color: 'text-emerald-400', tab: 'explore' },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    onClick={() => setTab(item.tab)}
                                    className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group"
                                >
                                    <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    <div className="glass-card rounded-[24px] p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
                        <Sparkles size={24} className="text-cyan-400 mb-4" />
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Hybrid Premium</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed mb-4">Unlock advanced AI filters and spatial 3D audio for your stories.</p>
                        <button className="w-full py-2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all">Upgrade Now</button>
                    </div>
                </aside>

                {/* Main Feed (Center) */}
                <main className="col-span-1 lg:col-span-6 flex flex-col h-full">
                    <Virtuoso
                        style={{ height: '100%' }}
                        data={posts}
                        components={{
                            Header: () => (
                                <div className="mb-6">
                                    <StoryTray />
                                    <StatusPostBox onPost={onPost} user={user} />
                                    
                                    {/* Triple Filter System */}
                                    <div className="sticky top-0 z-40 py-2 bg-[#020205]/80 backdrop-blur-md mb-6">
                                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                                            {filters.map((f) => (
                                                <button 
                                                    key={f} 
                                                    onClick={() => setActiveFilter(f)}
                                                    className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-500 relative ${
                                                        activeFilter === f ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                                    }`}
                                                >
                                                    {activeFilter === f && (
                                                        <motion.div 
                                                            layoutId="filter-bg"
                                                            className="absolute inset-0 bg-white/10 rounded-xl shadow-xl border border-white/10"
                                                        />
                                                    )}
                                                    <span className="relative z-10">{f}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ),
                            Footer: () => isLoading ? <SkeletonPost /> : <div className="h-32" />
                        }}
                        itemContent={(index, post) => (
                            <FeedPost key={post.id} post={post} />
                        )}
                        className="no-scrollbar"
                    />
                </main>

                {/* Right Sidebar (Contacts & Events) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-0 h-max overflow-y-auto no-scrollbar pl-4">
                    <div className="glass-card rounded-[24px] p-5">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Active Contacts</h3>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                <span className="text-[8px] font-bold text-green-500">24 Online</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-2xl cursor-pointer transition-all group">
                                    <div className="relative">
                                        <img src={`https://i.pravatar.cc/150?img=${i + 30}`} className="w-10 h-10 rounded-full border-2 border-white/5 group-hover:border-cyan-500/50 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0f] rounded-full shadow-[0_0_10px_#22c55e]"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Neural User {i}</span>
                                        <span className="text-[9px] text-gray-500">Typing...</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card rounded-[24px] p-5 border-t-2 border-t-yellow-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Gift size={18} className="text-yellow-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Upcoming Events</h3>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer">
                            <p className="text-[10px] text-gray-400 mb-1">Tomorrow</p>
                            <h4 className="text-xs font-bold text-white">Hybrid Dev Conference 2026</h4>
                            <p className="text-[9px] text-yellow-500/80 mt-2">12 friends attending</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HomePage;
