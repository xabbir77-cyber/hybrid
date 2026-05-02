import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Camera, Sparkles, Wand2 } from 'lucide-react';

const OmniStories = () => {
    const stories = [
        { id: 1, name: 'Chloe Davis', avatar: 'https://i.pravatar.cc/150?img=1', active: true },
        { id: 2, name: 'Alex Rivers', avatar: 'https://i.pravatar.cc/150?img=2', active: true },
        { id: 3, name: 'Sasha Grey', avatar: 'https://i.pravatar.cc/150?img=3', active: false },
        { id: 4, name: 'Marcus J.', avatar: 'https://i.pravatar.cc/150?img=4', active: true },
        { id: 5, name: 'Elena R.', avatar: 'https://i.pravatar.cc/150?img=5', active: false },
        { id: 6, name: 'Viktor K.', avatar: 'https://i.pravatar.cc/150?img=6', active: true },
    ];

    return (
        <div className="mb-8 relative">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
                {/* Create Story Button */}
                <motion.div 
                    className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-16 h-16 rounded-[1.5rem] glass-effect border-2 border-dashed border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors bg-white/5">
                        <Plus className="text-cyan-400" size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Add Omni</span>
                </motion.div>

                {/* Story List */}
                {stories.map((story) => (
                    <motion.div 
                        key={story.id}
                        className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className={`relative p-[3px] rounded-[1.5rem] ${story.active ? 'bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-lg neon-glow-cyan' : 'bg-white/10'}`}>
                            <div className="w-16 h-16 rounded-[1.3rem] overflow-hidden border-2 border-black">
                                <img src={story.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={story.name} />
                            </div>
                            {story.active && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full border-2 border-black flex items-center justify-center shadow-lg">
                                    <Sparkles size={10} className="text-white fill-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 truncate w-16 text-center">{story.name.split(' ')[0]}</span>
                    </motion.div>
                ))}
            </div>

            {/* Omni-OS floating indicator */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 glass-effect rounded-full border border-cyan-500/20">
                <Wand2 size={10} className="text-cyan-400" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400">Omni-Creator OS Active</span>
            </div>
        </div>
    );
};

export default OmniStories;
