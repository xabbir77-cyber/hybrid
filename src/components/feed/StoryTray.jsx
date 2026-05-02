import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const StoryTray = () => {
    return (
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-2 min-w-[80px] relative cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all border-dashed">
                    <Plus size={24} className="text-blue-400" />
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400">Add Story</span>
            </div>

            {/* Active Stories */}
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer">
                    <div className="p-[3px] rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-purple-600 animate-gradient-x shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                        <div className="bg-[#050505] p-[2px] rounded-full">
                            <img 
                                src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                                className="w-14 h-14 rounded-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all" 
                                alt="story"
                            />
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300">User {i}</span>
                </div>
            ))}
        </div>
    );
};

export default StoryTray;
