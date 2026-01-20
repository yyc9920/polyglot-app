import { Search, X, Shuffle, BookOpen, Grid as GridIcon, List as ListIcon } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

interface LearnHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isShuffled: boolean;
  setIsShuffled: (shuffled: boolean) => void;
  viewMode: 'card' | 'list';
  setViewMode: (mode: 'card' | 'list') => void;
  onToggleMemoList: () => void;
}

export function LearnHeader({
  searchTerm,
  setSearchTerm,
  isShuffled,
  setIsShuffled,
  viewMode,
  setViewMode,
  onToggleMemoList
}: LearnHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 relative min-w-0">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder={t('learn.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-7 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
          >
            <X size={12} />
          </button>
        )}
      </div>
      
      <div className="flex gap-1 flex-none">
        <button 
          onClick={() => setIsShuffled(!isShuffled)}
          className={`p-2 rounded-lg transition-colors ${isShuffled ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}
          title={t('learn.shuffle')}
          type="button"
        >
          <Shuffle size={18} />
        </button>
        <div className="w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>
        
        <button 
          onClick={onToggleMemoList}
          className={`p-2 rounded-lg transition-colors text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20`}
          title={t('learn.memoList')}
          type="button"
        >
          <BookOpen size={18} />
        </button>

        <button 
          onClick={() => setViewMode('card')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}
          title={t('learn.cardView')}
          type="button"
        >
          <GridIcon size={18} />
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}
          title={t('learn.listView')}
          type="button"
        >
          <ListIcon size={18} />
        </button>
      </div>
    </div>
  );
}
