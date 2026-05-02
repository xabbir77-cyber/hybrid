import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    serverTimestamp,
    Timestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth';

export const useStories = () => {
    const { user } = useAuth();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stories from the last 24 hours
        const yesterday = new Date();
        yesterday.setHours(yesterday.getHours() - 24);
        const yesterdayTimestamp = Timestamp.fromDate(yesterday);

        const storiesRef = collection(db, 'stories');
        const q = query(
            storiesRef, 
            where('createdAt', '>=', yesterdayTimestamp),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Group by user
            const grouped = fetched.reduce((acc, story) => {
                if (!acc[story.uid]) {
                    acc[story.uid] = {
                        uid: story.uid,
                        userName: story.userName,
                        userAvatar: story.userAvatar,
                        stories: []
                    };
                }
                acc[story.uid].stories.push(story);
                return acc;
            }, {});

            setStories(Object.values(grouped));
            setLoading(false);
        }, (err) => {
            console.error("Story Fetch Error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const createStory = async (mediaUrl, type = 'image', aiMetadata = {}) => {
        if (!user) return;

        await addDoc(collection(db, 'stories'), {
            uid: user.uid,
            userName: user.displayName,
            userAvatar: user.photoURL,
            mediaUrl,
            type,
            aiMetadata, // Stores filter info, mood sync data, etc.
            createdAt: serverTimestamp()
        });
    };

    return { stories, loading, createStory };
};
