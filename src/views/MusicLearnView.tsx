import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Search, Music, Plus, Check, Volume2 } from 'lucide-react';
import { useVocabAppContext } from '../context/VocabContext';
import { searchYouTube, type YouTubeVideo } from '../lib/youtube';
import { generateSongMaterials } from '../lib/gemini';
import { FunButton } from '../components/FunButton';
import { generateId } from '../lib/utils';
import type { SongData, VocabItem } from '../types';

export function MusicLearnView() {
  const { 
    apiKey, 
    youtubeApiKey, 
    setVocabList, 
    vocabList, 
    voiceURI,
    musicState,
    setMusicState
  } = useVocabAppContext();
  
  const { 
      query, 
      results, 
      selectedVideo, 
      materials, 
      isLoading, 
      isSearching, 
      activeTab 
  } = musicState;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceURI) {
      const voice = window.speechSynthesis.getVoices().find(v => v.voiceURI === voiceURI);
      if (voice) utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Helper to check if a word is already saved
  const isSaved = (meaning: string, sentence: string) => {
    const id = generateId(meaning, sentence);
    return vocabList.some(v => v.id === id);
  };

  const updateState = (updates: Partial<typeof musicState>) => {
      setMusicState(prev => ({ ...prev, ...updates }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    if (!youtubeApiKey) {
        alert("Please set your YouTube API Key in Settings first.");
        return;
    }

    updateState({ isSearching: true });
    try {
      const videos = await searchYouTube(query, youtubeApiKey);
      updateState({ results: videos, selectedVideo: null, materials: null });
    } catch (err: any) {
      alert(err.message);
    } finally {
      updateState({ isSearching: false });
    }
  };

  const handleSelectVideo = async (video: YouTubeVideo) => {
    updateState({ selectedVideo: video, materials: null });
    
    const cacheKey = `song_materials_${video.videoId}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        try {
            const parsedMaterials = JSON.parse(cached);
            updateState({ materials: parsedMaterials });
            return;
        } catch (e) {
            console.error("Failed to parse cached materials", e);
            localStorage.removeItem(cacheKey);
        }
    }

    // Auto-generate materials if not cached
    if (!apiKey) {
        alert("Gemini API Key is missing. Cannot generate materials.");
        return;
    }

    updateState({ isLoading: true });
    try {
        const data = await generateSongMaterials(video.artist, video.title, apiKey);
        localStorage.setItem(cacheKey, JSON.stringify(data));
        updateState({ materials: data });
    } catch (err: any) {
        alert("Failed to generate materials: " + err.message);
    } finally {
        updateState({ isLoading: false });
    }
  };

  const handleSaveVocab = (item: { meaning: string; sentence: string; pronunciation: string }) => {
      if (!selectedVideo) return;

      const songData: SongData = {
          videoId: selectedVideo.videoId,
          title: selectedVideo.title,
          artist: selectedVideo.artist,
          thumbnailUrl: selectedVideo.thumbnailUrl
      };

      const newItem: VocabItem = {
          id: generateId(item.meaning, item.sentence),
          meaning: item.meaning,
          sentence: item.sentence,
          pronunciation: item.pronunciation,
          tags: ['music', 'generated'],
          memo: `From song: ${selectedVideo.title} by ${selectedVideo.artist}`,
          song: songData
      };

      setVocabList(prev => {
          if (prev.some(v => v.id === newItem.id)) return prev;
          return [...prev, newItem];
      });
  };

    return (
      <div className="h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Top Panel: Search & Player */}
        <div className={`${selectedVideo ? 'h-[40%] flex-shrink-0' : 'flex-1'} flex flex-col p-4 overflow-y-auto border-b border-gray-200 dark:border-gray-800`}>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Search song or artist..." 
                 value={query}
                 onChange={(e) => updateState({ query: e.target.value })}
                 className="w-full pl-10 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <FunButton type="submit" variant="primary" disabled={isSearching}>
               {isSearching ? '...' : 'Search'}
            </FunButton>
          </form>
  
          {!selectedVideo && (
              <div className="space-y-3">
                  {results.map(video => (
                      <div 
                          key={video.videoId} 
                          onClick={() => handleSelectVideo(video)}
                          className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                      >
                          <img src={video.thumbnailUrl} alt={video.title} className="w-24 h-18 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">{video.title}</h4>
                              <p className="text-xs text-gray-500">{video.artist}</p>
                          </div>
                      </div>
                  ))}
                  {results.length === 0 && !isSearching && (
                      <div className="text-center text-gray-400 mt-10">
                          <Music size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Search for a song to start learning!</p>
                      </div>
                  )}
              </div>
          )}
  
          {selectedVideo && (
              <div className="space-y-4 max-w-2xl mx-auto w-full">
                  <div className="flex justify-between items-center">
                      <button 
                          onClick={() => updateState({ selectedVideo: null })}
                          className="text-sm text-blue-500 hover:underline"
                      >
                          &larr; Back to results
                      </button>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
                       <YouTube 
                          videoId={selectedVideo.videoId} 
                          opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }} 
                          className="w-full h-full"
                       />
                  </div>
                  <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{selectedVideo.title}</h3>
                      <p className="text-gray-500">{selectedVideo.artist}</p>
                  </div>
              </div>
          )}
        </div>
  
        {/* Bottom Panel: Learning Materials */}
        {selectedVideo && (
          <div className="flex-1 flex flex-col p-4 bg-white dark:bg-gray-800 overflow-hidden">             {isLoading ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                     <p className="animate-pulse">Generating lyrics and phrases with AI...</p>
                 </div>
             ) : materials ? (
                 <>
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                        <button 
                            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'lyrics' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => updateState({ activeTab: 'lyrics' })}
                        >
                            Lyrics
                        </button>
                        <button 
                            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'vocab' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => updateState({ activeTab: 'vocab' })}
                        >
                            Phrases
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                        {activeTab === 'lyrics' && (
                            <div className="space-y-6">
                                {materials.lyrics.map((line, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">{line.original}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{line.translated}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'vocab' && (
                            <div className="space-y-3">
                                {materials.phrases.map((phrase, idx) => {
                                    const saved = isSaved(phrase.meaning, phrase.sentence);
                                    
                                    const tempItem: VocabItem = {
                                        id: `temp-${idx}`,
                                        meaning: phrase.meaning,
                                        sentence: phrase.sentence,
                                        pronunciation: phrase.pronunciation,
                                        tags: ['music', 'generated']
                                    };

                                    return (
                                        <FlipListItem 
                                            key={idx}
                                            item={tempItem}
                                            idx={idx}
                                            saved={saved}
                                            onSave={() => handleSaveVocab(phrase)}
                                            speak={speak}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                 </>
             ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                     <p>Select a video to generate materials.</p>
                 </div>
             )}
        </div>
      )}
    </div>
  );
}

function FlipListItem({ item, idx, saved, onSave, speak }: { 
    item: VocabItem, 
    idx: number, 
    saved: boolean,
    onSave: () => void,
    speak: (t:string)=>void
}) {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <div 
      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex justify-between items-center group cursor-pointer active:bg-gray-100 dark:active:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
      onClick={() => setShowMeaning(!showMeaning)}
    >
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-blue-500 w-6 flex-none">{idx + 1}</span>
          <h4 className={`font-bold transition-all duration-300 ${showMeaning ? 'text-gray-500 dark:text-gray-400 text-sm' : 'text-blue-900 dark:text-blue-100 text-lg'}`}>
            {showMeaning ? item.meaning : item.sentence}
          </h4>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 pl-8 truncate min-h-[1.25rem]">
          {showMeaning ? (
             <span className="text-blue-500 font-medium">{item.sentence}</span>
          ) : (
             <span className="opacity-50 text-xs">Tap to reveal meaning</span>
          )}
        </p>
        <div className="flex gap-1 mt-1 pl-8 items-center">
            {/* Using saved status instead of learning status for this view */}
           {saved && <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">SAVED</span>}
           {item.pronunciation && (
               <span className="text-[10px] font-mono bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">/{item.pronunciation}/</span>
           )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
            onClick={(e) => { e.stopPropagation(); speak(item.sentence); }}
            className="p-3 bg-white dark:bg-gray-600 rounded-full shadow-sm text-blue-500 active:scale-90 transition-transform"
        >
            <Volume2 size={18} />
        </button>
        <button 
            onClick={(e) => { e.stopPropagation(); if (!saved) onSave(); }}
            disabled={saved}
            className={`p-3 rounded-full shadow-sm transition-transform active:scale-90 ${saved ? 'bg-green-100 text-green-600' : 'bg-white dark:bg-gray-600 text-gray-400 hover:text-blue-500'}`}
        >
            {saved ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>
    </div>
  );
}