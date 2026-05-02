import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MonitorPlay, Grid, User, Bell, Plus, MessageSquare, Heart, Send, LogOut, Zap, Sparkles, MapPin, Link as LinkIcon, Calendar, Edit3, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
    const { user, loginWithGoogle, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('Nodes');

    if (loading) return (
        <div className="h-full flex items-center justify-center bg-[#020205]">
            <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] animate-pulse">Initializing Profile Engine...</p>
            </div>
        </div>
    );

    if (!user) return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-[#020205]">
            <div className="relative group max-w-lg w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[48px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[#020205]/60 backdrop-blur-[80px] border border-white/10 rounded-[48px] p-16 text-center shadow-3xl">
                    <div className="w-24 h-24 bg-cyan-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 border border-cyan-500/20">
                        <User size={48} className="text-cyan-400" />
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Neural Identity</h2>
                    <p className="text-gray-400 mb-10 font-bold uppercase tracking-widest text-[10px] leading-relaxed">Synchronize your local identity with the Hybrid Global Cluster to unlock personalized data streams.</p>
                    <button 
                        onClick={loginWithGoogle}
                        className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
                    >
                        Sync via Google
                    </button>
                    <p className="text-[9px] text-gray-600 mt-8 uppercase tracking-[0.3em] font-black">Secure Authentication Layer 2.0</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full overflow-y-auto no-scrollbar bg-[#020205]">
            {/* Cinematic Header */}
            <div className="relative h-96 w-full">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1920&q=80" 
                        className="w-full h-full object-cover opacity-60" 
                        alt="cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/40 to-[#020205]"></div>
                </div>

                {/* Profile Controls (Floating) */}
                <div className="absolute top-10 right-10 flex gap-4 z-20">
                    <button className="p-4 bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all">
                        <Share2 size={20} />
                    </button>
                    <button onClick={logout} className="p-4 bg-red-500/10 backdrop-blur-3xl rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <LogOut size={20} />
                    </button>
                </div>

                {/* Identity Cluster */}
                <div className="absolute -bottom-16 left-12 flex items-end gap-10">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[48px] blur opacity-30 group-hover:opacity-60 transition duration-700"></div>
                        <div className="relative p-1.5 bg-[#020205] rounded-[48px]">
                            <img 
                                src={user.photoURL} 
                                className="w-40 h-40 md:w-52 md:h-52 rounded-[42px] object-cover border border-white/10" 
                                alt="avatar" 
                            />
                        </div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-cyan-500 rounded-2xl border-4 border-[#020205] shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center">
                            <Zap size={18} fill="black" />
                        </div>
                    </div>
                    
                    <div className="pb-8 space-y-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic leading-none">{user.displayName}</h1>
                            <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-xl flex items-center gap-2">
                                <Shield size={16} className="text-cyan-400" />
                                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Verified Hub</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">
                            <span className="flex items-center gap-2 text-white/60"><MapPin size={12} className="text-cyan-500" /> Global Node</span>
                            <span className="flex items-center gap-2"><Calendar size={12} /> Joined Mar 2026</span>
                            <span className="flex items-center gap-2 text-cyan-400"><Zap size={12} /> {user.karma || '12.4k'} Karma</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-12 pt-32 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left: Engagement Intelligence */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-10 border border-white/5 shadow-3xl">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10 pl-2">Neural Metrics</h3>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: 'Node Connections', val: '2.4K', color: 'text-cyan-400' },
                                { label: 'Data Retention', val: '98.2%', color: 'text-purple-400' },
                                { label: 'Visual Reach', val: '1.2M', color: 'text-blue-400' },
                                { label: 'Identity Code', val: user.code || '#87654321', color: 'text-emerald-400' },
                            ].map(stat => (
                                <div key={stat.label} className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                                    <p className={`text-2xl font-black uppercase italic ${stat.color}`}>{stat.val}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-12 py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10">Edit System Identity</button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-3xl rounded-[48px] p-10 border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <Sparkles size={24} className="text-purple-400" />
                            <h4 className="text-sm font-black text-white uppercase tracking-widest italic">AI Identity Summary</h4>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider border-l-2 border-purple-500/30 pl-6">
                            "Current node profile suggests a high-level focus on spatial architecture and digital minimalism within the Hybrid ecosystem."
                        </p>
                    </div>
                </div>

                {/* Right: Asymmetric Media Hub */}
                <div className="lg:col-span-8 flex flex-col space-y-10">
                    {/* Tab Navigation */}
                    <div className="flex gap-10 border-b border-white/5 pb-6">
                        {['Nodes', 'Streams', 'Collection', 'Memories'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[11px] font-black uppercase tracking-[0.4em] relative transition-all ${
                                    activeTab === tab ? 'text-cyan-400' : 'text-gray-500 hover:text-white'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-underline" className="absolute -bottom-6 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#06b6d4]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Grid Engine */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className={`relative rounded-[40px] overflow-hidden group cursor-pointer bg-white/5 border border-white/5 ${
                                    i % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'
                                }`}
                            >
                                <img 
                                    src={`https://picsum.photos/seed/${i + 50}/1200/1200`} 
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                                    alt="gallery" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <Heart size={16} fill="white" className="text-cyan-400" />
                                                <span className="text-[11px] font-black uppercase">1.2K</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white">
                                                <MessageSquare size={16} />
                                                <span className="text-[11px] font-black uppercase">42</span>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-white/10 backdrop-blur-3xl rounded-2xl text-white">
                                            <Zap size={16} fill="white" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
