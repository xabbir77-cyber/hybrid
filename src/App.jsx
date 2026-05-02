import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './components/layout/TopNavigation';
import BottomNavigation from './components/layout/BottomNavigation';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import ExplorePage from './pages/ExplorePage';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';
import { getInitialPosts, getMockUsers } from './services/apiService';

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [posts, setPosts] = useState(getInitialPosts());
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(getMockUsers());

    const handleSearch = (query) => {
        setSearchQuery(query);
        const users = getMockUsers();
        if (!query.trim()) {
            setFilteredUsers(users);
            return;
        }
        const filtered = users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) || 
            user.code.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handlePost = (text) => {
        const newPost = {
            id: Date.now(),
            user: 'Admin User',
            avatar: 'https://i.pravatar.cc/150?u=me',
            caption: text,
            time: 'Just now',
            likes: 0
        };
        setPosts([newPost, ...posts]);
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'home': return <HomePage posts={posts} onPost={handlePost} />;
            case 'watch': return <WatchPage />;
            case 'explore': return <ExplorePage />;
            case 'messages': return <MessagePage />;
            case 'profile': return <ProfilePage />;
            default: return <HomePage posts={posts} onPost={handlePost} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-purple-500/30">
            {/* Show TopNav only on pages that need it */}
            {activeTab !== 'watch' && activeTab !== 'messages' && (
                <TopNavigation onSearch={handleSearch} users={filteredUsers} />
            )}

            <main className="relative h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full"
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}