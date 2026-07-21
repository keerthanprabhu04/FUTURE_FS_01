import { Project, SkillCategory, ExperienceItem, EducationItem } from "./types";

export const developerProfile = {
  name: "John Doe",
  title: "Full Stack Web Developer",
  tagline: "Building elegant, scalable, and highly interactive user-centric digital solutions.",
  about: "I am an enthusiastic Full Stack Web Development Intern with a passion for crafting responsive frontend interfaces and architecting performant, secure backend services. Equipped with a strong foundation in modern JavaScript/TypeScript ecosystems, I specialize in React, Node.js, Express, and cloud database structures. My approach combines clean engineering architectures with responsive design patterns to deliver flawless user experiences that drive actual business value.",
  email: "johndoe@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "#", // Placeholder
  location: "San Francisco, CA (Open to Remote)",
  availability: "Available for freelance & full-time roles"
};

export const projectsData: Project[] = [
  {
    id: "task-manager-pro",
    title: "TaskFlow - Agile Scrum Board",
    description: "A highly collaborative drag-and-drop Kanban and scrum project management tool featuring productivity telemetry and state persistence.",
    longDescription: "TaskFlow is a comprehensive productivity application designed for remote engineering teams. It implements fluid drag-and-drop mechanics for project task states, customizable sprints, team velocity charts, and integrated real-time state synchronization. Built with a full-stack architecture, it secures user workspaces and handles deep metadata queries effortlessly.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Express", "Node.js", "Tailwind CSS", "Motion", "LocalStore"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    category: "Full Stack",
    role: "Lead Full-Stack Developer",
    challenges: "Enforcing synchronous state management and smooth card animations during intensive dragging sessions. Solved by integrating debounced browser animations with standard React state keys.",
    highlights: [
      "Custom drag-and-drop state machines built without bloated external libraries.",
      "Beautiful data visualizers built using SVG-based dynamic renderers.",
      "Optimized performance to support 500+ active task cards with sub-millisecond lag."
    ]
  },
  {
    id: "ai-code-companion",
    title: "DevMind - AI Code Reviewer",
    description: "An intelligent browser-based coding companion powered by Gemini AI that audits structural bugs, security hazards, and code quality.",
    longDescription: "DevMind integrates the power of modern Large Language Models directly into the developer workflow. Users paste code snippets or connect small repositories, and the assistant generates real-time recommendations, syntax trees, safety ratings, and automated refactoring recommendations with interactive diff overlays.",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
    tags: ["TypeScript", "React", "Gemini API", "Tailwind CSS", "Lucide Icons"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    category: "AI/Data",
    role: "AI Integration Engineer",
    challenges: "Parsing code fragments securely and streaming live response tokens over browser components without UI blocking. Mitigated using React-suspended render gates and fiber-bound chunks.",
    highlights: [
      "Secured API communications with specialized server-side proxies.",
      "Implemented beautiful side-by-side split screen diff visualizations.",
      "Includes instant dark/light code highlighting matching developer preferences."
    ]
  },
  {
    id: "e-commerce-horizon",
    title: "Horizon - Headless Storefront",
    description: "A lightning-fast, ultra-responsive e-commerce experience with headless inventory management, dynamic filtering, and secure Stripe checkouts.",
    longDescription: "Horizon redefines digital commerce speeds. It handles catalog inventories on a headless architecture, using React on the frontend and an Express microservice backend. It features faceted search filters, smart suggestions, cart calculators, coupon checkers, and a fully production-tested Stripe payment pipeline.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Express", "Stripe API", "Node.js", "Tailwind CSS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    category: "Full Stack",
    role: "Backend Architect & Frontend Engineer",
    challenges: "Handling concurrent stock allocation requests and race conditions securely during checkout. Mitigated using transactional inventory locks on the Node backend.",
    highlights: [
      "Fully production-tested Stripe payment integration with checkout webhooks.",
      "Fluid, sub-100ms faceted searches across extensive catalog listings.",
      "Polished, mobile-first responsive layout with native swipe gesture menus."
    ]
  },
  {
    id: "dev-social-network",
    title: "SnippetHub - Developer Collaboration",
    description: "An interactive social forum and snippet manager for student developers and interns to share, review, and collaborate on code issues.",
    longDescription: "SnippetHub operates as a specialized social platform tailored specifically for computer science students and engineering interns. Users publish clean snippets of code, attach descriptive tags, create study spaces, and receive collaborative feedback in community-voted comment systems. It features clean search indexing and high-fidelity code rendering.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Express", "Node.js", "Tailwind CSS", "Motion"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    category: "Frontend",
    role: "Frontend UX Engineer",
    challenges: "Rendering and editing multiple code snippets on a single page without performance degradation. Solved using virtualized scroll boundaries.",
    highlights: [
      "Fully interactive code snippet highlighting engine supporting over 15 programming languages.",
      "Modern dashboard styled with glassmorphism panels, soft gradients, and crisp spacing.",
      "Custom markdown comment parser allowing rich descriptions, equations, and tables."
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "React / React 19", level: 92, iconName: "Atom" },
      { name: "TypeScript", level: 88, iconName: "FileCode" },
      { name: "Tailwind CSS v4", level: 95, iconName: "Palette" },
      { name: "Vite / Bundlers", level: 85, iconName: "Zap" },
      { name: "HTML5 & CSS3 / Flexbox", level: 98, iconName: "Code" },
      { name: "Framer Motion / Animations", level: 80, iconName: "Activity" }
    ]
  },
  {
    id: "backend",
    name: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Node.js", level: 85, iconName: "Terminal" },
      { name: "Express.js", level: 88, iconName: "Cpu" },
      { name: "REST APIs Architecture", level: 90, iconName: "Network" },
      { name: "Database Design (JSON/SQL)", level: 80, iconName: "Database" },
      { name: "Security & Authentication", level: 78, iconName: "Shield" }
    ]
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: "Settings",
    skills: [
      { name: "Git & GitHub Versioning", level: 90, iconName: "GitBranch" },
      { name: "Docker Containers", level: 70, iconName: "Layers" },
      { name: "Vercel / Heroku Deployment", level: 82, iconName: "Cloud" },
      { name: "Linux Shell & Scripting", level: 75, iconName: "Cpu" },
      { name: "Chrome DevTools & Debugging", level: 88, iconName: "Eye" }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "future-interns-job",
    role: "Full Stack Web Development Intern",
    company: "Future Interns",
    duration: "July 2026 - Present",
    description: [
      "Designing and implementing a production-grade full-stack personal portfolio application with interactive administrative portals.",
      "Developing modular React components utilizing Tailwind CSS v4 and Framer Motion for responsive, eye-pleasing layout interactions.",
      "Structuring Node.js Express server APIs with local JSON storage, securing dashboard credentials, and managing contact inquiries efficiently."
    ],
    tags: ["React 19", "Express.js", "TypeScript", "Tailwind CSS", "esbuild"]
  },
  {
    id: "freelance-developer",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    duration: "Jan 2025 - June 2026",
    description: [
      "Delivered responsive websites and landing pages for local small businesses, optimizing SEO scores by over 35% on average.",
      "Integrated simple local payment pipelines and contact forms with automated email alerts and state-persisting logs.",
      "Migrated static HTML websites to modern React structures, improving code maintainability and component reusability."
    ],
    tags: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS", "GitHub Pages"]
  }
];

export const educationData: EducationItem[] = [
  {
    id: "btech-cse",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "State Technological University",
    duration: "2021 - 2025",
    description: "Focusing on core computing foundations including Algorithms, Database Management Systems, Web Technology, Software Engineering, and Object-Oriented Design."
  },
  {
    id: "fullstack-cert",
    degree: "Advanced Full-Stack Engineering Specialization",
    institution: "Tech Academy Online",
    duration: "2026",
    description: "An intensive certification program covering modern JavaScript framework structures, Express.js REST API designs, secure databases, version control, and cloud deployments."
  }
];
