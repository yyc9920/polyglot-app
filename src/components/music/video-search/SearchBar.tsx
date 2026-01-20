import { Search, Loader2, ListMusic } from 'lucide-react';
import { FunButton } from '../../FunButton';
import useLanguage from '../../../hooks/useLanguage';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  searchStep: 'playlist' | 'song' | 'video';
  onSearch: (e: React.FormEvent) => void;
  onTogglePlaylist: () => void;
}

export function SearchBar({
  query,
  setQuery,
  isSearching,
  searchStep,
  onSearch,
  onTogglePlaylist
}: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 mb-4">
      <form onSubmit={onSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder={t('music.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <FunButton type="submit" variant="primary" disabled={isSearching}>
          {isSearching ? <Loader2 className="animate-spin" size={20} /> : t('music.search')}
        </FunButton>
      </form>
      <button 
        onClick={onTogglePlaylist}
        className={`p-3 rounded-xl border transition-colors ${searchStep === 'playlist' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        title="Playlist"
      >
        <ListMusic size={20} />
      </button>
    </div>
  );
}
