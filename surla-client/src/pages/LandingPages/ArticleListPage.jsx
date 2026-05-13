import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchPublishedArticles } from '../../services/ArticleService.js';
import { toDisplayArticle } from '../../utils/articleMapper.js';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetchPublishedArticles();
        setArticles(response.data.map(toDisplayArticle));
      } catch (err) {
        console.error('Failed to load articles:', err);
        setError('Unable to load articles right now.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Notes from my frontend learning journey
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A collection of lessons, goals, and project reflections from building with React, Tailwind CSS, Git, and modern web tools.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">What I am learning and building</h2>
        </div>
        {loading && (
          <p className="text-sm font-medium text-zinc-600">Loading articles...</p>
        )}
        {!loading && error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}
        {!loading && !error && articles.length === 0 && (
          <p className="text-sm font-medium text-zinc-600">No published articles yet.</p>
        )}
        {!loading && !error && articles.length > 0 && (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
}

export default ArticleListPage;
