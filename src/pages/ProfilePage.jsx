import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MonitorPlay, Grid, User, Bell, Plus, MessageSquare, Heart, Send, LogOut } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
    const { user, loginWithGoogle, logout, loading } = useAuth();

    if (loading) return (
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            <SkeletonLoader className="h-64 rounded-[2.5rem]" />
            <div className="flex gap-6 items-end -mt-20 px-8">
                <SkeletonLoader className="w-32 h-32 rounded-full border-4 border-[#050505]" />
                <div className="flex-1 space-y-2 pb-4">
                    <SkeletonLoader className="h-8 w-48" />
                    <SkeletonLoader className="h-4 w-32" />
                </div>
            </div>
        </div>
    );

    if (!user) return (
        <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
            <GlassCard className="max-w-md w-full p-12 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/30">
                    <User size={48} className="text-purple-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">Join the Experience</h2>
                <p className="text-gray-400 mb-8 font-light italic">Access your personalized infinite feed and sync your digital world across the Hybrid network.</p>
                <button 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Triggering Google Login...");
                        loginWithGoogle().catch(err => console.error("Login failed:", err));
                    }}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer relative z-50"
                >
                    Login with Google
                </button>
                <p className="text-[10px] text-gray-600 mt-6 uppercase tracking-[0.2em]">Secure Authentication via Firebase</p>
            </GlassCard>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-24 relative overflow-y-auto h-[calc(100vh-80px)] no-scrollbar">
            {/* Header Hub */}
            <div className="relative mb-20 px-4 pt-4">
                <div className="h-64 md:h-80 w-full rounded-[2.5rem] overflow-hidden relative border border-white/10 group">
                    <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
                </div>

                {/* Avatar & Basic Info */}
                <div className="absolute -bottom-16 left-12 flex flex-col md:flex-row items-end gap-6">
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(147,51,234,0.4)]">
                        <div className="bg-[#050505] p-1 rounded-full">
                            <img src={user.photoURL || "https://i.pravatar.cc/150?u=me"} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" alt="avatar" />
                        </div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-[#050505] rounded-full"></div>
                    </div>
                    <div className="mb-6 flex-1">
                        <h2 className="text-4xl font-black text-white flex items-center gap-3">
                            {user.displayName} <Shield className="text-purple-500" size={24} />
                        </h2>
                        <p className="text-purple-400 font-bold tracking-widest uppercase text-xs mt-1">{user.email}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="mb-8 p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            {/* Engagement Analytics Strip */}
            <div className="mx-4 mb-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-wrap justify-around gap-6 items-center shadow-2xl">
                {[
                    { label: 'Profile Traffic', val: '+24%', color: 'text-purple-400' },
                    { label: 'Engagement', val: '98.2', color: 'text-blue-400' },
                    { label: 'Project Views', val: '12.4K', color: 'text-green-400' },
                    { label: 'Retention', val: '84%', color: 'text-yellow-400' },
                ].map(stat => (
                    <div key={stat.label} className="text-center group cursor-pointer">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <div className="flex items-center gap-2 justify-center">
                            <span className={`text-2xl font-black ${stat.color}`}>{stat.val}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <GlassCard className="p-6">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Structural Identity</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400"><MonitorPlay size={18} /></div>
                                <div>
                                    <p className="text-xs font-black text-white">Principal Architect</p>
                                    <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">at Hybrid Dynamics Global</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download Dossier</button>
                    </GlassCard>
                </div>

                {/* Right Content Feed */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group relative cursor-pointer"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img src={`https://picsum.photos/800/600?sig=${i + 300}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="post" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-6">
                                    <h5 className="text-lg font-black text-white mb-2 leading-tight">Implementing Neural Networks into Hybrid View</h5>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
                                                <Heart size={14} /> <span className="text-[10px] font-bold">1.2K</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                                                <MessageSquare size={14} /> <span className="text-[10px] font-bold">42</span>
                                            </button>
                                        </div>
                                        <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"><Send size={14} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <motion.button
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px #a855f7", "0 0 20px #a855f7", "0 0 0px #a855f7"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="fixed bottom-24 right-8 bg-purple-600 text-white flex items-center gap-3 px-6 py-4 rounded-3xl font-black uppercase tracking-widest text-xs z-50 shadow-2xl"
            >
                <Plus size={20} /> Connect
            </motion.button>
        </div>
    );
};

export default ProfilePage;
