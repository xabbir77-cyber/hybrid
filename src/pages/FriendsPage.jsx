import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, UserMinus, UserCheck, MessageSquare, MoreHorizontal, Users, ShieldCheck, Zap, X, Check, Heart, User } from 'lucide-react';

const FriendsPage = ({ friends = [], requests = [], suggestions = [], onAccept, onDelete, onSendRequest, onStartChat }) => {
    const [activeSection, setActiveSection] = useState('All Friends');
    const sections = ['All Friends', 'Requests', 'Suggestions'];

    const getDisplayData = () => {
        switch (activeSection) {
            case 'Requests': return requests;
            case 'Suggestions': return suggestions;
            default: return friends;
        }
    };

    const data = getDisplayData();

    return (
        <div className="bg-[#020205] h-full overflow-hidden">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 px-10 h-full">
                
                {/* Left Sidebar - Meta Navigation */}
                <aside className="hidden lg:block lg:col-span-3 space-y-8 overflow-y-auto no-scrollbar pb-20">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-4 mb-10 px-2">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                                <Users size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-white">Social Hub</h2>
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Neural Network v2.0</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {sections.map(section => (
                                <motion.button
                                    key={section}
                                    whileHover={{ x: 5 }}
                                    onClick={() => setActiveSection(section)}
                                    className={`w-full flex items-center justify-between p-5 rounded-[24px] transition-all duration-500 relative group ${
                                        activeSection === section 
                                        ? 'text-white' 
                                        : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {activeSection === section && (
                                        <motion.div 
                                            layoutId="active-section-bg"
                                            className="absolute inset-0 bg-white/10 rounded-[24px] border border-white/10 shadow-xl"
                                        />
                                    )}
                                    <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">{section}</span>
                                    {section === 'Requests' && requests.length > 0 && (
                                        <span className="relative z-10 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]">
                                            {requests.length}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 backdrop-blur-3xl rounded-[40px] p-10 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <Zap size={80} className="text-cyan-400" />
                        </div>
                        <ShieldCheck size={32} className="text-cyan-400 mb-6" />
                        <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Verified Connections</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed mb-8 font-bold uppercase tracking-wider">Only verified accounts can access the Spatial Meta-Hub features.</p>
                        <button className="w-full py-4 bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all">Verify Identity</button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="col-span-1 lg:col-span-9 flex flex-col h-full pb-20 overflow-y-auto no-scrollbar">
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <motion.h1 
                                key={activeSection}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-5xl font-black text-white uppercase tracking-tighter mb-2 italic"
                            >
                                {activeSection}
                            </motion.h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black pl-1">{data.length} Nodes detected in this cluster</p>
                        </div>
                        <div className="relative group w-full md:w-[400px]">
                            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search by name or #code..." 
                                className="w-full bg-white/5 border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-cyan-500/30 transition-all placeholder-gray-600 shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Cluster Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        >
                            {data.length > 0 ? data.map((item, index) => (
                                <motion.div
                                    key={item.id || item.uid}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white/5 backdrop-blur-3xl rounded-[48px] p-8 border border-white/5 hover:border-cyan-500/20 transition-all duration-700 shadow-2xl relative overflow-hidden group/card"
                                >
                                    {/* Glass Pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                                    
                                    <div className="relative mb-8">
                                        <div className="aspect-square rounded-[36px] overflow-hidden border-2 border-white/5 group-hover/card:border-cyan-500/40 transition-all duration-1000 p-1 bg-white/5">
                                            <img 
                                                src={item.photoURL || item.avatar || `https://i.pravatar.cc/300?u=${item.uid || item.id}`} 
                                                className="w-full h-full object-cover rounded-[32px] group-hover/card:scale-110 transition-transform duration-[2s]" 
                                                alt={item.displayName || item.name} 
                                            />
                                        </div>
                                        <div className={`absolute -bottom-2 -right-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 border-[#020205] shadow-2xl ${
                                            item.status === 'online' || activeSection === 'All Friends' ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-500'
                                        }`}>
                                            {item.status || 'Verified'}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-black text-white group-hover/card:text-cyan-400 transition-colors tracking-tighter uppercase">{item.displayName || item.name}</h3>
                                                <p className="text-[11px] text-gray-500 font-mono tracking-widest mt-1">#{item.code || '87654321'}</p>
                                            </div>
                                            <div className="flex -space-x-2.5">
                                                {[1, 2, 3].map(i => (
                                                    <img key={i} src={`https://i.pravatar.cc/150?img=${(index + i) % 70}`} className="w-6 h-6 rounded-full border-2 border-[#020205]" />
                                                ))}
                                            </div>
                                        </div>

                                        {activeSection === 'Requests' ? (
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => onAccept(item.uid)}
                                                    className="flex-1 py-4 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_10px_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                                                >
                                                    <Check size={14} /> Accept
                                                </button>
                                                <button 
                                                    onClick={() => onDelete(item.uid)}
                                                    className="p-4 bg-white/5 hover:bg-red-500 text-gray-500 hover:text-white rounded-2xl transition-all border border-white/5"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => onStartChat(item.uid || item.id, { name: item.displayName || item.name, avatar: item.photoURL || item.avatar })}
                                                    className="flex-1 py-4 bg-white/5 hover:bg-white text-white hover:text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-3"
                                                >
                                                    <MessageSquare size={14} /> Message
                                                </button>
                                                {activeSection === 'Suggestions' ? (
                                                    <button 
                                                        onClick={() => onSendRequest(item.uid || item.id, item)}
                                                        className="p-4 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-2xl transition-all border border-cyan-500/20"
                                                    >
                                                        <UserPlus size={18} />
                                                    </button>
                                                ) : (
                                                    <button className="p-4 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white rounded-2xl transition-all border border-white/5">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                                <span className="text-[9px] font-black text-gray-500 uppercase">12 Mutual Nodes</span>
                                            </div>
                                            <Heart size={14} className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center opacity-30">
                                    <User size={64} className="text-gray-600 mb-6" />
                                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Cluster Empty</h3>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">No nodes found in this social sector.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default FriendsPage;
