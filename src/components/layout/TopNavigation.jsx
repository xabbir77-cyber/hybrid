import React, { useState } from 'react';
import { Bell, Users, Zap, LayoutGrid, MonitorPlay, Youtube, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import UniversalSearch from './UniversalSearch';
import ProfileMenu from './ProfileMenu';
import { motion } from 'framer-motion';

const TopNavigation = ({ onSearch, users = [], isLoadingSearch, setTab, activeTab, requestCount }) => {
    const { user } = useAuth();
    const { unreadCount } = useNotifications();

    const hubs = [
        { id: 'home', icon: LayoutGrid, label: 'Feed' },
        { id: 'watch', icon: MonitorPlay, label: 'Watch' },
        { id: 'reels', icon: Zap, label: 'Reels' },
        { id: 'youtube', icon: Youtube, label: 'Hub' },
    ];

    return (
        <header className="sticky top-0 z-[60] w-full bg-[#020205]/80 backdrop-blur-3xl border-b border-white/5 px-6 py-2">
            <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
                
                {/* Logo Section */}
                <motion.div 
                    className="flex items-center gap-3 cursor-pointer min-w-max"
                    onClick={() => setTab('home')}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Zap className="text-white fill-white" size={20} />
                    </div>
                    <h1 className="text-lg font-black tracking-tighter text-white uppercase italic hidden xl:block">
                        HYBRID<span className="text-cyan-400">VIEW</span>
                    </h1>
                </motion.div>

                {/* Master Hub Hubs (1:1:1:1 Row) */}
                <nav className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
                    {hubs.map((hub) => (
                        <button
                            key={hub.id}
                            onClick={() => setTab(hub.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-500 relative group ${
                                activeTab === hub.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {activeTab === hub.id && (
                                <motion.div 
                                    layoutId="active-hub-bg"
                                    className="absolute inset-0 bg-white/10 rounded-xl shadow-lg border border-white/10"
                                />
                            )}
                            <hub.icon size={18} className="relative z-10" />
                            <span className="text-[10px] font-black uppercase tracking-widest relative z-10 hidden md:block">{hub.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Universal Search */}
                <div className="flex-1 max-w-md hidden lg:block">
                    <UniversalSearch 
                        users={users} 
                        onSearch={onSearch} 
                        isLoading={isLoadingSearch} 
                        onNavigate={(uid) => setTab('profile')} 
                    />
                </div>

                {/* Action Icons & Profile */}
                <div className="flex items-center gap-3 min-w-max">
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                        {[
                            { id: 'friends', icon: Users, count: requestCount },
                            { id: 'messages', icon: MessageSquare, count: 0 },
                            { id: 'notifications', icon: Bell, count: unreadCount },
                        ].map((item) => (
                            <motion.button 
                                key={item.id}
                                onClick={() => setTab(item.id)}
                                className={`p-2.5 rounded-lg transition-all relative group ${
                                    activeTab === item.id ? 'text-cyan-400 bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                                whileHover={{ y: -2 }}
                            >
                                <item.icon size={18} />
                                {item.count > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] font-black items-center justify-center text-white border-2 border-[#020205]">
                                            {item.count}
                                        </span>
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                    {/* Profile Menu Component */}
                    <ProfileMenu user={user} />
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;

