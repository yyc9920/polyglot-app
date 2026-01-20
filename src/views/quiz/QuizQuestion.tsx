import { X, Volume2, Mic } from 'lucide-react';
import { FunButton } from '../../components/FunButton';
import { PhraseCard } from '../../components/PhraseCard';
import useLanguage from '../../hooks/useLanguage';
import type { QuizItem, LearningStatus } from '../../types';

interface QuizQuestionProps {
  quizQueue: QuizItem[];
  currentIndex: number;
  input: string;
  setInput: (input: string) => void;
  feedback: 'none' | 'correct' | 'incorrect';
  earnedPoints: number;
  status: LearningStatus;
  isListening: boolean;
  onStartListening: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNext: () => void;
  onExit: () => void;
  onSpeak: (text: string) => void;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export function QuizQuestion({
  quizQueue,
  currentIndex,
  input,
  setInput,
  feedback,
  earnedPoints,
  status,
  isListening,
  onStartListening,
  onSubmit,
  onNext,
  onExit,
  onSpeak,
  isFlipped,
  setIsFlipped
}: QuizQuestionProps) {
  const { t } = useLanguage();
  const currentItem = quizQueue[currentIndex];

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto pt-12 px-4 overflow-y-auto pb-20">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={onExit}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
        >
          <X size={16} /> {t('quiz.exit')}
        </button>
        <div className="flex gap-1 text-sm text-gray-400">
          <span>Question {currentIndex + 1}</span>
          <span>/</span>
          <span>{quizQueue.length}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-8">
        <div 
          className="bg-blue-500 h-full rounded-full transition-all" 
          style={{ width: `${((currentIndex) / quizQueue.length) * 100}%` }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 text-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {currentItem.type === 'interpretation' ? t('quiz.questionType.interpretation') : 
           currentItem.type === 'cloze' ? t('quiz.questionType.cloze') : 
           currentItem.type === 'speaking' ? t('quiz.questionType.speaking') :
           currentItem.type === 'listening' ? t('quiz.questionType.listening') : t('quiz.questionType.writing')}
        </span>
        <h3 className="text-xl font-bold mt-4 leading-snug break-words">
          {currentItem.questionText}
        </h3>
        {/* For Cloze, show the hinted sentence */}
        {currentItem.type === 'cloze' && (
          <p className="mt-4 text-blue-600 dark:text-blue-300 font-mono text-lg p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg break-words">
            {currentItem.hint}
          </p>
        )}
        {currentItem.type === 'speaking' && (
            <button 
                type="button"
                onClick={() => onSpeak(currentItem.sentence)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
                <Volume2 size={16} /> {t('quiz.action.listen')}
            </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentItem.type === 'cloze' ? t('quiz.placeholder.cloze') : currentItem.type === 'speaking' ? t('quiz.placeholder.speaking') : t('quiz.placeholder.writing')}
            className={`w-full p-4 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg outline-none transition-colors pr-14
              ${feedback === 'none' ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500' : ''}
              ${feedback === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : ''}
              ${feedback === 'incorrect' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 animate-shake' : ''}
            `}
            readOnly={feedback !== 'none'}
            autoFocus
          />
          {currentItem.type === 'speaking' && feedback === 'none' && (
            <button
              type="button"
              onClick={onStartListening}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
              title={t('quiz.title.speak')}
            >
              <Mic size={20} />
            </button>
          )}
          {currentItem.type === 'listening' && feedback === 'none' && (
            <button
              type="button"
              onClick={() => onSpeak(currentItem.sentence)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
              title={t('quiz.title.play')}
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>

        {feedback === 'none' ? (
          <FunButton 
            type="submit" 
            fullWidth
            variant="primary"
          >
            {t('quiz.checkAnswer')}
          </FunButton>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
            <div className={`p-4 rounded-xl border-2 flex flex-col gap-4 ${
              feedback === 'correct' 
                ? 'bg-green-50 dark:bg-green-900/10 border-green-500 shadow-lg shadow-green-100 dark:shadow-none' 
                : 'bg-red-50 dark:bg-red-900/10 border-red-500 shadow-lg shadow-red-100 dark:shadow-none'
            }`}>
              <div className="flex justify-between items-center px-2 gap-4">
                <span className={`shrink-0 text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                  feedback === 'correct' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {feedback === 'correct' ? (
                      <span className="flex items-center gap-1">
                          ✨ Perfect <span className="text-green-200">+{earnedPoints}pts</span>
                      </span>
                  ) : '📚 Learning'}
                </span>
                {feedback === 'incorrect' && (
                  <span className="text-xs font-bold text-red-500/80 uppercase tracking-wider break-words text-right">
                    Correct: {currentItem.answerText}
                  </span>
                )}
              </div>

              <div 
                className="relative w-full cursor-pointer group perspective-1000"
                onClick={() => {
                  if (!isFlipped) onSpeak(currentItem.sentence);
                  setIsFlipped(!isFlipped);
                }}
              >
                <div 
                  className={`w-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} grid grid-cols-1 grid-rows-1`}
                >
                  <PhraseCard 
                    item={currentItem}
                    status={status}
                    side="front"
                    onSpeak={() => onSpeak(currentItem.sentence)}
                    className="col-start-1 row-start-1 backface-hidden shadow-none border-none bg-white/50 dark:bg-gray-800/50 min-h-0 py-4"
                  />
                  <PhraseCard 
                    item={currentItem}
                    status={status}
                    side="back"
                    className="col-start-1 row-start-1 backface-hidden rotate-y-180 shadow-none border-none bg-white/50 dark:bg-gray-800/50 min-h-0 py-4"
                  />
                </div>
              </div>
            </div>

            <FunButton 
              type="button" 
              onClick={onNext}
              fullWidth
              variant={feedback === 'correct' ? 'success' : 'danger'}
              className="py-4 shadow-md"
            >
              {t('quiz.nextQuestion')} &rarr;
            </FunButton>
          </div>
        )}
      </form>
    </div>
  );
}
