import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, MoreVertical, ShieldAlert, Sparkles, Send, Zap, Eye, Clock, CheckCircle2 } from 'lucide-react';

const SlotMachineNumber = ({ value }) => {
    return (
        <div className="flex overflow-hidden h-4">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-[11px] font-black text-gray-400 group-hover:text-cyan-400"
                >
                    {value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const FeedPost = ({ post, onLike, currentUserId }) => {
    const isLiked = post.likedBy?.includes(currentUserId);
    const [showHeartOverlay, setShowHeartOverlay] = useState(false);
    const [isReported, setIsReported] = useState(post.isSensitive || false);

    const handleDoubleTap = (e) => {
        if (e.detail === 2) {
            if (!isLiked) onLike();
            setShowHeartOverlay(true);
            setTimeout(() => setShowHeartOverlay(false), 800);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative mb-10 group"
        >
            <div className="bg-[#020205]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl hover:border-white/10 transition-all duration-700">
                
                {/* Post Header */}
                <div className="p-6 flex items-center justify-between bg-gradient-to-b from-white/5 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600">
                            <div className="bg-[#020205] rounded-[14px] p-0.5">
                                <img src={post.avatar || `https://i.pravatar.cc/150?u=${post.user}`} className="w-11 h-11 rounded-xl object-cover" alt="user" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1">
                                    {post.user}
                                    <CheckCircle2 size={12} className="text-cyan-400 fill-cyan-400/10" />
                                </h4>
                                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{post.time || 'JUST NOW'}</span>
                            </div>
                            <p className="text-[10px] text-cyan-400 font-mono">#{post.code || '87654321'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <Zap size={10} className="text-cyan-400 fill-cyan-400" />
                            <span className="text-[8px] font-black text-white uppercase tracking-tighter">Trending</span>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-white transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-7 pb-5">
                    <p className="text-[15px] text-gray-200 leading-relaxed font-medium">
                        {post.caption}
                    </p>
                </div>

                {/* Media Area (Dynamic & Interactive) */}
                <div 
                    className="relative aspect-square md:aspect-video overflow-hidden cursor-pointer bg-black/20"
                    onClick={handleDoubleTap}
                >
                    {!isReported ? (
                        <motion.img 
                            src={post.image || post.images?.[0] || `https://picsum.photos/seed/${post.id}/1200/675`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                            alt="post content" 
                        />
                    ) : (
                        <div className="absolute inset-0 backdrop-blur-[60px] bg-black/40 flex flex-col items-center justify-center p-8 text-center z-10">
                            <ShieldAlert size={48} className="text-red-500 mb-4 animate-bounce" />
                            <h5 className="text-white font-black uppercase tracking-widest text-sm mb-2">Sensitive Content</h5>
                            <p className="text-xs text-gray-400 mb-6 uppercase font-bold max-w-xs">This post may contain sensitive material. Hybrid filters have blurred this content.</p>
                            <button 
                                onClick={() => setIsReported(false)}
                                className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-400 transition-all shadow-xl"
                            >
                                Tap to View
                            </button>
                        </div>
                    )}
                    
                    {/* Double-Tap Heart Overlay */}
                    <AnimatePresence>
                        {showHeartOverlay && (
                            <motion.div 
                                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                animate={{ scale: [1.2, 1, 1.1], opacity: 1, rotate: 0 }}
                                exit={{ scale: 2, opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            >
                                <Heart size={100} fill="#06b6d4" className="text-cyan-400 drop-shadow-[0_0_40px_rgba(6,182,212,0.8)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Engagement Hint Overlay */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transition-transform">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${i + post.id}`} className="w-7 h-7 rounded-full border-2 border-[#020205] shadow-lg" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-tighter bg-black/40 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
                            15 people discussing this
                        </span>
                    </div>
                </div>

                {/* Interaction Bar & Logic (Slot-Machine) */}
                <div className="p-6 flex items-center justify-between border-t border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={onLike}
                            className="flex items-center gap-3 group/btn"
                        >
                            <div className={`p-2.5 rounded-2xl transition-all duration-500 ${isLiked ? 'bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/5 group-hover/btn:bg-white/10'}`}>
                                <Heart 
                                    size={20} 
                                    className={`transition-all duration-300 ${isLiked ? 'text-cyan-400 fill-cyan-400' : 'text-gray-400 group-hover/btn:text-cyan-400'}`} 
                                />
                            </div>
                            <SlotMachineNumber value={post.likes || 0} />
                        </button>
                        
                        <button className="flex items-center gap-3 group/btn">
                            <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-white/10 transition-all duration-500">
                                <MessageSquare size={20} className="text-gray-400 group-hover/btn:text-purple-400 transition-colors" />
                            </div>
                            <SlotMachineNumber value={post.commentsCount || 0} />
                        </button>
                        
                        <button className="flex items-center gap-3 group/btn">
                            <div className="p-2.5 rounded-2xl bg-white/5 group-hover/btn:bg-white/10 transition-all duration-500">
                                <Share2 size={20} className="text-gray-400 group-hover/btn:text-blue-400 transition-colors" />
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                            <Eye size={14} className="text-gray-500" />
                            <span className="text-[10px] font-black text-white font-mono">2.4K</span>
                        </div>
                        <button className="p-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-2xl transition-all shadow-lg">
                            <Send size={16} />
                        </button>
                    </div>
                </div>

                {/* AI Catch-up Summary */}
                <div className="px-6 pb-8">
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-r from-purple-500/5 to-cyan-500/5 backdrop-blur-3xl rounded-[28px] p-5 border border-white/5 group/ai relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/ai:opacity-30 transition-opacity">
                            <Sparkles size={40} className="text-purple-400" />
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400"><Zap size={12} fill="currentColor" /></div>
                            <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em]">AI Intelligence Hub</span>
                        </div>
                        <p className="text-[12px] text-gray-400 italic font-bold leading-relaxed border-l-2 border-purple-500/30 pl-4">
                            "Auto-Summary: This post discusses futuristic UI patterns and real-time interaction models in the Hybrid ecosystem."
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeedPost;
