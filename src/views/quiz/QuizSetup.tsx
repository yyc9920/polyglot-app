import { Brain, Filter, Signal, Type, Calendar } from 'lucide-react';
import { FunButton } from '../../components/FunButton';
import useLanguage from '../../hooks/useLanguage';
import type { LearningStatus } from '../../types';

interface QuizSetupProps {
  mode: 'all' | 'incorrect' | 'tag' | 'daily';
  setMode: (mode: 'all' | 'incorrect' | 'tag' | 'daily') => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  quizLevel: 'custom' | 'basic' | 'advanced' | 'legend';
  setQuizLevel: (level: 'custom' | 'basic' | 'advanced' | 'legend') => void;
  quizType: 'random' | 'writing' | 'interpretation' | 'cloze' | 'speaking' | 'listening';
  setQuizType: (type: 'random' | 'writing' | 'interpretation' | 'cloze' | 'speaking' | 'listening') => void;
  onStartQuiz: () => void;
  tags: string[];
  status: LearningStatus;
}

export function QuizSetup({
  mode,
  setMode,
  selectedTag,
  setSelectedTag,
  quizLevel,
  setQuizLevel,
  quizType,
  setQuizType,
  onStartQuiz,
  tags,
  status
}: QuizSetupProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex flex-col justify-center gap-6 p-4 pb-20">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
            <Brain size={40} />
          </div>
          <h2 className="text-2xl font-bold">{t('quiz.setupTitle')}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('quiz.customizePractice')}</p>
        </div>
        
        {/* Scope Selection */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Filter size={16} /> {t('quiz.scope')}
          </h3>
          <div className="flex gap-2 mb-3">
            <button 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
              onClick={() => setMode('all')}
            >
              {t('common.all')}
            </button>
            <button 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'daily' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
              onClick={() => setMode('daily')}
            >
              <span className="flex items-center justify-center gap-1">
                 <Calendar size={12} /> Daily
              </span>
            </button>
            <button 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'incorrect' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
              onClick={() => setMode('incorrect')}
            >
              {t('settings.toReview')} ({status.incorrectIds.length})
            </button>
            <button 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'tag' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}
              onClick={() => setMode('tag')}
            >
              {t('learn.tags')}
            </button>
          </div>
          {mode === 'tag' && (
            <select 
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">{t('quiz.selectTagPlaceholder')}</option>
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </div>

        {/* Level Selection */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Signal size={16} /> {t('quiz.level')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'custom', label: '⚙️ Custom' },
              { id: 'basic', label: '🌱 Basic' },
              { id: 'advanced', label: '🚀 Advanced' },
              { id: 'legend', label: '🏆 Legend' },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setQuizLevel(l.id as 'custom' | 'basic' | 'advanced' | 'legend')}
                className={`py-3 px-2 text-xs font-bold rounded-xl transition-all border-2 ${
                  quizLevel === l.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' 
                    : 'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {quizLevel !== 'custom' && (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
              {quizLevel === 'basic' && t('quiz.levelDesc.basic')}
              {quizLevel === 'advanced' && t('quiz.levelDesc.advanced')}
              {quizLevel === 'legend' && t('quiz.levelDesc.legend')}
            </div>
          )}
        </div>

        {/* Type Selection (Only for Custom) */}
        {quizLevel === 'custom' && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Type size={16} /> {t('quiz.type')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'writing', label: '✍️ ' + t('quiz.questionType.writing') },
                { id: 'interpretation', label: '🗣️ ' + t('quiz.questionType.interpretation') },
                { id: 'cloze', label: '🧩 ' + t('quiz.questionType.cloze') },
                { id: 'speaking', label: '🎤 ' + t('quiz.questionType.speaking') },
                { id: 'listening', label: '🎧 ' + t('quiz.questionType.listening') },
                { id: 'random', label: '🔀 Random' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setQuizType(t.id as 'random' | 'writing' | 'interpretation' | 'cloze' | 'speaking' | 'listening')}
                  className={`py-3 px-2 text-xs font-bold rounded-xl transition-all border-2 ${
                    quizType === t.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' 
                      : 'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <FunButton 
          onClick={onStartQuiz}
          fullWidth
          variant="primary"
          className="text-lg"
        >
          {t('quiz.start')}
        </FunButton>
      </div>
    </div>
  );
}
