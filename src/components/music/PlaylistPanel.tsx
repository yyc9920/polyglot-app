import { ListMusic, Trash2 } from 'lucide-react';
import { useMusicContext } from '../../context/MusicContext';
import type { YouTubeVideo } from '../../lib/youtube';
import useLanguage from '../../hooks/useLanguage';
import type { PlaylistItem } from '../../types';

interface PlaylistPanelProps {
  onSelect: (video: YouTubeVideo, artist: string) => void;
}

export function PlaylistPanel({ onSelect }: PlaylistPanelProps) {
  const { playlist, setPlaylist } = useMusicContext();
  const { t } = useLanguage();

  if (playlist.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <ListMusic size={48} className="mx-auto mb-4 opacity-20" />
        <p>{t('music.noSongsInPlaylist')}</p>
        <p className="text-sm mt-2">{t('music.searchAndSelectVideo')}</p>
      </div>
    );
  }

  const updatePlaylistLanguage = (videoId: string, newLang: string) => {
    setPlaylist((prev: PlaylistItem[]) => prev.map(item => 
        item.id === videoId ? { ...item, language: newLang } : item
    ));
  };

  return (
    <div className="grid gap-3">
      {playlist.map((item: PlaylistItem) => (
        <div 
          key={item.id}
          className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-800 group relative"
        >
          <div 
            className="w-24 aspect-video bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={() => onSelect({
                videoId: item.video.videoId,
                title: item.video.title,
                thumbnailUrl: item.video.thumbnailUrl,
                artist: item.song.artist
            }, item.song.artist)}
          >
            <img src={item.video.thumbnailUrl} alt={item.video.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 cursor-pointer"
               onClick={() => onSelect({
                  videoId: item.video.videoId,
                  title: item.video.title,
                  thumbnailUrl: item.video.thumbnailUrl,
                  artist: item.song.artist
               }, item.song.artist)}
          >
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                {item.song.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{item.song.artist}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const langs = ['en', 'es', 'fr', 'ja', 'de', 'ko', 'it', 'zh', 'pt', 'hi'];
                        const currentIdx = langs.indexOf(item.language);
                        const nextLang = langs[(currentIdx + 1) % langs.length];
                        updatePlaylistLanguage(item.id, nextLang);
                    }} 
                    className="uppercase font-mono bg-gray-100 dark:bg-gray-700 px-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                    title={t('common.clickToChangeLanguage')}
                >
                    {item.language}
                </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if(confirm(t('music.removeFromPlaylist'))) {
                        setPlaylist((prev: PlaylistItem[]) => prev.filter(p => p.id !== item.id));
                    }
                }}
                className="p-2 text-gray-400 hover:text-red-500"
            >
                <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
