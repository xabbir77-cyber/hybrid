import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut 
} from 'firebase/auth';
import { Zap } from 'lucide-react';
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
            try {
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
            } catch (error) {
                console.error("Auth Sync Error:", error);
                // Even if sync fails, set the basic user object so the app can load
                if (currentUser) {
                    setUser(currentUser);
                }
            } finally {
                setLoading(false);
            }
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
            {loading ? (
                <div className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-pulse">
                            <Zap className="text-white fill-white" size={48} />
                        </div>
                        <div className="absolute inset-0 w-24 h-24 bg-cyan-500 rounded-3xl animate-ping opacity-20"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-black tracking-[0.3em] text-white uppercase italic">
                            HYBRID<span className="text-cyan-400">VIEW</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></div>
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mt-8">Initializing Neural OS</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
