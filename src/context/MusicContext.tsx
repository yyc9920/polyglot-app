import React, { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { SongMaterials, PlaylistItem } from '../types';
import useCloudStorage from '../hooks/useCloudStorage';
import type { YouTubeVideo } from '../lib/youtube';
import type { Song } from '../lib/lyrics';

export interface MusicViewState {
  query: string;
  results: YouTubeVideo[];
  songResults: Song[];
  selectedVideo: YouTubeVideo | null;
  selectedSong: Song | null;
  materials: SongMaterials | null;
  isLoading: boolean;
  isSearching: boolean;
  searchStep: 'song' | 'video' | 'playlist';
  activeTab: 'lyrics' | 'phrase';
  songPage: number;
  videoPage: number;
}

export const initialMusicState: MusicViewState = {
  query: '',
  results: [],
  songResults: [],
  selectedVideo: null,
  selectedSong: null,
  materials: null,
  isLoading: false,
  isSearching: false,
  searchStep: 'song',
  activeTab: 'lyrics',
  songPage: 1,
  videoPage: 1,
};

export interface MusicContextType {
  musicState: MusicViewState;
  setMusicState: Dispatch<SetStateAction<MusicViewState>>;
  playlist: PlaylistItem[];
  setPlaylist: Dispatch<SetStateAction<PlaylistItem[]>>;
  songLyrics: Record<string, SongMaterials>;
  setSongLyrics: Dispatch<SetStateAction<Record<string, SongMaterials>>>;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [musicState, setMusicState] = useState<MusicViewState>(initialMusicState);
  
  const [playlist, setPlaylist] = useCloudStorage<PlaylistItem[]>(
    'playlist', 
    [], 
    undefined,
    (local, cloud) => {
        const cloudIds = new Set(cloud.map(c => c.id));
        const localUnique = local.filter(l => !cloudIds.has(l.id));
        return [...cloud, ...localUnique];
    }
  );

  const [songLyrics, setSongLyrics] = useCloudStorage<Record<string, SongMaterials>>(
    'song_lyrics',
    {},
    undefined,
    (local, cloud) => ({ ...local, ...cloud })
  );

  const value = {
    musicState,
    setMusicState,
    playlist,
    setPlaylist,
    songLyrics,
    setSongLyrics,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};
