import { useState } from 'react';
import { Activity, Filter, Check, X, Trophy, PlayCircle } from 'lucide-react';
import { usePhraseAppContext } from '../../context/PhraseContext';
import { FunButton } from '../../components/FunButton';
import useLanguage from '../../hooks/useLanguage';

export function LearningProgressSection() {
  const { phraseList, status, setReviewMode, setCurrentView } = usePhraseAppContext();
  const { t } = useLanguage();
  
  // Progress Filter
  const [progressFilterTag, setProgressFilterTag] = useState('All');

  // Filtered Stats
  const allTags = ['All', ...Array.from(new Set(phraseList.flatMap(v => v.tags)))];
  
  const filteredList = progressFilterTag === 'All' 
    ? phraseList 
    : phraseList.filter(v => v.tags.includes(progressFilterTag));
    
  const filteredTotalCount = filteredList.length;
  const filteredCompleted = filteredList.filter(v => status.completedIds.includes(v.id)).length;
  const filteredIncorrect = filteredList.filter(v => status.incorrectIds.includes(v.id)).length;
  const progressPercent = filteredTotalCount > 0 ? (filteredCompleted / filteredTotalCount) * 100 : 0;
  const formattedProgress = progressPercent.toFixed(2);

  const handleStartReview = () => {
    setReviewMode(true);
    setCurrentView('learn');
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Activity className="text-blue-500" /> {t('settings.learningProgress')}
        </h3>
        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400"/>
          <select 
            value={progressFilterTag} 
            onChange={(e) => setProgressFilterTag(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 py-1"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'All' ? t('common.all') : tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-4">
        <div className="relative w-24 h-24 flex items-center justify-center flex-none">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-700" />
            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * progressPercent) / 100} className="text-blue-500 transition-all duration-1000 ease-out" />
          </svg>
          <span className="absolute text-xl font-bold text-gray-700 dark:text-gray-200">{formattedProgress}%</span>
        </div>
        
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1"><Check size={14} className="text-green-500"/> {t('settings.completed')}</span>
            <span className="font-bold text-gray-800 dark:text-gray-100">{filteredCompleted}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: `${filteredTotalCount > 0 ? (filteredCompleted / filteredTotalCount) * 100 : 0}%` }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1"><X size={14} className="text-red-500"/> {t('settings.toReview')}</span>
            <span className="font-bold text-gray-800 dark:text-gray-100">{filteredIncorrect}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${filteredTotalCount > 0 ? (filteredIncorrect / filteredTotalCount) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      <FunButton 
        onClick={handleStartReview}
        disabled={filteredIncorrect === 0}
        fullWidth
        variant="danger"
        className="flex items-center justify-center gap-2"
      >
        <PlayCircle size={20} />
        {t('settings.startReviewSession')} ({filteredIncorrect} {t('settings.items')})
      </FunButton>

      <p className="text-center text-sm text-gray-400 mt-2">
        {progressFilterTag === 'All' ? `${t('settings.totalPhrases')}: ${filteredTotalCount}` : `${t('settings.phrasesInTag').replace('{{tag}}', progressFilterTag)}: ${filteredTotalCount}`}
      </p>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50 flex flex-col items-center">
        <div className="flex items-center gap-3 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-6 py-3 rounded-2xl border border-yellow-200 dark:border-yellow-800 shadow-sm transition-transform hover:scale-105">
          <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-xl">
            <Trophy size={24} className="fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 leading-none mb-1">{t('settings.totalScore')}</span>
            <span className="font-black text-2xl leading-none">{status.points || 0} <span className="text-sm font-bold opacity-60">{t('settings.points')}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
