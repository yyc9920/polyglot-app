import { Search, Loader2, ListMusic, ChevronLeft, ChevronRight, User as UserIcon, Sparkles, Youtube } from 'lucide-react';
import { useMusicContext } from '../../context/MusicContext';
import { usePhraseAppContext } from '../../context/PhraseContext';
import { FunButton } from '../FunButton';
import useLanguage from '../../hooks/useLanguage';
import { searchSongs, type Song } from '../../lib/lyrics';
import { searchYouTube, type YouTubeVideo } from '../../lib/youtube';
import { PlaylistPanel } from './PlaylistPanel';

const SONGS_PER_PAGE = 5;
const VIDEOS_PER_PAGE = 5;

interface VideoSearchPanelProps {
  onVideoSelect: (video: YouTubeVideo) => void;
}

export function VideoSearchPanel({ onVideoSelect }: VideoSearchPanelProps) {
  const { musicState, setMusicState } = useMusicContext();
  const { 
    query, 
    results, 
    songResults, 
    selectedSong, 
    isSearching, 
    searchStep, 
    songPage, 
    videoPage 
  } = musicState;
  
  const { youtubeApiKey } = usePhraseAppContext();
  const { t } = useLanguage();

  const updateState = (updates: Partial<typeof musicState>) => {
    setMusicState(prev => ({ ...prev, ...updates }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    updateState({ isSearching: true, searchStep: 'song', selectedSong: null, selectedVideo: null, materials: null, results: [], songResults: [], songPage: 1 });
    
    try {
      const songs = await searchSongs(query);
      updateState({ songResults: songs });
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    } finally {
      updateState({ isSearching: false });
    }
  };

  const handleSelectSong = async (song: Song) => {
    if (!youtubeApiKey) {
      alert(t('music.pleaseSetYoutubeKey'));
      return;
    }

    updateState({ 
      selectedSong: song, 
      isSearching: true,
      searchStep: 'video',
      videoPage: 1
    });

    try {
      const searchQuery = `${song.artist} ${song.title}`;
      const videos = await searchYouTube(searchQuery, youtubeApiKey);
      updateState({ results: videos });
    } catch (err) {
      const error = err as Error;
      alert(error.message);
      updateState({ searchStep: 'song', selectedSong: null });
    } finally {
      updateState({ isSearching: false });
    }
  };

  const totalPages = Math.ceil(songResults.length / SONGS_PER_PAGE);
  const currentSongs = songResults.slice(
      (songPage - 1) * SONGS_PER_PAGE, 
      songPage * SONGS_PER_PAGE
  );

  const handlePrevPage = () => {
      if (songPage > 1) updateState({ songPage: songPage - 1 });
  };

  const handleNextPage = () => {
      if (songPage < totalPages) updateState({ songPage: songPage + 1 });
  };

  const totalVideoPages = Math.ceil(results.length / VIDEOS_PER_PAGE);
  const currentVideos = results.slice(
      (videoPage - 1) * VIDEOS_PER_PAGE, 
      videoPage * VIDEOS_PER_PAGE
  );

  const handlePrevVideoPage = () => {
      if (videoPage > 1) updateState({ videoPage: videoPage - 1 });
  };

  const handleNextVideoPage = () => {
      if (videoPage < totalVideoPages) updateState({ videoPage: videoPage + 1 });
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="flex gap-2 mb-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder={t('music.searchPlaceholder')}
                    value={query}
                    onChange={(e) => updateState({ query: e.target.value })}
                    className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
            </div>
            <FunButton type="submit" variant="primary" disabled={isSearching}>
                {isSearching ? <Loader2 className="animate-spin" size={20} /> : t('music.search')}
            </FunButton>
            </form>
            <button 
                onClick={() => updateState({ searchStep: searchStep === 'playlist' ? 'song' : 'playlist', results: [], songResults: [] })}
                className={`p-3 rounded-xl border transition-colors ${searchStep === 'playlist' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                title="Playlist"
            >
                <ListMusic size={20} />
            </button>
        </div>

        {searchStep === 'playlist' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{t('music.myPlaylist')}</h3>
                </div>
                <PlaylistPanel onSelect={onVideoSelect} />
            </div>
        )}

        {searchStep === 'song' && (
            <div className="space-y-3">
                {songResults.length > 0 && <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-2">Select a Song</h3>}
                
                {currentSongs.map(song => (
                    <div 
                        key={song.id} 
                        onClick={() => handleSelectSong(song)}
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
                            onClick={handlePrevPage} 
                            disabled={songPage === 1}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {songPage} / {totalPages}
                        </span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={songPage === totalPages}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        )}

        {searchStep === 'video' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                    <button 
                        onClick={() => updateState({ searchStep: 'song', results: [] })}
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
                    {currentVideos.map(video => (
                        <div 
                            key={video.videoId}
                            onClick={() => onVideoSelect(video)}
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

                {totalVideoPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-4 pb-2">
                    <button 
                        onClick={handlePrevVideoPage} 
                        disabled={videoPage === 1}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {videoPage} / {totalVideoPages}
                    </span>
                    <button 
                        onClick={handleNextVideoPage} 
                        disabled={videoPage === totalVideoPages}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                    </div>
                )}
            </div>
        )}
    </div>
  );
}
