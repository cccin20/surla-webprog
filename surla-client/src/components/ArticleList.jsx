import { Link } from 'react-router-dom';
import Button from '../components/Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.id || article.name}
          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
        >
          <div className="overflow-hidden rounded-[1.25rem] aspect-video">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {(article.preview || article.content?.[0] || "").substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
