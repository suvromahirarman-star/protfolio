/**
 * Centralized Portfolio Data for Mahir Arman Suvro
 * Easily customize profile, links, projects, and skills from this single file.
 */

export const developerInfo = {
  name: "Mahir Arman Suvro",
  initials: "MAS",
  title: "Full-Stack Web Developer",
  specialization: "Backend Development • REST APIs • Modern Frontend",
  badge: "Available for Freelance Projects",
  headline: "Building Modern Web Experiences That Help Businesses Grow.",
  supportingHeadline: "Full-Stack Web Developer specializing in scalable backend systems, REST APIs, and responsive modern interfaces.",
  shortDescription: "I build reliable backend systems, REST APIs, and responsive web experiences with clean, maintainable code.",
  aboutBio: "I’m a web developer focused on building practical, reliable and user-friendly web applications. My current specialization is backend development, where I work with Node.js, Express.js and REST APIs. I also build responsive frontend interfaces using HTML, CSS, JavaScript and Tailwind CSS. As I expand toward full-stack development, I take pride in engineering clean architectures that turn complex business logic into intuitive digital solutions.",
  profileImage: "/profile.jpg",
  location: "Bangladesh (Working Globally)",
  availability: "Full-time / Part-time Freelance",
};

export const socialLinks = {
  // Replace these placeholders with your actual profile links
  github: "https://github.com/suvromahirarman-star", // YOUR_GITHUB_URL
  upwork: "https://www.upwork.com/freelancers/~YOUR_UPWORK_URL",
  fiverr: "https://www.fiverr.com/YOUR_FIVERR_URL",
  email: "YOUR_EMAIL@example.com", // Replace with your real contact email
};

export const authConfig = {
  pinHash: "d2c6a1db88d44e95f6795a77e3805923fbea1bb4efca0d726ee5793adc15b0ee", // Salted SHA-256 for default '1234'
};

export const quickStats = [
  { label: "Projects Built", value: "5+", detail: "Real applications & APIs" },
  { label: "REST API", value: "Backend", detail: "Express & Node architecture" },
  { label: "Responsive", value: "Frontend", detail: "Mobile-first modern UI" },
  { label: "Status", value: "Open", detail: "Available for freelance work" },
];

export const aboutPillars = [
  {
    title: "Backend Focused",
    description: "Deep focus on server-side logic, routing, and scalable API architecture with Node.js.",
    badge: "Core Strength",
  },
  {
    title: "Frontend Capable",
    description: "Designing clean, responsive, accessible interfaces using HTML, CSS, JavaScript & Tailwind.",
    badge: "User Interface",
  },
  {
    title: "API Development",
    description: "Architecting structured RESTful and CRUD endpoints adhering to HTTP standards.",
    badge: "Integration",
  },
  {
    title: "Clean & Maintainable Code",
    description: "Writing readable, modular, well-commented code built for painless future expansion.",
    badge: "Standard",
  },
];

export const skillsData = {
  backend: [
    {
      name: "Node.js",
      description: "Fast, asynchronous server-side JavaScript runtime for modern applications.",
      level: "Core Backend",
    },
    {
      name: "Express.js",
      description: "Minimalist web framework for routing, middleware pipelines, and API services.",
      level: "Framework",
    },
    {
      name: "REST APIs",
      description: "Architecting standardized HTTP endpoints with JSON serialization and status codes.",
      level: "Architecture",
    },
    {
      name: "CRUD APIs",
      description: "Building reliable Create, Read, Update, and Delete endpoints with input validation.",
      level: "Data Operations",
    },
    {
      name: "Server-Side Logic",
      description: "Handling application business rules, request validation, and error management.",
      level: "Engineering",
    },
  ],
  frontend: [
    {
      name: "HTML5",
      description: "Semantic document structure, accessibility standards, and SEO best practices.",
      level: "Markup",
    },
    {
      name: "CSS3",
      description: "Modern layouts using Flexbox, CSS Grid, custom properties, and smooth animations.",
      level: "Styling",
    },
    {
      name: "JavaScript",
      description: "Modern ES6+ syntax, asynchronous programming, and DOM interaction.",
      level: "Core Scripting",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first design systems, responsive utilities, and rapid styling.",
      level: "Modern CSS",
    },
    {
      name: "Responsive Design",
      description: "Mobile-first layouts adapting fluidly to smartphones, tablets, and large screens.",
      level: "UX Standard",
    },
  ],
  tools: [
    {
      name: "Git",
      description: "Distributed version control for tracking code changes, branching, and rebasing.",
      level: "Version Control",
    },
    {
      name: "GitHub",
      description: "Remote code repositories, open-source hosting, and collaborative workflows.",
      level: "Collaboration",
    },
    {
      name: "VS Code",
      description: "Primary development IDE configured with linting, debugging, and productivity tools.",
      level: "Environment",
    },
  ],
};

