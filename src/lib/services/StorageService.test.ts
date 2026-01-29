import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StorageService } from './StorageService';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

vi.mock('./NativeStorageAdapter', () => ({
  NativeStorageAdapter: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
    keys: vi.fn(() => Promise.resolve([])),
  },
}));

describe('StorageService', () => {
  const TEST_KEY = 'test-key';
  const TEST_VAL = { foo: 'bar' };
  const USER_ID = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('readLocal', () => {
    it('should read from NativeStorageAdapter', async () => {
      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');
      vi.mocked(NativeStorageAdapter.get).mockResolvedValueOnce(TEST_VAL);

      const result = await StorageService.readLocal(TEST_KEY);
      expect(NativeStorageAdapter.get).toHaveBeenCalledWith(TEST_KEY);
      expect(result).toEqual(TEST_VAL);
    });

    it('should migrate from localStorage if storage is empty', async () => {
      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');
      vi.mocked(NativeStorageAdapter.get).mockResolvedValueOnce(undefined);
      vi.mocked(NativeStorageAdapter.set).mockResolvedValueOnce(undefined);
      localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VAL));

      const result = await StorageService.readLocal(TEST_KEY);

      expect(result).toEqual(TEST_VAL);
      expect(NativeStorageAdapter.set).toHaveBeenCalledWith(TEST_KEY, TEST_VAL);
      expect(localStorage.getItem(TEST_KEY)).toBeNull();
    });

    it('should return undefined if both are empty', async () => {
      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');
      vi.mocked(NativeStorageAdapter.get).mockResolvedValueOnce(undefined);
      const result = await StorageService.readLocal(TEST_KEY);
      expect(result).toBeUndefined();
    });
  });

  describe('writeLocal', () => {
    it('should write to NativeStorageAdapter', async () => {
      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');
      vi.mocked(NativeStorageAdapter.set).mockResolvedValueOnce(undefined);

      await StorageService.writeLocal(TEST_KEY, TEST_VAL);
      expect(NativeStorageAdapter.set).toHaveBeenCalledWith(TEST_KEY, TEST_VAL);
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
