import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Bookmark, Clock, Users2, ShoppingBag, Gift, Sparkles, LayoutGrid, Zap } from 'lucide-react';
import StatusPostBox from '../components/feed/StatusPostBox';
import FeedPost from '../components/feed/FeedPost';
import StoryTray from '../components/feed/StoryTray';
import { SkeletonPost } from '../components/common/SkeletonLoader';
import { useStories } from '../hooks/useStories';

const HomePage = ({ posts, onPost, setTab, user, activeFilter, setActiveFilter, toggleLike }) => {
    const { stories, createStory, loading: storiesLoading } = useStories();
    const filters = ['Friends', 'For You (AI)', 'Global Trends'];

    return (
        <div className="bg-[#020205] h-full overflow-hidden">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 px-6 h-full">
                
                {/* Left Sidebar (Shortcuts) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6 overflow-y-auto no-scrollbar pr-4 pb-20">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-6 border border-white/10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 px-3">Neural Shortcuts</h3>
                        <nav className="space-y-1">
                            {[
                                { icon: Users, label: 'Neural Friends', color: 'text-cyan-400', tab: 'friends' },
                                { icon: Clock, label: 'Time Memories', color: 'text-purple-400', tab: 'explore' },
                                { icon: Bookmark, label: 'Data Vault', color: 'text-blue-400', tab: 'profile' },
                                { icon: Users2, label: 'Social Groups', color: 'text-indigo-400', tab: 'explore' },
                                { icon: ShoppingBag, label: 'Hybrid Market', color: 'text-emerald-400', tab: 'explore' },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    onClick={() => setTab(item.tab)}
                                    className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all group"
                                >
                                    <div className={`p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <span className="text-xs font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">{item.label}</span>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-3xl rounded-[32px] p-8 border border-cyan-500/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700">
                            <Zap size={80} className="text-cyan-400" />
                        </div>
                        <Sparkles size={32} className="text-cyan-400 mb-6" />
                        <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Hybrid Premium</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed mb-6 font-bold uppercase tracking-wider">Unlock Advanced AI Filters & Spatial 3D Audio.</p>
                        <button className="w-full py-4 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">Upgrade OS</button>
                    </div>
                </aside>

                {/* Main Feed (Center) */}
                <main className="col-span-1 lg:col-span-6 flex flex-col h-full">
                    <Virtuoso
                        style={{ height: '100%' }}
                        data={posts}
                        components={{
                            Header: () => (
                                <div className="space-y-6 pb-6">
                                    <StoryTray stories={stories} onCreate={createStory} loading={storiesLoading} />
                                    <StatusPostBox onPost={onPost} user={user} />
                                    
                                    {/* Triple Filter System */}
                                    <div className="sticky top-0 z-40 py-2 bg-[#020205]/95 backdrop-blur-3xl">
                                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 shadow-2xl">
                                            {filters.map((f) => (
                                                <button 
                                                    key={f} 
                                                    onClick={() => setActiveFilter(f)}
                                                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-500 relative ${
                                                        activeFilter === f ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                                    }`}
                                                >
                                                    {activeFilter === f && (
                                                        <motion.div 
                                                            layoutId="filter-pill"
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
                            Footer: () => <div className="h-32" />
                        }}
                        itemContent={(index, post) => (
                            <FeedPost key={post.id} post={post} onLike={() => toggleLike(post.id, user?.uid, post.likedBy?.includes(user?.uid))} currentUserId={user?.uid} />
                        )}
                        className="no-scrollbar"
                    />

                    {/* Guest Login Overlay */}
                    {!user && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#020205]/40 backdrop-blur-md">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#020205]/80 border border-white/10 p-12 rounded-[48px] text-center shadow-3xl max-w-md"
                            >
                                <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
                                    <Zap size={40} className="text-cyan-400" />
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Neural Access Required</h2>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-10">You must synchronize your identity with the Hybrid Global Cluster to view the neural data stream.</p>
                                <button 
                                    onClick={() => setTab('profile')}
                                    className="w-full py-4 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl"
                                >
                                    Initialize Identity
                                </button>
                                <p className="text-[8px] text-gray-600 mt-6 uppercase tracking-widest font-black">Encrypted via Layer 2.0 Auth</p>
                            </motion.div>
                        </div>
                    )}
                </main>

                {/* Right Sidebar (Contacts & Events) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6 overflow-y-auto no-scrollbar pl-4 pb-20">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live Contacts</h3>
                            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[9px] font-black text-green-500 uppercase">24 Active</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-[24px] cursor-pointer transition-all group">
                                    <div className="relative">
                                        <img src={`https://i.pravatar.cc/150?img=${i + 30}`} className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-cyan-500 transition-all p-0.5" />
                                        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#020205] rounded-full shadow-[0_0_15px_#22c55e]"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">Neural User {i}</span>
                                        <span className="text-[9px] text-gray-500 font-bold uppercase">Synthesizing...</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-6 border-t-2 border-t-yellow-500/20 border-x border-white/5 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500"><Gift size={20} /></div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Upcoming Events</h3>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer group">
                            <p className="text-[9px] font-black text-gray-500 mb-1 uppercase tracking-widest">Tomorrow @ 18:00</p>
                            <h4 className="text-sm font-black text-white group-hover:text-yellow-500 transition-colors leading-tight">Hybrid Dev Conference 2026</h4>
                            <p className="text-[9px] text-yellow-500/80 mt-3 font-bold uppercase">12 friends attending</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HomePage;
