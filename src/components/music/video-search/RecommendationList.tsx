import { Sparkles, Loader2, Music, User as UserIcon } from 'lucide-react';
import type { Song } from '../../../lib/lyrics';

interface RecommendationListProps {
  recommendations: Song[];
  loadingRecs: boolean;
  hasPlaylist: boolean;
  hasApiKey: boolean;
  onSelectSong: (song: Song) => void;
}

export function RecommendationList({
  recommendations,
  loadingRecs,
  hasPlaylist,
  hasApiKey,
  onSelectSong
}: RecommendationListProps) {
  if (!hasPlaylist) {
    return (
      <div className="text-center py-10 text-gray-400">
        <Music size={48} className="mx-auto mb-4 opacity-20" />
        <p>Search for songs to build your playlist!</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
        <Sparkles size={12} className="text-purple-500" /> Recommended for you
      </h3>
      {loadingRecs ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-gray-400" size={24} />
        </div>
      ) : recommendations.length > 0 ? (
        recommendations.map((song, idx) => (
          <div 
            key={`rec-${idx}`} 
            onClick={() => onSelectSong(song)}
            className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all shadow-sm border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative">
              {song.image ? (
                <img src={song.image} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-500">
                  <Music size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="font-bold text-base text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {song.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <UserIcon size={12} className="text-gray-400" />
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600">
                <Sparkles size={16} />
              </div>
            </div>
          </div>
        ))
      ) : !hasApiKey ? (
        <div className="text-center py-8 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-2">Add Last.fm API Key in Settings to get music recommendations based on your playlist.</p>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 text-sm">No recommendations available</div>
      )}
    </>
  );
}
