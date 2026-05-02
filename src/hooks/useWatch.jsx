import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export const useWatch = (roomId = null) => {
    const [videos, setVideos] = useState([]);
    const [partyState, setPartyState] = useState(null);
    const [loading, setLoading] = useState(false);

    // YouTube Fetching Logic
    const fetchVideos = async (query = '', type = 'trending') => {
        setLoading(true);
        try {
            if (!YOUTUBE_API_KEY) throw new Error('YouTube API Key missing');

            let url = `${YOUTUBE_API_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=12&key=${YOUTUBE_API_KEY}`;
            
            if (query) {
                url = `${YOUTUBE_API_URL}/search?part=snippet&q=${query}&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`;
            } else if (type === 'shorts') {
                url = `${YOUTUBE_API_URL}/search?part=snippet&q=#shorts&type=video&videoDuration=short&maxResults=12&key=${YOUTUBE_API_KEY}`;
            }

            const res = await axios.get(url);
            const items = res.data.items.map(item => ({
                id: item.id.videoId || item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                avatar: `https://i.pravatar.cc/150?u=${item.snippet.channelId}`,
                views: item.statistics?.viewCount || '1.2M',
                publishedAt: item.snippet.publishedAt,
                caption: item.snippet.title,
                user: item.snippet.channelTitle
            }));
            setVideos(items);
            return items;
        } catch (error) {
            console.error('YouTube Fetch Error:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Watch Party Sync Logic (Firestore)
    useEffect(() => {
        if (!roomId) return;

        const roomRef = doc(db, 'watchParties', roomId);
        
        // Ensure room exists
        getDoc(roomRef).then(docSnap => {
            if (!docSnap.exists()) {
                setDoc(roomRef, {
                    videoId: '',
                    currentTime: 0,
                    isPlaying: false,
                    lastUpdated: Date.now(),
                    participants: []
                });
            }
        });

        const unsub = onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setPartyState(snapshot.data());
            }
        });

        return () => unsub();
    }, [roomId]);

    const updateParty = async (newState) => {
        if (!roomId) return;
        const roomRef = doc(db, 'watchParties', roomId);
        await updateDoc(roomRef, {
            ...newState,
            lastUpdated: Date.now()
        });
    };

    const joinParty = async (user) => {
        if (!roomId || !user) return;
        const roomRef = doc(db, 'watchParties', roomId);
        const snap = await getDoc(roomRef);
        if (snap.exists()) {
            const data = snap.data();
            if (!data.participants.some(p => p.uid === user.uid)) {
                await updateDoc(roomRef, {
                    participants: [...data.participants, { uid: user.uid, photoURL: user.photoURL, displayName: user.displayName }]
                });
            }
        }
    };

    return {
        videos,
        fetchVideos,
        partyState,
        updateParty,
        joinParty,
        loading
    };
};
