import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Youtube, MoreHorizontal, Paperclip, Mic, Send, Globe, Star, User, Bell, Grid, Zap, Sparkles, Smile, X } from 'lucide-react';

const ChatBubble = ({ message, isMe, avatar }) => (
    <motion.div
        initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-6 group`}
    >
        {!isMe && (
            <div className="relative mr-3 mt-auto">
                <img src={avatar || 'https://i.pravatar.cc/150?u=guest'} className="w-9 h-9 rounded-2xl border border-white/10" alt="avatar" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#020205]"></div>
            </div>
        )}
        <div className={`max-w-[70%] space-y-2 ${isMe ? 'items-end' : 'items-start'}`}>
            <div className={`relative px-5 py-4 rounded-[28px] text-sm font-medium leading-relaxed shadow-2xl transition-all ${
                isMe 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none border border-white/10' 
                : 'bg-white/5 backdrop-blur-3xl border border-white/10 text-gray-200 rounded-tl-none hover:bg-white/10'
            }`}>
                {message.text}
                {message.metadata?.ai_summary && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-start gap-2">
                        <Sparkles size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                        <p className="text-[10px] font-bold text-cyan-400/80 italic leading-tight">AI Note: {message.metadata.ai_summary}</p>
                    </div>
                )}
            </div>
            <div className={`flex items-center gap-2 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{message.timestamp || 'Just Now'}</span>
                {isMe && (
                    <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
                        <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
                    </div>
                )}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black text-gray-500 hover:text-cyan-400 uppercase tracking-widest flex items-center gap-1 pl-2">
                    <Globe size={10} /> Translate
                </button>
            </div>
        </div>
    </motion.div>
);

const MessagePage = ({ conversations = [], messages = [], sendMessage, toggleFocus, translateMessage }) => {
    const [activeChatId, setActiveChatId] = useState(null);
    const [inputText, setInputText] = useState('');
    const [focusMode, setFocusMode] = useState(false);
    const scrollRef = useRef(null);

    const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];
    const filteredConversations = focusMode ? conversations.filter(c => c.priority) : conversations;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeChatId]);

    const handleSend = () => {
        if (!inputText.trim() || !activeChatId) return;
        sendMessage(activeChatId, inputText);
        setInputText('');
    };

    return (
        <div className="h-full flex overflow-hidden bg-[#020205]">
            {/* Sidebar Cluster (30%) */}
            <aside className="w-full md:w-[380px] lg:w-[420px] h-full border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-3xl z-20">
                <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Nodes</h2>
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1 pl-1">Neural Messaging OS</p>
                        </div>
                        <button 
                            onClick={() => setFocusMode(!focusMode)}
                            className={`p-3 rounded-2xl transition-all ${focusMode ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-gray-500 border border-white/5'}`}
                        >
                            <Shield size={20} />
                        </button>
                    </div>

                    <div className="relative group">
                        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search Node Channels..." 
                            className="w-full bg-white/5 border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-cyan-500/30 transition-all placeholder-gray-600 shadow-2xl" 
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3 no-scrollbar">
                    {filteredConversations.map(chat => (
                        <motion.div 
                            key={chat.id} 
                            onClick={() => setActiveChatId(chat.id)}
                            whileHover={{ x: 5 }}
                            className={`flex items-center gap-5 p-5 rounded-[32px] cursor-pointer transition-all relative overflow-hidden group ${
                                activeChatId === chat.id ? 'bg-white/10 border border-white/10 shadow-2xl' : 'hover:bg-white/5'
                            }`}
                        >
                            <div className="relative shrink-0">
                                <img src={chat.avatar} className="w-16 h-16 rounded-[24px] border-2 border-white/10 p-0.5 object-cover" alt="avatar" />
                                {chat.online && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full border-4 border-[#020205] shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <div className="flex justify-between items-center mb-1.5">
                                    <h4 className="font-black text-sm text-white uppercase tracking-tight truncate">{chat.name}</h4>
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{chat.lastMessageTime || 'Now'}</span>
                                </div>
                                <p className="text-[11px] text-gray-400 truncate font-medium italic opacity-60">"{chat.lastMessage || 'Open Node Channel'}"</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="absolute top-1/2 -translate-y-1/2 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </aside>

            {/* Matrix Chat Hub (70%) */}
            <main className="flex-1 h-full flex flex-col bg-gradient-to-br from-black to-blue-950/10 relative">
                {activeChatId ? (
                    <>
                        {/* Hub Header */}
                        <header className="p-6 border-b border-white/5 bg-black/20 backdrop-blur-3xl flex justify-between items-center z-10 shadow-2xl">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <img src={activeChat?.avatar} className="w-12 h-12 rounded-2xl border border-cyan-500/30 object-cover" alt="active" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-[#020205]"></div>
                                </div>
                                <div>
                                    <h3 className="font-black text-base text-white tracking-tighter uppercase italic">{activeChat?.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                                        <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em]">Synchronized Link</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-3 px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-2xl border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl group">
                                    <Youtube size={16} className="group-hover:scale-110 transition-transform" /> Cinema Sync
                                </button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-gray-400">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </header>

                        {/* Stream Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-10 space-y-2 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-80"
                        >
                            {messages.map((msg, i) => (
                                <ChatBubble 
                                    key={msg.id} 
                                    message={msg} 
                                    isMe={msg.senderId === 'me'} 
                                    avatar={activeChat?.avatar} 
                                />
                            ))}
                        </div>

                        {/* Quantum Input Field */}
                        <div className="p-8 z-10">
                            <div className="relative group max-w-5xl mx-auto">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
                                <div className="relative flex items-center gap-4 bg-[#020205]/80 backdrop-blur-[60px] border border-white/10 rounded-[3rem] p-3 pr-4 shadow-3xl">
                                    <button className="p-4 text-gray-500 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all">
                                        <Paperclip size={22} />
                                    </button>
                                    <input 
                                        type="text" 
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Transmit data to Node..." 
                                        className="flex-1 bg-transparent border-none focus:outline-none text-base font-medium py-3 px-2 text-white placeholder-gray-600" 
                                    />
                                    <div className="flex gap-1 pr-2 border-r border-white/5">
                                        <button className="p-3 text-gray-500 hover:text-yellow-400 hover:bg-white/5 rounded-full transition-all"><Smile size={20} /></button>
                                        <button className="p-3 text-gray-500 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all"><Mic size={20} /></button>
                                    </div>
                                    <motion.button 
                                        onClick={handleSend}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_15px_30px_rgba(6,182,212,0.4)] transition-all"
                                    >
                                        <Send size={22} fill="white" className="ml-1" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
                        <div className="w-32 h-32 bg-white/5 rounded-[48px] flex items-center justify-center mb-8 border border-white/5">
                            <Zap size={64} className="text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-3 italic">Initialize Link</h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest max-w-sm leading-relaxed">Select a neural node from the sidebar to establish a secure data transmission channel.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MessagePage;
