import { Search, AlertCircle } from 'lucide-react';
import { FunButton } from '../../components/FunButton';
import useLanguage from '../../hooks/useLanguage';

interface EmptyStateProps {
  reviewMode: boolean;
  onExitReviewMode: () => void;
  searchTerm?: string;
  hasTags?: boolean;
  hasMemos?: boolean;
}

export function EmptyState({ reviewMode, onExitReviewMode, searchTerm }: EmptyStateProps) {
  const { t } = useLanguage();

  if (reviewMode) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
        <p>{t('learn.noReviewItems')}</p>
        <FunButton onClick={onExitReviewMode} variant="primary">
          {t('learn.backToLearnMode')}
        </FunButton>
      </div>
    );
  }

  if (searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
        <Search size={48} className="mb-2 opacity-20" />
        <p>{t('learn.noResultsForSearch').replace('{{searchTerm}}', searchTerm)}</p>
      </div>
    );
  }

  // General empty state
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <p>{t('learn.noDataToDisplay')}</p>
      <p className="text-sm mt-2">{t('learn.addDataInBuilder')}</p>
    </div>
  );
}

export function ReviewModeBanner({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex-none bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-xl text-sm font-bold flex items-center justify-between">
      <span className="flex items-center gap-2"><AlertCircle size={16}/> {t('learn.reviewSessionActive')}</span>
      <button onClick={onExit} className="text-xs underline">{t('learn.exit')}</button>
    </div>
  );
}
