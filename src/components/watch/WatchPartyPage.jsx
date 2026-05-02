import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Tv, Send, Mic, MonitorPlay } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const WatchPartyPage = () => {
    const [showEmojis, setShowEmojis] = useState([]);

    const spawnEmoji = (emoji) => {
        const id = Date.now();
        setShowEmojis(prev => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
        setTimeout(() => setShowEmojis(prev => prev.filter(e => e.id !== id)), 3000);
    };

    return (
        <div className="h-full flex flex-col p-4 bg-[#050505] overflow-y-auto no-scrollbar">
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
            <GlassCard className="flex-1 flex flex-col overflow-hidden relative min-h-[400px]">
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
            </GlassCard>
        </div>
    );
};

export default WatchPartyPage;
