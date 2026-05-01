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
    { id: 3, name: 'NeonExplorer', code: '#44556677', avatar: 'https://i.pravatar.cc/150?u=neon' },
    { id: 4, name: 'Sarah Miller', code: '#12121212', avatar: 'https://i.pravatar.cc/150?u=sarah' },
];

const INITIAL_POSTS = [
    { id: 1, user: 'CyberArtist', avatar: 'https://i.pravatar.cc/150?img=33', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', caption: 'Deep diving into Neo-Tokyo architecture. #Cyberpunk', time: '2h ago', likes: 1240 },
    { id: 2, user: 'DesignGuru', avatar: 'https://i.pravatar.cc/150?img=44', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', caption: 'Glassmorphism is here to stay. Look at these textures.', time: '5h ago', likes: 890 },
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
const TopNavigation = ({ onSearch, users }) => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [hasNewNotif, setHasNewNotif] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [query, setQuery] = useState('');

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
const StatusPostBox = ({ onPost }) => {
    const [text, setText] = useState('');

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
    };

    return (
        <GlassCard className="p-4 mb-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-t border-white/20">
            <div className="flex gap-3 mb-4">
                <img src="https://i.pravatar.cc/150?u=me" className="w-10 h-10 rounded-full" />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                    placeholder="What's on your mind?"
                    className="bg-transparent border-none focus:outline-none w-full text-lg font-light text-white placeholder-gray-500"
                />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-colors">
                    <Video size={16} /> Go Live
                </button>
                <button onClick={handlePost} className="flex items-center justify-center gap-2 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-xs font-semibold transition-colors shadow-[inset_0_0_10px_rgba(147,51,234,0.1)]">
                    <ImageIcon size={16} /> Post
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl text-xs font-semibold transition-colors">
                    <Star size={16} /> Life Event
                </button>
            </div>
        </GlassCard>
    );
};

// --- FEED POST ---
const FeedPost = ({ post }) => {
    const [likes, setLikes] = useState(post.likes || 1240);
    const [liked, setLiked] = useState(false);
    const [showHeartPopup, setShowHeartPopup] = useState(false);

    const handleDoubleTap = () => {
        if (!liked) { setLiked(true); setLikes(l => l + 1); }
        setShowHeartPopup(true);
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
                            <Clock size={10} /> {post.time}
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="text-gray-500 cursor-pointer" />
            </div>

            {/* Media with Double Tap */}
            <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onDoubleClick={handleDoubleTap}>
                {post.image ? (
                    <img src={post.image} className="w-full h-full object-cover opacity-90" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 text-center text-xl font-light italic">
                        "{post.caption}"
                    </div>
                )}
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
            </div>

            {/* Action Bar */}
            <div className="p-4">
                <div className="flex gap-4 mb-3">
                    <button onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }} className="flex items-center gap-1 group">
                        <Heart size={24} fill={liked ? "#ef4444" : "none"} className={`${liked ? 'text-red-500' : 'text-gray-300 group-hover:text-red-400'} transition-colors`} />
                        <motion.span key={likes} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-bold text-sm">
                            {likes.toLocaleString()}
                        </motion.span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors">
                        <MessageSquare size={24} /> <span className="font-bold text-sm">24</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-green-400 transition-colors">
                        <Send size={24} />
                    </button>
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

const HomePage = ({ posts, onPost }) => (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 px-4 pb-24">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-4 sticky top-24 h-max">
            <GlassCard className="p-4 space-y-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Shortcuts</h3>
                {['Friends', 'Memories', 'Saved', 'Groups', 'Marketplace'].map(item => (
                    <div key={item} className="p-3 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-medium transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                            {item === 'Friends' && <Users size={18} />}
                            {item === 'Memories' && <Clock size={18} />}
                            {item === 'Saved' && <Star size={18} />}
                            {item === 'Groups' && <Grid size={18} />}
                            {item === 'Marketplace' && <Globe size={18} />}
                        </div>
                        {item}
                    </div>
                ))}
            </GlassCard>
        </div>

        {/* Main Feed (Center) */}
        <div className="col-span-1 lg:col-span-2">
            <StatusPostBox onPost={onPost} />

            {/* Stories */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
                <div className="flex flex-col items-center gap-1 min-w-[70px] relative cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                        <Plus size={24} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-medium">Add Story</span>
                </div>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer">
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600">
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
                {['For You', 'Friends', 'Trending'].map((f, i) => (
                    <button key={f} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${i === 0 ? 'bg-white/10 shadow-md text-white' : 'text-gray-500 hover:text-white'}`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Posts Stream */}
            <div className="space-y-6">
                {posts.map(post => (
                    <FeedPost key={post.id} post={post} />
                ))}
            </div>
        </div>

        {/* Right Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-4 sticky top-24 h-max">
            <GlassCard className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Online Contacts</h3>
                    <MoreHorizontal size={14} className="text-gray-500" />
                </div>
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

// --- ADVANCED WATCH COMPONENTS ---

const WatchTopNav = ({ activeWatchTab, setActiveWatchTab }) => {
    const tabs = [
        { id: 'shorts', label: 'Shorts', icon: Play },
        { id: 'reels', label: 'Reels', icon: Video },
        { id: 'party', label: 'Party', icon: Tv },
        { id: 'youtube', label: 'YouTube', icon: Youtube },
    ];

    return (
        <div className="flex w-full bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveWatchTab(tab.id)}
                    className={`flex-1 flex flex-col items-center py-3 transition-all relative ${activeWatchTab === tab.id ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <tab.icon size={20} className={activeWatchTab === tab.id ? 'animate-pulse' : ''} />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{tab.label}</span>
                    {activeWatchTab === tab.id && (
                        <motion.div layoutId="watch-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                    )}
                </button>
            ))}
        </div>
    );
};

const ReelCard = ({ video, isActive }) => {
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(() => {});
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isActive]);

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 800);
        }
    };

    return (
        <div className="relative h-[calc(100vh-130px)] w-full snap-start bg-black flex items-center justify-center overflow-hidden">
            {/* Video Player */}
            <video
                ref={videoRef}
                src={video.url}
                className="w-full h-full object-cover opacity-80"
                loop
                muted
                playsInline
                onClick={(e) => {
                    const v = e.currentTarget;
                    v.paused ? v.play() : v.pause();
                }}
                onDoubleClick={handleLike}
            />

            {/* Glassmorphism Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Interaction Sidebar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-10">
                <div className="flex flex-col items-center gap-1">
                    <button onClick={handleLike} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all group">
                        <Heart size={28} fill={liked ? "#ef4444" : "none"} className={liked ? "text-red-500 scale-110" : "group-hover:text-red-400"} />
                    </button>
                    <span className="text-[10px] font-bold">124K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <MessageSquare size={28} />
                    </button>
                    <span className="text-[10px] font-bold">4.2K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <Send size={28} />
                    </button>
                    <span className="text-[10px] font-bold">Share</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden animate-spin-slow">
                    <img src={video.avatar} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Metadata Bottom */}
            <div className="absolute bottom-6 left-4 right-16 z-10">
                <div className="flex items-center gap-3 mb-3">
                    <img src={video.avatar} className="w-10 h-10 rounded-full border-2 border-purple-500" />
                    <div>
                        <h4 className="font-black text-sm text-white flex items-center gap-2">
                            @{video.user} <span className="bg-purple-600 text-[8px] px-1.5 py-0.5 rounded-full uppercase">Creator</span>
                        </h4>
                        <p className="text-[10px] text-gray-300">Original Audio • 2.4M uses</p>
                    </div>
                    <button className="ml-2 bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-gray-200 transition-colors">Follow</button>
                </div>
                <p className="text-sm font-medium line-clamp-2 text-white mb-2">
                    {video.caption} <span className="text-purple-400">#Trending #NexSocial #Cyberpunk2026</span>
                </p>
                {/* Audio Waveform Visualizer */}
                <div className="flex items-end gap-[2px] h-4">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [4, 16, 8, 12, 4] }}
                            transition={{ repeat: Infinity, duration: 0.5 + Math.random(), delay: i * 0.05 }}
                            className="w-1 bg-purple-500/50 rounded-full"
                        />
                    ))}
                </div>
            </div>

            {/* Heart Popup Animation */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.5, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                        <Heart size={100} fill="#ef4444" className="text-red-500 drop-shadow-[0_0_40px_rgba(239,68,68,0.8)]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_10px_#a855f7]"
                />
            </div>
        </div>
    );
};

