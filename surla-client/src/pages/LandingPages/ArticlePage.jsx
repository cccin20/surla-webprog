import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { fetchPublishedArticles } from '../../services/ArticleService.js';
import { toDisplayArticle } from '../../utils/articleMapper.js';

const formatDate = (date) => {
  if (!date) return 'Recently published';

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const getReadingTime = (content) => {
  const words = content.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
};

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetchPublishedArticles();
        const articles = response.data.map(toDisplayArticle);
        setArticle(articles.find((item) => item.name === name) || null);
      } catch (err) {
        console.error('Failed to load article:', err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full flex-col">
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Loading article...</h1>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col">
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  const publishedDate = formatDate(article.createdAt);
  const readingTime = getReadingTime(article.content);
  const paragraphCount = article.content.length;

  return (
    <div className="flex w-full flex-col">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {article.author ? `By ${article.author}` : 'Article'}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
          {article.preview && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              {article.preview}
            </p>
          )}
          <p className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
              {publishedDate}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
              {readingTime} min read
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
              {paragraphCount} {paragraphCount === 1 ? 'section' : 'sections'}
            </span>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <article className="min-w-0">
            <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 shadow-sm aspect-video">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-5 text-zinc-700">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-zinc-700 whitespace-pre-wrap sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-slate-200 pt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </article>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Article Details
            </p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-semibold text-slate-900">Author</dt>
                <dd className="mt-1">{article.author || 'Cindy Ella'}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Published</dt>
                <dd className="mt-1">{publishedDate}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Topic</dt>
                <dd className="mt-1">
                  {article.name
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
