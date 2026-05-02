import { useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchUsers = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const usersRef = collection(db, 'users');
            
            // Basic search logic: searching by code (#) or name
            let q;
            if (searchTerm.startsWith('#')) {
                const code = searchTerm.substring(1);
                q = query(usersRef, where('code', '==', code), limit(5));
            } else {
                // Firestore doesn't support full-text search natively without third-party.
                // We'll use a simple "starts with" for names.
                q = query(usersRef, 
                    where('displayName', '>=', searchTerm), 
                    where('displayName', '<=', searchTerm + '\uf8ff'), 
                    limit(10)
                );
            }

            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResults(users);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { results, searchUsers, loading };
};
