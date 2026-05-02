import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Tv, Youtube, MonitorPlay, Zap, Sparkles } from 'lucide-react';
import ShortsFeed from '../components/watch/ShortsFeed';
import VideoFeed from '../components/watch/VideoFeed';
import YouTubeHub from '../components/watch/YouTubeHub';
import WatchPartyPage from '../components/watch/WatchPartyPage';

const WatchPage = ({ initialTab = 'video', watchVideos, partyState, updateParty, user }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const tabs = [
        { id: 'video', label: 'Watch', icon: MonitorPlay },
        { id: 'reels', label: 'Reels', icon: Zap },
        { id: 'party', label: 'Cinema', icon: Tv },
        { id: 'youtube', label: 'YouTube Hub', icon: Youtube },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'reels': return <ShortsFeed videos={watchVideos} />;
            case 'video': return <VideoFeed videos={watchVideos} />;
            case 'party': return <WatchPartyPage partyState={partyState} updateParty={updateParty} user={user} />;
            case 'youtube': return <YouTubeHub videos={watchVideos} setTab={setActiveTab} updateParty={updateParty} />;
            default: return <VideoFeed videos={watchVideos} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#020205] overflow-hidden">
            {/* Contextual Hub Header */}
            <header className="px-10 py-6 border-b border-white/5 bg-black/40 backdrop-blur-3xl flex justify-between items-center z-10">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 pl-1">
                        <Sparkles size={12} className="text-cyan-400" />
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Hybrid Visual OS</p>
                    </div>
                </div>

                {/* Internal Toggle */}
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-500 relative group ${
                                activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="watch-inner-tab-bg"
                                    className="absolute inset-0 bg-white/10 rounded-xl shadow-xl border border-white/10"
                                />
                            )}
                            <tab.icon size={16} className="relative z-10" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10 hidden xl:block">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="w-full h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default WatchPage;
