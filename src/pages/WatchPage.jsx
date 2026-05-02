import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Tv, Youtube } from 'lucide-react';
import ShortsFeed from '../components/watch/ShortsFeed';
import VideoFeed from '../components/watch/VideoFeed';
import YouTubeHub from '../components/watch/YouTubeHub';
import WatchPartyPage from '../components/watch/WatchPartyPage';

const WatchPage = () => {
    const [activeTab, setActiveTab] = useState('reels');

    const tabs = [
        { id: 'video', label: 'Video', icon: Video },
        { id: 'reels', label: 'Reels', icon: Play },
        { id: 'party', label: 'Party', icon: Tv },
        { id: 'youtube', label: 'YouTube', icon: Youtube },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'reels': return <ShortsFeed />;
            case 'video': return <VideoFeed />;
            case 'party': return <WatchPartyPage />;
            case 'youtube': return <YouTubeHub />;
            default: return <ShortsFeed />;
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col bg-[#050505]">
            {/* Top Toggle Row */}
            <div className="flex w-full bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex flex-col items-center py-3 transition-all relative ${
                            activeTab === tab.id ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        <tab.icon size={20} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                        <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div 
                                layoutId="watch-tab-indicator" 
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_#a855f7]" 
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WatchPage;
