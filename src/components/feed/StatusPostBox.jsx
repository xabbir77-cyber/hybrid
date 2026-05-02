import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Image as ImageIcon, Star, Camera, FileText, BarChart2, Smile, Calendar, Plus, Zap } from 'lucide-react';

const StatusPostBox = ({ onPost }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
        setIsFocused(false);
    };

    return (
        <div className="relative mb-8">
            {/* Main Post Box */}
            <motion.div 
                className={`glass-card rounded-[24px] p-6 transition-all duration-500 relative overflow-hidden ${isFocused ? 'ring-2 ring-cyan-500/30' : ''}`}
                layout
            >
                {/* Glow Effects */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400/80">Status+ / Share Your World</h3>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=me" className="w-12 h-12 rounded-full border-2 border-white/10 shadow-2xl" alt="me" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a0f] rounded-full"></div>
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
                                placeholder="What's on your mind?"
                                className="bg-transparent border-none focus:outline-none w-full text-lg font-medium text-white placeholder-gray-600 resize-none pt-1 min-h-[60px]"
                            />
                            {isFocused && (
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-cyan-500 to-blue-500"
                                />
                            )}
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        {/* Go Live */}
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-red-500/5 to-transparent border border-white/5 rounded-2xl transition-all hover:border-red-500/30"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">Go Live</span>
                                <span className="text-[10px] text-gray-500">Start broadcast</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-red-500/20">
                                <Video size={18} />
                            </div>
                        </motion.button>

                        {/* Upload Media */}
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/5 rounded-2xl transition-all hover:border-cyan-500/30"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-1">Media</span>
                                <div className="flex gap-2">
                                    <span className="text-[8px] text-gray-500 flex items-center gap-1 hover:text-white transition-colors"><Camera size={10}/> Capture</span>
                                    <span className="text-[8px] text-gray-500 flex items-center gap-1 hover:text-white transition-colors"><ImageIcon size={10}/> Gallery</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-cyan-500/20">
                                <ImageIcon size={18} />
                            </div>
                        </motion.button>

                        {/* Life Event */}
                        <motion.button 
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center justify-between p-4 bg-gradient-to-br from-yellow-500/5 to-transparent border border-white/5 rounded-2xl transition-all hover:border-yellow-500/30"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-1">Life Event</span>
                                <span className="text-[10px] text-gray-500">Share milestone</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-yellow-500/20">
                                <Star size={18} />
                            </div>
                        </motion.button>
                    </div>

                    {/* Floating Toolbar (appears on focus) */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center justify-between border-t border-white/5 pt-4 mt-2"
                            >
                                <div className="flex gap-2">
                                    {[
                                        { icon: BarChart2, color: 'text-purple-400' },
                                        { icon: Smile, color: 'text-yellow-400' },
                                        { icon: Calendar, color: 'text-blue-400' },
                                        { icon: Plus, color: 'text-green-400' }
                                    ].map((tool, i) => (
                                        <button key={i} className={`p-2 hover:bg-white/5 rounded-lg transition-all ${tool.color}`}>
                                            <tool.icon size={18} />
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={handlePost}
                                    disabled={!text.trim()}
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    Post Status
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default StatusPostBox;
