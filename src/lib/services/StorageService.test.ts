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

    it('should include schemaVersion in Firestore payload', async () => {
      const TEST_VERSION = 3;
      // Mock doc() to return a predictable reference so we can verify setDoc calls correctly
      const mockDocRef = { id: 'mock-doc-ref' };
      vi.mocked(doc).mockReturnValue(mockDocRef as any);
      
      await StorageService.writeToCloud(USER_ID, TEST_KEY, TEST_VAL, TEST_VERSION);
      
      expect(setDoc).toHaveBeenCalledWith(
        mockDocRef,
        expect.objectContaining({
          value: TEST_VAL,
          schemaVersion: TEST_VERSION
        }),
        expect.anything()
      );
    });
  });

  describe('subscribeToCloud', () => {
    it('should return unsubscribe function', () => {
      const unsub = StorageService.subscribeToCloud(USER_ID, TEST_KEY, () => {});
      expect(typeof unsub).toBe('function');
      expect(onSnapshot).toHaveBeenCalled();
    });

    it('should pass schemaVersion to callback', () => {
      const mockOnSnapshot = vi.mocked(onSnapshot);
      const callback = vi.fn();
      
      // Simulate Firestore calling the callback
      mockOnSnapshot.mockImplementation((_ref, cb) => {
        const mockSnap = {
          exists: () => true,
          data: () => ({ value: TEST_VAL, schemaVersion: 5 })
        };
        // @ts-ignore - mock implementation
        cb(mockSnap);
        return () => {};
      });

      StorageService.subscribeToCloud(USER_ID, TEST_KEY, callback);
      
      expect(callback).toHaveBeenCalledWith(TEST_VAL, { schemaVersion: 5 });
    });

    it('should default schemaVersion to 1 if missing', () => {
      const mockOnSnapshot = vi.mocked(onSnapshot);
      const callback = vi.fn();
      
      mockOnSnapshot.mockImplementation((_ref, cb) => {
        const mockSnap = {
          exists: () => true,
          data: () => ({ value: TEST_VAL }) // No schemaVersion
        };
        // @ts-ignore - mock implementation
        cb(mockSnap);
        return () => {};
      });

      StorageService.subscribeToCloud(USER_ID, TEST_KEY, callback);
      
      expect(callback).toHaveBeenCalledWith(TEST_VAL, { schemaVersion: 1 });
    });
  });
});
