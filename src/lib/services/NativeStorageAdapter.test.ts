import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(() => false),
  },
}));

vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
    keys: vi.fn(() => Promise.resolve({ keys: [] })),
  },
}));

vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn(),
  keys: vi.fn(() => Promise.resolve([])),
}));

describe('NativeStorageAdapter', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe('web platform (IndexedDB)', () => {
    it('should use IndexedDB when available on web', async () => {
      const { get, set } = await import('idb-keyval');
      vi.mocked(set).mockResolvedValue(undefined);
      vi.mocked(get).mockResolvedValueOnce('test').mockResolvedValueOnce({ foo: 'bar' });

      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');

      const result = await NativeStorageAdapter.get<{ foo: string }>('testKey');
      expect(result).toEqual({ foo: 'bar' });
      expect(get).toHaveBeenCalledWith('testKey');
    });

    it('should write to IndexedDB on web', async () => {
      const { set, get } = await import('idb-keyval');
      vi.mocked(set).mockResolvedValue(undefined);
      vi.mocked(get).mockResolvedValue('test');

      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');

      await NativeStorageAdapter.set('myKey', { data: 123 });
      expect(set).toHaveBeenCalledWith('myKey', { data: 123 });
    });
  });

  describe('native platform (Preferences fallback)', () => {
    it('should use Preferences when IndexedDB fails on native', async () => {
      const { Capacitor } = await import('@capacitor/core');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);

      const { set } = await import('idb-keyval');
      vi.mocked(set).mockRejectedValue(new Error('IDB not available'));

      const { Preferences } = await import('@capacitor/preferences');
      vi.mocked(Preferences.get).mockResolvedValue({ value: '{"native":"data"}' });

      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');

      const result = await NativeStorageAdapter.get<{ native: string }>('nativeKey');
      expect(result).toEqual({ native: 'data' });
    });

    it('should return undefined for null Preferences value', async () => {
      const { Capacitor } = await import('@capacitor/core');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);

      const { set } = await import('idb-keyval');
      vi.mocked(set).mockRejectedValue(new Error('IDB not available'));

      const { Preferences } = await import('@capacitor/preferences');
      vi.mocked(Preferences.get).mockResolvedValue({ value: null });

      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');

      const result = await NativeStorageAdapter.get('missingKey');
      expect(result).toBeUndefined();
    });
  });

  describe('platform detection', () => {
    it('should correctly report native platform status', async () => {
      const { Capacitor } = await import('@capacitor/core');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);

      const { NativeStorageAdapter } = await import('./NativeStorageAdapter');

      expect(NativeStorageAdapter.isNativePlatform()).toBe(true);
    });
  });
});
