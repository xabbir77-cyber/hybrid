import React, { useState, useEffect } from 'react';
import { Bell, Users, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import UniversalSearch from './UniversalSearch';
import ProfileMenu from './ProfileMenu';
import { motion } from 'framer-motion';

const TopNavigation = ({ onSearch, users = [], isLoadingSearch, setTab }) => {
    const { user } = useAuth();
    const { unreadCount } = useNotifications();
    const [hasNewRequests, setHasNewRequests] = useState(false); // Can be linked to useFriendRequests later

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-[60] w-full glass-effect border-b border-white/5 px-6 py-4">
            <div className="max-w-[1920px] mx-auto flex justify-between items-center gap-8">
                {/* Logo Section */}
                <motion.div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={refreshPage}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg neon-glow-cyan">
                        <Zap className="text-white fill-white" size={22} />
                    </div>
                    <div className="flex flex-col -space-y-1 hidden lg:block">
                        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">HYBRID<span className="text-cyan-400">VIEW</span></h1>
                        <span className="text-[9px] font-black tracking-[0.2em] text-gray-500 uppercase">OS v2.0</span>
                    </div>
                </motion.div>

                {/* Universal Search */}
                <UniversalSearch users={users} onSearch={onSearch} isLoading={isLoadingSearch} />

                {/* Action Icons & Profile */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        {/* Friends Icon */}
                        <motion.button 
                            onClick={() => setTab('friends')}
                            className={`p-3 text-gray-400 hover:text-cyan-400 glass-effect rounded-2xl transition-all relative ${hasNewRequests ? 'pulse-red-glow' : ''}`}
                            whileHover={{ y: -2 }}
                        >
                            <Users size={20} />
                            {hasNewRequests && (
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
                            )}
                        </motion.button>

                        {/* Notification Icon */}
                        <motion.button 
                            className={`p-3 text-gray-400 hover:text-cyan-400 glass-effect rounded-2xl transition-all relative ${unreadCount > 0 ? 'pulse-red-glow' : ''}`}
                            whileHover={{ y: -2 }}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
                            )}
                        </motion.button>
                    </div>

                    <div className="w-[1px] h-8 bg-white/10 mx-2"></div>

                    {/* Profile Menu Component */}
                    <ProfileMenu user={user} />
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;

