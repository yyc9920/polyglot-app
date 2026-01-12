import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../lib/firebase';

const db = getFirestore(app);

function useCloudStorage<T>(
  key: string,
  initialValue: T | (() => T),
  transform?: (value: T) => T
): [T, Dispatch<SetStateAction<T>>] {
  const { user } = useAuth();
  
  // 1. Initialize state from LocalStorage first (for offline/guest support)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      let value: T;
      if (item) {
        value = JSON.parse(item);
      } else {
        value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      }
      return transform ? transform(value) : value;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      const value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      return transform ? transform(value) : value;
    }
  });

  // 2. Sync to/from Cloud Firestore when User is logged in
  useEffect(() => {
    if (!user) {
        return;
    }

    const docRef = doc(db, 'users', user.uid, 'data', key);

    // Initial Fetch (Pull from Cloud) & Realtime Listener
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && data.value !== undefined) {
                 setStoredValue(prev => {
                     // Only update if different to avoid loops/re-renders
                     if (JSON.stringify(prev) !== JSON.stringify(data.value)) {
                         return transform ? transform(data.value) : data.value;
                     }
                     return prev;
                 });
            }
        }
    });

    return () => unsubscribe();
  }, [user, key]);


  // 3. Persist changes to LocalStorage AND Cloud (if logged in)
  useEffect(() => {
    // Always save to LocalStorage (as cache/backup)
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }

    // If logged in, save to Firestore
    if (user) {
        const saveToCloud = async () => {
            try {
                const docRef = doc(db, 'users', user.uid, 'data', key);
                await setDoc(docRef, { value: storedValue, updatedAt: new Date().toISOString() }, { merge: true });
            } catch (err) {
                console.error("Error saving to cloud:", err);
            }
        };
        
        // Debounce could be added here for performance
        const timeoutId = setTimeout(saveToCloud, 1000); 
        return () => clearTimeout(timeoutId);
    }

  }, [key, storedValue, user]);

  return [storedValue, setStoredValue];
}

export default useCloudStorage;
