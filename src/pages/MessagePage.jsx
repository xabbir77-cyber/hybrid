import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Youtube, MoreHorizontal, Paperclip, Mic, Send, Globe, Star, User, Bell, Grid } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

// Reusable Chat components
const ChatBubble = ({ message, isMe }) => (
    <motion.div
        initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 group relative`}
    >
        {!isMe && (
            <img src={message.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" alt="avatar" />
        )}
        <div className="max-w-[75%] relative">
            <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                isMe 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm shadow-[0_10px_20px_rgba(147,51,234,0.2)] border border-white/10' 
                : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-200 rounded-tl-sm'
            }`}>
                {message.text}
                {message.translated && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] italic text-purple-300">
                        Translated: {message.translated}
                    </div>
                )}
            </div>
            <div className={`text-[9px] mt-1 text-gray-500 flex items-center gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {message.time} {isMe && <span className="text-purple-400">●●</span>}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:text-purple-400 flex items-center gap-1 uppercase font-black tracking-widest">
                    <Globe size={10} /> Translate
                </button>
            </div>
        </div>
    </motion.div>
);

const MessagePage = () => {
    const [focusMode, setFocusMode] = useState(false);
    const [activeChat, setActiveChat] = useState(1);
    const [vanishMode, setVanishMode] = useState(false);

    const CHATS = [
        { id: 1, name: 'Alex Cyber', avatar: 'https://i.pravatar.cc/150?u=alex', active: true, priority: true, lastMsg: 'The new UI is insane!', time: '2m' },
        { id: 2, name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', active: false, priority: true, lastMsg: 'Can you check the PR?', time: '1h' },
        { id: 3, name: 'NeonExplorer', avatar: 'https://i.pravatar.cc/150?u=neon', active: true, priority: false, lastMsg: 'Look at this code...', time: '3h' },
        { id: 4, name: 'Design Bot', avatar: 'https://i.pravatar.cc/150?u=bot', active: true, priority: false, lastMsg: 'AI suggests a new color.', time: '5h' },
    ];

    const filteredChats = focusMode ? CHATS.filter(c => c.priority) : CHATS;

    return (
        <div className="h-[calc(100vh-80px)] flex max-w-full mx-auto overflow-hidden bg-[#050505]">
            {/* Sidebar (30%) */}
            <div className="w-full md:w-[30%] h-full border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-3xl">
                <div className="p-6 border-b border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Messages</h2>
                        <button 
                            onClick={() => setFocusMode(!focusMode)} 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                                focusMode ? 'bg-purple-600 text-white shadow-[0_0_15px_#a855f7]' : 'bg-white/5 text-gray-400 border border-white/10'
                            }`}
                        >
                            <Shield size={12} /> {focusMode ? 'FOCUS ON' : 'FOCUS'}
                        </button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={16} />
                        <input type="text" placeholder="Search threads..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 backdrop-blur-md transition-all" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
                    {filteredChats.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setActiveChat(chat.id)}
                            className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all ${
                                activeChat === chat.id ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-white/5'
                            }`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} className="w-14 h-14 rounded-full border-2 border-white/5 p-0.5" alt="avatar" />
                                {chat.active && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_#22c55e]"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm text-white truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-gray-500 font-medium">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate font-light italic">"{chat.lastMsg}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat (70%) - Hidden on small mobile if needed, but for now full desktop view */}
            <div className="hidden md:flex flex-1 h-full flex-col bg-gradient-to-b from-transparent to-purple-900/5 relative">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-3xl flex justify-between items-center z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={CHATS.find(c => c.id === activeChat)?.avatar} className="w-11 h-11 rounded-full border border-purple-500/50" alt="active-avatar" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                        </div>
                        <div>
                            <h3 className="font-black text-sm text-white tracking-wide">{CHATS.find(c => c.id === activeChat)?.name}</h3>
                            <p className="text-[10px] text-purple-400 flex items-center gap-1 font-bold uppercase tracking-widest"><Shield size={10} /> Encrypted</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-500/30 transition-all shadow-lg">
                            <Youtube size={16} /> Sync
                        </button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-gray-400 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    <ChatBubble message={{ text: "Hey! Have you seen the new design tokens? The glassmorphism blur is exactly at 12px now.", time: "12:45 PM", avatar: CHATS[0].avatar }} isMe={false} />
                    <ChatBubble message={{ text: "Yes! It looks incredibly premium. I'm also testing the purple gradient borders on the chat bubbles right now.", time: "12:46 PM" }} isMe={true} />
                </div>

                {/* Floating Input Area */}
                <div className="p-6 relative">
                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 pr-3 shadow-2xl focus-within:border-purple-500/50 transition-all">
                        <button className="p-3 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"><Paperclip size={20} /></button>
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 px-2 text-white" />
                        <button className="p-3 text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"><Mic size={20} /></button>
                        <button className="p-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-[0_10px_20px_rgba(147,51,234,0.4)] hover:scale-105 transition-transform">
                            <Send size={18} fill="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
