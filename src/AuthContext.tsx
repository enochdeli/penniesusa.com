import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserPreferences } from './types';

interface AuthContextType {
  user: User | null;
  preferences: UserPreferences | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // enockdelicieux24@gmail.com is automatically a super-admin
  const isAdmin = user?.email === 'enockdelicieux24@gmail.com' || !!preferences?.isAdmin;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user preferences
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPreferences(docSnap.data() as UserPreferences);
        } else {
          // Create initial user doc
          const initialData = {
            userId: currentUser.uid,
            email: currentUser.email || 'unknown@example.com',
            baseCurrency: 'USD',
            updatedAt: new Date().toISOString()
          };
          await setDoc(docRef, initialData);
          setPreferences(initialData);
        }
      } else {
        setPreferences(null);
      }
      setIsAuthReady(true);
    });

    return unsubscribe;
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
      closeAuthModal();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.warn('Sign-in popup was closed before completion.');
        return;
      }
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updatePreferences = async (newPrefs: Partial<UserPreferences>) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      let updatedData = { ...preferences, ...newPrefs, updatedAt: new Date().toISOString() };
      
      if (newPrefs.searchHistory) {
         let history = [...(preferences?.searchHistory || []), ...newPrefs.searchHistory];
         history = Array.from(new Set(history));
         updatedData.searchHistory = history;
      }
      
      await setDoc(docRef, updatedData, { merge: true });
      setPreferences(updatedData as UserPreferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  const value = React.useMemo(() => ({ 
    user, 
    preferences, 
    isAuthReady, 
    isAdmin, 
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle, 
    logOut, 
    updatePreferences 
  }), [user, preferences, isAuthReady, isAdmin, isAuthModalOpen]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
