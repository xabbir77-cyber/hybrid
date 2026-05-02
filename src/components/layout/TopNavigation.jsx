import React, { useState } from 'react';
import { Search, Bell, Zap, User } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useAuth } from '../../hooks/useAuth';

const TopNavigation = ({ onSearch, users = [] }) => {
    const { user } = useAuth();
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);
        onSearch(val);
        setShowResults(val.length > 0);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-3xl border-b border-white/10 px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                        <Zap className="text-white fill-white" size={24} />
                    </div>
                    <h1 className="text-xl font-black tracking-tighter hidden md:block text-white uppercase">HYBRID<span className="text-purple-500">VIEW</span></h1>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl relative group">
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-purple-500 transition-all">
                        <Search size={18} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search Hybrid Network..." 
                            className="bg-transparent border-none focus:outline-none w-full px-3 text-sm font-medium placeholder-gray-500 text-white"
                            value={query}
                            onChange={handleSearch}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            onFocus={() => query.length > 0 && setShowResults(true)}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && (
                        <GlassCard className="absolute top-full left-0 right-0 mt-2 p-2 max-h-[400px] overflow-y-auto">
                            {users.length > 0 ? users.map((u) => (
                                <div key={u.id} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                                    <img src={u.avatar} className="w-10 h-10 rounded-full border border-purple-500/30" alt="avatar" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white">{u.name}</h4>
                                        <p className="text-[10px] text-purple-400 font-bold uppercase">{u.code}</p>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all">Connect</button>
                                </div>
                            )) : (
                                <div className="p-4 text-center text-gray-500 text-xs font-bold uppercase">No entities found</div>
                            )}
                        </GlassCard>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2 md:gap-5">
                    <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black animate-pulse"></span>
                    </button>
                    <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black tracking-tight text-white">{user ? user.displayName : 'Guest User'}</p>
                            <p className="text-[9px] text-purple-500 font-bold uppercase tracking-widest">{user ? 'Architect' : 'Visitor'}</p>
                        </div>
                        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 group-hover:scale-110 transition-transform">
                            {user ? (
                                <img src={user.photoURL} className="w-9 h-9 rounded-full border-2 border-[#050505]" alt="profile" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-[#050505] flex items-center justify-center">
                                    <User size={18} className="text-gray-500" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;
