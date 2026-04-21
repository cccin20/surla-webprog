const articles = [
  {
    name: "my-first-react-app",
    title: "My First React App — What I Learned",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    content: [
      "Building my first React application was a rollercoaster. From understanding JSX to managing state, every step taught me something new about modern web development.",
      "I started with Vite as my build tool, which made setup incredibly fast compared to Create React App. The hot module replacement alone saved me hours of refreshing.",
      "The biggest challenge was understanding component hierarchy — how data flows down through props and how to lift state up when siblings need to share information.",
      "By the end, I had a working app with multiple pages, a navbar, and dynamic content. It wasn't perfect, but it was mine — and that made all the difference."
    ]
  },
  {
    name: "why-tailwind-clicked",
    title: "Why Tailwind CSS Clicked for Me",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80",
    content: [
      "I used to think writing utility classes was messy and unreadable. Then I actually tried Tailwind on a real project — and I never looked back.",
      "The key insight was that keeping styles co-located with markup eliminates the mental overhead of context-switching between HTML and CSS files.",
      "Tailwind's responsive prefixes like sm:, md:, and lg: made building responsive layouts feel natural and intuitive rather than painful.",
      "For this portfolio, I used Tailwind exclusively. The indigo and slate color palette came together in minutes, and maintaining consistency across components was effortless."
    ]
  },
  {
    name: "git-github-survival-guide",
    title: "Git & GitHub: A Student's Survival Guide",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80",
    content: [
      "From init to pull requests — a practical breakdown of the Git commands every IT student needs to know before their first group project disaster.",
      "The commands I use daily: git status, git add ., git commit -m, git push, and git pull. Master these five and you're already ahead of most beginners.",
      "Branching saved my group projects. Creating a new branch per feature means broken code never touches main, and merging becomes a deliberate, reviewable process.",
      "My biggest Git lesson: commit often, write meaningful messages, and never force push to a shared branch. Your teammates will thank you."
    ]
  },
  {
    name: "building-portfolio-vite-react",
    title: "Building a Portfolio with Vite + React",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    content: [
      "How I scaffolded, structured, and styled my personal portfolio from scratch using Vite, React Router, and Tailwind CSS — step by step.",
      "The folder structure I settled on separates pages, components, and assets cleanly. Having a components/ folder for reusable pieces like Button and Layout kept things DRY.",
      "React Router v6 handles navigation between Home, About, and Articles pages. The nested routing pattern with a Layout wrapper means my Navbar and Footer render once.",
      "If you're a BSIT student looking to build your first portfolio, start simple — one page at a time. Complexity can come later. Shipping something real comes first."
    ]
  },
  {
    name: "react-props-and-styling",
    title: "Understanding React Props and Styling",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80",
    content: [
      "Props (short for properties) allow you to pass data between components. They are read-only and essential for component reusability.",
      "In this portfolio, the Button component accepts a 'to' prop for navigation and a 'variant' prop for styling — one component, many uses.",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and utility frameworks like Tailwind CSS.",
      "Choosing Tailwind for this project meant no separate CSS files for components — styles live right where the markup is, making the code easier to read and maintain."
    ]
  },
  {
    name: "react-router-dynamic-routes",
    title: "Dynamic Routing with React Router",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    content: [
      "React Router's dynamic segments like :name allow a single component to render different content based on the URL — perfect for article pages.",
      "Using useParams(), the ArticlePage component reads the URL parameter and finds the matching article from the data array.",
      "This pattern is the foundation of most real-world apps: a list page that links to individual detail pages, all driven by route parameters.",
      "Future plans include adding a 404 fallback for unknown article names and animating page transitions using Framer Motion."
    ]
  },
  {
    name: "javascript-es6-essentials",
    title: "ES6+ Features Every React Dev Should Know",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
    content: [
      "Modern React code leans heavily on ES6+ features. Understanding them makes reading and writing React feel natural rather than confusing.",
      "Destructuring, spread operators, and arrow functions appear in almost every React component. Template literals make dynamic strings clean and readable.",
      "Array methods like .map(), .filter(), and .find() are essential — React lists are almost always rendered using .map() over a data array.",
      "The optional chaining operator (?.) and nullish coalescing (??) have saved me from countless 'cannot read property of undefined' crashes."
    ]
  },
  {
    name: "component-reusability-patterns",
    title: "Writing Reusable Components in React",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&q=80",
    content: [
      "The best React components do one thing well and accept props to customize their behavior — like a Button that can be a link or trigger an action.",
      "In this portfolio, the ArticleList component receives an articles array as a prop and renders the cards — it doesn't care where the data comes from.",
      "Separating concerns between pages (what to show) and components (how to show it) makes code easier to test, debug, and reuse across projects.",
      "A good rule of thumb: if you're copying and pasting JSX more than twice, it's time to extract a component."
    ]
  },
  {
    name: "next-steps-typescript",
    title: "My Plan to Learn TypeScript Next",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    content: [
      "After getting comfortable with React and JavaScript, TypeScript is the next logical step — and honestly, I've been putting it off long enough.",
      "TypeScript adds static typing to JavaScript, catching bugs at compile time rather than runtime. For larger projects, this is a game changer.",
      "My plan is to gradually migrate this portfolio to TypeScript — starting with the article-content.js data file and then converting components one by one.",
      "Resources I'll be using: the official TypeScript docs, Matt Pocock's Total TypeScript, and just building things and reading the error messages carefully."
    ]
  },
  {
    name: "future-fullstack-goals",
    title: "Going Full Stack: My Roadmap Ahead",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    content: [
      "Frontend is just the beginning. My goal for the next year is to become comfortable building full stack applications using Node.js, Express, and a database.",
      "I plan to rebuild this portfolio's blog section with a real backend — articles stored in a database, an admin panel to write posts, and an API the React frontend consumes.",
      "Learning SQL and at least one ORM like Prisma is on the roadmap. Understanding how data is stored and queried is non-negotiable for any serious developer.",
      "The end goal: deploy a full stack app on a real server, with authentication, a database, and a CI/CD pipeline. One step at a time — but the direction is clear."
    ]
  }
];

export default articles;