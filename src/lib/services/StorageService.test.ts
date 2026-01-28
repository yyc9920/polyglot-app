import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StorageService } from './StorageService';
import * as idb from 'idb-keyval';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// idb-keyval is mocked in setupTests, but we can spy on it
// firebase/firestore is also mocked

describe('StorageService', () => {
  const TEST_KEY = 'test-key';
  const TEST_VAL = { foo: 'bar' };
  const USER_ID = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('readLocal', () => {
    it('should read from IndexedDB', async () => {
      vi.mocked(idb.get).mockResolvedValueOnce(TEST_VAL);

      const result = await StorageService.readLocal(TEST_KEY);
      expect(idb.get).toHaveBeenCalledWith(TEST_KEY);
      expect(result).toEqual(TEST_VAL);
    });

    it('should migrate from localStorage if IDB is empty', async () => {
      // Setup: IDB returns undefined, localStorage has value
      vi.mocked(idb.get).mockResolvedValueOnce(undefined);
      localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VAL));

      const result = await StorageService.readLocal(TEST_KEY);

      // Verify migration
      expect(result).toEqual(TEST_VAL);
      expect(idb.set).toHaveBeenCalledWith(TEST_KEY, TEST_VAL);
      expect(localStorage.getItem(TEST_KEY)).toBeNull(); // Should be removed
    });

    it('should return undefined if both are empty', async () => {
      vi.mocked(idb.get).mockResolvedValueOnce(undefined);
      const result = await StorageService.readLocal(TEST_KEY);
      expect(result).toBeUndefined();
    });
  });

  describe('writeLocal', () => {
    it('should write to IndexedDB', async () => {
      await StorageService.writeLocal(TEST_KEY, TEST_VAL);
      expect(idb.set).toHaveBeenCalledWith(TEST_KEY, TEST_VAL);
    });
  });

  describe('writeToCloud', () => {
    it('should write to Firestore', async () => {
      await StorageService.writeToCloud(USER_ID, TEST_KEY, TEST_VAL);

      expect(doc).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalled();
    });

    it('should queue retry on failure', async () => {
       const error = new Error('Network error');
       vi.mocked(setDoc).mockRejectedValueOnce(error);
       
       // The service re-throws the error
       await expect(StorageService.writeToCloud(USER_ID, TEST_KEY, TEST_VAL))
         .rejects.toThrow('Network error');
    });
  });

  describe('subscribeToCloud', () => {
    it('should return unsubscribe function', () => {
      const unsub = StorageService.subscribeToCloud(USER_ID, TEST_KEY, () => {});
      expect(typeof unsub).toBe('function');
      expect(onSnapshot).toHaveBeenCalled();
    });
  });
});
