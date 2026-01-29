import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EntitlementService } from './EntitlementService';

const mockCapacitor = {
  isNativePlatform: vi.fn(() => false),
};

const mockPurchases = {
  configure: vi.fn(),
  getCustomerInfo: vi.fn(),
  getOfferings: vi.fn(),
  purchasePackage: vi.fn(),
  restorePurchases: vi.fn(),
  logIn: vi.fn(),
  logOut: vi.fn(),
};

vi.mock('@capacitor/core', () => ({
  Capacitor: mockCapacitor,
}));

vi.mock('@revenuecat/purchases-capacitor', () => ({
  Purchases: mockPurchases,
}));

const mockCustomerInfo = (premiumActive: boolean, expirationDate?: string) => ({
  customerInfo: {
    entitlements: {
      active: premiumActive ? {
        premium: {
          isActive: true,
          willRenew: true,
          expirationDate: expirationDate ?? null,
        },
      } : {},
    },
    activeSubscriptions: premiumActive ? ['monthly_premium'] : [],
  },
});

describe('RevenueCatService', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    EntitlementService.reset();
    mockCapacitor.isNativePlatform.mockReturnValue(false);
    
    const { RevenueCatService } = await import('./RevenueCatService');
    RevenueCatService._resetForTesting();
  });

  describe('web platform', () => {
    it('should return false when initializing on web', async () => {
      const { RevenueCatService } = await import('./RevenueCatService');
      
      const result = await RevenueCatService.initialize('test_api_key');
      expect(result).toBe(false);
    });

    it('should report not available on web', async () => {
      const { RevenueCatService } = await import('./RevenueCatService');
      
      expect(RevenueCatService.isAvailable()).toBe(false);
    });

    it('should return null for offerings on web', async () => {
      const { RevenueCatService } = await import('./RevenueCatService');
      
      const offerings = await RevenueCatService.getOfferings();
      expect(offerings).toBeNull();
    });
  });

  describe('native platform', () => {
    beforeEach(async () => {
      mockCapacitor.isNativePlatform.mockReturnValue(true);
      
      const { RevenueCatService } = await import('./RevenueCatService');
      RevenueCatService._resetForTesting();
    });

    it('should initialize on native platform', async () => {
      mockPurchases.configure.mockResolvedValue(undefined);
      mockPurchases.getCustomerInfo.mockResolvedValue(mockCustomerInfo(false));

      const { RevenueCatService } = await import('./RevenueCatService');
      
      const result = await RevenueCatService.initialize('test_api_key');
      expect(result).toBe(true);
      expect(mockPurchases.configure).toHaveBeenCalledWith({
        apiKey: 'test_api_key',
        appUserID: undefined,
      });
    });

    it('should sync premium entitlement from customer info', async () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 1);

      mockPurchases.configure.mockResolvedValue(undefined);
      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo(true, futureDate.toISOString())
      );

      const { RevenueCatService } = await import('./RevenueCatService');
      
      await RevenueCatService.initialize('test_api_key');
      expect(EntitlementService.isPremium()).toBe(true);
    });

    it('should handle purchase flow', async () => {
      mockPurchases.configure.mockResolvedValue(undefined);
      mockPurchases.getCustomerInfo.mockResolvedValue(mockCustomerInfo(false));
      mockPurchases.purchasePackage.mockResolvedValue(mockCustomerInfo(true));

      const { RevenueCatService } = await import('./RevenueCatService');
      
      await RevenueCatService.initialize('test_api_key');
      const mockPackage = { identifier: 'monthly' };
      
      const success = await RevenueCatService.purchasePackage(mockPackage);
      expect(success).toBe(true);
      expect(EntitlementService.isPremium()).toBe(true);
    });

    it('should handle restore purchases', async () => {
      mockPurchases.configure.mockResolvedValue(undefined);
      mockPurchases.getCustomerInfo.mockResolvedValue(mockCustomerInfo(false));
      mockPurchases.restorePurchases.mockResolvedValue(mockCustomerInfo(true));

      const { RevenueCatService } = await import('./RevenueCatService');
      
      await RevenueCatService.initialize('test_api_key');
      
      const success = await RevenueCatService.restorePurchases();
      expect(success).toBe(true);
      expect(EntitlementService.isPremium()).toBe(true);
    });
  });
});
