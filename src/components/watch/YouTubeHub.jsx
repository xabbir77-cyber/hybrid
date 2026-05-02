import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Plus, Send, Loader2, Youtube, Sparkles, Zap, Tv, Share2, MoreHorizontal, MessageSquare, X } from 'lucide-react';
import axios from 'axios';

const YouTubeHub = ({ videos: initialVideos = [], setTab, updateParty }) => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState(initialVideos);
    const [loading, setLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const fetchTrending = async (searchQuery = '') => {
        setLoading(true);
        try {
            const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
            if (!API_KEY) throw new Error('API Key missing');

            let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=15&key=${API_KEY}`;
            
            if (searchQuery) {
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=15&key=${API_KEY}`;
            }

            const res = await axios.get(url);
            const items = res.data.items.map(item => ({
                id: item.id.videoId || item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                avatar: `https://i.pravatar.cc/150?u=${item.snippet.channelId}`,
                views: item.statistics?.viewCount || '1.2M',
                publishedAt: item.snippet.publishedAt
            }));
            setVideos(items);
        } catch (error) {
            console.error('Error fetching YouTube:', error);
            // Fallback for demo
            setVideos([1, 2, 3, 4, 5, 6].map(i => ({ 
                id: `demo-${i}`, 
                title: 'Hybrid OS Design Masterclass: Spatial UI Patterns', 
                channelTitle: 'Hybrid Labs',
                views: '1.2M',
                thumbnail: `https://picsum.photos/seed/${i}/800/450`
            })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <div className="h-full bg-[#020205] overflow-y-auto no-scrollbar scroll-smooth">
            {/* Search Hub Header (Sticky) */}
            <div className="sticky top-0 z-30 p-10 border-b border-white/5 bg-[#020205]/80 backdrop-blur-3xl bg-gradient-to-b from-red-500/10 to-transparent">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="flex items-center gap-4 mb-8 justify-center">
                        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <Youtube size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Cinema<span className="text-red-500">Hub</span></h1>
                    </div>
                    
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
                        <form 
                            onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (query.trim()) fetchTrending(query); 
                            }}
                            className="relative flex items-center bg-[#020205]/60 backdrop-blur-[60px] border border-white/10 rounded-3xl px-8 py-5 shadow-3xl"
                        >
                            <Search size={24} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search YouTube Meta-Database..."
                                className="w-full bg-transparent border-none focus:outline-none text-white px-6 text-xl font-light placeholder-gray-600"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-red-500 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_10px_30px_rgba(239,68,68,0.3)] flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} 
                                <span className="hidden sm:inline">{loading ? 'Scanning...' : 'Initialize Scan'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="p-10 min-h-[500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1920px] mx-auto">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8 }}
                            onClick={() => setSelectedVideo(video)}
                            className="bg-white/5 backdrop-blur-3xl rounded-[32px] overflow-hidden border border-white/5 hover:border-red-500/20 transition-all duration-700 shadow-2xl group cursor-pointer"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img 
                                    src={video.thumbnail} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                                    alt="thumb" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                
                                {/* Hover Play Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.6)] scale-75 group-hover:scale-100 transition-transform">
                                        <Play size={28} fill="white" className="text-white ml-1" />
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xl px-2 py-1 rounded-lg text-[9px] font-black text-white border border-white/10 uppercase tracking-widest">
                                    12:45
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex gap-4 mb-4">
                                    <div className="relative shrink-0">
                                        <img src={video.avatar || `https://i.pravatar.cc/150?u=${video.id}`} className="w-10 h-10 rounded-xl border border-white/10" alt="avatar" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#020205]"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-sm text-white line-clamp-2 leading-tight group-hover:text-red-400 transition-colors uppercase tracking-tight">{video.title}</h4>
                                        <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">{video.channelTitle}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Zap size={12} className="text-red-500" />
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{video.views} views</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-600 hover:text-white transition-colors"><Share2 size={14} /></button>
                                        <button className="p-2 text-gray-600 hover:text-white transition-colors"><Plus size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Player (Iframe) */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-[40px] flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-7xl bg-[#020205] rounded-[48px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(239,68,68,0.2)] flex flex-col h-[90vh]"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500"><Tv size={20} /></div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest line-clamp-1">{selectedVideo.title}</h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-3 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Player */}
                            <div className="flex-1 bg-black relative">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                                    className="w-full h-full border-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Cinema Toolbar */}
                            <div className="p-8 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center animate-pulse">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">Cinema Sync: Available</p>
                                            <p className="text-[8px] text-gray-500 font-bold uppercase">Broadcast this to your node</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={async () => {
                                            await updateParty({ videoId: selectedVideo.id, isPlaying: true, currentTime: 0 });
                                            setTab('party'); // Switches to the Party sub-tab
                                        }}
                                        className="flex items-center gap-3 px-8 py-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-red-400 transition-all"
                                    >
                                        <Tv size={16} /> Start Party
                                    </button>
                                    <button className="flex items-center gap-3 px-8 py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-white/5">
                                        <Share2 size={16} /> Broadcast Link
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default YouTubeHub;
