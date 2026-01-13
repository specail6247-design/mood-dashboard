import { Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link to="/" className="flex items-center gap-2 text-slate-800 dark:text-white hover:text-brand-600 transition-colors">
        <Sparkles className="w-6 h-6 text-brand-500" />
        <h1 className="text-2xl font-display font-bold tracking-tight">감성 대시보드</h1>
      </Link>
      
      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/blog" className="hover:text-brand-500 transition-colors">블로그</Link>
          <Link to="/about" className="hover:text-brand-500 transition-colors">소개</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
