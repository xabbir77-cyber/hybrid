import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Calendar, Sparkles, Wand2, Send, Mic, Poll, Smile, Clock, Camera, FileVideo, Zap, Globe, ShieldCheck } from 'lucide-react';

const StatusPostBox = ({ onPost, user }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [aiSuggesting, setAiSuggesting] = useState(false);

    useEffect(() => {
        if (text.length > 10) {
            setAiSuggesting(true);
        } else {
            setAiSuggesting(false);
        }
    }, [text]);

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
        setIsFocused(false);
    };

    return (
        <div className="relative group mb-12">
            {/* Background Neural Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-600/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#020205]/40 backdrop-blur-[100px] border border-white/10 rounded-[40px] p-8 shadow-3xl overflow-hidden">
                {/* Decorative Glass Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Zap size={120} className="text-cyan-400" />
                </div>

                <div className="flex gap-6">
                    <div className="relative shrink-0">
                        <div className="p-1 rounded-[24px] bg-gradient-to-tr from-cyan-500 to-purple-600">
                            <img 
                                src={user?.photoURL || 'https://i.pravatar.cc/150?u=me'} 
                                className="w-14 h-14 rounded-[20px] border-2 border-[#020205] object-cover" 
                                alt="avatar" 
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full border-4 border-[#020205] shadow-[0_0_15px_#06b6d4] flex items-center justify-center">
                            <Zap size={10} fill="black" />
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                        <div className="relative pt-2">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Share Your World..."
                                className="w-full bg-transparent border-none focus:outline-none text-xl font-light placeholder-gray-600 text-white resize-none min-h-[80px] no-scrollbar tracking-tight leading-relaxed"
                            />
                            
                            <AnimatePresence>
                                {isFocused && (
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        exit={{ scaleX: 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent origin-left opacity-30"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Interactive Neural Grid (AI Triggered) */}
                        <AnimatePresence>
                            {aiSuggesting && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                    className="bg-cyan-500/5 rounded-3xl p-5 border border-cyan-500/10 flex items-center justify-between group/ai"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-cyan-500/20 rounded-xl text-cyan-400">
                                            <Sparkles size={18} className="animate-pulse" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">AI Enhancement Active</p>
                                            <p className="text-[11px] text-gray-400 font-bold mt-0.5">Optimize this post for global reach?</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-xl">Synthesize</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Luxury Hub Grid (Action Cards) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Video, label: 'Cinema Live', color: 'from-red-500/10 to-red-600/5', iconColor: 'text-red-400', border: 'border-red-500/10' },
                                { icon: Camera, label: 'Spatial Media', color: 'from-cyan-500/10 to-blue-600/5', iconColor: 'text-cyan-400', border: 'border-cyan-500/10', glow: true },
                                { icon: Globe, label: 'Broadcast', color: 'from-indigo-500/10 to-purple-600/5', iconColor: 'text-indigo-400', border: 'border-indigo-500/10' },
                                { icon: ShieldCheck, label: 'Private Node', color: 'from-emerald-500/10 to-teal-600/5', iconColor: 'text-emerald-400', border: 'border-emerald-500/10' },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative p-4 rounded-[24px] bg-gradient-to-br ${item.color} border ${item.border} cursor-pointer group/card transition-all duration-500`}
                                >
                                    <div className="flex flex-col items-center gap-3 relative z-10">
                                        <item.icon size={22} className={`${item.iconColor} group-hover/card:scale-110 transition-transform`} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover/card:text-white transition-colors">{item.label}</span>
                                    </div>
                                    {item.glow && (
                                        <div className="absolute top-2 right-2">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse"></div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isFocused && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-8 pt-8 border-t border-white/5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex gap-6 px-2">
                                    {[
                                        { icon: Poll, color: 'hover:text-purple-400', label: 'Poll' },
                                        { icon: Smile, color: 'hover:text-yellow-400', label: 'Mood' },
                                        { icon: Clock, color: 'hover:text-cyan-400', label: 'Schedule' },
                                    ].map((btn, i) => (
                                        <button key={i} className={`text-gray-600 transition-all flex items-center gap-2 group/tool ${btn.color}`}>
                                            <btn.icon size={20} className="group-hover/tool:scale-110 transition-transform" />
                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/tool:opacity-100 transition-opacity">{btn.label}</span>
                                        </button>
                                    ))}
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setIsFocused(false)}
                                        className="px-6 py-3 text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        onClick={handlePost}
                                        disabled={!text.trim()}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[20px] text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl disabled:opacity-30 disabled:grayscale transition-all"
                                    >
                                        <Send size={16} fill="white" /> Share World
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StatusPostBox;
