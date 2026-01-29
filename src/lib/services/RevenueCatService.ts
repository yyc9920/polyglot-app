import { Capacitor } from '@capacitor/core';
import { EntitlementService } from './EntitlementService';

type CustomerInfo = {
  entitlements: {
    active: Record<string, {
      isActive: boolean;
      willRenew: boolean;
      expirationDate: string | null;
    }>;
  };
  activeSubscriptions: string[];
};

type PurchasesType = {
  configure: (options: { apiKey: string; appUserID?: string }) => Promise<void>;
  getCustomerInfo: () => Promise<{ customerInfo: CustomerInfo }>;
  getOfferings: () => Promise<{ current: { availablePackages: unknown[] } | null }>;
  purchasePackage: (options: { aPackage: unknown }) => Promise<{ customerInfo: CustomerInfo }>;
  restorePurchases: () => Promise<{ customerInfo: CustomerInfo }>;
  logIn: (options: { appUserID: string }) => Promise<{ customerInfo: CustomerInfo }>;
  logOut: () => Promise<{ customerInfo: CustomerInfo }>;
};

const PREMIUM_ENTITLEMENT_ID = 'premium';

let purchasesInstance: PurchasesType | null = null;
let isInitialized = false;

async function getPurchases(): Promise<PurchasesType | null> {
  if (!Capacitor.isNativePlatform()) {
    return null;
  }
  
  if (!purchasesInstance) {
    try {
      const { Purchases } = await import('@revenuecat/purchases-capacitor');
      purchasesInstance = Purchases as unknown as PurchasesType;
    } catch (error) {
      console.error('[RevenueCat] Failed to import:', error);
      return null;
    }
  }
  
  return purchasesInstance;
}

function syncEntitlementFromCustomerInfo(customerInfo: CustomerInfo): void {
  const premiumEntitlement = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
  
  if (premiumEntitlement?.isActive) {
    EntitlementService.setEntitlement(
      'premium',
      premiumEntitlement.expirationDate ?? undefined
    );
  } else {
    EntitlementService.setEntitlement('free');
  }
}

export const RevenueCatService = {
  async initialize(apiKey: string, appUserID?: string): Promise<boolean> {
    if (isInitialized) return true;
    
    const purchases = await getPurchases();
    if (!purchases) {
      console.warn('[RevenueCat] Not available on web platform');
      return false;
    }
    
    try {
      await purchases.configure({ apiKey, appUserID });
      isInitialized = true;
      
      await this.syncEntitlements();
      return true;
    } catch (error) {
      console.error('[RevenueCat] Initialization failed:', error);
      return false;
    }
  },

  async syncEntitlements(): Promise<void> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return;
    
    try {
      const { customerInfo } = await purchases.getCustomerInfo();
      syncEntitlementFromCustomerInfo(customerInfo);
    } catch (error) {
      console.error('[RevenueCat] Failed to sync entitlements:', error);
    }
  },

  async getOfferings(): Promise<unknown[] | null> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return null;
    
    try {
      const offerings = await purchases.getOfferings();
      return offerings.current?.availablePackages ?? null;
    } catch (error) {
      console.error('[RevenueCat] Failed to get offerings:', error);
      return null;
    }
  },

  async purchasePackage(aPackage: unknown): Promise<boolean> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return false;
    
    try {
      const { customerInfo } = await purchases.purchasePackage({ aPackage });
      syncEntitlementFromCustomerInfo(customerInfo);
      return true;
    } catch (error) {
      console.error('[RevenueCat] Purchase failed:', error);
      return false;
    }
  },

  async restorePurchases(): Promise<boolean> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return false;
    
    try {
      const { customerInfo } = await purchases.restorePurchases();
      syncEntitlementFromCustomerInfo(customerInfo);
      return true;
    } catch (error) {
      console.error('[RevenueCat] Restore failed:', error);
      return false;
    }
  },

  async loginUser(appUserID: string): Promise<void> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return;
    
    try {
      const { customerInfo } = await purchases.logIn({ appUserID });
      syncEntitlementFromCustomerInfo(customerInfo);
    } catch (error) {
      console.error('[RevenueCat] Login failed:', error);
    }
  },

  async logoutUser(): Promise<void> {
    const purchases = await getPurchases();
    if (!purchases || !isInitialized) return;
    
    try {
      const { customerInfo } = await purchases.logOut();
      syncEntitlementFromCustomerInfo(customerInfo);
    } catch (error) {
      console.error('[RevenueCat] Logout failed:', error);
    }
  },

  isAvailable(): boolean {
    return Capacitor.isNativePlatform();
  },

  isInitialized(): boolean {
    return isInitialized;
  },

  _resetForTesting(): void {
    isInitialized = false;
    purchasesInstance = null;
  },
};
