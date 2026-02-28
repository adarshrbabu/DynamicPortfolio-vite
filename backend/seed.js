const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("./models/Project");
const Profile = require("./models/Profile");
const Experience = require("./models/Experience");

dotenv.config();

const profile = {
  name: "Adarsh R Babu",
  title: "Building Full-Stack\nweb applications with\nmodern tech.",
  heroSubtitle: "Software Engineer • Full Stack Developer",
  heroParagraph:
    "Hi, I'm Adarsh R Babu — a software engineer specializing in React, Next.js, and TypeScript. I build scalable, performant web applications that users love.",
  aboutParagraphs: [
    "Hey there! I'm a software developer who loves bridging the gap between design and solid engineering. I graduated in Computer Science and quickly discovered my passion for building web tools.",
    "Over the years, I've honed my skills in React, TypeScript, and elegant CSS architectures. I believe that great software should not only work flawlessly under the hood but also feel amazing to the end-user.",
    "When I'm away from the keyboard, you can probably find me playing guitar, hiking local trails, or experimenting with new coffee brewing methods. I'm always open to talking about tech, design, or the next big idea.",
  ],
  yearsExperience: 4,
  availableForWork: true,
  profileImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  resumeUrl: "/dummy-resume.pdf", // This will be the actual path or URL
  links: [
    {
      name: "GitHub",
      url: "https://github.com/adarshrbabu",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/adarsh-r-babu-b3974a21b/",
    },
  ],
  techStack: [
    {
      category: "Frontend",
      iconName: "Layout",
      skills: "React, Vue, Tailwind CSS",
    },
    {
      category: "Backend",
      iconName: "Database",
      skills: "Node.js, Express, PostgreSQL",
    },
    {
      category: "Languages",
      iconName: "Code2",
      skills: "TypeScript, JavaScript, Python",
    },
    {
      category: "Mobile",
      iconName: "Smartphone",
      skills: "React Native",
    },
  ],
};

const experiences = [
  {
    role: "Frontend Developer",
    company: "UL Technology Solutions",
    duration: "Apr 2024 — Feb 2026",
    description: [
      "Worked on large-scale, production-grade government and enterprise applications using React.js. Built reusable UI components with ShadCN UI, maintained a shared component library using Storybook, and handled complex document workflows including review, read-only modes, and PDF generation. Improved development quality using Vite, Vitest, and Husky pre-commit hooks.",
    ],
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Storybook",
      "Vite",
      "Vitest",
    ],
    order: 1,
  },
  {
    role: "Software Engineer (React.js & Node.js)",
    company: "Accolades Integrated",
    duration: "May 2023 — May 2024",
    description: [
      "Developed responsive and high-performance web applications using React.js and Next.js, integrated with backend APIs. Focused on performance optimization through lazy loading, code splitting, and browser caching. Collaborated closely with backend teams to deliver stable and scalable features.",
    ],
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
    ],
    order: 2,
  },
  {
    role: "Software Engineer (React.js & Node.js)",
    company: "Steyp Private Limited",
    duration: "Aug 2021 — Jan 2023",
    description: [
      "Built full-stack web applications using React.js and Node.js. Developed RESTful APIs with Express.js, implemented JWT-based authentication, and integrated frontend components with backend services. Optimized application performance and improved reliability through unit and integration testing.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "REST APIs", "JWT", "MongoDB"],
    order: 3,
  },
];

const projects = [
  {
    title: "Nexus Data Platform",
    description:
      "A high-performance real-time analytics dashboard processing millions of events per day.",
    tech: ["React", "TypeScript", "Tailwind", "WebSockets"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    order: 1,
  },
  {
    title: "Aura UI Library",
    description:
      "A modern, accessible component library built for internal company tools.",
    tech: ["Vue 3", "SCSS", "Storybook", "Vite"],
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    order: 2,
  },
  {
    title: "Quantum Commerce",
    description:
      "Headless e-commerce solution with sub-second page loads and seamless checkout.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    order: 3,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB...");

    await Promise.all([
      Project.deleteMany({}),
      Profile.deleteMany({}),
      Experience.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing data...");

    await Promise.all([
      Project.insertMany(projects),
      Profile.create(profile),
      Experience.insertMany(experiences),
    ]);
    console.log("🚀 Projects, Profile, and Experience successfully imported!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
