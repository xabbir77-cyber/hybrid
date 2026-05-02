import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Users, Settings, Globe, Shield } from 'lucide-react';
import GlowingButton from '../common/GlowingButton';

const TopNavigation = ({ onSearch, users }) => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [hasNewNotif, setHasNewNotif] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const interval = setInterval(() => setHasNewNotif(true), 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10 px-4 py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <h1 className="text-xl md:text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer hidden sm:block">
                HYBRID
            </h1>

            {/* Universal Search */}
            <div className="flex-1 max-w-xl relative">
                <div className={`flex items-center bg-white/5 border ${searchFocused ? 'border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'border-white/10'} rounded-full px-4 py-2 transition-all`}>
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name (@john) or Code (#1234)"
                        className="w-full bg-transparent border-none focus:outline-none text-sm text-white ml-3 placeholder-gray-500"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            onSearch(e.target.value);
                        }}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    />
                </div>

                {/* Dynamic Search Dropdown */}
                <AnimatePresence>
                    {searchFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 max-h-64 overflow-y-auto"
                        >
                            {users.length > 0 ? users.map(user => (
                                <div key={user.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                                        <div>
                                            <p className="font-bold text-sm text-white">{user.name}</p>
                                            <p className="text-[10px] text-gray-400">{user.code}</p>
                                        </div>
                                    </div>
                                    <GlowingButton className="text-xs py-1 px-3">Add</GlowingButton>
                                </div>
                            )) : (
                                <div className="p-4 text-center text-gray-500 text-sm italic">No users found...</div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                    <Users size={22} className="text-gray-300" />
                </button>
                <button onClick={() => setHasNewNotif(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                    <Bell size={22} className="text-gray-300" />
                    {hasNewNotif && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    )}
                </button>

                {/* Profile Avatar Trigger */}
                <div className="relative">
                    <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-9 h-9 rounded-full border-2 border-purple-500 p-[1px] relative overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=me" className="w-full h-full rounded-full" alt="Me" />
                    </button>

                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-full mt-3 w-64 bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50"
                            >
                                <div className="flex flex-col items-center border-b border-white/10 pb-4 mb-4">
                                    <img src="https://i.pravatar.cc/150?u=me" className="w-16 h-16 rounded-full mb-2" />
                                    <p className="font-bold text-lg">Admin User</p>
                                    <p className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full mt-1">#99887766</p>
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl text-sm transition-colors"><Settings size={16} /> Settings</button>
                                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl text-sm transition-colors"><Globe size={16} /> Language</button>
                                    <button className="w-full flex items-center gap-3 p-2 hover:bg-red-500/10 text-red-400 rounded-xl text-sm transition-colors mt-2"><Shield size={16} /> Log Out</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TopNavigation;
