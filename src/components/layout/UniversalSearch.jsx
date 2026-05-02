import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, MessageSquare, Loader2, Zap, Sparkles, ShieldCheck } from 'lucide-react';

const UniversalSearch = ({ users = [], onSearch, isLoading, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInput = (e) => {
        const val = e.target.value;
        setQuery(val);
        onSearch(val);
        setIsOpen(val.length > 0);
    };

    return (
        <div className="relative flex-1 max-w-xl group z-[100]">
            <motion.div 
                className="relative flex items-center bg-white/5 backdrop-blur-[60px] border border-white/10 rounded-[24px] px-6 py-3.5 focus-within:border-cyan-500/50 transition-all duration-500 shadow-2xl"
                whileTap={{ scale: 0.99 }}
            >
                <Search size={20} className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search Name (@john) or Code (#12345678)" 
                    className="bg-transparent border-none focus:outline-none w-full px-4 text-sm font-bold placeholder-gray-600 text-white tracking-tight"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                />
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Loader2 size={18} className="text-cyan-400 animate-spin" />
                        </motion.div>
                    ) : query && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4] animate-pulse"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 8, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 bg-[#020205]/95 backdrop-blur-[100px] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-[200] max-h-[500px] overflow-y-auto no-scrollbar"
                    >
                        <div className="p-4 space-y-2">
                            <div className="px-4 py-2 flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Hybrid Results</span>
                                <Sparkles size={14} className="text-cyan-500 opacity-50" />
                            </div>
                            
                            {users.length > 0 ? users.map((user, index) => (
                                <motion.div 
                                    key={user.id || user.uid}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onNavigate?.(user.uid || user.id)}
                                    className="flex items-center gap-5 p-4 hover:bg-white/5 rounded-[24px] cursor-pointer transition-all duration-300 group/item border border-transparent hover:border-white/5"
                                >
                                    <div className="relative shrink-0">
                                        <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 group-hover/item:from-cyan-500 group-hover/item:to-purple-500 transition-all duration-500">
                                            <img src={user.photoURL || user.avatar || `https://i.pravatar.cc/150?u=${user.uid}`} className="w-14 h-14 rounded-[14px] border-2 border-[#020205] object-cover" alt={user.displayName} />
                                        </div>
                                        {user.online && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 border-2 border-[#020205] rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base font-black text-white group-hover/item:text-cyan-400 transition-colors uppercase tracking-tight truncate">{user.displayName || user.name}</h4>
                                            {user.verified && <ShieldCheck size={14} className="text-cyan-400" />}
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-mono tracking-widest mt-0.5">#{user.code || '87654321'}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <button className="p-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-2xl transition-all shadow-xl">
                                            <UserPlus size={18} />
                                        </button>
                                        <button className="p-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl transition-all border border-white/10">
                                            <MessageSquare size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )) : !isLoading && (
                                <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                                    <Zap size={48} className="text-gray-600 mb-6" />
                                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-2 italic">No Nodes Detected</h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Search query returned 0 matches</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UniversalSearch;
