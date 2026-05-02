import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, MessageSquare, Loader2 } from 'lucide-react';

const UniversalSearch = ({ users = [], onSearch, isLoading }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInput = (e) => {
        const val = e.target.value;
        setQuery(val);
        onSearch(val);
        setIsOpen(val.length > 0);
    };

    return (
        <div className="relative flex-1 max-w-xl group">
            <motion.div 
                className="relative flex items-center glass-effect rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all duration-300"
                whileTap={{ scale: 0.995 }}
            >
                <Search size={18} className="text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by Name (@john) or 8-digit Code (#12345678)" 
                    className="bg-transparent border-none focus:outline-none w-full px-3 text-sm font-medium placeholder-gray-500 text-white"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                />
                {isLoading ? (
                    <Loader2 size={16} className="text-cyan-400 animate-spin" />
                ) : query && (
                    <div className="absolute right-4 w-2 h-2 rounded-full bg-cyan-400 neon-glow-cyan animate-pulse"></div>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-2xl overflow-hidden shadow-2xl z-[100] max-h-[450px] overflow-y-auto no-scrollbar"
                    >
                        <div className="p-2 space-y-1">
                            {users.length > 0 ? users.map((user) => (
                                <motion.div 
                                    key={user.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all group"
                                >
                                    <div className="relative">
                                        <img src={user.photoURL || user.avatar} className="w-12 h-12 rounded-full border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" alt={user.displayName} />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{user.displayName || user.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-mono">#{user.code || '87654321'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-lg transition-all animate-pulse">
                                            <UserPlus size={16} />
                                        </button>
                                        <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all">
                                            <MessageSquare size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )) : !isLoading && (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No users found in Hybrid Network</p>
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
