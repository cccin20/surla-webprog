import Button from '../components/Button';

const articles = [
  {
    id: 1,
    tag: 'React',
    title: 'My First React App — What I Learned',
    description:
      "Building my first React application was a rollercoaster. From understanding JSX to managing state, here's everything I discovered along the way.",
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    date: 'March 10, 2025',
    readTime: '4 min read',
  },
  {
    id: 2,
    tag: 'CSS',
    title: 'Why Tailwind CSS Clicked for Me',
    description:
      "I used to think writing utility classes was messy and unreadable. Then I actually tried Tailwind on a real project — and I never looked back.",
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80',
    date: 'March 3, 2025',
    readTime: '3 min read',
  },
  {
    id: 3,
    tag: 'Tools',
    title: "Git & GitHub: A Student's Survival Guide",
    description:
      'From init to pull requests — a practical breakdown of the Git commands every IT student needs to know before their first group project disaster.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80',
    date: 'Feb 24, 2025',
    readTime: '5 min read',
  },
  {
    id: 4,
    tag: 'Project',
    title: 'Building a Portfolio with Vite + React',
    description:
      'How I scaffolded, structured, and styled my personal portfolio from scratch using Vite, React Router, and Tailwind CSS — step by step.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    date: 'Feb 15, 2025',
    readTime: '6 min read',
  },
];

const tagColors = {
  React:   'bg-[#eef2ff] text-[#4f46e5] border border-[#c7d2fe]',
  CSS:     'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]',
  Tools:   'bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]',
  Project: 'bg-[#faf5ff] text-[#7c3aed] border border-[#e9d5ff]',
};

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* Hero Section */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
            My Dev Blog
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#0f172a] sm:text-5xl">
            Learning in Public
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#64748b] sm:text-lg">
            I document my journey as a BSIT student — the breakthroughs, the bugs,
            and everything in between. Honest write-ups from a developer still figuring things out.
          </p>
          <div className="mt-8">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="border-b border-[#e2e8f0] bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-6">
            Latest Post
          </p>
          <article className="group rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid lg:grid-cols-2">
            <div className="overflow-hidden h-64 lg:h-auto">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${tagColors[articles[0].tag]}`}>
                {articles[0].tag}
              </span>
              <h2 className="text-2xl font-bold text-[#0f172a] sm:text-3xl leading-tight">
                {articles[0].title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#64748b]">
                {articles[0].description}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-[#94a3b8]">
                <span>{articles[0].date}</span>
                <span>·</span>
                <span>{articles[0].readTime}</span>
              </div>
              <Button variant="primary" className="mt-6 w-fit">Read Article</Button>
            </div>
          </article>
        </div>
      </section>

      {/* Article Grid */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-3">
            All Posts
          </p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">More Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {articles.slice(1).map((article) => (
              <article
                key={article.id}
                className="group rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-[#a5b4fc] transition-all duration-300"
              >
                <div className="overflow-hidden h-44">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${tagColors[article.tag]}`}>
                    {article.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0f172a] leading-snug">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748b]">{article.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-[#94a3b8]">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Button className="mt-4">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4f46e5] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want to follow my journey?
          </h2>
          <p className="mt-4 text-[#c7d2fe] text-base max-w-lg mx-auto">
            Check out my GitHub to see what I'm currently building, or connect with me on LinkedIn.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/cccin20"
              className="inline-flex items-center gap-2 bg-white text-[#4f46e5] font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#eef2ff] transition-all shadow-md"
            >
              GitHub Profile
            </a>
            
            <a
              href="https://www.linkedin.com/in/cindy-ella-surla-b2575926b/"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
