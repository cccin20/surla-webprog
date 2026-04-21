import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-0">
      <section className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc] px-6 py-20 lg:px-8">
        <div className="text-center max-w-lg mx-auto">

          <span className="inline-block mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
            404 Error
          </span>

          <h1 className="text-7xl font-bold text-[#0f172a] mb-4">404</h1>

          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            Page Not Found
          </h2>

          <p className="text-[#64748b] text-base leading-7 mb-10">
            The link you followed to get here must be broken, or the page has been removed.
            Let's get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#4f46e5] text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#4338ca] transition-all shadow-md"
            >
              Back to Home
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 border-2 border-[#c7d2fe] text-[#4f46e5] font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#eef2ff] transition-all"
            >
              Browse Articles
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;