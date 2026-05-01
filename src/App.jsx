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

// --- ADVANCED DIRECT MESSAGE COMPONENTS ---

const WatchTogetherPiP = ({ url, onClose }) => (
    <motion.div
        drag
        dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-24 right-4 w-72 aspect-video bg-black rounded-2xl border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] z-[150] overflow-hidden group"
    >
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onClose} className="p-1 bg-black/60 rounded-full text-white"><Plus className="rotate-45" size={16} /></button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play size={32} fill="white" className="animate-pulse" />
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <motion.div animate={{ width: "60%" }} className="h-full bg-purple-500" />
        </div>
    </motion.div>
);

const ChatBubble = ({ message, isMe }) => (
    <motion.div
        initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 group relative`}
    >
        {!isMe && (
            <img src={message.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" />
        )}
        <div className="max-w-[75%] relative">
            <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                isMe 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm shadow-[0_10px_20px_rgba(147,51,234,0.2)] border border-white/10' 
                : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-200 rounded-tl-sm'
            }`}>
                {message.text}
                {message.translated && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] italic text-purple-300">
                        Translated: {message.translated}
                    </div>
                )}
            </div>
            <div className={`text-[9px] mt-1 text-gray-500 flex items-center gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {message.time} {isMe && <span className="text-purple-400">●●</span>}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:text-purple-400 flex items-center gap-1">
                    <Globe size={10} /> Translate
                </button>
            </div>
        </div>
    </motion.div>
);

const MessagePage = () => {
    const [focusMode, setFocusMode] = useState(false);
    const [showWatchPiP, setShowWatchPiP] = useState(false);
    const [activeChat, setActiveChat] = useState(1);
    const [vanishMode, setVanishMode] = useState(false);

    const CHATS = [
        { id: 1, name: 'Alex Cyber', avatar: 'https://i.pravatar.cc/150?u=alex', active: true, priority: true, lastMsg: 'The new UI is insane!', time: '2m' },
        { id: 2, name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', active: false, priority: true, lastMsg: 'Can you check the PR?', time: '1h' },
        { id: 3, name: 'NeonExplorer', avatar: 'https://i.pravatar.cc/150?u=neon', active: true, priority: false, lastMsg: 'Look at this code...', time: '3h' },
        { id: 4, name: 'Design Bot', avatar: 'https://i.pravatar.cc/150?u=bot', active: true, priority: false, lastMsg: 'AI suggests a new color.', time: '5h' },
    ];

    const filteredChats = focusMode ? CHATS.filter(c => c.priority) : CHATS;

    return (
        <div className="h-[calc(100vh-80px)] flex max-w-full mx-auto overflow-hidden bg-[#050505]">
            {/* Sidebar (30%) */}
            <div className="w-[30%] h-full border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-3xl">
                <div className="p-6 border-b border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Messages</h2>
                        <button 
                            onClick={() => setFocusMode(!focusMode)} 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                                focusMode ? 'bg-purple-600 text-white shadow-[0_0_15px_#a855f7]' : 'bg-white/5 text-gray-400 border border-white/10'
                            }`}
                        >
                            <Shield size={12} /> {focusMode ? 'FOCUS ON' : 'FOCUS'}
                        </button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={16} />
                        <input type="text" placeholder="Search priority threads..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 backdrop-blur-md transition-all" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
                    {filteredChats.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setActiveChat(chat.id)}
                            className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all ${
                                activeChat === chat.id ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-white/5'
                            }`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} className="w-14 h-14 rounded-full border-2 border-white/5 p-0.5" />
                                {chat.active && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_#22c55e]"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm text-white truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-gray-500 font-medium">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate font-light italic">"{chat.lastMsg}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat (45%) */}
            <div className="flex-1 h-full flex flex-col bg-gradient-to-b from-transparent to-purple-900/5 relative">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-3xl flex justify-between items-center z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={CHATS.find(c => c.id === activeChat)?.avatar} className="w-11 h-11 rounded-full border border-purple-500/50" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                        </div>
                        <div>
                            <h3 className="font-black text-sm text-white tracking-wide">{CHATS.find(c => c.id === activeChat)?.name}</h3>
                            <p className="text-[10px] text-purple-400 flex items-center gap-1 font-bold"><Shield size={10} /> End-to-End Encrypted</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowWatchPiP(true)} className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-500/30 transition-all shadow-lg">
                            <Youtube size={16} /> Watch Together
                        </button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-400 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* AI Catch-up Banner */}
                <div className="mx-6 mt-4 p-3 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl flex justify-between items-center backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg shadow-[0_0_10px_#a855f7]"><Star size={14} /></div>
                        <p className="text-[10px] font-medium text-gray-300">You have 12 unread messages. Want an <span className="text-purple-400 font-black uppercase">AI Catch-up</span> summary?</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-colors">Generate</button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    <div className="text-center">
                        <span className="text-[10px] text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase font-black tracking-widest">Today, 12:45 PM</span>
                    </div>

                    <ChatBubble message={{ text: "Hey! Have you seen the new design tokens? The glassmorphism blur is exactly at 12px now.", time: "12:45 PM", avatar: CHATS[0].avatar }} isMe={false} />
                    <ChatBubble message={{ text: "Yes! It looks incredibly premium. I'm also testing the purple gradient borders on the chat bubbles right now.", time: "12:46 PM" }} isMe={true} />
                    <ChatBubble message={{ text: "Es impresionante cómo se siente el rendimiento sin lag.", time: "12:47 PM", avatar: CHATS[0].avatar, translated: "It's impressive how the performance feels without lag." }} isMe={false} />
                </div>

                {/* Floating Input Area */}
                <div className="p-6 relative">
                    {/* Smart Replies */}
                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                        {["That sounds great!", "Show me more 🔥", "I'll check NexCloud", "Need help with code?"].map(chip => (
                            <button key={chip} className="whitespace-nowrap px-4 py-1.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/50 rounded-full text-[10px] font-medium text-gray-300 hover:text-purple-400 transition-all">
                                {chip}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 pr-3 shadow-2xl focus-within:border-purple-500/50 transition-all">
                        <button className="p-3 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"><Paperclip size={20} /></button>
                        <div className="flex-1 flex flex-col">
                            <input type="text" placeholder="Type a message or use @ for NexCloud..." className="bg-transparent border-none focus:outline-none text-sm py-2 px-2 text-white" />
                        </div>
                        <button className="p-3 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"><Mic size={20} /></button>
                        <button className="p-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-[0_10px_20px_rgba(147,51,234,0.4)] hover:scale-105 transition-transform">
                            <Send size={18} fill="white" />
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Hold send to schedule message</p>
                    </div>
                </div>

                {/* Draggable PiP */}
                <AnimatePresence>
                    {showWatchPiP && <WatchTogetherPiP url="test" onClose={() => setShowWatchPiP(false)} />}
                </AnimatePresence>
            </div>

            {/* Details Panel (25%) */}
            <div className="w-[25%] h-full border-l border-white/10 bg-black/60 backdrop-blur-3xl flex flex-col">
                <div className="p-8 flex flex-col items-center border-b border-white/10 bg-gradient-to-b from-purple-900/10 to-transparent">
                    <div className="relative mb-4">
                        <img src={CHATS.find(c => c.id === activeChat)?.avatar} className="w-28 h-28 rounded-full border-4 border-purple-500/20 p-1" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-[#050505] rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-black text-white">{CHATS.find(c => c.id === activeChat)?.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Full Stack Developer</p>
                    <div className="flex gap-4 mt-6">
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 bg-white/5 group-hover:bg-purple-600/20 rounded-2xl border border-white/10 group-hover:border-purple-500/50 transition-all"><User size={18} /></div>
                            <span className="text-[8px] font-black uppercase text-gray-500">Profile</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 bg-white/5 group-hover:bg-blue-600/20 rounded-2xl border border-white/10 group-hover:border-blue-500/50 transition-all"><Bell size={18} /></div>
                            <span className="text-[8px] font-black uppercase text-gray-500">Mute</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 bg-white/5 group-hover:bg-red-600/20 rounded-2xl border border-white/10 group-hover:border-red-500/50 transition-all"><Shield size={18} /></div>
                            <span className="text-[8px] font-black uppercase text-gray-500">Search</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                    {/* Shared Media */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Shared Media</h4>
                            <button className="text-[10px] text-purple-400 font-bold">View All</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-square bg-white/5 rounded-xl overflow-hidden group relative cursor-pointer border border-white/5">
                                    <img src={`https://picsum.photos/200/200?sig=${i + 200}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Vault */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Code Vault (CSE)</h4>
                            <Grid size={14} className="text-gray-500" />
                        </div>
                        <div className="bg-black/80 rounded-2xl p-4 border border-purple-500/20 font-mono text-[10px] text-green-400/80 shadow-inner relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="bg-white/10 p-1 rounded text-[8px] text-white">Copy</button>
                            </div>
                            <span className="text-purple-400">const</span> <span className="text-blue-400">NexSocial</span> = () =&gt; {"{"} <br />
                            &nbsp;&nbsp;<span className="text-gray-500">// Initialize premium UI</span> <br />
                            &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-400">renderMasterpiece</span>(); <br />
                            {"}"}
                        </div>
                    </div>

                    {/* Privacy Toggles */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-xs font-bold text-white">Vanish Mode</h4>
                                <p className="text-[9px] text-gray-500">Messages disappear after being seen</p>
                            </div>
                            <button onClick={() => setVanishMode(!vanishMode)} className={`w-10 h-5 rounded-full transition-all relative ${vanishMode ? 'bg-purple-600' : 'bg-white/10'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${vanishMode ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-2xl">
                            <Shield size={16} className="text-green-500" />
                            <p className="text-[9px] text-green-500/80 leading-tight">This chat is secured with RSA-4096 Bit End-to-End Encryption.</p>
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
// --- ADVANCED PROFILE COMPONENTS ---

const SkeletonShimmer = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-48 bg-white/5 rounded-3xl"></div>
        <div className="flex gap-4">
            <div className="w-24 h-24 bg-white/5 rounded-full"></div>
            <div className="flex-1 space-y-2 py-4">
                <div className="h-4 bg-white/5 rounded w-1/2"></div>
                <div className="h-3 bg-white/5 rounded w-1/4"></div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-white/5 rounded-2xl"></div>
            <div className="h-32 bg-white/5 rounded-2xl"></div>
            <div className="h-32 bg-white/5 rounded-2xl"></div>
        </div>
    </div>
);

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [showCommandPalette, setShowCommandPalette] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setShowCommandPalette(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (loading) return <div className="max-w-7xl mx-auto p-4"><SkeletonShimmer /></div>;

    return (
        <div className="max-w-7xl mx-auto pb-24 relative">
            {/* Header Hub */}
            <div className="relative mb-20 px-4 pt-4">
                <div className="h-64 md:h-80 w-full rounded-[2.5rem] overflow-hidden relative border border-white/10 group">
                    <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
                    <div className="absolute bottom-6 right-6 flex gap-2">
                        <button className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">Edit Cover</button>
                    </div>
                </div>

                {/* Avatar & Basic Info */}
                <div className="absolute -bottom-16 left-12 flex flex-col md:flex-row items-end gap-6">
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(147,51,234,0.4)]">
                        <div className="bg-[#050505] p-1 rounded-full">
                            <img src="https://i.pravatar.cc/150?u=me" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" />
                        </div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-[#050505] rounded-full"></div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-4xl font-black text-white flex items-center gap-3">
                            Admin User <Shield className="text-purple-500" size={24} />
                        </h2>
                        <p className="text-purple-400 font-bold tracking-widest uppercase text-xs mt-1">Full Stack Architect & UI/UX Visionary</p>
                    </div>
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
                            <div className="w-12 h-6 flex items-end gap-[2px]">
                                {[1, 2, 3, 4].map(i => <div key={i} className={`w-1 bg-current ${stat.color} opacity-30 rounded-full`} style={{ height: `${Math.random() * 100}%` }}></div>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
                {/* Left Sidebar (SEO Ready) */}
                <div className="lg:col-span-4 space-y-6">
                    <GlassCard className="p-6 border-none bg-white/5">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Structural Identity</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400"><MonitorPlay size={18} /></div>
                                <div>
                                    <p className="text-xs font-black text-white">Principal Architect</p>
                                    <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">at Hybrid Dynamics Global</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400"><Grid size={18} /></div>
                                <div>
                                    <p className="text-xs font-black text-white">Current Projects</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {['NexSocial', 'CloudScale', 'AI-Vision'].map(p => (
                                            <span key={p} className="text-[9px] bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-gray-400">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-400"><Shield size={18} /></div>
                                <div>
                                    <p className="text-xs font-black text-white">Tech Stack</p>
                                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">React, Next.js, Node.js, TailwindCSS, Framer Motion, PostgreSQL, AI/ML Engineering.</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download Full Dossier</button>
                    </GlassCard>

                    <GlassCard className="p-6 border-none bg-white/5">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Network Activity</h4>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-[#050505]" />
                            ))}
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-black border-2 border-[#050505]">+42</div>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold mt-4">Mutual connections with NexSocial Core Team</p>
                    </GlassCard>
                </div>

                {/* Right Content Feed (Asymmetric) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group relative cursor-pointer ${i % 3 === 0 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img src={`https://picsum.photos/800/600?sig=${i + 300}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-purple-600/80 backdrop-blur-md text-[8px] font-black px-2 py-1 rounded-lg uppercase">System Update</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h5 className="text-lg font-black text-white mb-2 leading-tight">Implementing Neural Networks into the NexSocial Feed Algorithm</h5>
                                    <p className="text-xs text-gray-400 font-light line-clamp-2">Exploration of how we used transformer models to personalize the 2026 futuristic feed experience...</p>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors">
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
                <Plus size={20} /> Connect Now
            </motion.button>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {showCommandPalette && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCommandPalette(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-gray-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/10 flex items-center gap-4">
                                <Search className="text-purple-500" size={24} />
                                <input autoFocus type="text" placeholder="Unified Command Palette (Search, Navigate, Act...)" className="w-full bg-transparent border-none focus:outline-none text-xl font-light text-white" />
                            </div>
                            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                                {['Go to Feed', 'Search Users', 'Open Code Vault', 'Check Watch Sync', 'Privacy Settings'].map((cmd, i) => (
                                    <div key={cmd} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl cursor-pointer group transition-colors">
                                        <span className="text-sm text-gray-300 group-hover:text-white">{cmd}</span>
                                        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500">⌘{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
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
            case 'profile': return <ProfilePage />;
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