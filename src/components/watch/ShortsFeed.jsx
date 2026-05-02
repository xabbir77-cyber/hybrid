import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, Music } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const ReelCard = ({ video, isActive }) => {
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 1000);
        } else {
            setLiked(false);
        }
    };

    return (
        <div className="relative h-[calc(100vh-130px)] w-full snap-start bg-black flex items-center justify-center overflow-hidden">
            {/* Video Player */}
            <VideoPlayer 
                url={video.url} 
                isActive={isActive} 
                isMuted={isMuted} 
                onToggleMute={() => setIsMuted(!isMuted)}
                poster={video.avatar}
            />

            {/* Glassmorphism Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

            {/* Interaction Sidebar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-30">
                <div className="flex flex-col items-center gap-1">
                    <motion.button 
                        whileTap={{ scale: 1.5 }}
                        onClick={handleLike} 
                        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all group"
                    >
                        <Heart size={28} fill={liked ? "#ef4444" : "none"} className={liked ? "text-red-500" : "group-hover:text-red-400"} />
                    </motion.button>
                    <span className="text-[10px] font-bold shadow-sm">124K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <MessageSquare size={28} />
                    </button>
                    <span className="text-[10px] font-bold shadow-sm">4.2K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                        <Send size={28} />
                    </button>
                    <span className="text-[10px] font-bold shadow-sm">Share</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden animate-spin-slow">
                    <img src={video.avatar} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Metadata Bottom */}
            <div className="absolute bottom-6 left-4 right-16 z-30">
                <div className="flex items-center gap-3 mb-3">
                    <img src={video.avatar} className="w-10 h-10 rounded-full border-2 border-purple-500" />
                    <div>
                        <h4 className="font-black text-sm text-white flex items-center gap-2">
                            @{video.user} <span className="bg-purple-600 text-[8px] px-1.5 py-0.5 rounded-full uppercase">Creator</span>
                        </h4>
                    </div>
                    <button className="ml-2 bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black hover:bg-gray-200 transition-colors uppercase tracking-widest">Follow</button>
                </div>
                <p className="text-sm font-medium line-clamp-2 text-white mb-3">
                    {video.caption} <span className="text-purple-400">#Hybrid #Reels #2026</span>
                </p>
                
                {/* Audio Info */}
                <div className="flex items-center gap-2">
                    <Music size={12} className="text-purple-400 animate-pulse" />
                    <div className="overflow-hidden w-32">
                        <motion.p 
                            animate={{ x: [0, -100] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="text-[10px] text-gray-300 whitespace-nowrap"
                        >
                            Original Audio • {video.user} • Trending Track
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Pop Heart Animation */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    >
                        <Heart size={120} fill="#ef4444" className="text-red-500 drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]" />
                    </motion.div>
                )}
            </AnimatePresence>
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
        { id: 4, user: 'Visionary', url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-animation-with-glowing-lines-48353-large.mp4', avatar: 'https://i.pravatar.cc/150?u=4', caption: 'Neural networks are evolving faster than we thought.' },
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
            className="h-[calc(100vh-130px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
        >
            {videos.map((v, i) => (
                <ReelCard key={v.id} video={v} isActive={activeIndex === i} />
            ))}
        </div>
    );
};

export default ShortsFeed;
