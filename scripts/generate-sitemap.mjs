import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SITE = "https://shahdhairyah.in";
const LAST_MOD = new Date().toISOString().slice(0, 10);

/* Read slugs straight out of the data files so the sitemap can never
   drift out of sync with the routes. */
const slugsFrom = (relativeFile) => {
  const source = readFileSync(path.join(root, relativeFile), "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
};

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/skills", priority: "0.8", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/achievements", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/resume", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const dynamicRoutes = [
  ...slugsFrom("src/data/projects.js").map((slug) => ({
    path: `/projects/${slug}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
  ...slugsFrom("src/data/achievements.js").map((slug) => ({
    path: `/achievements/${slug}`,
    priority: "0.5",
    changefreq: "yearly",
  })),
];

const urls = [...staticRoutes, ...dynamicRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE}${url.path}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "public/sitemap.xml"), xml, "utf8");
console.log(`[sitemap] wrote ${urls.length} URLs to public/sitemap.xml`);
