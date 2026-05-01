import React, { useState, useEffect, useRef } from 'react';
import {
    Home, Play, Search, MessageCircle, User, Heart, MessageSquare, Send,
    MoreHorizontal, Plus, Ghost, Grid, List as ListIcon, ChevronLeft,
    Settings, Bell, Users, Video, Image as ImageIcon, Star, Mic, Paperclip,
    Youtube, MonitorPlay, Tv, Shield, Globe, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA (Simulating Backend) ---
const MOCK_USERS = [
    { id: 1, name: 'Chloe Davis', code: '#87654321', avatar: 'https://i.pravatar.cc/150?u=chloe' },
    { id: 2, name: 'Alex Cyber', code: '#11223344', avatar: 'https://i.pravatar.cc/150?u=alex' },
];

const NOTIFICATIONS = [
    { id: 1, text: 'mentioned you in a comment.', user: 'NeonExplorer', time: '2m ago', read: false },
    { id: 2, text: 'liked your Cyberpunk post.', user: 'Sarah', time: '1h ago', read: true },
];

// --- REUSABLE UI COMPONENTS ---
const GlassCard = ({ children, className = "", onClick }) => (
    <div onClick={onClick} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg ${className}`}>
        {children}
    </div>
);

const GlowingButton = ({ children, className = "", onClick }) => (
    <button onClick={onClick} className={`relative group overflow-hidden rounded-xl font-bold transition-all ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative flex items-center justify-center gap-2 px-4 py-2 text-white">
            {children}
        </div>
    </button>
);

// --- TOP NAVIGATION ---
const TopNavigation = () => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [hasNewNotif, setHasNewNotif] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Simulate real-time incoming notification
    useEffect(() => {
        const interval = setInterval(() => setHasNewNotif(true), 15000);
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
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    />
                </div>

                {/* Dynamic Search Dropdown */}
                <AnimatePresence>
                    {searchFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50"
                        >
                            {MOCK_USERS.map(user => (
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
                            ))}
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

                    {/* Profile Dropdown */}
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
                                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl text-sm transition-colors"><Settings size={16} /> Settings & Privacy</button>
                                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl text-sm transition-colors"><Globe size={16} /> Display Customization</button>
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

// --- POST BOX (Status+) ---
const StatusPostBox = () => (
    <GlassCard className="p-4 mb-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-t border-white/20">
        <div className="flex gap-3 mb-4">
            <img src="https://i.pravatar.cc/150?u=me" className="w-10 h-10 rounded-full" />
            <input
                type="text"
                placeholder="What's on your mind?"
                className="bg-transparent border-none focus:outline-none w-full text-lg font-light text-white placeholder-gray-500"
            />
        </div>
        <div className="grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-colors">
                <Video size={16} /> Go Live
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-xs font-semibold transition-colors shadow-[inset_0_0_10px_rgba(147,51,234,0.1)]">
                <ImageIcon size={16} /> Media
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl text-xs font-semibold transition-colors">
                <Star size={16} /> Life Event
            </button>
        </div>
    </GlassCard>
);

// --- FEED POST ---
const FeedPost = ({ post }) => {
    const [likes, setLikes] = useState(1240);
    const [liked, setLiked] = useState(false);
    const [showHeartPopup, setShowHeartPopup] = useState(false);

    const handleDoubleTap = () => {
        if (!liked) { setLiked(true); setLikes(l => l + 1); }
        setShowHeartPopup(true);
        // Haptic feedback simulation
        if (navigator.vibrate) navigator.vibrate(50);
        setTimeout(() => setShowHeartPopup(false), 800);
    };

    return (
        <GlassCard className="mb-6 relative">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="relative">
                        <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-purple-500 p-[1px]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white">{post.user}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Clock size={10} /> {post.time} • AI Suggested
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="text-gray-500" />
            </div>

            {/* Media with Double Tap */}
            <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onDoubleClick={handleDoubleTap}>
                <img src={post.image} className="w-full h-full object-cover opacity-90" />
                <AnimatePresence>
                    {showHeartPopup && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.5, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            <Heart size={80} fill="rgba(239, 68, 68, 0.8)" className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,1)]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white">
                    Trending in Tech
                </div>
            </div>

            {/* Action Bar */}
            <div className="p-4">
                <div className="flex gap-4 mb-3">
                    <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }} className="flex items-center gap-1 group">
                        <Heart size={24} fill={liked ? "#ef4444" : "none"} className={`${liked ? 'text-red-500' : 'text-gray-300 group-hover:text-red-400'} transition-colors`} />
                        {/* Gamified Number slot machine simulation */}
                        <motion.span key={likes} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-bold text-sm">
                            {likes.toLocaleString()}
                        </motion.span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors">
                        <MessageSquare size={24} /> <span className="font-bold text-sm">342</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-green-400 transition-colors">
                        <Send size={24} />
                    </button>
                </div>

                {/* AI Summary Previews */}
                <div className="bg-white/5 rounded-lg p-3 mb-2 border-l-2 border-purple-500">
                    <p className="text-[10px] text-purple-400 font-bold mb-1 uppercase tracking-wider">✨ AI Summary</p>
                    <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                        <li>New glassmorphism trends discussed.</li>
                        <li>Performance optimizations in React.</li>
                    </ul>
                </div>

                <p className="text-sm font-light">
                    <span className="font-bold mr-2 text-white">{post.user}</span>
                    {post.caption}
                </p>
            </div>
        </GlassCard>
    );
};

// --- PAGES ---

const HomePage = () => (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 px-4 pb-24">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-4 sticky top-24 h-max">
            <GlassCard className="p-4 space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Shortcuts</h3>
                {['Friends', 'Memories', 'Saved', 'Groups', 'Marketplace'].map(item => (
                    <div key={item} className="p-3 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-medium transition-colors">
                        {item}
                    </div>
                ))}
            </GlassCard>
        </div>

        {/* Main Feed (Center) */}
        <div className="col-span-1 lg:col-span-2">
            <StatusPostBox />

            {/* Omni-Creator OS Stories */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
                <div className="flex flex-col items-center gap-1 min-w-[70px] relative cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                        <Plus size={24} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-medium">Add Story</span>
                </div>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow">
                            <div className="bg-black p-[2px] rounded-full">
                                <img src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-14 h-14 rounded-full object-cover" />
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-300">User {i}</span>
                    </div>
                ))}
            </div>

            {/* Triple Filter */}
            <div className="flex bg-white/5 rounded-xl p-1 mb-6">
                {['For You (AI)', 'Friends', 'Global Trends'].map((f, i) => (
                    <button key={f} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${i === 0 ? 'bg-white/10 shadow-md text-white' : 'text-gray-500 hover:text-white'}`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Posts Stream */}
            <FeedPost post={{ user: 'CyberArtist', avatar: 'https://i.pravatar.cc/150?img=33', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', caption: 'Deep diving into Neo-Tokyo architecture. #Cyberpunk', time: '2h ago' }} />
            <FeedPost post={{ user: 'DesignGuru', avatar: 'https://i.pravatar.cc/150?img=44', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', caption: 'Glassmorphism is here to stay. Look at these textures.', time: '5h ago' }} />
        </div>

        {/* Right Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-4 sticky top-24 h-max">
            <GlassCard className="p-4">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Online Contacts</h3>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer">
                            <div className="relative">
                                <img src={`https://i.pravatar.cc/150?img=${i + 20}`} className="w-8 h-8 rounded-full" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Contact {i}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    </div>
);

// Advanced Watch Party & YouTube Hub Page combined
const WatchHubPage = () => (
    <div className="max-w-7xl mx-auto p-4 pb-24 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
        {/* Cinematic Header */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <MonitorPlay className="text-purple-500" /> Cinema-Social
            </h2>
            <GlowingButton className="text-xs py-2 px-4 shadow-[0_0_15px_rgba(147,51,234,0.4)]">
                <Tv size={16} /> Cast to Smart TV
            </GlowingButton>
        </div>

        {/* The 4K Movie Player (Simulated) */}
        <div className="w-full aspect-video bg-black rounded-2xl border border-white/10 relative overflow-hidden mb-6 shadow-2xl group">
            <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&q=80" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Live Sync Badge */}
            <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Live Sync
            </div>

            {/* Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play size={32} fill="white" />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-purple-500 w-1/3 shadow-[0_0_10px_#a855f7]"></div>
            </div>
        </div>

        {/* Friends Carousel (Spatial Audio Active) */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                    <div className={`p-1 rounded-full ${i === 1 ? 'bg-purple-500 animate-pulse shadow-[0_0_15px_#a855f7]' : 'bg-white/10'}`}>
                        <img src={`https://i.pravatar.cc/150?img=${i + 30}`} className="w-12 h-12 rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400">{i === 1 ? 'Speaking...' : 'Listening'}</span>
                </div>
            ))}
        </div>

        {/* YouTube Grid Integration */}
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Youtube className="text-red-500" /> Trending Hub</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <GlassCard key={i} className="group cursor-pointer">
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                        <img src={`https://picsum.photos/600/400?sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">12:04</div>
                    </div>
                    <div className="p-3">
                        <h4 className="font-bold text-sm mb-1 line-clamp-2 text-white">Exploring the NexCloud Architecture - Tech Talk</h4>
                        <p className="text-xs text-gray-400">NexSocial Official • 120K views</p>
                    </div>
                </GlassCard>
            ))}
        </div>
    </div>
);

// Advanced Direct Message Page
const MessagePage = () => {
    const [focusMode, setFocusMode] = useState(false);

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row max-w-7xl mx-auto overflow-hidden">
            {/* Sidebar (30%) */}
            <div className="w-full md:w-[30%] h-full border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">Messages</h2>
                        <button onClick={() => setFocusMode(!focusMode)} className={`p-2 rounded-full ${focusMode ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                            <Shield size={18} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" placeholder="Search chats..." className="w-full bg-white/5 backdrop-blur-md rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 border border-white/10" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                            <div className="relative">
                                <img src={`https://i.pravatar.cc/150?img=${i}`} className="w-12 h-12 rounded-full border border-white/10" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-[0_0_8px_#22c55e]"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-sm text-white truncate">Developer {i}</h4>
                                    <span className="text-[10px] text-gray-500">12:45</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate">Here is the snippet for the React hook...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat (45%) */}
            <div className="hidden md:flex flex-col w-[45%] h-full relative bg-gradient-to-b from-transparent to-purple-900/10">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 bg-black/50 backdrop-blur-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/150?img=1" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-bold text-white">Developer 1</h3>
                            <p className="text-xs text-green-400">Online</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <GlowingButton className="text-xs py-1.5 px-3"><Youtube size={14} /> Watch Together</GlowingButton>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="text-center text-xs text-gray-500 my-4">End-to-End Encrypted</div>

                    <div className="flex justify-start">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] text-sm">
                            Hey! Have you seen the new glassmorphism setup?
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_15px_rgba(147,51,234,0.3)] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm font-medium">
                            Yeah, it looks insanely premium. The performance is zero-lag too!
                        </div>
                    </div>
                </div>

                {/* Floating Input */}
                <div className="p-4">
                    <div className="flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 shadow-2xl">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors"><Paperclip size={20} /></button>
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2" />
                        <button className="p-2 text-purple-400 hover:text-purple-300 transition-colors"><Mic size={20} /></button>
                        <button className="p-2 bg-purple-600 rounded-full ml-2 shadow-[0_0_10px_#a855f7]"><Send size={16} fill="white" /></button>
                    </div>
                </div>
            </div>

            {/* Details Panel (25%) */}
            <div className="hidden lg:block w-[25%] h-full border-l border-white/10 p-4 overflow-y-auto">
                <div className="flex flex-col items-center mb-6">
                    <img src="https://i.pravatar.cc/150?img=1" className="w-24 h-24 rounded-full mb-3" />
                    <h3 className="font-bold text-lg">Developer 1</h3>
                    <p className="text-xs text-gray-400">CSE Department</p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Code Vault</h4>
                        <div className="bg-black/50 p-2 rounded text-[10px] font-mono text-green-400 border border-white/5">
                            {'const init = () => {'} <br />
                            &nbsp;&nbsp;console.log("Ready");<br />
                            {'}'}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shared Media</h4>
                        <div className="grid grid-cols-3 gap-1">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-square bg-gray-800 rounded">
                                    <img src={`https://picsum.photos/200/200?sig=${i + 50}`} className="w-full h-full object-cover rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- BOTTOM NAVIGATION (Mobile optimized) ---
const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Feed' },
        { id: 'watch', icon: Play, label: 'Reels' },
        { id: 'hub', icon: MonitorPlay, label: 'Hub' },
        { id: 'messages', icon: MessageCircle, label: 'Chat' },
        { id: 'profile', icon: User, label: 'Me' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-3xl border-t border-white/10 z-[100] px-4 sm:px-10 flex items-center justify-between pb-4">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex flex-col items-center justify-center transition-all duration-300 w-12 ${isActive ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {isActive && (
                            <motion.div layoutId="nav-glow" className="absolute -top-2 w-12 h-12 bg-purple-500/20 rounded-full blur-xl" />
                        )}
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [activeTab, setActiveTab] = useState('home');

    const renderPage = () => {
        switch (activeTab) {
            case 'home': return <HomePage />;
            case 'watch': return <div className="p-10 text-center text-gray-500 h-screen">Reels View (See Hub for Party)</div>;
            case 'hub': return <WatchHubPage />;
            case 'messages': return <MessagePage />;
            case 'profile': return <div className="p-10 text-center text-gray-500">Profile Dashboard</div>;
            default: return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
            <TopNavigation />

            <main className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full"
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: #050505;
          margin: 0;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </div>
    );
}