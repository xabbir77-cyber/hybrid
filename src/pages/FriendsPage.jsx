import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, UserMinus, UserCheck, MessageSquare, MoreHorizontal, Users, ShieldCheck, Zap } from 'lucide-react';

const FriendsPage = () => {
    const [activeSection, setActiveSection] = useState('All Friends');

    const sections = ['All Friends', 'Requests', 'Suggestions', 'Blocked'];

    const friends = [
        { id: 1, name: 'Chloe Davis', code: '87654321', avatar: 'https://i.pravatar.cc/150?u=chloe', mutual: 12, status: 'Online' },
        { id: 2, name: 'Alex Cyber', code: '11223344', avatar: 'https://i.pravatar.cc/150?u=alex', mutual: 5, status: 'Idle' },
        { id: 3, name: 'Neon Explorer', code: '44556677', avatar: 'https://i.pravatar.cc/150?u=neon', mutual: 24, status: 'Online' },
        { id: 4, name: 'Sarah Miller', code: '99887766', avatar: 'https://i.pravatar.cc/150?u=sarah', mutual: 8, status: 'Offline' },
        { id: 5, name: 'James Wilson', code: '55443322', avatar: 'https://i.pravatar.cc/150?u=james', mutual: 15, status: 'Online' },
    ];

    return (
        <div className="bg-[#020205] min-h-screen pt-24 pb-32 px-4 sm:px-10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Sidebar - Navigation */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="glass-card rounded-[24px] p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <Users size={24} className="text-cyan-400" />
                            <h2 className="text-xl font-black uppercase tracking-wider text-white">Social Hub</h2>
                        </div>
                        <nav className="space-y-2">
                            {sections.map(section => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                                        activeSection === section ? 'bg-white/10 text-white border border-white/10' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    <span className="text-sm font-bold uppercase tracking-widest">{section}</span>
                                    {section === 'Requests' && (
                                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">3</span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="glass-card rounded-[24px] p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-blue-500/20">
                        <Zap size={24} className="text-blue-400 mb-4" />
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Find Mutuals</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed mb-4">Our AI discovered 15 new users with similar hybrid interests in your area.</p>
                        <button className="w-full py-2.5 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20">Scan Network</button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="lg:col-span-9 space-y-8">
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{activeSection}</h1>
                            <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">{friends.length} Connections identified</p>
                        </div>
                        <div className="relative group min-w-[300px]">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search by name or #code..." 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Friends Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {friends.map((friend, index) => (
                            <motion.div
                                key={friend.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card rounded-[32px] p-5 hover:border-white/20 transition-all group"
                            >
                                <div className="relative mb-6">
                                    <div className="aspect-square rounded-[24px] overflow-hidden border-2 border-white/5 group-hover:border-cyan-500/30 transition-all duration-500">
                                        <img src={friend.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={friend.name} />
                                    </div>
                                    <div className={`absolute -bottom-3 -right-3 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border-2 border-[#020205] shadow-xl ${
                                        friend.status === 'Online' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                                    }`}>
                                        {friend.status}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">{friend.name}</h3>
                                            <p className="text-[10px] text-gray-500 font-mono tracking-wider">#{friend.code}</p>
                                        </div>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <img key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-5 h-5 rounded-full border border-[#020205]" />
                                            ))}
                                            <div className="w-5 h-5 rounded-full bg-white/10 border border-[#020205] flex items-center justify-center text-[6px] font-bold">+{friend.mutual}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                                            <UserCheck size={14} /> Confirm
                                        </button>
                                        <button className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">
                                            Delete
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center pt-2 border-t border-white/5">
                                        <button className="flex items-center gap-2 text-[9px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                                            <MessageSquare size={12} /> Message
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FriendsPage;
