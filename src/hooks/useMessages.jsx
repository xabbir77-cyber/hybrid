import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    serverTimestamp,
    doc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth';

export const useMessages = (activeConversationId) => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Conversations
    useEffect(() => {
        if (!user) return;

        const convRef = collection(db, 'conversations');
        const q = query(convRef, where('participants', 'array-contains', user.uid), orderBy('lastMessageAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setConversations(fetched);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // 2. Fetch Messages for Active Conversation
    useEffect(() => {
        if (!user || !activeConversationId) {
            setMessages([]);
            return;
        }

        const msgRef = collection(db, 'conversations', activeConversationId, 'messages');
        const q = query(msgRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetched);
        });

        return () => unsubscribe();
    }, [user, activeConversationId]);

    const sendMessage = async (text, type = 'text', metadata = {}) => {
        if (!user || !activeConversationId) return;

        const msgData = {
            text,
            type,
            senderId: user.uid,
            senderName: user.displayName,
            senderAvatar: user.photoURL,
            createdAt: serverTimestamp(),
            metadata: {
                ...metadata,
                ai_summary: `Synthesizing transmission: "${text.substring(0, 15)}..."`
            }
        };

        // Add to messages subcollection
        await addDoc(collection(db, 'conversations', activeConversationId, 'messages'), msgData);

        // Update conversation last message
        const convRef = doc(db, 'conversations', activeConversationId);
        await updateDoc(convRef, {
            lastMessage: text,
            lastMessageAt: serverTimestamp(),
            lastSenderId: user.uid
        });
    };

    const startConversation = async (participantId, participantData) => {
        if (!user) return;

        // Check if conversation already exists (simplistic check)
        const existing = conversations.find(c => c.participants.includes(participantId));
        if (existing) return existing.id;

        // Create new
        const newConv = await addDoc(collection(db, 'conversations'), {
            participants: [user.uid, participantId],
            participantData: {
                [user.uid]: { name: user.displayName, avatar: user.photoURL },
                [participantId]: { name: participantData.name, avatar: participantData.avatar }
            },
            lastMessage: '',
            lastMessageAt: serverTimestamp(),
            focusMode: false,
            createdAt: serverTimestamp()
        });

        return newConv.id;
    };

    const toggleFocus = async (conversationId, state) => {
        const convRef = doc(db, 'conversations', conversationId);
        await updateDoc(convRef, { focusMode: state });
    };

    const translateMessage = async (messageId, targetLang = 'en') => {
        // In a real app, you'd call a Cloud Function or translation API
        console.log(`Translating message ${messageId} to ${targetLang}`);
        return "Translated message placeholder";
    };

    return { 
        conversations, 
        messages, 
        loading, 
        sendMessage, 
        startConversation,
        toggleFocus,
        translateMessage
    };
};
