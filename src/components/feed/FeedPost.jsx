import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, Clock, CheckCircle2, Zap, Share2, Eye, ShieldAlert } from 'lucide-react';

const SlotCounter = ({ value, colorClass }) => {
    return (
        <div className={`slot-number text-[11px] font-black uppercase tracking-widest ${colorClass}`}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {value.toLocaleString()}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const FeedPost = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes || 1240);
    const [showHeartPopup, setShowHeartPopup] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isReported, setIsReported] = useState(post.isSensitive || false);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setLikesCount(prev => prev + 1);
            setShowHeartPopup(true);
            setTimeout(() => setShowHeartPopup(false), 1000);
        } else {
            setLiked(false);
            setLikesCount(prev => prev - 1);
        }
    };

    return (
        <motion.div 
            className="glass-card mb-8 rounded-[32px] overflow-hidden group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5 }}
        >
            {/* AI Floating Badge */}
            <div className="absolute top-6 right-6 z-30">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 flex items-center gap-2">
                    <Zap size={10} className="text-cyan-400 fill-cyan-400" />
                    <span className="text-[8px] font-black uppercase tracking-tighter text-white">Trending in Hybrid</span>
                </div>
            </div>

            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500">
                            <img src={post.avatar || `https://i.pravatar.cc/150?u=${post.user}`} className="w-12 h-12 rounded-full border-2 border-[#020205] object-cover" alt="avatar" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 border-2 border-[#020205] rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>
                    </div>
                    <div>
                        <h4 className="font-black text-sm text-white flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                            {post.user} 
                            <CheckCircle2 size={12} className="text-cyan-400 fill-cyan-400/20" />
                        </h4>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                            <Clock size={10} className="text-cyan-500/50" /> {post.time || '12m ago'}
                        </div>
                    </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <MoreHorizontal className="text-gray-500" />
                </motion.button>
            </div>

            {/* Content & AI Summary */}
            <div className="px-6 pb-4">
                <p className="text-[15px] font-medium leading-relaxed text-gray-200 mb-4">
                    {post.caption}
                </p>
                
                {/* AI Smart Summary Preview */}
                <div className="bg-cyan-500/5 border-l-2 border-cyan-500/50 p-3 rounded-r-xl space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={10} className="text-cyan-400" />
                        <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest">AI Smart Summary</span>
                    </div>
                    <p className="text-[11px] text-gray-400 italic">Discussion on futuristic UI trends and real-time social dynamics.</p>
                </div>
            </div>

            {/* Media Container (16:9) */}
            <div className="relative aspect-video group/media bg-black overflow-hidden cursor-pointer" onDoubleClick={handleLike}>
                {isReported ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[60px] bg-black/40 z-20 p-8 text-center">
                        <ShieldAlert size={48} className="text-red-500 mb-4 animate-bounce" />
                        <h3 className="text-white font-black uppercase tracking-widest mb-2">Sensitive Content</h3>
                        <p className="text-xs text-gray-400 mb-6">This post contains content that some users may find disturbing.</p>
                        <button 
                            onClick={() => setIsReported(false)}
                            className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-cyan-400 transition-colors"
                        >
                            Tap to View
                        </button>
                    </div>
                ) : (
                    <>
                        <img 
                            src={post.image || `https://picsum.photos/seed/${post.id}/1200/675`} 
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover/media:scale-110" 
                            alt="post-media" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-6 h-6 rounded-full border-2 border-black" />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter">15 people discussing this</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Double Tap Heart Overlay */}
                <AnimatePresence>
                    {showHeartPopup && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: [1.2, 1, 1.1], opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                        >
                            <div className="relative">
                                <Heart size={100} fill="url(#heartGradient)" className="drop-shadow-[0_0_50px_rgba(0,242,255,0.8)]" />
                                <svg width="0" height="0">
                                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00f2ff" />
                                        <stop offset="100%" stopColor="#0066ff" />
                                    </linearGradient>
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Interaction Bar */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-8">
                        <button onClick={handleLike} className="flex items-center gap-3 group/btn">
                            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${liked ? 'bg-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'bg-white/5 group-hover/btn:bg-white/10'}`}>
                                <Heart 
                                    size={20} 
                                    fill={liked ? "#00f2ff" : "none"} 
                                    className={`${liked ? 'text-cyan-400' : 'text-gray-400 group-hover/btn:text-cyan-400'} transition-colors`} 
                                />
                            </div>
                            <SlotCounter value={likesCount} colorClass={liked ? 'text-cyan-400' : 'text-gray-500'} />
                        </button>
                        
                        <button className="flex items-center gap-3 group/btn">
                            <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-white/10 transition-all duration-300">
                                <MessageSquare size={20} className="text-gray-400 group-hover/btn:text-blue-400 transition-colors" />
                            </div>
                            <SlotCounter value={84} colorClass="text-gray-500 group-hover/btn:text-blue-400" />
                        </button>

                        <button className="flex items-center gap-3 group/btn">
                            <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-white/10 transition-all duration-300">
                                <Share2 size={20} className="text-gray-400 group-hover/btn:text-purple-400 transition-colors" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover/btn:text-purple-400">Share</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                            <Eye size={12} className="text-cyan-400" />
                            <span className="text-[10px] font-black text-white font-mono">1.2K</span>
                        </div>
                    </div>
                </div>

                {/* Quick Comment Placeholder */}
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-all">
                    <img src="https://i.pravatar.cc/150?u=me" className="w-7 h-7 rounded-full" alt="me" />
                    <input type="text" placeholder="Add a comment..." className="bg-transparent border-none focus:outline-none w-full text-xs font-medium text-white placeholder-gray-600" />
                </div>
            </div>
        </motion.div>
    );
};

export default FeedPost;
