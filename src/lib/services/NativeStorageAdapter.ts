import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { get, set, del, keys } from 'idb-keyval';

type StorageBackend = 'indexeddb' | 'preferences';

let cachedBackend: StorageBackend | null = null;
let idbAvailable: boolean | null = null;

async function checkIndexedDBAvailability(): Promise<boolean> {
  if (idbAvailable !== null) return idbAvailable;
  
  try {
    const testKey = '__idb_test__';
    await set(testKey, 'test');
    const result = await get(testKey);
    await del(testKey);
    idbAvailable = result === 'test';
  } catch {
    idbAvailable = false;
  }
  
  return idbAvailable;
}

async function getStorageBackend(): Promise<StorageBackend> {
  if (cachedBackend !== null) return cachedBackend;
  
  const isNative = Capacitor.isNativePlatform();
  const idbWorks = await checkIndexedDBAvailability();
  
  if (idbWorks) {
    cachedBackend = 'indexeddb';
  } else if (isNative) {
    cachedBackend = 'preferences';
    console.warn('[NativeStorageAdapter] IndexedDB unavailable, using Capacitor Preferences');
  } else {
    cachedBackend = 'indexeddb';
    console.error('[NativeStorageAdapter] IndexedDB unavailable on web platform');
  }
  
  return cachedBackend;
}

export const NativeStorageAdapter = {
  async get<T>(key: string): Promise<T | undefined> {
    const backend = await getStorageBackend();
    
    if (backend === 'preferences') {
      const { value } = await Preferences.get({ key });
      if (value === null) return undefined;
      try {
        return JSON.parse(value) as T;
      } catch {
        return undefined;
      }
    }
    
    return get<T>(key);
  },

  async set<T>(key: string, value: T): Promise<void> {
    const backend = await getStorageBackend();
    
    if (backend === 'preferences') {
      await Preferences.set({ key, value: JSON.stringify(value) });
      return;
    }
    
    await set(key, value);
  },

  async remove(key: string): Promise<void> {
    const backend = await getStorageBackend();
    
    if (backend === 'preferences') {
      await Preferences.remove({ key });
      return;
    }
    
    await del(key);
  },

  async keys(): Promise<string[]> {
    const backend = await getStorageBackend();
    
    if (backend === 'preferences') {
      const { keys: prefKeys } = await Preferences.keys();
      return prefKeys;
    }
    
    const idbKeys = await keys();
    return idbKeys.map(k => String(k));
  },

  async migrateToNative(): Promise<{ migrated: string[]; skipped: string[] }> {
    const backend = await getStorageBackend();
    const migrated: string[] = [];
    const skipped: string[] = [];
    
    if (backend !== 'preferences') {
      return { migrated, skipped };
    }
    
    try {
      const idbKeys = await keys();
      
      for (const key of idbKeys) {
        const keyStr = String(key);
        try {
          const value = await get(key);
          if (value !== undefined) {
            const { value: existing } = await Preferences.get({ key: keyStr });
            if (existing === null) {
              await Preferences.set({ key: keyStr, value: JSON.stringify(value) });
              migrated.push(keyStr);
            } else {
              skipped.push(keyStr);
            }
          }
        } catch (err) {
          console.error(`[NativeStorageAdapter] Migration failed for key ${keyStr}:`, err);
          skipped.push(keyStr);
        }
      }
    } catch (err) {
      console.error('[NativeStorageAdapter] Migration failed:', err);
    }
    
    return { migrated, skipped };
  },

  getActiveBackend(): StorageBackend | null {
    return cachedBackend;
  },

  isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  },
};
