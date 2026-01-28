import { Package, Check, ShoppingCart, Globe } from 'lucide-react';
import { usePhraseAppContext } from '../context/PhraseContext';
import useLanguage, { LANGUAGE_NAMES, type Language } from '../hooks/useLanguage';
import { useDialog } from '../context/DialogContext';
import { type LanguageCode } from '../data/phraseDictionary';

export function StarterPackageSelection() {
  const { purchasedPackages,addStarterPackage } = usePhraseAppContext();
  const { t } = useLanguage();
  const { confirm } = useDialog();
  
  // TODO: Get current source language from somewhere if needed, currently hardcoded to 'en' or we can add a selector later.
  // For now, let's assume the user wants to learn a new language FROM English, or we can use the app's current language.
  // But wait, useLanguage hook provides the app's interface language.
  // Ideally, 'Meaning' on the card should be in the user's native language.
  
  const handlePurchase = async (langCode: string) => {
    // Mock payment flow
    const confirmed = await confirm({
      title: t('common.confirm'),
      message: t('packages.purchaseConfirm').replace('{{lang}}', LANGUAGE_NAMES[langCode as Language])
    });
    if (confirmed) {
      addStarterPackage(langCode as LanguageCode, 'en'); // Defaulting source to English for now
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="text-purple-500" size={24} />
        <h2 className="text-xl font-bold">{t('packages.title')}</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {t('packages.description')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.keys(LANGUAGE_NAMES) as Language[]).map((code) => {
          const isPurchased = purchasedPackages.includes(`starter_${code}`);
          
          return (
            <div 
              key={code} 
              className={`
                relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between
                ${isPurchased 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-md bg-white dark:bg-gray-800'
                }
              `}
              onClick={() => !isPurchased && handlePurchase(code)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isPurchased ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                  <Globe size={20} />
                </div>
                <div>
                  <div className="font-bold">{LANGUAGE_NAMES[code]}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isPurchased ? t('packages.purchased') : '.99'}
                  </div>
                </div>
              </div>

              {isPurchased ? (
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check size={16} />
                </div>
              ) : (
                <div className="text-purple-500">
                  <ShoppingCart size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
