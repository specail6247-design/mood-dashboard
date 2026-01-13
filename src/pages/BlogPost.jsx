import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import AdPlaceholder from '../components/AdPlaceholder';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | 감성 대시보드</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${post.title}",
              "datePublished": "${post.date}",
              "author": {
                "@type": "Person",
                "name": "감성 에디터"
              },
              "publisher": {
                "@type": "Organization",
                "name": "감성 대시보드",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://mood-dashboard.com/logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <div className="py-8 animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로 돌아가기
        </Link>

        <article className="prose prose-slate dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-p:leading-relaxed max-w-none">
          <h1 className="mb-4">{post.title}</h1>
          <div className="text-sm text-slate-400 dark:text-slate-500 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            {post.date} · 감성 에디터
          </div>

          <AdPlaceholder className="my-8 h-32" />

          {/* Render HTML content safely since it's from our own data file */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <AdPlaceholder className="mt-16 h-64" />
      </div>
    </>
  );
}
