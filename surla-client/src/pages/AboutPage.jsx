import Button from '../components/Button';
import profileImg from '../assets/CS_Profile.JPG';

const stats = [
  { value: '3rd', label: 'Year Level' },
  { value: '5+', label: 'Projects' },
  { value: '8', label: 'Technologies' },
  { value: '0', label: 'Certification' },
];

const skills = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'JavaScript', level: 75 },
  { name: 'React JS', level: 70 },
  { name: 'Tailwind CSS', level: 80 },
  { name: 'Git & GitHub', level: 72 },
  { name: 'Vite', level: 65 },
];

const tools = [
  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Figma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      {/* Hero / Profile Section */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">

          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-72 h-80 rounded-3xl overflow-hidden border-2 border-[#e2e8f0] shadow-xl">
                <img
                  src={profileImg}
                  alt="Cindy Surla"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-[#e2e8f0] rounded-full px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#475569]">Open to Work</span>
              </div>
            </div>
          </div>

          <div>
            <span className="inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] bg-[#eef2ff] border border-[#c7d2fe] px-3 py-1 rounded-full">
              About Me
            </span>
            <h1 className="text-4xl font-bold leading-tight text-[#0f172a] sm:text-5xl">
              Cindy Surla
            </h1>
            <p className="mt-2 text-lg font-medium text-[#4f46e5]">
              Frontend Developer · BSIT Student
            </p>
            <p className="mt-5 text-base leading-7 text-[#64748b]">
              I'm a 3rd year Bachelor of Science in Information Technology student with a deep
              passion for building beautiful and functional web applications. I love turning
              designs into real, working interfaces using React and Tailwind CSS.
            </p>
            <p className="mt-3 text-base leading-7 text-[#64748b]">
              When I'm not coding, I'm exploring new design trends, writing about what I learn,
              and working on personal projects to grow my skills every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Read My Blog</Button>
              <a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-[#e2e8f0] text-[#64748b] text-[11px] font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full hover:border-[#a5b4fc] hover:text-[#4f46e5] transition-all"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[#e2e8f0] bg-white px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#64748b] mb-6">
            Profile Overview
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 shadow-sm hover:border-[#a5b4fc] transition-all"
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

      {/* Skills + Story Section */}
      <section className="border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-3">
              My Story
            </p>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Background & Education</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4f46e5] mb-1">Education</p>
                <h3 className="text-base font-bold text-[#0f172a]">Bachelor of Science in Information Technology with specialization in Mobile and Web Application</h3>
                <p className="text-sm text-[#64748b] mt-1">University · 2023 – Present</p>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4f46e5] mb-1">Focus</p>
                <h3 className="text-base font-bold text-[#0f172a]">Frontend Web Development</h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Specializing in React, component-based architecture, and responsive UI design with Tailwind CSS.
                </p>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4f46e5] mb-1">Goal</p>
                <h3 className="text-base font-bold text-[#0f172a]">Full-Stack Developer</h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Working towards becoming a full-stack developer by learning Node.js, databases, and backend architecture.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-3">
              Technical Skills
            </p>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">What I Work With</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-[#1e293b]">{skill.name}</span>
                    <span className="text-sm font-semibold text-[#4f46e5]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4f46e5] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="border-b border-[#e2e8f0] bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f46e5] mb-3">
            My Toolkit
          </p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Tools & Technologies</h2>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4 shadow-sm hover:shadow-md hover:border-[#a5b4fc] transition-all"
              >
                <img src={tool.img} alt={tool.name} className="w-8 h-8" />
                <span className="text-[10px] font-semibold text-[#64748b] text-center">{tool.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button to="/articles">Read My Blog</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;