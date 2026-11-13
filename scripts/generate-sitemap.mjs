import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hackathons } from "../src/data/achievements.js";
import { projects } from "../src/data/projects.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SITE = "https://shahdhairyah.in";
const LAST_MOD = new Date().toISOString().slice(0, 10);

const escapeXml = (unsafe) => {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const staticRoutes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    images: [
      {
        loc: `${SITE}/images/profile.webp`,
        title: "Shah Dhairya — Full-Stack Developer & Researcher",
      },
    ],
  },
  {
    path: "/about",
    priority: "0.9",
    changefreq: "monthly",
    images: [
      {
        loc: `${SITE}/images/profile.webp`,
        title: "About Shah Dhairya",
      },
    ],
  },
  {
    path: "/achievements",
    priority: "0.95",
    changefreq: "weekly",
    images: [
      {
        loc: `${SITE}/images/achievement/ijrti-paper-2026-cover.webp`,
        title: "First Research Paper Published at Age 18 in IJRTI",
      },
      {
        loc: `${SITE}/images/achievement/ssip-2023-cover.webp`,
        title: "SSIP Hackathon 2023 4th Place State Finalist",
      },
      {
        loc: `${SITE}/images/achievement/creo-2024-cover.webp`,
        title: "Creato 2024 Best Innovative Project",
      },
    ],
  },
  {
    path: "/projects",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/skills",
    priority: "0.85",
    changefreq: "monthly",
  },
  {
    path: "/resume",
    priority: "0.85",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    priority: "0.75",
    changefreq: "monthly",
  },
  {
    path: "/privacy",
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/terms",
    priority: "0.3",
    changefreq: "yearly",
  },
];

const achievementRoutes = hackathons.map((h) => {
  const isResearchPaper = h.slug === "ijrti-research-paper-2026";
  const images = [];

  if (h.image) {
    images.push({
      loc: `${SITE}${h.image}`,
      title: `${h.title} — Main Cover`,
    });
  }

  if (h.documents) {
    for (const doc of h.documents) {
      if (doc.coverImage && !images.some((img) => img.loc === `${SITE}${doc.coverImage}`)) {
        images.push({
          loc: `${SITE}${doc.coverImage}`,
          title: `${doc.title} — ${h.title}`,
        });
      }
    }
  }

  if (h.gallery) {
    for (const src of h.gallery) {
      if (!images.some((img) => img.loc === `${SITE}${src}`)) {
        images.push({
          loc: `${SITE}${src}`,
          title: `${h.title} photo`,
        });
      }
    }
  }

  return {
    path: `/achievements/${h.slug}`,
    priority: isResearchPaper ? "0.95" : "0.8",
    changefreq: isResearchPaper ? "weekly" : "monthly",
    images,
  };
});

const projectRoutes = projects.map((p) => {
  const images = [];
  if (p.image) {
    images.push({
      loc: `${SITE}${p.image}`,
      title: `${p.title} — Project Showcase`,
    });
  }
  return {
    path: `/projects/${p.slug}`,
    priority: "0.85",
    changefreq: "monthly",
    images,
  };
});

const allRoutes = [...staticRoutes, ...achievementRoutes, ...projectRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allRoutes
  .map((route) => {
    const imagesXml =
      route.images && route.images.length > 0
        ? "\n" +
          route.images
            .map(
              (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
            )
            .join("\n")
        : "";

    return `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imagesXml}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "public/sitemap.xml"), xml, "utf8");
console.log(`[sitemap] wrote ${allRoutes.length} high-level SEO URLs to public/sitemap.xml`);
