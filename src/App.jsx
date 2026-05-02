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
import { useFeed } from './hooks/useFeed';
import { useAuth } from './hooks/useAuth';
import { useSearch } from './hooks/useSearch';
import { useSocial } from './hooks/useSocial';
import { useMessages } from './hooks/useMessages';
import { useWatch } from './hooks/useWatch';

export default function App() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [activeFilter, setActiveFilter] = useState('For You (AI)');
    
    // Hooks
    const { posts, createPost, toggleLike } = useFeed(activeFilter);
    const { results: searchResults, searchUsers, loading: searchLoading } = useSearch();
    const { friends, requests, suggestions, sendRequest, acceptRequest, deleteRequest } = useSocial();
    const { conversations, messages, sendMessage, startConversation } = useMessages();
    const [currentPartyId, setCurrentPartyId] = useState('global-hub');
    const { videos: watchVideos, partyState, updateParty, joinParty } = useWatch(currentPartyId);

    const handleSearch = (query) => {
        searchUsers(query);
    };

    const handlePost = async (text) => {
        if (!user) {
            alert('Please login to share your world!');
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
        }
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'home': return (
                <HomePage 
                    posts={posts} 
                    onPost={handlePost} 
                    setTab={setActiveTab} 
                    user={user} 
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    toggleLike={toggleLike}
                />
            );
            case 'watch': return <WatchPage initialTab="video" watchVideos={watchVideos} partyState={partyState} updateParty={updateParty} user={user} />;
            case 'reels': return <WatchPage initialTab="reels" watchVideos={watchVideos} user={user} />;
            case 'youtube': return <WatchPage initialTab="youtube" watchVideos={watchVideos} user={user} />;
            case 'explore': return <ExplorePage />;
            case 'messages': return <MessagePage conversations={conversations} messages={messages} sendMessage={sendMessage} toggleFocus={toggleFocus} translateMessage={translateMessage} />;
            case 'profile': return <ProfilePage user={user} />;
            case 'friends': return (
                <FriendsPage 
                    friends={friends} 
                    requests={requests} 
                    suggestions={suggestions}
                    onAccept={acceptRequest}
                    onDelete={deleteRequest}
                />
            );
            default: return <HomePage posts={posts} onPost={handlePost} setTab={setActiveTab} user={user} activeFilter={activeFilter} setActiveFilter={setActiveFilter} toggleLike={toggleLike} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            {/* Master Navigation Bar (Upore) */}
            <TopNavigation 
                onSearch={handleSearch} 
                users={searchResults} 
                isLoadingSearch={searchLoading}
                setTab={setActiveTab}
                activeTab={activeTab}
                requestCount={requests.length}
            />

            <main className="relative h-[calc(100vh-80px)] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="w-full h-full"
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Bottom Nav is secondary, but kept for mobile accessibility if needed, 
                though the user wants a clean top-row focused UI */}
            <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}