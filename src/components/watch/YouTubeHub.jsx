import React, { useState, useEffect } from 'react';
import { Search, Play, Plus, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import GlassCard from '../common/GlassCard';

const YouTubeHub = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTrending = async (searchQuery = '') => {
        setLoading(true);
        try {
            const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
            if (!API_KEY) throw new Error('API Key missing');

            let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=12&key=${API_KEY}`;
            
            if (searchQuery) {
                url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=12&key=${API_KEY}`;
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
            // Fallback to dummy data
            setVideos([1, 2, 3, 4, 5, 6].map(i => ({ id: i, title: 'Hybrid Design Masterclass', channelTitle: 'Hybrid Tech' })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <div className="h-full flex flex-col bg-[#050505] p-4 overflow-y-auto no-scrollbar">
            {/* YouTube Search Bar */}
            <div className="max-w-3xl mx-auto w-full mb-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <form 
                        onSubmit={(e) => { e.preventDefault(); fetchTrending(query); }}
                        className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-3xl focus-within:border-purple-500 transition-all shadow-2xl"
                    >
                        <Search size={22} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search YouTube with Hybrid Intelligence..."
                            className="w-full bg-transparent border-none focus:outline-none text-white px-4 text-lg font-light placeholder-gray-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="bg-purple-600 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-purple-500 transition-colors shadow-[0_0_15px_#a855f7]">
                            {loading ? <Loader2 className="animate-spin" /> : 'Search'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Video Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
                {videos.map(video => (
                    <GlassCard key={video.id} className="group cursor-pointer border-none shadow-none bg-transparent">
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                            <img src={video.thumbnail || `https://picsum.photos/800/450?sig=${video.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="thumb" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"><Play size={24} fill="white" /></div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <img src={video.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="avatar" />
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-white line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">{video.title}</h4>
                                <p className="text-[10px] text-gray-400 mt-1 font-bold">{video.channelTitle} • {video.views} views</p>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default YouTubeHub;