export const servicesData = [
  {
    id: "backend-dev",
    title: "Backend Development",
    description: "Build reliable backend systems and server-side applications using Node.js and Express.js, structured for stability and long-term growth.",
    icon: "Server",
    category: "Backend",
  },
  {
    id: "rest-api",
    title: "REST API Development",
    description: "Design and develop clean, structured REST APIs for web and mobile applications with standard HTTP status codes and consistent JSON payloads.",
    icon: "Network",
    category: "API",
  },
  {
    id: "crud-apps",
    title: "CRUD Applications",
    description: "Create efficient create, read, update, and delete systems for managing application data with robust validation and routing.",
    icon: "Database",
    category: "Backend",
  },
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Build responsive and modern interfaces using HTML, CSS, JavaScript, and Tailwind CSS that look stunning across all device sizes.",
    icon: "Layout",
    category: "Frontend",
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Connect frontend applications with backend APIs and external services, ensuring smooth asynchronous data flow and state handling.",
    icon: "PlugZap",
    category: "Integration",
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Development",
    description: "Combine responsive frontend interfaces with reliable backend functionality to create complete, production-ready web applications.",
    icon: "Layers",
    category: "Full-Stack",
  },
];

export const projectsData = [
  {
    id: "cineverse",
    title: "CineVerse Movie & Streaming Portal",
    category: "Full-Stack",
    filterTags: ["Frontend", "Backend", "Full-Stack"],
    featured: true,
    image: "/projects/cineverse.png",
    screenshots: [
      "/projects/cineverse.png",
      "/projects/api-banner.png",
      "/projects/api-features.png",
    ],
    description: "A full-featured modern movie and entertainment portal with high-definition media browsing, Dolby Atmos audio previews, and RESTful API backend.",
    overview: "CineVerse combines a responsive cinematic UI with a high-performance backend serving curated media streams, trending titles, category filters, and administrator content management.",
    problem: "Streaming web apps require seamless media metadata delivery and clean UI layouts that perform smoothly across devices without UI lag.",
    solution: "Built a modern frontend featuring rich movie cards, trailers, and responsive media players backed by organized REST API services.",
    technologies: ["JavaScript", "HTML5", "CSS3", "REST API", "Node.js", "Express"],
    features: [
      "Dynamic movie showcase with high-resolution hero banners",
      "Interactive media player and trailer modal",
      "Categorized browsing (Trending, Top Rated, Genres, Sci-Fi)",
      "Ready for Vercel edge deployment and serverless caching",
    ],
    github: "https://github.com/suvromahirarman-star/cineverse",
    liveDemo: null,
  },
  {
    id: "travello-tour",
    title: "Travello Tour CRUD API",
    category: "Backend",
    filterTags: ["Backend", "API"],
    featured: true,
    image: "/projects/api-banner.png",
    screenshots: [
      "/projects/api-banner.png",
      "/projects/api-features.png",
      "/projects/travello-tour.png",
    ],
    description: "A RESTful CRUD API designed for a tour management application, demonstrating backend routing, API architecture and CRUD functionality.",
    overview: "Travello Tour API provides a clean backend architecture for travel platforms to manage tour packages, bookings, customer inquiries, and destination metadata with modular Express routes.",
    problem: "Travel and tour operators need organized endpoints to query available packages, modify tour dates, and handle booking requests without payload confusion.",
    solution: "Developed an Express.js REST API with clear route compartmentalization, schema validation, consistent HTTP status responses, and complete CRUD operations.",
    technologies: ["Node.js", "Express.js", "REST API", "CRUD Architecture"],
    features: [
      "Modular Express route structure (/tours, /bookings, /categories)",
      "Standardized RESTful HTTP methods (GET, POST, PUT, DELETE)",
      "Centralized error handling and request validation middleware",
      "Clean JSON response envelopes with HTTP status codes",
      "Ready for MongoDB or relational database persistence",
    ],
    github: "https://github.com/suvromahirarman-star/Travello-Tour-CRUD-API",
    liveDemo: null,
  },
  {
    id: "student-management",
    title: "Student Management API",
    category: "Backend",
    filterTags: ["Backend", "API"],
    featured: true,
    image: "/projects/student-management.png",
    screenshots: [
      "/projects/student-management.png",
    ],
    description: "A backend API for managing student-related data with structured routes and CRUD functionality.",
    overview: "A lightweight, robust backend system designed for academic institutes to register students, update academic records, query by department, and maintain data integrity.",
    problem: "Managing student records manually or with ad-hoc endpoints leads to duplicate entries and insecure record updates.",
    solution: "Engineered a dedicated REST API with parameter validation, structured resource routes, and idempotent update endpoints.",
    technologies: ["Node.js", "Express.js", "REST API", "Input Validation"],
    features: [
      "Student registration and profile retrieval",
      "Route parameters for dynamic querying (/students/:id)",
      "Update and delete verification logic",
      "Standard error messages for non-existent records",
    ],
    github: "https://github.com/suvromahirarman-star/student-management-api", // YOUR_STUDENT_API_GITHUB_URL
    liveDemo: null,
  },
  {
    id: "simple-blog-api",
    title: "Simple Blog API",
    category: "Backend",
    filterTags: ["Backend", "API"],
    featured: true,
    image: "/projects/simple-blog-api.png",
    screenshots: [
      "/projects/simple-blog-api.png",
    ],
    description: "A backend API demonstrating blog management functionality and RESTful CRUD operations.",
    overview: "A modular content management API that empowers writers and platforms to publish, edit, draft, categorize, and fetch blog posts and author metadata.",
    problem: "Content platforms require structured endpoints that allow fast article reading while keeping publication and draft status orderly.",
    solution: "Crafted clean Express.js route handlers separating public read operations from administrative write and update endpoints.",
    technologies: ["Node.js", "Express.js", "REST API", "CRUD Architecture"],
    features: [
      "Article creation, update, retrieval, and deletion",
      "Slug generation and category filtering",
      "Structured JSON payloads with pagination support ready",
      "Strict HTTP status handling (200, 201, 400, 404, 500)",
    ],
    github: "https://github.com/suvromahirarman-star/simple-blog-api", // YOUR_BLOG_API_GITHUB_URL
    liveDemo: null,
  },
  {
    id: "express-routing",
    title: "Express.js Basic Server & Routing",
    category: "Backend",
    filterTags: ["Backend"],
    featured: false,
    image: "/projects/express-routing.png",
    screenshots: [
      "/projects/express-routing.png",
    ],
    description: "A practical Express.js project demonstrating server creation, routing and backend fundamentals.",
    overview: "A foundational reference architecture showcasing standard Express.js patterns: custom middleware chains, URL parsing, request logging, and environment configuration.",
    problem: "Developers frequently overcomplicate basic server configurations, resulting in hard-to-debug middleware bottlenecks.",
    solution: "Designed a clean, well-commented server template that demonstrates idiomatic Express patterns without external bloat.",
    technologies: ["Node.js", "Express.js", "Middleware", "HTTP Routing"],
    features: [
      "Custom request timing and logging middleware",
      "Multi-level nested route architecture",
      "Proper 404 fallback and global error catcher",
      "Environment configuration best practices",
    ],
    github: "https://github.com/suvromahirarman-star/express-basic-server", // YOUR_EXPRESS_ROUTING_GITHUB_URL
    liveDemo: null,
  },
  {
    id: "ai-prompt-app",
    title: "AI Prompt Web Application",
    category: "Frontend",
    filterTags: ["Frontend"],
    featured: false,
    image: "/projects/ai-prompt-app.png",
    screenshots: [
      "/projects/ai-prompt-app.png",
    ],
    description: "A web application focused on interacting with AI prompts through a clean web interface.",
    overview: "A responsive, distraction-free web tool built for organizing, customizing, and testing AI prompt templates with dynamic variables and quick copy utilities.",
    problem: "Managing dozens of AI prompts in spreadsheets or plain notes causes friction and slows down prompt testing.",
    solution: "Created an intuitive, dark-themed UI that enables fast searching, category tagging, and one-click template copying.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: [
      "Clean, modern user interface with zero clutter",
      "Dynamic prompt filtering and live search in Vanilla JS",
      "One-click copy to clipboard with toast notification",
      "Fully responsive across all screen dimensions",
    ],
    github: "https://github.com/suvromahirarman-star/ai-prompt-app", // YOUR_AI_PROMPT_GITHUB_URL
    liveDemo: "https://suvromahirarman-star.github.io/ai-prompt-app", // PROJECT_LIVE_URL (only shown if provided)
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "I start by carefully reviewing your project goals, technical requirements, and target audience to make sure we are 100% aligned.",
    icon: "Compass",
  },
  {
    step: "02",
    title: "Plan",
    description: "I outline the architecture, REST endpoints, database structures, and component hierarchy to avoid surprises later.",
    icon: "FileCode",
  },
  {
    step: "03",
    title: "Build",
    description: "I write clean, modular, and maintainable code with thorough testing, keeping communication transparent throughout.",
    icon: "Cpu",
  },
  {
    step: "04",
    title: "Deliver",
    description: "I test all functionality, verify responsiveness, perform deployment checks, and deliver the project ready for production.",
    icon: "CheckCircle",
  },
];

