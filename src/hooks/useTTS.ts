import { useCallback } from 'react';
import { usePhraseAppContext } from '../context/PhraseContext';

export const useTTS = () => {
  const { voiceURI } = usePhraseAppContext();

  const speak = useCallback((text: string) => {
    if (!text) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceURI) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.voiceURI === voiceURI);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    window.speechSynthesis.speak(utterance);
  }, [voiceURI]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, cancel };
};
