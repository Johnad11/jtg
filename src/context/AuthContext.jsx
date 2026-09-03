import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  arrayUnion
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import UsernameModal from '../components/UsernameModal';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [suggestedUsername, setSuggestedUsername] = useState('');

  // Helper to load cached username from localStorage if Firestore has permission restrictions
  const getCachedUsername = (uid) => {
    try {
      return localStorage.getItem(`jtg_username_${uid}`);
    } catch {
      return null;
    }
  };

  const setCachedUsername = (uid, username) => {
    try {
      localStorage.setItem(`jtg_username_${uid}`, username);
    } catch (e) {
      console.warn('Could not cache username to localStorage:', e);
    }
  };

  // Fetch or check user document in Firestore with localStorage fallback
  const fetchUserData = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setUserData(null);
      setShowUsernameModal(false);
      return null;
    }

    const cached = getCachedUsername(firebaseUser.uid);

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        if (data.username) {
          setUserData(data);
          setCachedUsername(firebaseUser.uid, data.username);
          setShowUsernameModal(false);
          return data;
        }
      }
    } catch (err) {
      console.warn('Firestore user lookup restricted or permission denied; using local/auth profile fallback.', err);
    }

    // If cached username exists
    if (cached) {
      const fallbackData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: cached,
        displayName: firebaseUser.displayName || cached
      };
      setUserData(fallbackData);
      setShowUsernameModal(false);
      return fallbackData;
    }

    // User needs to claim a unique username
    setUserData(null);
    const baseSuggestion = (
      firebaseUser.email?.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() ||
      'trader'
    ).slice(0, 15);

    setSuggestedUsername(baseSuggestion);
    setShowUsernameModal(true);
    return null;
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await fetchUserData(currentUser);
        } catch (err) {
          console.error('Error in onAuthStateChanged profile lookup:', err);
        }
      } else {
        setUserData(null);
        setShowUsernameModal(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  // Check username availability
  const checkUsernameAvailable = async (username) => {
    const cleanUsername = username.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      throw new Error('Username can only contain letters, numbers, and underscores.');
    }
    if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      throw new Error('Username must be between 3 and 20 characters.');
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', cleanUsername));
      const querySnapshot = await getDocs(q);

      const isTaken = querySnapshot.docs.some(docSnap => !user || docSnap.id !== user.uid);
      if (isTaken) {
        throw new Error(`@${cleanUsername} is already taken by another trader. Please choose another.`);
      }
    } catch (err) {
      if (err.message && err.message.includes('already taken')) {
        throw err;
      }
      console.warn('Firestore availability query skipped or restricted:', err);
    }

    return true;
  };

  // Google sign in trigger
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const profile = await fetchUserData(result.user);
      return { user: result.user, profile };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Sign Up with verification email
  const signUpWithEmail = async (email, password, desiredUsername) => {
    setLoading(true);
    try {
      let cleanUsername = desiredUsername?.trim().toLowerCase();
      if (cleanUsername) {
        await checkUsernameAvailable(cleanUsername);
      } else {
        cleanUsername = (
          email.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'trader'
        ).slice(0, 15);
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      try {
        await updateProfile(newUser, { displayName: cleanUsername });
      } catch (e) {
        console.warn('Could not update profile display name:', e);
      }

      setCachedUsername(newUser.uid, cleanUsername);

      const newUserData = {
        uid: newUser.uid,
        email: newUser.email || '',
        displayName: cleanUsername,
        photoURL: '',
        username: cleanUsername,
        createdAt: serverTimestamp(),
        journal: {},
        education: {},
        themes: {},
        advisory: {}
      };

      try {
        const userDocRef = doc(db, 'users', newUser.uid);
        await setDoc(userDocRef, newUserData);
      } catch (firestoreErr) {
        console.warn('Firestore write restricted or permission denied; cached profile locally.', firestoreErr);
      }

      try {
        await sendEmailVerification(newUser);
      } catch (verifErr) {
        console.warn('Failed to dispatch email verification link:', verifErr);
      }

      setUser(newUser);
      setUserData(newUserData);
      setShowUsernameModal(false);

      return {
        user: newUser,
        profile: newUserData,
        needsEmailVerification: true
      };
    } catch (error) {
      console.error('Sign Up Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Login
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchUserData(userCredential.user);
      return { user: userCredential.user, profile };
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Resend Email Verification Link
  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new Error('No user is currently signed in to send verification email.');
    }
  };

  // Reload user to check emailVerified status
  const checkEmailVerified = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  // Password reset
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Sign out trigger
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setShowUsernameModal(false);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  };

  // Claim and verify username
  const claimUsername = async (chosenUsername) => {
    if (!user) {
      throw new Error('You must be signed in to claim a username.');
    }

    const cleanUsername = chosenUsername.trim().toLowerCase();
    await checkUsernameAvailable(cleanUsername);

    try {
      await updateProfile(user, { displayName: cleanUsername });
    } catch (e) {
      console.warn('Could not update display name:', e);
    }

    setCachedUsername(user.uid, cleanUsername);

    const newUserData = {
      uid: user.uid,
      email: user.email || '',
      displayName: cleanUsername,
      photoURL: user.photoURL || '',
      username: cleanUsername,
      createdAt: serverTimestamp(),
      journal: {},
      education: {},
      themes: {},
      advisory: {}
    };

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, newUserData);
    } catch (firestoreErr) {
      console.warn('Firestore setDoc restricted or permission denied; cached profile locally.', firestoreErr);
    }

    setUserData(newUserData);
    setShowUsernameModal(false);
    return newUserData;
  };

  // Update Profile & Change Username with Uniqueness & Release of Old Handle
  const updateUserProfile = async (newDisplayName, newDesiredUsername) => {
    if (!user) {
      throw new Error('User must be logged in to update profile.');
    }

    const currentUsername = userData?.username || getCachedUsername(user.uid) || '';
    const cleanNewUsername = newDesiredUsername?.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');

    // If changing username, verify uniqueness and release previous handle
    if (cleanNewUsername && cleanNewUsername !== currentUsername) {
      await checkUsernameAvailable(cleanNewUsername);
    }

    const finalUsername = cleanNewUsername || currentUsername;
    const finalDisplayName = newDisplayName?.trim() || finalUsername;

    // Update Firebase Auth
    try {
      await updateProfile(user, { displayName: finalDisplayName });
    } catch (e) {
      console.warn('Could not update auth displayName:', e);
    }

    // Cache to localStorage
    setCachedUsername(user.uid, finalUsername);

    const updatedData = {
      ...userData,
      uid: user.uid,
      email: user.email || '',
      displayName: finalDisplayName,
      username: finalUsername,
      updatedAt: new Date().toISOString()
    };

    // Update Firestore user document
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          ...updatedData,
          // Track previous username history and release the old handle immediately
          previousUsernames: currentUsername && currentUsername !== finalUsername
            ? arrayUnion({ username: currentUsername, releasedAt: new Date().toISOString() })
            : []
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore updateDoc restricted; updated profile locally.', err);
    }

    setUserData(updatedData);
    return updatedData;
  };

  const value = {
    user,
    userData,
    loading,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    resendVerificationEmail,
    checkEmailVerified,
    resetPassword,
    logout,
    claimUsername,
    updateUserProfile,
    checkUsernameAvailable,
    setShowUsernameModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <UsernameModal
        isOpen={showUsernameModal}
        onSubmit={claimUsername}
        onLogout={logout}
        userEmail={user?.email}
        initialSuggestedUsername={suggestedUsername}
      />
    </AuthContext.Provider>
  );
};

export default AuthContext;
