/**
 * GitHub API Direct-Publishing Engine
 * Allows the website owner to commit updated portfolio data, photos,
 * and project screenshots directly to their GitHub repository from any browser.
 * This triggers an automatic Vercel production build visible to all devices.
 */

const REPO_OWNER = 'suvromahirarman-star';
const REPO_NAME = 'protfolio';
const BRANCH = 'main';
const GITHUB_TOKEN_KEY = 'portfolio_github_sync_token';

export function getSavedGitHubToken() {
  return localStorage.getItem(GITHUB_TOKEN_KEY) || '';
}

export function saveGitHubToken(token) {
  if (token) {
    localStorage.setItem(GITHUB_TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(GITHUB_TOKEN_KEY);
  }
}

/**
 * Fetches the current SHA of a file in the repo (needed by GitHub API to update it)
 */
async function getFileSha(path, token) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data.sha;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Commits a single file (text or binary base64) to the GitHub repository
 */
async function commitFileToGitHub({ path, contentBase64, message, token }) {
  const sha = await getFileSha(path, token);

  const body = {
    message,
    content: contentBase64,
    branch: BRANCH,
  };
  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to commit ${path} (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Formats portfolio data into standard JavaScript code for portfolioData.js
 */
export function generatePortfolioDataCode(developerInfo, socialLinks, projects, authConfig) {
  return `/**
 * Centralized Portfolio Data for Mahir Arman Suvro
 * Automatically updated via In-Browser Admin Studio.
 */

export const developerInfo = ${JSON.stringify(developerInfo, null, 2)};

export const socialLinks = ${JSON.stringify(socialLinks, null, 2)};

export const authConfig = ${JSON.stringify(
    authConfig || {
      pinHash: 'd2c6a1db88d44e95f6795a77e3805923fbea1bb4efca0d726ee5793adc15b0ee',
    },
    null,
    2
  )};

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
    { name: "Node.js", description: "Fast, asynchronous server-side JavaScript runtime for modern applications.", level: "Core Backend" },
    { name: "Express.js", description: "Minimalist web framework for routing, middleware pipelines, and API services.", level: "Framework" },
    { name: "REST APIs", description: "Architecting standardized HTTP endpoints with JSON serialization and status codes.", level: "Architecture" },
    { name: "CRUD APIs", description: "Building reliable Create, Read, Update, and Delete endpoints with input validation.", level: "Data Operations" },
    { name: "Server-Side Logic", description: "Handling application business rules, request validation, and error management.", level: "Engineering" },
  ],
  frontend: [
    { name: "HTML5", description: "Semantic document structure, accessibility standards, and SEO best practices.", level: "Markup" },
    { name: "CSS3", description: "Modern layouts using Flexbox, CSS Grid, custom properties, and smooth animations.", level: "Styling" },
    { name: "JavaScript", description: "Modern ES6+ syntax, asynchronous programming, and DOM interaction.", level: "Core Scripting" },
    { name: "Tailwind CSS", description: "Utility-first design systems, responsive utilities, and rapid styling.", level: "Modern CSS" },
    { name: "Responsive Design", description: "Mobile-first layouts adapting fluidly to smartphones, tablets, and large screens.", level: "UX Standard" },
  ],
  tools: [
    { name: "Git", description: "Distributed version control for tracking code changes, branching, and rebasing.", level: "Version Control" },
    { name: "GitHub", description: "Remote code repositories, open-source hosting, and collaborative workflows.", level: "Collaboration" },
    { name: "VS Code", description: "Primary development IDE configured with linting, debugging, and productivity tools.", level: "Environment" },
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

export const projectsData = ${JSON.stringify(projects, null, 2)};

export const processSteps = [
  { step: "01", title: "Understand", description: "I start by carefully reviewing your project goals, technical requirements, and target audience to make sure we are 100% aligned.", icon: "Compass" },
  { step: "02", title: "Plan", description: "I outline the architecture, REST endpoints, database structures, and component hierarchy to avoid surprises later.", icon: "FileCode" },
  { step: "03", title: "Build", description: "I write clean, modular, and maintainable code with thorough testing, keeping communication transparent throughout.", icon: "Code2" },
  { step: "04", title: "Refine & Deliver", description: "I review performance, mobile responsiveness, and API robustness before handoff, ensuring effortless future scaling.", icon: "CheckCircle" },
];

export const whyChoosePoints = [
  { title: "Backend + Frontend Synergy", description: "I understand how frontend components request data and how backend controllers process it, eliminating integration headaches.", icon: "Zap" },
  { title: "Clean RESTful Architecture", description: "Adhering to standard HTTP verbs, clean route nesting, and consistent JSON envelope responses that clients love.", icon: "Layers" },
  { title: "Responsive & Performance-Minded", description: "Mobile-first interfaces styled with modern Tailwind utilities for fast loading and zero layout shifts.", icon: "Shield" },
  { title: "Direct & Reliable Communication", description: "Clear milestone updates, transparent timelines, and code that is thoroughly documented for your team.", icon: "Clock" },
];

export const journeyTimeline = [
  { milestone: "HTML, CSS & Web Foundations", year: "Core Fundamentals", detail: "Mastered semantic HTML5 document structures, responsive layouts, CSS Grid, Flexbox, and cross-browser styling." },
  { milestone: "Modern JavaScript & DOM", year: "Client-Side Engineering", detail: "Deep dive into ES6+, asynchronous programming, Fetch API, closures, event-driven interfaces, and DOM manipulation." },
  { milestone: "Node.js & Backend Architecture", year: "Server-Side Logic", detail: "Built high-performance event-loop services, file streaming, HTTP modules, and asynchronous processing." },
  { milestone: "Express.js & REST API Systems", year: "API Specialization", detail: "Designed production-ready CRUD endpoints, route middleware pipelines, request validation, and status envelope design." },
  { milestone: "Full-Stack & Freelance Production", year: "Present & Future", detail: "Building comprehensive web solutions, integrating databases, modern frontend frameworks, and deploying live applications." },
];

export const contactOptions = [
  { id: "backend", label: "Backend API Development" },
  { id: "crud", label: "CRUD Application" },
  { id: "frontend", label: "Frontend / Landing Page" },
  { id: "fullstack", label: "Full-Stack Web App" },
  { id: "consulting", label: "Code Review / Architecture" },
  { id: "other", label: "Other Inquiry" },
];
`;
}

/**
 * Publishes all current portfolio updates directly to GitHub
 * onProgress: callback with status string
 */
export async function publishToGitHub({
  token,
  developerInfo,
  socialLinks,
  projects,
  authConfig,
  onProgress,
}) {
  if (!token) {
    throw new Error('GitHub Personal Access Token is required to publish.');
  }

  onProgress?.('Preparing data package...');

  // 1. If profile photo is a base64 string, commit it directly to public/profile.jpg
  if (developerInfo.profileImage && developerInfo.profileImage.startsWith('data:image/')) {
    onProgress?.('Committing new profile photo to public/profile.jpg...');
    const base64Data = developerInfo.profileImage.split(',')[1];
    await commitFileToGitHub({
      path: 'public/profile.jpg',
      contentBase64: base64Data,
      message: 'feat: update profile photo from admin customizer',
      token,
    });
    // Set path in saved code to /profile.jpg
    developerInfo = { ...developerInfo, profileImage: '/profile.jpg' };
  }

  // 2. Commit custom project screenshots to public/projects/ if base64
  let updatedProjects = [...projects];
  for (let i = 0; i < updatedProjects.length; i++) {
    const proj = updatedProjects[i];
    const newScreenshots = [];

    const shots = proj.screenshots || (proj.image ? [proj.image] : []);
    for (let sIdx = 0; sIdx < shots.length; sIdx++) {
      const shot = shots[sIdx];
      if (typeof shot === 'string' && shot.startsWith('data:image/')) {
        onProgress?.(`Uploading screenshot for ${proj.title}...`);
        const ext = shot.substring(shot.indexOf('/') + 1, shot.indexOf(';')) || 'png';
        const filename = `${proj.id || 'project'}-${sIdx + 1}.${ext}`;
        const filePath = `public/projects/${filename}`;
        const base64Data = shot.split(',')[1];

        await commitFileToGitHub({
          path: filePath,
          contentBase64: base64Data,
          message: `feat: upload screenshot for ${proj.title}`,
          token,
        });

        newScreenshots.push(`/projects/${filename}`);
      } else {
        newScreenshots.push(shot);
      }
    }

    updatedProjects[i] = {
      ...proj,
      image: newScreenshots[0] || proj.image,
      screenshots: newScreenshots,
    };
  }

  // 3. Commit updated portfolioData.js
  onProgress?.('Updating portfolio data in GitHub repository...');
  const codeContent = generatePortfolioDataCode(
    developerInfo,
    socialLinks,
    updatedProjects,
    authConfig
  );
  const codeBase64 = btoa(unescape(encodeURIComponent(codeContent)));

  await commitFileToGitHub({
    path: 'src/data/portfolioData.js',
    contentBase64: codeBase64,
    message: 'feat: update portfolio links, bio and projects via admin customizer',
    token,
  });

  onProgress?.('Publishing complete! Vercel is now deploying your changes.');
  return true;
}

