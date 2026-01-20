import React, { useContext, useState, type ReactNode } from 'react';
import type { SongMaterials, PlaylistItem } from '../types';
import useCloudStorage from '../hooks/useCloudStorage';
import { MusicContext, initialMusicState, type MusicViewState } from './MusicContextDefinition';

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

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};
