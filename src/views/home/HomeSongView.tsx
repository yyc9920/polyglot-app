import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import YouTube from 'react-youtube';
import { Music as MusicIcon, ArrowLeft } from 'lucide-react';
import { BottomSheet } from '../../components/BottomSheet';
import { LyricsView } from '../../components/music/LyricsView';
import { generateSongLyrics } from '../../lib/gemini';
import { initialMusicState, type MusicViewState } from '../../context/MusicContextDefinition';
import type { PlaylistItem } from '../../types';

interface HomeSongViewProps {
  song: PlaylistItem;
  onClose: () => void;
  apiKey: string;
  language: string;
  LANGUAGE_NAMES: Record<string, string>;
  t: (key: string) => string;
}

export const HomeSongView = React.memo(function HomeSongView({ 
    song, 
    onClose,
    apiKey,
    language,
    LANGUAGE_NAMES,
    t
}: HomeSongViewProps) {
    const [localMusicState, setLocalMusicState] = useState<MusicViewState>({
        ...initialMusicState,
        selectedVideo: { 
            ...song.video, 
            artist: song.song.artist 
        },
    });

    const [localPlaylist, setLocalPlaylist] = useState<PlaylistItem[]>([song]);

    useEffect(() => {
        const loadLyrics = async () => {
            const video = { ...song.video, artist: song.song.artist };
            const cacheKey = `song_lyrics_${video.videoId}_${language}`;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                try {
                    const parsedMaterials = JSON.parse(cached);
                    setLocalMusicState(prev => ({ ...prev, materials: parsedMaterials }));
                    return;
                } catch {
                    localStorage.removeItem(cacheKey);
                }
            }

            if (!apiKey) return;

            setLocalMusicState(prev => ({ ...prev, isLoading: true }));
            try {
                const targetLanguageName = LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES];
                const data = await generateSongLyrics(video.artist, video.title, apiKey, targetLanguageName);
                localStorage.setItem(cacheKey, JSON.stringify(data));
                setLocalMusicState(prev => ({ ...prev, materials: data }));
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                alert(t('music.failedGenerateMaterials').replace('{{error}}', message));
            } finally {
                setLocalMusicState(prev => ({ ...prev, isLoading: false }));
            }
        };

        loadLyrics();
    }, [song, apiKey, language, LANGUAGE_NAMES, t]);

    const contextValue = useMemo(() => ({
        musicState: localMusicState,
        setMusicState: setLocalMusicState,
        playlist: localPlaylist,
        setPlaylist: setLocalPlaylist,
        songLyrics: {}, // Not used in this limited view
        setSongLyrics: () => {} // No-op
    }), [localMusicState, localPlaylist]);

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsSheetOpen(true), 50);
        return () => clearTimeout(timer);
    }, []);

    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="h-full flex flex-col p-4 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
                    <div className="space-y-4 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                        <div className="flex justify-between items-center flex-none">
                            <button 
                                onClick={onClose}
                                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                            >
                                <ArrowLeft size={16} /> {t('common.close')}
                            </button>
                        </div>
                        {localMusicState.selectedVideo && (
                            <>
                                <div className="rounded-xl overflow-hidden shadow-2xl bg-black aspect-video ring-4 ring-black/5 dark:ring-white/5 flex-none">
                                    <YouTube 
                                        videoId={localMusicState.selectedVideo.videoId} 
                                        opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }} 
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex-none">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{localMusicState.selectedVideo.title}</h3>
                                    <p className="text-gray-500">{localMusicState.selectedVideo.artist}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <BottomSheet
                    isOpen={isSheetOpen}
                    onClose={onClose}
                    initialSnap={0.5}
                    modal={false}
                    peekHeight={120}
                    title={
                        <div className="flex items-center gap-2 truncate">
                            <MusicIcon size={20} className="text-pink-500 flex-shrink-0" />
                            <h3 className="font-bold text-lg truncate">
                                {t('music.lyricsAndPhrases') || 'Lyrics & Phrases'}
                            </h3>
                        </div>
                    }
                >
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-hidden">
                            <LyricsView 
                                onMaterialsUpdate={(m) => setLocalMusicState(prev => ({ ...prev, materials: m }))}
                                contextOverrides={contextValue}
                            />
                        </div>
                    </div>
                </BottomSheet>
            </div>
        </div>,
        document.body
    );
});
