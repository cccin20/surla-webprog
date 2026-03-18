import Button from '../components/Button';

const stats = [
  { value: '58', label: 'Technologies' },
  { value: '3rd', label: 'Year BSIT' },
  { value: '115', label: 'Lab Activities' },
];

const projects = [
  {
    title: 'Portfolio Website',
    tech: 'React · Tailwind CSS · Vite',
    description:
      'A personal portfolio built with React and Tailwind CSS showcasing my projects, skills, and blog posts.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
    link: '/about',
  },
  {
    title: 'Blog Platform',
    tech: 'React · React Router',
    description:
      'A multi-page blog app using React Router for navigation with dynamic routing and reusable card components.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    link: '/articles',
  },
  {
    title: 'UI Component Library',
    tech: 'React · Tailwind CSS',
    description:
      'A collection of reusable UI components like buttons, cards, and navbars built for consistency and scalability.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    link: '/about',
  },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* Hero Section */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
              Available for Opportunities
            </span>
            <h1 className="text-4xl font-bold leading-tight text-[#0f172a] sm:text-5xl lg:text-6xl">
              Hi, I'm Cindy. <br />
              <span className="text-[#4f46e5]">I build things</span> <br />
              for the web.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#64748b] sm:text-lg">
              A 3rd year BSIT student passionate about frontend development,
              clean UI design, and learning more about Technologies and Business. Currently exploring React and Tailwind CSS.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">View My Work</Button>
              <Button to="/articles">Read My Blog</Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-2 border-[#e2e8f0] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Coding setup"
                className="w-full h-80 object-cover lg:h-96"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#e2e8f0] rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs font-semibold text-[#4f46e5] uppercase tracking-wider">Stack</p>
              <p className="text-sm font-bold text-[#0f172a] mt-0.5">React · Tailwind · Vite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[#e2e8f0] bg-white px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#64748b] mb-6">
            Quick Overview
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 shadow-sm hover:shadow-md hover:border-[#a5b4fc] transition-all duration-200"
              >
                <p className="text-3xl font-bold text-[#4f46e5]">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748b]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-2">
                Featured Work
              </p>
              <h2 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">My Recent Projects</h2>
            </div>
            <Button to="/about">See All</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-[#a5b4fc] transition-all duration-300"
              >
                <div className="overflow-hidden h-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4f46e5]">
                    {project.tech}
                  </span>
                  <h3 className="mt-1.5 text-lg font-bold text-[#0f172a]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748b]">{project.description}</p>
                  <Button to={project.link} variant="primary" className="mt-4 w-full justify-center">
                    View Project
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#4f46e5] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want to work together?
          </h2>
          <p className="mt-4 text-[#c7d2fe] text-base max-w-xl mx-auto">
            I'm always open to new projects, collaborations, or just a friendly chat about tech.
          </p>
          <a
            href="mailto:inquiry.cindy111@gmail.com"
            className="mt-8 inline-flex items-center gap-2 bg-white text-[#4f46e5] font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#eef2ff] transition-all duration-200 shadow-md"
          >
            Get In Touch
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;