export const whyWorkWithMe = [
  {
    title: "Clean Code",
    description: "Readable and maintainable code structured for future improvements, with clear naming and modular separation.",
    icon: "Code2",
  },
  {
    title: "Responsive Design",
    description: "Interfaces that work smoothly and beautifully across desktop, tablet, and mobile devices.",
    icon: "Smartphone",
  },
  {
    title: "Backend Focus",
    description: "Strong focus on APIs, server-side logic, routing integrity, and application functionality.",
    icon: "Server",
  },
  {
    title: "Clear Communication",
    description: "Keep project requirements, progress updates, and technical trade-offs easy to understand without jargon.",
    icon: "MessageSquare",
  },
  {
    title: "Problem Solving",
    description: "Focus on practical, reliable solutions that solve real client problems rather than unnecessary complexity.",
    icon: "Wrench",
  },
  {
    title: "Continuous Improvement",
    description: "Always improving development skills, exploring modern patterns, and adopting industry best practices.",
    icon: "TrendingUp",
  },
];

export const freelanceJourney = {
  title: "Building My Freelance Journey",
  badge: "Active Freelancer",
  lead: "I am actively building a professional freelance career on Upwork and Fiverr, bringing solid technical fundamentals, dedicated communication, and a strong work ethic to every project.",
  paragraphs: [
    "Rather than displaying fabricated client reviews or exaggerated claims, I believe in letting real code and truthful competence speak for themselves. Every API, route, and interface I develop is built with the care and rigor expected of modern production applications.",
    "Whether you are an agency in need of a dependable backend pair of hands, an entrepreneur building a custom REST API, or a business owner looking for a responsive modern website, I treat your project with priority and commitment.",
  ],
  offerings: [
    "Direct 1-on-1 collaboration with no middlemen",
    "Fast turnaround with clear milestone updates",
    "Clean Git version control and organized repositories",
    "Post-delivery support and deployment assistance",
  ],
};

export const contactOptions = {
  projectTypes: [
    "Backend Development",
    "REST API",
    "Frontend Development",
    "Full-Stack Website",
    "API Integration",
    "Other",
  ],
  budgetRanges: [
    "Under $50",
    "$50 – $100",
    "$100 – $250",
    "$250 – $500",
    "$500+",
  ],
};
