import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    serverTimestamp, 
    updateDoc, 
    doc, 
    increment,
    where
} from 'firebase/firestore';
import { db } from '../services/firebase';

export const useFeed = (filter = 'For You (AI)') => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postsRef = collection(db, 'posts');
        let q;

        if (filter === 'Global Trends') {
            q = query(postsRef, orderBy('likes', 'desc'), orderBy('createdAt', 'desc'));
        } else {
            // Simplistic 'For You' - just latest for now
            q = query(postsRef, orderBy('createdAt', 'desc'));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(fetchedPosts);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching feed:", err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [filter]);

    const createPost = async (postData) => {
        try {
            await addDoc(collection(db, 'posts'), {
                ...postData,
                createdAt: serverTimestamp(),
                likes: 0,
                commentsCount: 0,
                shareCount: 0,
                likedBy: [],
                aiSummary: `Auto-Generated: This post analyzed as "${postData.caption.substring(0, 30)}..." - High engagement potential.`
            });
        } catch (err) {
            console.error("Error creating post:", err);
            throw err;
        }
    };

    const toggleLike = async (postId, userId, isLiked) => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            likes: increment(isLiked ? -1 : 1),
            likedBy: isLiked ? 
                posts.find(p => p.id === postId).likedBy.filter(id => id !== userId) : 
                [...(posts.find(p => p.id === postId).likedBy || []), userId]
        });
    };

    return { posts, loading, error, createPost, toggleLike };
};
