export const projects = [
  {
    id: 4,
    slug: "adit-cms",
    title: "ADIT CMS Platform",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    status: "Live",
    image: "/images/projects/ADITCMS/cover.png",
    coverPosition: "center 01%",
    tagline:
      "A full-stack content management system built for ADIT — a role-aware platform for managing departments, events, notices, gallery, and placements, replacing static pages with a dynamic, admin-controlled experience.",
    stack: ["React", "PHP", "MySQL", "Bootstrap", "REST API"],
    githubUrl: "https://github.com/shahdhairyah/ADITCMS",
    demoUrl: "https://adit.shahdhairyah.in/",
    featured: true,
    stats: [
      { value: "Full-stack", label: "Architecture" },
      { value: "Role-based", label: "Access Control" },
      { value: "Dynamic", label: "Content Mgmt" },
      { value: "Live", label: "In Production" },
    ],
    problemTitle: "Static Website, Zero Admin Control",
    problem:
      "The institution's website was static HTML — every update needed a developer. Departments had no way to publish events, notices, or gallery updates on their own, and content stayed outdated for weeks.",
    solutionTitle: "Dynamic CMS with Role-Based Admin Panel",
    solutionIntro:
      "Built a React-powered front end with a PHP REST API backend and MySQL database, giving admins and department heads a clean dashboard to manage every section of the site in real time.",
    solutionPoints: [
      "React front end with Bootstrap for a responsive, fast interface",
      "PHP REST API backend with MySQL for reliable data management",
      "Role-based access — admins and department heads see different dashboards",
      "Dynamic content sections: events, notices, gallery, placements",
      "Real-time content updates without touching code",
    ],
    capabilities: [
      "Role-Based Access",
      "Content Management",
      "REST API Backend",
      "Dynamic Pages",
      "Event & Notice Publishing",
      "Gallery Management",
    ],
    challenges: [
      {
        title: "Migrating Static to Dynamic",
        detail:
          "Replaced hardcoded HTML pages with a component-driven React front end while keeping the existing design language intact during the transition.",
      },
      {
        title: "API Design for Multiple Content Types",
        detail:
          "Designed a clean PHP REST API surface that handles events, notices, gallery, and placement data through consistent endpoints with proper validation.",
      },
      {
        title: "Role-Based Security",
        detail:
          "Implemented session-based auth with role middleware so department heads only manage their own sections while admins oversee everything.",
      },
    ],
  },
  {
    id: 1,
    slug: "centralized-dashboard",
    title: "Centralized Dashboard",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    status: "Live",
    image: "/images/projects/CD/cover.png",
    tagline:
      "A unified operations platform for a multi-department institution, aggregating attendance, performance, and administrative data into one real-time, role-aware dashboard. Replaced scattered spreadsheets with a single live source of truth for leadership and HODs.",
    stack: ["PHP", "MySQL", "Bootstrap", "jQuery", "Ajax"],
    githubUrl: "",
    demoUrl: "https://tm000030.zya.me",
    featured: false,
    stats: [
      { value: "5+", label: "Departments" },
      { value: "Real-time", label: "Analytics" },
      { value: "1", label: "Central Dashboard" },
      { value: "100%", label: "Centralized Data" },
    ],
    problemTitle: "Scattered Spreadsheets & Reporting Blindspots",
    problem:
      "Institution heads juggled data spread across spreadsheets and manual reports. Tracking sub-department performance and administrative metrics in real time was nearly impossible — leadership only saw the full picture weeks after the fact.",
    solutionTitle: "Unified Web Platform with Role-Based Access",
    solutionIntro:
      "Built a centralized platform where every department reports into one secure dashboard, with role-based views for admins and HODs, real-time analytics, and automated reporting.",
    solutionPoints: [
      "Role-based access control — admins, HODs, and staff each see only what they need",
      "Real-time analytics and interactive charts across all departments",
      "Centralized user, department, and permission management",
      "Automated report generation for quick decision-making",
      "Responsive interface optimized for daily office workflows",
    ],
    capabilities: [
      "Role-Based Dashboards",
      "Real-Time Analytics",
      "User & Permission Management",
      "Report Generation",
      "Department Oversight",
      "Centralized Records",
    ],
    challenges: [
      {
        title: "Normalizing Multi-Department Data",
        detail:
          "Designed a normalized MySQL schema that safely links departments, users, and records while keeping queries fast even as data grows.",
      },
      {
        title: "Secure Role-Based Access",
        detail:
          "Implemented PHP sessions with role middleware and REST-style endpoints so each role only ever reaches its own slice of the data.",
      },
      {
        title: "Adoption by Non-Technical Staff",
        detail:
          "Iterated the interface with department leads during UAT, trimming friction so daily reporting takes seconds instead of minutes.",
      },
    ],
  },
  {
    id: 2,
    slug: "smart-home-system",
    title: "Smart Home System",
    category: "IoT / Hardware",
    year: "2026",
    role: "Hardware & Software",
    status: "Live",
    image: "/images/projects/smart-iot/cover.webp",
    tagline:
      "A low-cost IoT home automation system. An ESP8266 WiFi module connects household appliances to a simple web interface for instant remote control — affordable, safe, and expandable.",
    stack: ["Arduino", "C++", "ESP8266", "IoT"],
    githubUrl: "",
    demoUrl: "",
    featured: false,
    stats: [
      { value: "WiFi", label: "Connected" },
      { value: "4+", label: "Appliances" },
      { value: "100%", label: "Expandable" },
      { value: "Low", label: "Cost build" },
    ],
    problemTitle: "Expensive, Locked-Down Smart-Home Kits",
    problem:
      "Commercial smart-home kits are expensive and locked to proprietary ecosystems. The need was a low-budget, DIY solution for controlling household appliances remotely without recurring subscriptions.",
    solutionTitle: "ESP8266 Relay Module Web Control",
    solutionIntro:
      "Wired relay modules to an ESP8266 and wrote lightweight C++ firmware that serves a control page, letting users toggle appliances from any device on the network.",
    solutionPoints: [
      "WiFi-based remote control with instant on/off",
      "Affordable ESP8266 hardware — no cloud lock-in",
      "Relay-based switching with safety margins for household loads",
      "Expandable architecture for more appliances and sensors",
    ],
    capabilities: [
      "Remote Appliance Control",
      "WiFi Enabled",
      "Relay Switching",
      "Expandable Build",
      "Web Interface",
      "Low-Cost Setup",
    ],
    challenges: [
      {
        title: "Reliable Appliance Switching",
        detail:
          "Wired relay modules and tested multiple household loads, adding safety margins and heat management for continuous use.",
      },
      {
        title: "Lightweight Firmware & UI",
        detail:
          "Wrote minimal C++ firmware that serves a responsive control page without bloating the ESP8266's limited memory.",
      },
      {
        title: "Expandability for Real Homes",
        detail:
          "Designed the module map so new appliances and sensors join the network without rewiring the core logic.",
      },
    ],
  },
  {
    id: 3,
    slug: "weather-application",
    title: "Weather Application",
    category: "Web Application",
    year: "2026",
    role: "Frontend Developer",
    status: "Live",
    image: "/images/projects/weather/cover.webp",
    tagline:
      "A real-time weather application that turns live API data into a clean, glanceable forecast — current conditions plus a multi-day outlook in a refined, responsive interface.",
    stack: ["HTML", "CSS", "JavaScript", "REST API"],
    githubUrl: "",
    demoUrl: "",
    featured: false,
    stats: [
      { value: "5-day", label: "Forecast" },
      { value: "Real-time", label: "Data" },
      { value: "100%", label: "Responsive" },
      { value: "1", label: "Tap search" },
    ],
    problemTitle: "Weather Data, Poorly Presented",
    problem:
      "Weather data is everywhere but rarely presented cleanly. The goal was a fast, beautiful interface that shows exactly what matters — the conditions now and in the coming days — without clutter.",
    solutionTitle: "Lightweight Fetch Layer + Mobile-First UI",
    solutionIntro:
      "Architected a small fetch layer with caching and designed a mobile-first UI around readability, weather icons, and graceful error states.",
    solutionPoints: [
      "Live current conditions with location-aware search",
      "5-day forecast presented at a glance",
      "Responsive, mobile-first interface",
      "Graceful offline and error handling",
    ],
    capabilities: [
      "Live Conditions",
      "5-Day Forecast",
      "Location Search",
      "Mobile-First UI",
      "Cached Fetching",
      "Error Resilience",
    ],
    challenges: [
      {
        title: "Fast, Cached Data Fetching",
        detail:
          "Built a small fetch layer with caching so repeat visits load instantly and API calls stay minimal.",
      },
      {
        title: "Readability Over Noise",
        detail:
          "Designed the interface around weather icons and key metrics, stripping clutter so conditions are understood in one glance.",
      },
      {
        title: "Responsive Across Devices",
        detail:
          "Tested across screen sizes and network conditions, ensuring graceful fallbacks when data can't load.",
      },
    ],
  },
  {
    id: 5,
    slug: "foodzip",
    title: "FoodZip",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    status: "Live",
    image: "/images/projects/FoodZip/cover.png",
    coverPosition: "center",
    tagline:
      "A fast, modern food ordering platform that streamlines browsing, ordering, and delivery tracking in one clean, responsive experience.",
    stack: ["React", "Node.js", "MongoDB", "REST API"],
    githubUrl: "",
    demoUrl: "https://foodzip.shahdhairyah.in/",
    featured: false,
    stats: [
      { value: "1", label: "Unified Platform" },
      { value: "Fast", label: "Ordering Flow" },
      { value: "100%", label: "Responsive" },
      { value: "Live", label: "In Production" },
    ],
    problemTitle: "Clunky Ordering, Slow Experience",
    problem:
      "Ordering food online shouldn't feel complicated. Legacy ordering experiences are overloaded with friction and slow pages, making it easy for users to abandon an order before it's placed.",
    solutionTitle: "Clean, Fast Ordering Experience",
    solutionIntro:
      "Built FoodZip as a modern, focused web application that takes users from browsing to checkout with minimal friction, a responsive layout, and real-time order tracking.",
    solutionPoints: [
      "Clean, mobile-first interface for browsing and ordering",
      "Streamlined checkout flow that reduces abandonment",
      "Real-time order status tracking",
      "Responsive design across all devices",
      "Fast, efficient data fetching for a smooth experience",
    ],
    capabilities: [
      "Menu Browsing",
      "Streamlined Checkout",
      "Order Tracking",
      "Responsive UI",
      "Search & Filter",
      "Fast Interactions",
    ],
    challenges: [
      {
        title: "Frictionless Checkout",
        detail:
          "Optimized the ordering flow to minimize steps between selecting an item and confirming an order, keeping users engaged from start to finish.",
      },
      {
        title: "Responsive Across Devices",
        detail:
          "Designed and tested the interface across screen sizes so ordering feels native whether on a phone, tablet, or desktop.",
      },
      {
        title: "Fast Data Loading",
        detail:
          "Implemented efficient data fetching and caching so menus and orders load instantly without noticeable delay.",
      },
    ],
  },
];

export const projectCategories = ["All", ...new Set(projects.map((p) => p.category))];

export const isPrivateProject = (project) => !project.githubUrl;

export const nextProject = (slug) => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  return projects[(index + 1) % projects.length];
};
