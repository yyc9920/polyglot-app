import { useState } from 'react';
import { Settings, HelpCircle, Key, Eye, EyeOff, ExternalLink, X } from 'lucide-react';
import { usePhraseAppContext } from '../../context/PhraseContext';
import { FunButton } from '../../components/FunButton';
import useLanguage from '../../hooks/useLanguage';

export function AiConfigSection() {
  const { apiKey, setApiKey } = usePhraseAppContext();
  const { t } = useLanguage();
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAPIKeyGuide, setShowAPIKeyGuide] = useState(false);

  return (
    <>
      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Settings className="text-purple-500" /> {t('settings.aiConfiguration')}
          </h3>
          <button 
            onClick={() => setShowAPIKeyGuide(true)}
            className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
            title={t('settings.apiKeySetupGuide')}
          >
            <HelpCircle size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('settings.googleGeminiApiKey')}</label>
            <a 
              href="https://aistudio.google.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1 font-medium"
            >
              {t('settings.getApiKey')} <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex gap-2 relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type={showApiKey ? "text" : "password"}
              placeholder={t('settings.apiKeyPlaceholder')}
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 pl-10 pr-10 p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button 
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          {t('settings.apiKeyStoredLocally')}
        </p>
      </section>

      {/* API Key Guide Modal */}
      {showAPIKeyGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Key size={20} className="text-purple-500" /> {t('settings.apiKeyGuideTitle')}
              </h4>
              <button onClick={() => setShowAPIKeyGuide(false)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3">
                <h5 className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  {t('settings.geminiApiTitle')}
                </h5>
                <ol className="text-sm text-gray-600 dark:text-gray-300 list-decimal pl-4 space-y-2">
                  <li><a href="https://aistudio.google.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">{t('settings.geminiApiStep1')} <ExternalLink size={12}/></a></li>
                  <li>{t('settings.geminiApiStep2')}</li>
                  <li>{t('settings.geminiApiStep3')}</li>
                  <li>{t('settings.geminiApiStep4')}</li>
                </ol>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 flex justify-end">
              <FunButton onClick={() => setShowAPIKeyGuide(false)} variant="primary" className="px-6">{t('common.gotIt')}</FunButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
