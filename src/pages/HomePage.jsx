import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import StatusPostBox from '../components/feed/StatusPostBox';
import FeedPost from '../components/feed/FeedPost';
import StoryTray from '../components/feed/StoryTray';
import { SkeletonPost } from '../components/common/SkeletonLoader';

const HomePage = ({ posts, onPost }) => {
    const [isLoading, setIsLoading] = useState(false); // Simulate loading state

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 px-4 pb-24 h-[calc(100vh-80px)] overflow-hidden">
            {/* Left Sidebar (Desktop) */}
            <div className="hidden lg:block space-y-4 sticky top-0 h-max overflow-y-auto no-scrollbar">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-2">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Discovery</h3>
                    {['Trending', 'Events', 'Groups', 'Marketplace', 'Memories'].map(item => (
                        <div key={item} className="p-3 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-medium transition-colors">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Feed (Center) */}
            <div className="col-span-1 lg:col-span-2 flex flex-col h-full">
                <Virtuoso
                    style={{ height: '100%' }}
                    data={posts}
                    components={{
                        Header: () => (
                            <div className="mb-4">
                                <StoryTray />
                                <StatusPostBox onPost={onPost} />
                                {/* Triple Filter */}
                                <div className="flex bg-white/5 rounded-xl p-1 mb-6">
                                    {['For You', 'Friends', 'Trending'].map((f, i) => (
                                        <button key={f} className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${i === 0 ? 'bg-white/10 shadow-md text-white' : 'text-gray-500 hover:text-white'}`}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ),
                        Footer: () => isLoading ? <SkeletonPost /> : <div className="h-20" />
                    }}
                    itemContent={(index, post) => (
                        <FeedPost key={post.id} post={post} />
                    )}
                    className="no-scrollbar"
                />
            </div>

            {/* Right Sidebar (Desktop) */}
            <div className="hidden lg:block space-y-4 sticky top-0 h-max overflow-y-auto no-scrollbar">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Active Now</h3>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer">
                            <div className="relative">
                                <img src={`https://i.pravatar.cc/150?img=${i + 20}`} className="w-8 h-8 rounded-full" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_5px_#22c55e]"></div>
                            </div>
                            <span className="text-sm font-medium">Contact {i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
