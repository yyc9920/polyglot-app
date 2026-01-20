import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Pencil, Save, X, Loader2 } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

interface AiTutorModalProps {
  aiExplanation: string;
  setAiExplanation: (text: string) => void;
  isLoadingAi: boolean;
  onClose: () => void;
  onSaveMemo: () => void;
}

export function AiTutorModal({ 
  aiExplanation, 
  setAiExplanation, 
  isLoadingAi, 
  onClose, 
  onSaveMemo 
}: AiTutorModalProps) {
  const { t } = useLanguage();
  const [isAiEditing, setIsAiEditing] = useState(false);

  return (
    <div className="absolute inset-x-0 top-16 z-20 mx-4 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur shadow-2xl rounded-2xl border border-blue-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Sparkles size={16} /> {t('learn.aiTutor')}
        </h4>
        <div className="flex gap-2">
          {!isLoadingAi && aiExplanation && (
            <>
              <button 
                onClick={() => setIsAiEditing(!isAiEditing)}
                className={`text-gray-400 hover:text-blue-500 p-1 rounded ${isAiEditing ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' : ''}`}
              >
                <Pencil size={16}/>
              </button>
              <button onClick={onSaveMemo} className="text-blue-500 hover:text-blue-600 text-sm font-bold flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                <Save size={14}/> {t('common.save')}
              </button>
            </>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-200 min-h-[60px]">
        {isLoadingAi ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 size={16} className="animate-spin" /> {t('learn.thinking')}
          </div>
        ) : isAiEditing ? (
          <textarea 
            className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
            value={aiExplanation}
            onChange={(e) => setAiExplanation(e.target.value)}
            placeholder={t('learn.editExplanation')}
          />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>
              {aiExplanation}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
