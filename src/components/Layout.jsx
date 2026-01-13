import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import ApiKeyInput from './ApiKeyInput';
import { useState } from 'react';

export default function Layout() {
  const [apiKey, setApiKey] = useState('');

  return (
    <div className="min-h-screen bg-brand-50 selection:bg-brand-200 dark:bg-slate-900 transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-brand-50/50 to-brand-100/20 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950" />
      
      <main className="relative z-10 container mx-auto px-4 max-w-lg min-h-screen flex flex-col">
        <ApiKeyInput onKeySet={setApiKey} />
        <Header />
        <Outlet context={{ apiKey }} />
        
        <footer className="py-8 mt-auto border-t border-slate-200 dark:border-slate-800">
           <div className="flex flex-col items-center gap-4 text-xs text-slate-400 dark:text-slate-600">
              <div className="flex gap-4">
                <Link to="/privacy" className="hover:text-slate-600 dark:hover:text-slate-400">개인정보처리방침</Link>
                <Link to="/terms" className="hover:text-slate-600 dark:hover:text-slate-400">이용약관</Link>
              </div>
              <p>© 2026 Mood Dashboard. All rights reserved.</p>
           </div>
        </footer>
      </main>
    </div>
  );
}
