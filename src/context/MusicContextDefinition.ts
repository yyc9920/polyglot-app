import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { SongMaterials, PlaylistItem } from '../types';
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
