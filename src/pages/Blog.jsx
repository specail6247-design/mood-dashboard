import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>감성 블로그 | 감성 대시보드</title>
        <meta name="description" content="색채 심리학, 디지털 웰빙, 그리고 감성 AI 기술에 대한 이야기를 만나보세요." />
      </Helmet>
      
      <div className="py-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-2 text-center">
          감성 이야기
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-12">
          마음을 움직이는 기술과 예술에 대하여
        </p>

        <AdPlaceholder className="mb-12 h-32" />

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                {post.date}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug}`}
                className="inline-block mt-4 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
              >
                더 읽어보기 →
              </Link>
            </article>
          ))}
        </div>
        
        <AdPlaceholder className="mt-12 h-64" />
      </div>
    </>
  );
}
