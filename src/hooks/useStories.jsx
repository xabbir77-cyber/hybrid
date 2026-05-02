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
        let unsubscribe = () => {};

        try {
            // Fetch stories from the last 24 hours
            const yesterday = new Date();
            yesterday.setHours(yesterday.getHours() - 24);
            const yesterdayTimestamp = Timestamp.fromDate(yesterday);

            const storiesRef = collection(db, 'stories');
            // This requires a composite index: createdAt (>=), createdAt (desc)
            const q = query(
                storiesRef, 
                where('createdAt', '>=', yesterdayTimestamp),
                orderBy('createdAt', 'desc')
            );

            unsubscribe = onSnapshot(q, (snapshot) => {
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

                // Fallback: If index missing, just fetch latest stories without time filter
                if (err.code === 'failed-precondition') {
                    console.warn("Stories index missing. Falling back to simple query.");
                    const fallbackQ = query(storiesRef, orderBy('createdAt', 'desc'));
                    onSnapshot(fallbackQ, (fallbackSnap) => {
                        const fetchedFallback = fallbackSnap.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        // Grouping logic remains same
                        const groupedFallback = fetchedFallback.reduce((acc, story) => {
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
                        setStories(Object.values(groupedFallback));
                    });
                }
            });
        } catch (err) {
            console.error("Story Initialization Error:", err);
            setLoading(false);
        }

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
