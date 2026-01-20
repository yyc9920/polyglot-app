import { useState } from 'react';
import { ChevronDown, CheckSquare, Square, X } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

export function TagFilter({ allTags, selectedTags, toggleTag }: TagFilterProps) {
  const { t } = useLanguage();
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-none z-20">
        <button 
          onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
          className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
            isTagDropdownOpen 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' 
            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          <span className="whitespace-nowrap">
            {t('learn.tags')}
          </span>
          <ChevronDown size={14} className={`transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isTagDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsTagDropdownOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
              {allTags.map(tag => (
                <div 
                  key={tag} 
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm"
                >
                  {selectedTags.includes(tag) ? <CheckSquare size={16} className="text-blue-500" /> : <Square size={16} className="text-gray-300" />}
                  <span className="truncate">{tag}</span>
                </div>
              ))}
              {allTags.length === 0 && <div className="text-xs text-gray-400 p-2">{t('learn.noTagsAvailable')}</div>}
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-x-auto flex items-center gap-2 scrollbar-hide">
        {selectedTags.length > 0 ? (
          selectedTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="flex-none flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs rounded-full border border-blue-100 dark:border-blue-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors group animate-in fade-in zoom-in-95 duration-200"
              title="Remove tag"
            >
              <span className="font-medium">#{tag}</span>
              <X size={12} className="opacity-60 group-hover:opacity-100" />
            </button>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic pl-1">{t('learn.noTagsSelected')}</span>
        )}
      </div>
    </div>
  );
}
