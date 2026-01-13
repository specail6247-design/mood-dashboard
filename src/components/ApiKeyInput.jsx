import { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

export default function ApiKeyInput({ onKeySet }) {
  const [key, setKey] = useState('');
  const [isOpen, setIsOpen] = useState(() => {
    if (import.meta.env.VITE_GEMINI_API_KEY) return false;
    return !localStorage.getItem('gemini_api_key');
  });

  useEffect(() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey) {
      onKeySet(envKey);
      return;
    }

    const stored = localStorage.getItem('gemini_api_key');
    if (stored) {
      onKeySet(stored);
    }
  }, [onKeySet]);

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem('gemini_api_key', key);
      onKeySet(key);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-300 transition-colors">
        <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-white">
          <Key className="w-5 h-5 text-brand-500" />
          <h2 className="text-lg font-semibold font-display">Gemini API 키 입력</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-300 mb-4 word-keep-all">
          감성적인 명언과 시를 생성하려면 Google Gemini API 키가 필요합니다.
          키는 브라우저에 안전하게 저장됩니다.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIza..."
          className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
        <button
          onClick={handleSave}
          className="w-full bg-slate-800 dark:bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-brand-500 transition-colors"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
