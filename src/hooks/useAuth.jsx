import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const generateUserCode = () => Math.floor(10000000 + Math.random() * 90000000).toString();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Sync user to Firestore
                const userRef = doc(db, 'users', currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        email: currentUser.email,
                        code: generateUserCode(),
                        createdAt: serverTimestamp(),
                        lastActive: serverTimestamp()
                    });
                } else {
                    await setDoc(userRef, { lastActive: serverTimestamp() }, { merge: true });
                }
                
                // Get the latest data (including the 8-digit code)
                const latestSnap = await getDoc(userRef);
                setUser({ ...currentUser, ...latestSnap.data() });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Login Error:", error.code, error.message);
            if (error.code === 'auth/unauthorized-domain') {
                alert("Error: This domain is not authorized in Firebase. Please add 'hybrid-4yr.pages.dev' to your Firebase Authentication settings > Authorized Domains.");
            } else {
                alert("Login failed: " + error.message);
            }
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        user,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
