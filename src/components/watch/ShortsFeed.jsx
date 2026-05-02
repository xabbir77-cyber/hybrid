import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, Music, Zap, Sparkles, UserPlus, Share2, Volume2, VolumeX } from 'lucide-react';
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
        <div className="relative h-full w-full snap-start bg-black flex items-center justify-center overflow-hidden border-b border-white/5">
            {/* Video Player Engine */}
            <VideoPlayer 
                url={video.url} 
                isActive={isActive} 
                isMuted={isMuted} 
                onToggleMute={() => setIsMuted(!isMuted)}
                poster={video.avatar}
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
            
            {/* Side Interaction Hub (Glassmorphism) */}
            <div className="absolute right-6 bottom-32 flex flex-col gap-8 items-center z-30">
                <div className="flex flex-col items-center gap-2">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1.4 }}
                        onClick={handleLike} 
                        className={`p-4 rounded-full backdrop-blur-3xl border border-white/10 transition-all group ${
                            liked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                    >
                        <Heart size={32} fill={liked ? "currentColor" : "none"} className={liked ? "drop-shadow-[0_0_15px_#06b6d4]" : "group-hover:text-cyan-400"} />
                    </motion.button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">124K</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        <MessageSquare size={32} />
                    </motion.button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">4.2K</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        <Share2 size={32} />
                    </motion.button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Share</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-4 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
                    </motion.button>
                </div>

                {/* Spinning Audio Disk */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden relative z-10 animate-[spin_4s_linear_infinite]">
                        <img src={video.avatar} className="w-full h-full object-cover" alt="audio profile" />
                    </div>
                </div>
            </div>

            {/* Creator Context (Glass Panel) */}
            <div className="absolute bottom-10 left-8 right-24 z-30 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600">
                        <img src={video.avatar} className="w-12 h-12 rounded-[14px] border border-[#020205] object-cover shadow-2xl" alt="avatar" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="font-black text-base text-white tracking-tighter uppercase italic">@{video.user}</h4>
                            <div className="bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                <Zap size={10} className="text-cyan-400 fill-cyan-400" />
                                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Verified</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">1.2M Observers</p>
                    </div>
                    <button className="ml-4 px-6 py-2 bg-white text-black text-[10px] font-black rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-[0.2em] shadow-2xl">Connect</button>
                </div>

                <div className="bg-black/20 backdrop-blur-3xl rounded-[28px] p-6 border border-white/5 max-w-lg">
                    <p className="text-sm font-medium leading-relaxed text-gray-200 mb-4 line-clamp-3">
                        {video.caption} <span className="text-cyan-400 font-black">#HybridOS #Reels2026 #NeuralVibe</span>
                    </p>
                    
                    {/* Neural Audio Streamer */}
                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl px-4 py-2 border border-white/5">
                        <div className="flex gap-1 items-center">
                            {[1, 2, 3].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ height: [8, 16, 8] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1 bg-cyan-400 rounded-full"
                                />
                            ))}
                        </div>
                        <div className="overflow-hidden">
                            <motion.p 
                                animate={{ x: [0, -200] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="text-[10px] font-black text-white/60 whitespace-nowrap uppercase tracking-[0.2em]"
                            >
                                Original Neural Audio Stream • Synthetic Waves • @{video.user} • {video.caption.slice(0, 20)}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Smart Badge */}
            <div className="absolute top-10 right-10 z-30">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">AI Enhanced</span>
                </div>
            </div>

            {/* Triple Tap Pulse Effect */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: [1.5, 1.2, 1.3], opacity: 1, rotate: 0 }}
                        exit={{ scale: 2, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    >
                        <Heart size={160} fill="#06b6d4" className="text-cyan-400 drop-shadow-[0_0_80px_rgba(6,182,212,0.8)]" />
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
            className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
        >
            {videos.map((v, i) => (
                <ReelCard key={v.id} video={v} isActive={activeIndex === i} />
            ))}
        </div>
    );
};

export default ShortsFeed;
