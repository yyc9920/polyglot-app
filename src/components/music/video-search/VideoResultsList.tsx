import { ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import type { YouTubeVideo } from '../../../lib/youtube';
import type { Song } from '../../../lib/lyrics';

interface VideoResultsListProps {
  videos: YouTubeVideo[];
  currentPage: number;
  totalPages: number;
  selectedSong: Song | null;
  onSelectVideo: (video: YouTubeVideo) => void;
  onBack: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function VideoResultsList({
  videos,
  currentPage,
  totalPages,
  selectedSong,
  onSelectVideo,
  onBack,
  onPrevPage,
  onNextPage
}: VideoResultsListProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2 mb-2">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight">
            {selectedSong?.title}
          </h3>
          <p className="text-sm text-gray-500">{selectedSong?.artist}</p>
        </div>
      </div>
      
      <div className="grid gap-3">
        {videos.map(video => (
          <div 
            key={video.videoId}
            onClick={() => onSelectVideo(video)}
            className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-800 group"
          >
            <div className="w-32 aspect-video bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Youtube size={12} />
                <span className="truncate">{video.artist}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
