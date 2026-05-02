import React, { useState } from 'react';
import { Video, Image as ImageIcon, Star } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const StatusPostBox = ({ onPost }) => {
    const [text, setText] = useState('');

    const handlePost = () => {
        if (!text.trim()) return;
        onPost(text);
        setText('');
    };

    return (
        <GlassCard className="p-4 mb-6 shadow-2xl">
            <div className="flex gap-4 mb-4">
                <img src="https://i.pravatar.cc/150?u=me" className="w-12 h-12 rounded-full border-2 border-purple-500" alt="me" />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePost();
                        }
                    }}
                    placeholder="What's happening in your digital world?"
                    className="bg-transparent border-none focus:outline-none w-full text-lg font-light text-white placeholder-gray-500 resize-none pt-2"
                    rows={2}
                />
            </div>
            <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    <Video size={16} /> Live
                </button>
                <button onClick={handlePost} className="flex items-center justify-center gap-2 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[inset_0_0_15px_rgba(147,51,234,0.1)]">
                    <ImageIcon size={16} /> Post
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    <Star size={16} /> Event
                </button>
            </div>
        </GlassCard>
    );
};

export default StatusPostBox;
