import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './components/layout/TopNavigation';
import BottomNavigation from './components/layout/BottomNavigation';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import ExplorePage from './pages/ExplorePage';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import { getInitialPosts, getMockUsers } from './services/apiService';
import { useFeed } from './hooks/useFeed';
import { useAuth } from './hooks/useAuth';
import { useSearch } from './hooks/useSearch';

export default function App() {
    const { user } = useAuth();
    const { posts: firebasePosts, createPost } = useFeed();
    const { results: searchResults, searchUsers, loading: searchLoading } = useSearch();
    const [activeTab, setActiveTab] = useState('home');

    const handleSearch = (query) => {
        searchUsers(query);
    };

    const handlePost = async (text) => {
        if (!user) {
            alert('Please login to share your world!');
            loginWithGoogle();
            return;
        }

        try {
            await createPost({
                uid: user.uid,
                user: user.displayName || 'Hybrid User',
                avatar: user.photoURL || 'https://i.pravatar.cc/150?u=me',
                code: user.code || '87654321',
                caption: text,
                time: 'Just now'
            });
        } catch (error) {
            console.error("Failed to post:", error);
            alert("Posting failed. Check your connection or permissions.");
        }
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'home': return <HomePage posts={firebasePosts} onPost={handlePost} setTab={setActiveTab} user={user} />;
            case 'watch': return <WatchPage />;
            case 'explore': return <ExplorePage />;
            case 'messages': return <MessagePage />;
            case 'profile': return <ProfilePage />;
            case 'friends': return <FriendsPage />;
            default: return <HomePage posts={firebasePosts} onPost={handlePost} setTab={setActiveTab} user={user} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
            {/* Show TopNav only on pages that need it */}
            {activeTab !== 'watch' && activeTab !== 'messages' && (
                <TopNavigation 
                    onSearch={handleSearch} 
                    users={searchResults} 
                    isLoadingSearch={searchLoading}
                    setTab={setActiveTab}
                />
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