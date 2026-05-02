import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Tv, Send, Mic, MonitorPlay, Users, Sparkles, MessageSquare, Zap, Heart, Flame, Clapperboard, Share2, X } from 'lucide-react';

const WatchPartyPage = ({ partyState, updateParty, user }) => {
    const [showEmojis, setShowEmojis] = useState([]);
    const [message, setMessage] = useState('');
    const videoRef = useRef(null);

    const spawnEmoji = (emoji) => {
        const id = Date.now();
        setShowEmojis(prev => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
        setTimeout(() => setShowEmojis(prev => prev.filter(e => e.id !== id)), 3000);
    };

    const handlePlayPause = () => {
        const isPlaying = !partyState?.isPlaying;
        updateParty({ isPlaying, currentTime: videoRef.current?.currentTime || 0 });
    };

    useEffect(() => {
        if (partyState && videoRef.current) {
            // Simple sync logic: if time difference > 2s, sync
            if (Math.abs(videoRef.current.currentTime - partyState.currentTime) > 2) {
                videoRef.current.currentTime = partyState.currentTime;
            }
            if (partyState.isPlaying) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    }, [partyState?.isPlaying, partyState?.currentTime, partyState?.videoId]);

    return (
        <div className="h-full flex flex-col bg-[#020205] overflow-y-auto no-scrollbar">
            {/* Contextual Hub Header */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-cyan-500/5 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <Clapperboard size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Cinema<span className="text-cyan-400">Social</span></h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Watch Party #1024</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex -space-x-3">
                        {partyState?.participants?.map((p, i) => (
                            <img key={p.uid} src={p.photoURL} className="w-10 h-10 rounded-full border-2 border-[#020205] shadow-2xl" alt={p.displayName} />
                        )) || (
                            [1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-[#020205] shadow-2xl" />
                            ))
                        )}
                        <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#020205] flex items-center justify-center text-[10px] font-black text-white backdrop-blur-xl">
                            +12k
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-cyan-400 transition-all">
                        <Share2 size={14} /> Invite Node
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 p-10 h-full overflow-hidden">
                
                {/* Cinema Canvas (XL) */}
                <div className="xl:col-span-8 flex flex-col h-full space-y-8">
                    <div className="relative aspect-video bg-black rounded-[48px] border border-white/10 overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.8)] group">
                        {partyState?.videoId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${partyState.videoId}?autoplay=1&controls=0&mute=0`}
                                className="w-full h-full border-none pointer-events-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img 
                                src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&q=80" 
                                className="w-full h-full object-cover opacity-60" 
                                alt="movie"
                            />
                        )}
                        
                        {/* Play Center Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                onClick={handlePlayPause}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(6,182,212,0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                className="w-24 h-24 bg-white/5 backdrop-blur-[40px] rounded-full flex items-center justify-center border border-white/20 cursor-pointer shadow-3xl group/play z-10"
                            >
                                {partyState?.isPlaying ? (
                                    <div className="flex gap-2">
                                        <div className="w-2 h-10 bg-white rounded-full"></div>
                                        <div className="w-2 h-10 bg-white rounded-full"></div>
                                    </div>
                                ) : (
                                    <Play size={40} fill="white" className="text-white ml-2" />
                                )}
                            </motion.div>
                        </div>

                        {/* Stream Stats Overlay */}
                        <div className="absolute bottom-10 left-10 flex items-center gap-6">
                            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-3xl px-4 py-2 rounded-2xl border border-white/10">
                                <Zap size={14} className="text-cyan-400" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">4K Lossless</span>
                            </div>
                            <div className="flex items-center gap-3 bg-red-600/20 backdrop-blur-3xl px-4 py-2 rounded-2xl border border-red-500/30">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Sync</span>
                            </div>
                        </div>

                        {/* Floating Emojis Matrix */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                            <AnimatePresence>
                                {showEmojis.map(e => (
                                    <motion.div
                                        key={e.id}
                                        initial={{ y: 600, opacity: 0, scale: 0.5, rotate: -20 }}
                                        animate={{ y: -200, opacity: 1, scale: 2, rotate: 20 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 4, ease: "circOut" }}
                                        style={{ left: `${e.left}%` }}
                                        className="absolute text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                    >
                                        {e.emoji}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Participant Matrix */}
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live In Node</h3>
                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">{partyState?.participants?.length || 24} Nodes Unlocked</span>
                        </div>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
                            {partyState?.participants?.map((p, i) => (
                                <motion.div 
                                    key={p.uid} 
                                    whileHover={{ y: -5 }}
                                    className="flex flex-col items-center gap-3 min-w-[80px]"
                                >
                                    <div className={`relative p-1 rounded-2xl bg-gradient-to-tr ${p.uid === user?.uid ? 'from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'from-white/5 to-white/5'}`}>
                                        <div className="bg-[#020205] rounded-xl p-0.5">
                                            <img src={p.photoURL} className="w-14 h-14 rounded-[14px] object-cover" alt={p.displayName} />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter truncate w-16 text-center">{p.uid === user?.uid ? 'You' : p.displayName}</span>
                                </motion.div>
                            )) || (
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                    <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
                                        <div className="relative p-1 rounded-2xl bg-white/5">
                                            <div className="bg-[#020205] rounded-xl p-0.5">
                                                <img src={`https://i.pravatar.cc/150?u=${i + 40}`} className="w-14 h-14 rounded-[14px] object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Pulse (Chat Sidebar) */}
                <div className="xl:col-span-4 flex flex-col h-full">
                    <div className="bg-white/5 backdrop-blur-[80px] rounded-[48px] border border-white/10 flex flex-col h-full overflow-hidden shadow-3xl">
                        <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} className="text-cyan-400" />
                                <h3 className="font-black text-sm uppercase tracking-[0.2em] text-white">Neural Chat</h3>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                            <div className="flex gap-4">
                                <img src="https://i.pravatar.cc/150?img=41" className="w-9 h-9 rounded-xl border border-white/10" alt="avatar" />
                                <div className="space-y-2">
                                    <h5 className="text-[10px] font-black text-gray-500 uppercase">Node-Alpha</h5>
                                    <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none px-5 py-3 text-sm text-gray-200 leading-relaxed font-medium">
                                        "This sequence is logically perfect. 🍿"
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Reaction Hub */}
                        <div className="p-8 bg-black/40 border-t border-white/5">
                            <div className="flex gap-6 justify-center mb-8 px-4 py-3 bg-white/5 rounded-3xl border border-white/5">
                                {[
                                    { e: '🍿', icon: Zap, label: 'Cool' },
                                    { e: '🔥', icon: Flame, label: 'Fire' },
                                    { e: '❤️', icon: Heart, label: 'Love' },
                                    { e: '👏', icon: Sparkles, label: 'Wow' },
                                ].map((item) => (
                                    <button 
                                        key={item.e} 
                                        onClick={() => spawnEmoji(item.e)} 
                                        className="flex flex-col items-center gap-1 group"
                                    >
                                        <span className="text-3xl group-hover:scale-125 group-active:scale-90 transition-all duration-300 drop-shadow-lg">{item.e}</span>
                                    </button>
                                ))}
                            </div>
                            
                            <div className="relative group">
                                <div className="relative flex gap-3 bg-[#020205] border border-white/10 rounded-full p-2 pr-2 shadow-2xl">
                                    <input 
                                        type="text" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Broadcast to Node..." 
                                        className="flex-1 bg-transparent border-none focus:outline-none px-6 py-2 text-sm font-medium text-white placeholder-gray-600" 
                                    />
                                    <button className="bg-cyan-500 p-3 rounded-full text-black shadow-xl hover:bg-cyan-400 transition-all active:scale-95">
                                        <Send size={18} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPartyPage;
