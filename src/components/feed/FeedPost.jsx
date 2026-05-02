import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, Clock, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const FeedPost = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes || 0);
    const [showHeartPopup, setShowHeartPopup] = useState(false);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setLikesCount(prev => prev + 1);
            setShowHeartPopup(true);
            setTimeout(() => setShowHeartPopup(false), 800);
        } else {
            setLiked(false);
            setLikesCount(prev => prev - 1);
        }
    };

    const renderImageGrid = () => {
        const images = post.images || [post.image].filter(Boolean);
        if (images.length === 0) return null;

        return (
            <div className={`grid gap-1 mt-3 rounded-2xl overflow-hidden ${
                images.length === 1 ? 'grid-cols-1' : 
                images.length === 2 ? 'grid-cols-2' : 
                images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
            }`}>
                {images.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`relative group overflow-hidden ${
                            images.length === 3 && idx === 0 ? 'row-span-2' : ''
                        }`}
                        onDoubleClick={handleLike}
                    >
                        <img 
                            src={img} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            alt="post-media" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <GlassCard className="mb-6 relative">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-purple-500 to-blue-500">
                        <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-[#050505]" alt="avatar" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-1">
                            {post.user} 
                            <CheckCircle2 size={12} className="text-blue-400 fill-blue-400/20" />
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                            <Clock size={10} /> {post.time}
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <p className="text-sm font-light leading-relaxed text-gray-200">
                    {post.caption}
                </p>
            </div>

            {/* Media Grid */}
            <div className="px-4">
                {renderImageGrid()}
            </div>

            {/* Action Bar */}
            <div className="p-4">
                <div className="flex gap-6 mb-1">
                    <button onClick={handleLike} className="flex items-center gap-2 group">
                        <motion.div
                            whileTap={{ scale: 1.5 }}
                            animate={liked ? { scale: [1, 1.2, 1] } : {}}
                        >
                            <Heart 
                                size={22} 
                                fill={liked ? "#ef4444" : "none"} 
                                className={`${liked ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-gray-400 group-hover:text-red-400'} transition-colors`} 
                            />
                        </motion.div>
                        <span className={`text-[11px] font-black uppercase tracking-widest ${liked ? 'text-red-400' : 'text-gray-500'}`}>
                            {likesCount.toLocaleString()}
                        </span>
                    </button>
                    
                    <button className="flex items-center gap-2 group">
                        <MessageSquare size={22} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-400 transition-colors">42</span>
                    </button>

                    <button className="flex items-center gap-2 group">
                        <Send size={22} className="text-gray-400 group-hover:text-green-400 transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-green-400 transition-colors">Share</span>
                    </button>
                </div>
            </div>

            {/* Double Tap Heart Popup */}
            <AnimatePresence>
                {showHeartPopup && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                        <Heart size={80} fill="#ef4444" className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
};

export default FeedPost;
