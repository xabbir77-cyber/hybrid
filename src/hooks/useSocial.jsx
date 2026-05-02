import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    where, 
    onSnapshot, 
    doc, 
    setDoc, 
    deleteDoc, 
    getDocs,
    serverTimestamp,
    addDoc
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth';

export const useSocial = () => {
    const { user } = useAuth();
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        // 1. Fetch Friend List
        const friendsRef = collection(db, 'users', user.uid, 'friends');
        const unsubscribeFriends = onSnapshot(friendsRef, async (snapshot) => {
            const friendIds = snapshot.docs.map(doc => doc.id);
            if (friendIds.length === 0) {
                setFriends([]);
                return;
            }

            // Fetch actual user data for each friend
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', 'in', friendIds));
            const userSnapshot = await getDocs(q);
            const friendData = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                isOnline: (Date.now() - doc.data().lastActive?.toDate()) < 300000 // 5 mins
            }));
            setFriends(friendData);
        });

        // 2. Fetch Pending Requests
        const requestsRef = collection(db, 'users', user.uid, 'friendRequests');
        const unsubscribeRequests = onSnapshot(requestsRef, (snapshot) => {
            const reqs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRequests(reqs);
        });

        // 3. Suggestions (Simplistic: Random users not in friends)
        const fetchSuggestions = async () => {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', '!=', user.uid));
            const snapshot = await getDocs(q);
            const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const currentFriendIds = friends.map(f => f.uid);
            const filtered = allUsers.filter(u => !currentFriendIds.includes(u.uid)).slice(0, 5);
            setSuggestions(filtered);
            setLoading(false);
        };
        fetchSuggestions();

        return () => {
            unsubscribeFriends();
            unsubscribeRequests();
        };
    }, [user]);

    const sendRequest = async (targetUserId, targetUserData) => {
        if (!user) return;
        const requestRef = doc(db, 'users', targetUserId, 'friendRequests', user.uid);
        await setDoc(requestRef, {
            fromId: user.uid,
            fromName: user.displayName,
            fromAvatar: user.photoURL,
            fromCode: user.code,
            createdAt: serverTimestamp()
        });

        // Add notification for target user
        const notifRef = collection(db, 'users', targetUserId, 'notifications');
        await addDoc(notifRef, {
            type: 'friend_request',
            fromId: user.uid,
            fromName: user.displayName,
            text: 'sent you a friend request.',
            read: false,
            createdAt: serverTimestamp()
        });
    };

    const acceptRequest = async (requesterId, requesterData) => {
        if (!user) return;
        
        // Add to my friends
        await setDoc(doc(db, 'users', user.uid, 'friends', requesterId), {
            uid: requesterId,
            addedAt: serverTimestamp()
        });

        // Add to requester's friends
        await setDoc(doc(db, 'users', requesterId, 'friends', user.uid), {
            uid: user.uid,
            addedAt: serverTimestamp()
        });

        // Delete request
        await deleteDoc(doc(db, 'users', user.uid, 'friendRequests', requesterId));

        // Notify requester
        const notifRef = collection(db, 'users', requesterId, 'notifications');
        await addDoc(notifRef, {
            type: 'request_accepted',
            fromId: user.uid,
            fromName: user.displayName,
            text: 'accepted your friend request.',
            read: false,
            createdAt: serverTimestamp()
        });
    };

    const deleteRequest = async (requesterId) => {
        if (!user) return;
        await deleteDoc(doc(db, 'users', user.uid, 'friendRequests', requesterId));
    };

    return { 
        friends, 
        requests, 
        suggestions, 
        loading, 
        sendRequest, 
        acceptRequest, 
        deleteRequest 
    };
};
