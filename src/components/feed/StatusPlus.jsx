import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Image, Star, Plus, BarChart2, Smile, Calendar } from 'lucide-react';

const StatusPlus = ({ onPost }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        if (text.trim()) {
            onPost(text);
            setText('');
        }
    };

    return (
        <div className="mb-8">
            <motion.div 
                className="glass-effect rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
                animate={{ scale: isFocused ? 1.01 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>

                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px]">
                            <img src="https://i.pravatar.cc/150?u=me" className="w-full h-full rounded-[14px] object-cover border-2 border-black" alt="me" />
                        </div>
                        <div className="flex-1 relative">
                            <textarea 
                                placeholder="What's on your mind?" 
                                className="w-full bg-transparent border-none focus:outline-none text-lg font-medium text-white placeholder-gray-500 resize-none min-h-[100px] pt-2"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {isFocused && (
                                <motion.div 
                                    className="absolute left-0 bottom-0 w-1 h-6 bg-cyan-400 rounded-full"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Video, label: 'Go Live', color: 'from-red-500 to-orange-500', desc: 'Stream now' },
                            { icon: Image, label: 'Upload Media', color: 'from-cyan-500 to-blue-500', desc: 'Photo / Video', sub: true },
                            { icon: Star, label: 'Life Event', color: 'from-yellow-400 to-amber-600', desc: 'Milestone' }
                        ].map((card, i) => (
                            <motion.div 
                                key={i}
                                className="glass-effect rounded-2xl p-4 cursor-pointer group hover:border-cyan-500/50 transition-all relative overflow-hidden"
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <card.icon size={20} className="text-white" />
                                </div>
                                <h4 className="text-sm font-black text-white uppercase tracking-wider">{card.label}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">{card.desc}</p>
                                
                                {card.sub && (
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black uppercase text-gray-300">Gallery</button>
                                        <button className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black uppercase text-gray-300">Camera</button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Toolbar & Post Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            {[BarChart2, Smile, Calendar, Plus].map((Icon, i) => (
                                <button key={i} className="p-2.5 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                        <motion.button 
                            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl ${text.trim() ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow-cyan' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
                            whileHover={text.trim() ? { scale: 1.05 } : {}}
                            whileTap={text.trim() ? { scale: 0.95 } : {}}
                            onClick={handleSubmit}
                        >
                            Post Space
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StatusPlus;
