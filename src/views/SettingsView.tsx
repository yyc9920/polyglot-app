import { useState } from 'react';
import { LoginModal } from '../components/LoginModal';
import useLanguage from '../hooks/useLanguage';
import { StarterPackageSelection } from '../components/StarterPackageSelection';
import { UserProfileSection } from './settings/UserProfileSection';
import { LearningProgressSection } from './settings/LearningProgressSection';
import { ContentSourcesSection } from './settings/ContentSourcesSection';
import { AiConfigSection } from './settings/AiConfigSection';
import { TtsVoiceSection } from './settings/TtsVoiceSection';
import { DataManagementSection } from './settings/DataManagementSection';

export function SettingsView() {
  const { language, changeLanguage, LANGUAGE_NAMES, t } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto p-1">

      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100 mb-4">
          {t('settings.account')}
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('settings.language')}</label>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </section>
      
      <UserProfileSection onShowLoginModal={() => setShowLoginModal(true)} />

      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <StarterPackageSelection />
      </section>

      <LearningProgressSection />

      <ContentSourcesSection />

      <AiConfigSection />

      <TtsVoiceSection />

      <DataManagementSection />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

    </div>
  );
}