const ShortsFeed = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    const videos = [
        { id: 1, user: 'CyberExplorer', url: 'https://assets.mixkit.co/videos/preview/mixkit-tech-animation-with-abstract-elements-and-glowing-lines-48356-large.mp4', avatar: 'https://i.pravatar.cc/150?u=1', caption: 'Exploring the NexCloud Hub Architecture. Zero lag, pure glass.' },
        { id: 2, user: 'NeonDesigner', url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-modern-background-in-blue-and-purple-colors-48355-large.mp4', avatar: 'https://i.pravatar.cc/150?u=2', caption: 'The future of Glassmorphism is here. #DesignTrends' },
        { id: 3, user: 'Web3Master', url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-background-with-dots-and-lines-48354-large.mp4', avatar: 'https://i.pravatar.cc/150?u=3', caption: 'Decentralized social networks are the way forward.' },
    ];

    const handleScroll = () => {
        if (!containerRef.current) return;
        const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
        setActiveIndex(index);
    };

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-130px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        >
            {videos.map((v, i) => (
                <ReelCard key={v.id} video={v} isActive={activeIndex === i} />
            ))}
        </div>
    );
};

const WatchPartyPage = () => {
    const [showEmojis, setShowEmojis] = useState([]);

    const spawnEmoji = (emoji) => {
        const id = Date.now();
        setShowEmojis(prev => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
        setTimeout(() => setShowEmojis(prev => prev.filter(e => e.id !== id)), 3000);
    };

    return (
        <div className="h-[calc(100vh-130px)] flex flex-col p-4 bg-[#050505]">
            {/* Player Area */}
            <div className="relative aspect-video bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl mb-6 group">
                <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&q=80" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-purple-600/20 backdrop-blur-3xl rounded-full flex items-center justify-center border border-purple-500/50 cursor-pointer hover:scale-110 transition-transform">
                        <Play size={40} fill="white" />
                    </div>
                </div>
                <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Live Syncing
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-black/60 backdrop-blur-xl p-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all"><MonitorPlay size={18} /></button>
                    <button className="bg-purple-600 p-2 rounded-xl shadow-[0_0_15px_#a855f7] border border-purple-400/50 transition-all"><Tv size={18} /></button>
                </div>
            </div>

            {/* Friend Avatars Area */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                        <div className={`relative p-1 rounded-full border-2 ${i === 0 ? 'border-purple-500 animate-pulse shadow-[0_0_15px_#a855f7]' : 'border-white/10'}`}>
                            <img src={`https://i.pravatar.cc/150?img=${i + 40}`} className="w-14 h-14 rounded-full" />
                            {i === 0 && <div className="absolute -bottom-1 -right-1 bg-purple-600 p-1 rounded-full"><Mic size={10} /></div>}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{i === 0 ? 'You' : `User ${i}`}</span>
                    </div>
                ))}
            </div>

            {/* Social Chat Interaction Area */}
            <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col overflow-hidden relative">
                {/* Floating Emojis */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <AnimatePresence>
                        {showEmojis.map(e => (
                            <motion.div
                                key={e.id}
                                initial={{ y: 400, opacity: 0, scale: 0.5 }}
                                animate={{ y: -100, opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                style={{ left: `${e.left}%` }}
                                className="absolute text-4xl"
                            >
                                {e.emoji}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="font-black text-xs uppercase tracking-widest text-purple-400">Live Party Chat</h3>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-[10px] font-bold">1.2K Watching</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    <div className="flex gap-3">
                        <img src="https://i.pravatar.cc/150?img=41" className="w-8 h-8 rounded-full" />
                        <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-2 text-xs">This scene is insane! 🍿</div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <div className="bg-purple-600/80 rounded-2xl rounded-tr-none px-4 py-2 text-xs font-medium">Agree! The visuals are 10/10 🔥</div>
                    </div>
                </div>

                {/* Interaction Footer */}
                <div className="p-4 bg-black/40 backdrop-blur-2xl">
                    <div className="flex gap-4 justify-around mb-4">
                        {['🍿', '🔥', '❤️', '👏', '😲'].map(emoji => (
                            <button key={emoji} onClick={() => spawnEmoji(emoji)} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Send a message..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        <button className="bg-purple-600 p-2 rounded-full shadow-[0_0_10px_#a855f7]"><Send size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const YouTubeHub = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (
        <div className="h-[calc(100vh-130px)] flex flex-col bg-[#050505] p-4 overflow-y-auto no-scrollbar">
            {/* YouTube Search Bar */}
            <div className="max-w-3xl mx-auto w-full mb-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-3xl focus-within:border-purple-500 transition-all shadow-2xl">
                        <Search size={22} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search YouTube with NexSocial Intelligence..."
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
                                <h4 className="font-bold text-sm text-white line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">Building a High-End Social Media App with Next-Gen Glassmorphism</h4>
                                <p className="text-[10px] text-gray-400 mt-1 font-bold">NexSocial Tech • 1.2M views • 2 hours ago</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-[10px] bg-white/5 hover:bg-purple-500/20 px-2 py-1 rounded border border-white/10 text-gray-400 hover:text-purple-400 transition-all flex items-center gap-1">
                                        <Plus size={10} /> Save to NexCloud
                                    </button>
                                    <button className="text-[10px] bg-white/5 hover:bg-blue-500/20 px-2 py-1 rounded border border-white/10 text-gray-400 hover:text-blue-400 transition-all flex items-center gap-1">
                                        <Send size={10} /> Post to Feed
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

const WatchHubPage = () => {
    const [activeWatchTab, setActiveWatchTab] = useState('shorts');

    const renderWatchContent = () => {
        switch (activeWatchTab) {
            case 'shorts': return <ShortsFeed />;
            case 'reels': return <ShortsFeed />; // Reels uses similar logic but can be themed differently
            case 'party': return <WatchPartyPage />;
            case 'youtube': return <YouTubeHub />;
            default: return <ShortsFeed />;
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col">
            <WatchTopNav activeWatchTab={activeWatchTab} setActiveWatchTab={setActiveWatchTab} />
            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeWatchTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {renderWatchContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

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
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredUsers(MOCK_USERS);
            return;
        }
        const filtered = MOCK_USERS.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) || 
            user.code.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handlePost = (text) => {
        const newPost = {
            id: Date.now(),
            user: 'Admin User',
            avatar: 'https://i.pravatar.cc/150?u=me',
            caption: text,
            time: 'Just now',
            likes: 0
        };
        setPosts([newPost, ...posts]);
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'home': return <HomePage posts={posts} onPost={handlePost} />;
            case 'watch': return <WatchHubPage />;
            case 'hub': return <WatchHubPage />;
            case 'messages': return <MessagePage />;
            case 'profile': return (
                <div className="max-w-4xl mx-auto p-4 pb-24">
                    <GlassCard className="p-8 text-center mb-6">
                        <img src="https://i.pravatar.cc/150?u=me" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500 p-1" />
                        <h2 className="text-3xl font-black">Admin User</h2>
                        <p className="text-purple-400 font-bold mb-4">#99887766</p>
                        <div className="flex justify-center gap-8 text-sm">
                            <div><p className="font-black text-xl">{posts.filter(p => p.user === 'Admin User').length}</p><p className="text-gray-400">Posts</p></div>
                            <div><p className="font-black text-xl">1.2k</p><p className="text-gray-400">Followers</p></div>
                            <div><p className="font-black text-xl">450</p><p className="text-gray-400">Following</p></div>
                        </div>
                    </GlassCard>
                    <div className="grid grid-cols-3 gap-2">
                        {posts.filter(p => p.user === 'Admin User').map(post => (
                            <div key={post.id} className="aspect-square bg-white/5 rounded-lg overflow-hidden group relative">
                                {post.image ? (
                                    <img src={post.image} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-2 text-[10px] italic bg-purple-500/10 text-center">
                                        {post.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
            default: return <HomePage posts={posts} onPost={handlePost} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
            {activeTab !== 'watch' && activeTab !== 'hub' && (
                <TopNavigation onSearch={handleSearch} users={filteredUsers} />
            )}

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
        </div>
    );
}