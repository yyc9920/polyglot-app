import React, { useState, useEffect } from 'react';
import type { LearningStatus, QuizItem, QuizType } from '../types';
import { checkAnswer } from '../lib/utils';
import { usePhraseAppContext } from '../context/PhraseContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { triggerConfetti } from '../lib/fun-utils';
import useLanguage from '../hooks/useLanguage';
import { createQuizItem, LEVELS, POINT_SYSTEM } from '../lib/quiz-utils';
import { useTTS } from '../hooks/useTTS';
import { useDailyStats } from '../hooks/useDailyStats';

import { QuizSetup } from './quiz/QuizSetup';
import { QuizSummary } from './quiz/QuizSummary';
import { QuizQuestion } from './quiz/QuizQuestion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export interface QuizViewProps {
  customQueue?: QuizItem[];
}

export function QuizView({ customQueue }: QuizViewProps) {
  const { phraseList, status, setStatus } = usePhraseAppContext();
  const { t } = useLanguage();
  const { speak } = useTTS();
  const { increment } = useDailyStats();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useLocalStorage<boolean>('quizIsPlaying', false);
  const [quizQueue, setQuizQueue] = useLocalStorage<QuizItem[]>('quizQueue', []);
  const [currentIndex, setCurrentIndex] = useLocalStorage<number>('quizCurrentIndex', 0);
  const [input, setInput] = useLocalStorage<string>('quizInput', '');
  const [feedback, setFeedback] = useLocalStorage<'none' | 'correct' | 'incorrect'>('quizFeedback', 'none');
  const [sessionPoints, setSessionPoints] = useLocalStorage<number>('quizSessionPoints', 0);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [showSummary, setShowSummary] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  
  // Track previous customQueue to handle updates (Derived State)
  const [prevCustomQueue, setPrevCustomQueue] = useState<QuizItem[] | undefined>(undefined);

  if (customQueue !== prevCustomQueue) {
    setPrevCustomQueue(customQueue);
    if (customQueue && customQueue.length > 0) {
       setQuizQueue(customQueue);
       setCurrentIndex(0);
       setInput('');
       setFeedback('none');
       setSessionPoints(0);
       setShowSummary(false);
       setIsPlaying(true);
    }
  }

  // Setup States
  const [mode, setMode] = useLocalStorage<'all' | 'incorrect' | 'tag'>('quizMode', 'all');
  const [selectedTag, setSelectedTag] = useLocalStorage<string>('quizSelectedTag', '');
  const [quizLevel, setQuizLevel] = useLocalStorage<'custom' | 'basic' | 'advanced' | 'legend'>('quizLevel', 'custom');
  const [quizType, setQuizType] = useLocalStorage<'random' | 'writing' | 'interpretation' | 'cloze' | 'speaking' | 'listening'>('quizType', 'writing');

  const tags = [...Array.from(new Set(phraseList.flatMap(v => v.tags)))];

  // Auto-play audio for listening questions
  useEffect(() => {
    if (isPlaying && quizQueue[currentIndex]?.type === 'listening' && feedback === 'none') {
      const timer = setTimeout(() => {
        speak(quizQueue[currentIndex].sentence);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPlaying, quizQueue, feedback, speak]);

  const startListening = () => {
    if (!SpeechRecognition) {
      alert(t('quiz.speechNotSupported'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.start();
    setIsListening(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };



  const startQuiz = () => {
    let list = [...phraseList];

    // 1. Filter by Scope
    if (mode === 'incorrect') {
      list = list.filter(v => status.incorrectIds.includes(v.id));
    } else if (mode === 'tag' && selectedTag) {
      list = list.filter(v => v.tags.includes(selectedTag));
    }

    if (list.length === 0) {
      alert(t('learn.noDataToDisplay'));
      return;
    }

    // 2. Shuffle
    list = list.sort(() => Math.random() - 0.5);

    let queue: QuizItem[] = [];

    if (quizLevel !== 'custom') {
      const levelConfig = LEVELS[quizLevel];
      if (list.length < levelConfig.total) {
        const msg = t('quiz.confirmNotEnough')
            .replace('{{level}}', quizLevel)
            .replace('{{need}}', levelConfig.total.toString())
            .replace('{{have}}', list.length.toString());
        if (!confirm(msg)) {
          return;
        }
      }

      // Limit list size if we have enough, otherwise use all
      const countToUse = Math.min(list.length, levelConfig.total);
      list = list.slice(0, countToUse);

      // Create distribution pool
      let typesPool: QuizType[] = [];
      Object.entries(levelConfig.distribution).forEach(([type, count]) => {
        for (let i = 0; i < count; i++) typesPool.push(type as QuizType);
      });

      typesPool = typesPool.sort(() => Math.random() - 0.5);
      
      queue = list.map((item, i) => {
        const type = typesPool[i % typesPool.length] || 'writing'; 
        return createQuizItem(item, type);
      });

    } else {
      // 3. Transform to QuizItems based on Type (Custom Mode)
      queue = list.map(item => createQuizItem(item, quizType));
    }

    setQuizQueue(queue);
    setCurrentIndex(0);
    setInput('');
    setFeedback('none');
    setSessionPoints(0);
    setShowSummary(false);
    setIsPlaying(true);
  };

  const submitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback !== 'none') return; 
    
    if (!quizQueue[currentIndex]) return;

    const currentItem = quizQueue[currentIndex];
    const isCorrect = checkAnswer(input, currentItem.answerText);
    const pts = POINT_SYSTEM[currentItem.type as QuizType] || 0;

    if (isCorrect) {
      triggerConfetti();
      setEarnedPoints(pts);
      setSessionPoints(prev => prev + pts);
    } else {
      setEarnedPoints(0);
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setStatus((prev: LearningStatus) => {
      const newCompleted = isCorrect 
        ? [...new Set([...prev.completedIds, currentItem.id])]
        : prev.completedIds;
      
      const newIncorrect = !isCorrect
        ? [...new Set([...prev.incorrectIds, currentItem.id])]
        : isCorrect 
          ? prev.incorrectIds.filter(id => id !== currentItem.id) 
          : prev.incorrectIds;
      
      const newPoints = isCorrect ? (prev.points || 0) + pts : (prev.points || 0);

      // Update Quiz Stats
      const currentStats = prev.quizStats?.[currentItem.id] || { correct: [], incorrect: [] };
      const newStats = { ...prev.quizStats };
      
      if (isCorrect) {
        newStats[currentItem.id] = {
          ...currentStats,
          correct: [...new Set([...currentStats.correct, currentItem.type as QuizType])],
        };
      } else {
        newStats[currentItem.id] = {
          ...currentStats,
          incorrect: [...new Set([...currentStats.incorrect, currentItem.type as QuizType])]
        };
      }

      return { completedIds: newCompleted, incorrectIds: newIncorrect, points: newPoints, quizStats: newStats };
    });
  };

  const nextQuestion = () => {
    if (currentIndex < quizQueue.length - 1) {
      setCurrentIndex((prev: number) => prev + 1);
      setInput('');
      setFeedback('none');
      setIsFlipped(false);
    } else {
      setShowSummary(true);
      triggerConfetti();
      increment('quizCount');
    }
  };

  if (!isPlaying) {
    return (
      <QuizSetup 
        mode={mode}
        setMode={setMode}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        quizLevel={quizLevel}
        setQuizLevel={setQuizLevel}
        quizType={quizType}
        setQuizType={setQuizType}
        onStartQuiz={startQuiz}
        tags={tags}
        status={status}
      />
    );
  }

  if (showSummary) {
    return (
      <QuizSummary 
        sessionPoints={sessionPoints}
        onTryAgain={startQuiz}
        onBackToSetup={() => setIsPlaying(false)}
      />
    );
  }

  return (
    <QuizQuestion 
      quizQueue={quizQueue}
      currentIndex={currentIndex}
      input={input}
      setInput={setInput}
      feedback={feedback}
      earnedPoints={earnedPoints}
      status={status}
      isListening={isListening}
      onStartListening={startListening}
      onSubmit={submitAnswer}
      onNext={nextQuestion}
      onExit={() => setIsPlaying(false)}
      onSpeak={(text) => { speak(text); increment('speakCount'); }}
      isFlipped={isFlipped}
      setIsFlipped={setIsFlipped}
    />
  );
}
