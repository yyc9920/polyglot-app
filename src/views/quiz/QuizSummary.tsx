import { Trophy, Star } from 'lucide-react';
import { FunButton } from '../../components/FunButton';
import useLanguage from '../../hooks/useLanguage';

interface QuizSummaryProps {
  sessionPoints: number;
  onTryAgain: () => void;
  onBackToSetup: () => void;
}

export function QuizSummary({ sessionPoints, onTryAgain, onBackToSetup }: QuizSummaryProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6 p-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 mx-auto animate-bounce">
          <Trophy size={48} />
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {t('quiz.complete')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{t('quiz.greatJob')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-2 border-yellow-100 dark:border-yellow-900 w-full max-w-xs text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{t('settings.totalScore')}</p>
        <div className="text-6xl font-black text-gray-800 dark:text-white mb-2 flex justify-center items-end gap-2">
          {sessionPoints}
          <span className="text-xl font-bold text-gray-400 mb-2">{t('settings.points')}</span>
        </div>
        <div className="flex justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className={i < 3 ? "opacity-100" : "opacity-30"} />)}
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <FunButton 
          onClick={onTryAgain}
          fullWidth
          variant="primary"
        >
          {t('quiz.tryAgain')}
        </FunButton>
        <FunButton 
          onClick={onBackToSetup}
          fullWidth
          variant="neutral"
        >
          {t('quiz.backToSetup')}
        </FunButton>
      </div>
    </div>
  );
}
