import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { get, set } from 'idb-keyval';
import { app } from '../firebase';
import { addToRetryQueue } from '../sync';

const db = getFirestore(app);

export const StorageService = {
  /**
   * Reads value from local storage (IndexedDB).
   * Also handles legacy migration from localStorage -> IndexedDB.
   */
  async readLocal<T>(key: string): Promise<T | undefined> {
    try {
      // 1. Check legacy localStorage first
      if (typeof window !== 'undefined') {
        const lsItem = localStorage.getItem(key);
        if (lsItem) {
          try {
            const parsed = JSON.parse(lsItem);
            await set(key, parsed);
            localStorage.removeItem(key);
            return parsed as T;
          } catch (e) {
            console.error(`Error parsing localStorage for key ${key}:`, e);
          }
        }
      }

      // 2. Read from IndexedDB
      const val = await get<T>(key);
      return val;
    } catch (error) {
      console.error(`Error reading from local storage for key ${key}:`, error);
      return undefined;
    }
  },

  /**
   * Writes value to local storage (IndexedDB).
   */
  async writeLocal<T>(key: string, value: T): Promise<void> {
    try {
      await set(key, value);
    } catch (error) {
      console.error(`Error writing to IDB for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Subscribes to Cloud Firestore updates.
   * Returns an unsubscribe function.
   */
  subscribeToCloud<T>(
    userId: string,
    key: string,
    onData: (data: T) => void,
    onError?: (error: Error) => void
  ): () => void {
    if (!userId || !key) return () => {};

    const docRef = doc(db, 'users', userId, 'data', key);
    
    return onSnapshot(docRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // but we just pass the 'value' field to the callback
          if (data && data.value !== undefined) {
            onData(data.value as T);
          }
        }
      },
      (error) => {
        console.error(`Firestore subscription error for key ${key}:`, error);
        if (onError) onError(error);
      }
    );
  },

  /**
   * Writes value to Cloud Firestore.
   * Handles retry queue on failure.
   */
  async writeToCloud<T>(userId: string, key: string, value: T): Promise<void> {
    if (!userId || !key) return;

    try {
      const docRef = doc(db, 'users', userId, 'data', key);
      await setDoc(docRef, { 
        value, 
        updatedAt: new Date().toISOString() 
      }, { merge: true });
    } catch (err) {
      console.error(`Error saving to cloud for key ${key}:`, err);
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      await addToRetryQueue(key, value, errorMsg);
      throw err;
    }
  }
};
