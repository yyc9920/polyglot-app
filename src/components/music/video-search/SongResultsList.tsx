import { ChevronLeft, ChevronRight, User as UserIcon, Sparkles } from 'lucide-react';
import type { Song } from '../../../lib/lyrics';

interface SongResultsListProps {
  songs: Song[];
  currentPage: number;
  totalPages: number;
  onSelectSong: (song: Song) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function SongResultsList({
  songs,
  currentPage,
  totalPages,
  onSelectSong,
  onPrevPage,
  onNextPage
}: SongResultsListProps) {
  return (
    <div className="space-y-3">
      {songs.map(song => (
        <div 
          key={song.id} 
          onClick={() => onSelectSong(song)}
          className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-800 group"
        >
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
            <img src={song.image} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h4 className="font-bold text-base text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {song.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <UserIcon size={12} className="text-gray-400" />
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600">
              <Sparkles size={16} />
            </div>
          </div>
        </div>
      ))}
  
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 pb-2">
          <button 
            onClick={onPrevPage} 
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {currentPage} / {totalPages}
          </span>
          <button 
            onClick={onNextPage} 
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
