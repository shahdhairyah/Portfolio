export const skills = [
  { name: "HTML5", category: "frontend", level: 5, tier: "core", description: "Semantic markup & accessibility" },
  { name: "CSS3", category: "frontend", level: 5, tier: "core", description: "Animations, Grid, Flexbox" },
  { name: "JavaScript", category: "frontend", level: 4, tier: "core", description: "ES6+, DOM, async patterns" },
  { name: "React.js", category: "frontend", level: 4, tier: "core", description: "Hooks, context, component architecture" },
  { name: "Bootstrap", category: "frontend", level: 4, tier: "supporting", description: "Responsive grid & components" },
  { name: "Tailwind CSS", category: "frontend", level: 5, tier: "core", description: "Utility-first styling at scale" },
  { name: "PHP", category: "backend", level: 4, tier: "core", description: "Server-side logic & APIs" },
  { name: "MySQL", category: "backend", level: 4, tier: "core", description: "Relational DB design & queries" },
  { name: "Python", category: "backend", level: 3, tier: "supporting", description: "Scripting & automation" },
  { name: "Node.js", category: "backend", level: 3, tier: "supporting", description: "Express, REST APIs" },
  { name: "Git", category: "tools", level: 4, tier: "core", description: "Version control & branching" },
  { name: "GitHub", category: "tools", level: 4, tier: "core", description: "Collaboration & CI/CD" },
  { name: "VS Code", category: "tools", level: 5, tier: "supporting", description: "Extensions & workspace setup" },
  { name: "XAMPP", category: "tools", level: 4, tier: "supporting", description: "Local dev environment" },
];

/* Grouping by how the technology is actually used in shipping work */
export const skillTiers = [
  {
    id: "core",
    label: "Core Stack",
    blurb:
      "The technologies I reach for on every production build — daily, deep, and battle-tested under deadlines.",
  },
  {
    id: "supporting",
    label: "Supporting",
    blurb:
      "Tools I'm confident shipping with and pull in when a project calls for them.",
  },
];

export const tierFor = (tierId) =>
  skillTiers.find((tier) => tier.id === tierId) || {
    id: tierId,
    label: tierId,
    blurb: "",
  };

export const skillCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
];

export const categoryColors = {
  frontend: "#f97316",
  backend: "#06b6d4",
  tools: "#a855f7",
};

const SKILL_ALIASES = {
  html5: ["html", "html5"],
  css3: ["css", "css3"],
  javascript: ["javascript", "js", "es6+"],
  "react.js": ["react", "reactjs", "react 18", "react.js"],
  "tailwind css": ["tailwind", "tailwind css"],
  "node.js": ["node", "nodejs", "node.js", "express"],
  "vs code": ["vs code", "vscode"],
};

export const projectsUsingSkill = (name, projects = []) => {
  const key = String(name || "").toLowerCase();
  const aliases = SKILL_ALIASES[key] || [key];

  return projects.filter((project) =>
    (project.stack || []).some((tech) => {
      const normalized = String(tech).toLowerCase();
      return aliases.some(
        (alias) => normalized === alias || normalized.includes(alias)
      );
    })
  );
};