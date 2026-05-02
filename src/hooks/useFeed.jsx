import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));

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
    }, []);

    const createPost = async (postData) => {
        try {
            await addDoc(collection(db, 'posts'), {
                ...postData,
                createdAt: serverTimestamp(),
                likes: 0,
                commentsCount: 0,
                shareCount: 0
            });
        } catch (err) {
            console.error("Error creating post:", err);
            throw err;
        }
    };

    return { posts, loading, error, createPost };
};
