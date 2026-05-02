import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Send, MoreHorizontal, Clock } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import VideoPlayer from './VideoPlayer';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const VideoCard = ({ video }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.6 });
    const [liked, setLiked] = React.useState(false);

    return (
        <GlassCard ref={ref} className="mb-6 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <img src={video.avatar} className="w-10 h-10 rounded-full border-2 border-purple-500 p-[1px]" />
                    <div>
                        <h4 className="font-bold text-sm text-white">{video.user}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Clock size={10} /> {video.time}
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="text-gray-500 cursor-pointer" />
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black overflow-hidden">
                <VideoPlayer 
                    url={video.url} 
                    isActive={isVisible} 
                    isMuted={true} 
                    onToggleMute={() => {}} 
                />
            </div>

            {/* Action Bar */}
            <div className="p-4">
                <div className="flex gap-6 mb-3">
                    <button onClick={() => setLiked(!liked)} className="flex items-center gap-1 group">
                        <Heart size={24} fill={liked ? "#ef4444" : "none"} className={`${liked ? 'text-red-500' : 'text-gray-300 group-hover:text-red-400'} transition-colors`} />
                        <span className="font-bold text-sm">1.2K</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors">
                        <MessageSquare size={24} /> <span className="font-bold text-sm">24</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-300 hover:text-green-400 transition-colors">
                        <Send size={24} />
                    </button>
                </div>
                <p className="text-sm font-medium text-gray-200">
                    <span className="font-black mr-2 text-white">{video.user}</span>
                    {video.caption}
                </p>
            </div>
        </GlassCard>
    );
};

const VideoFeed = () => {
    const videos = [
        { id: 1, user: 'TechGiant', url: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34537-large.mp4', avatar: 'https://i.pravatar.cc/150?u=10', caption: 'The future of remote work is looking bright. #WorkFromHome', time: '2h ago' },
        { id: 2, user: 'TravelMode', url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-shore-at-night-44781-large.mp4', avatar: 'https://i.pravatar.cc/150?u=11', caption: 'Midnight waves hit different. 🌊 #Nature #Vibes', time: '5h ago' },
        { id: 3, user: 'CreativeMind', url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-keyboard-and-mouse-with-neon-lights-48358-large.mp4', avatar: 'https://i.pravatar.cc/150?u=12', caption: 'RGB setups make you 10% faster. Fact. ⌨️ #Setup', time: '1d ago' },
    ];

    return (
        <div className="h-full overflow-y-auto p-4 no-scrollbar">
            <div className="max-w-2xl mx-auto">
                {videos.map(v => (
                    <VideoCard key={v.id} video={v} />
                ))}
            </div>
        </div>
    );
};

export default VideoFeed;
