import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Image as ImageIcon, Star, Camera, FileText, BarChart2, Smile, Calendar, Plus, Zap } from 'lucide-react';

const StatusPostBox = ({ onPost, user }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
        setIsFocused(false);
    };

    return (
        <div className="relative mb-6">
            {/* Main Post Box */}
            <motion.div 
                className={`glass-card rounded-[24px] p-4 md:p-6 transition-all duration-500 relative overflow-hidden ${isFocused ? 'ring-2 ring-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]' : ''}`}
                layout
            >
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3 md:gap-4">
                        <div className="relative flex-shrink-0">
                            <img 
                                src={user?.photoURL || "https://i.pravatar.cc/150?u=me"} 
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/10 shadow-lg object-cover" 
                                alt="me" 
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0a0a0f] rounded-full shadow-[0_0_8px_#22c55e]"></div>
                        </div>
                        <div className="flex-1 relative">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handlePost();
                                    }
                                }}
                                placeholder={`What's on your mind, ${user?.displayName?.split(' ')[0] || 'Explorer'}?`}
                                className="bg-transparent border-none focus:outline-none w-full text-base md:text-lg font-medium text-white placeholder-gray-500 resize-none pt-1 min-h-[50px] md:min-h-[60px]"
                            />
                        </div>
                    </div>

                    {/* Action Quick Tools - visible even when not focused for quick access like FB */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex gap-1 md:gap-2">
                            <button className="flex items-center gap-2 p-2 px-3 hover:bg-white/5 rounded-xl transition-all text-red-400">
                                <Video size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Live</span>
                            </button>
                            <button className="flex items-center gap-2 p-2 px-3 hover:bg-white/5 rounded-xl transition-all text-cyan-400">
                                <ImageIcon size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Media</span>
                            </button>
                            <button className="flex items-center gap-2 p-2 px-3 hover:bg-white/5 rounded-xl transition-all text-yellow-400">
                                <Star size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Event</span>
                            </button>
                        </div>
                        
                        <button 
                            onClick={handlePost}
                            disabled={!text.trim()}
                            className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all ${
                                text.trim() ? 'shadow-cyan-500/20 hover:shadow-cyan-500/40 opacity-100' : 'opacity-30 grayscale cursor-not-allowed'
                            }`}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StatusPostBox;
