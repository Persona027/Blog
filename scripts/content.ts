import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { pdfPosts } from '../src/data/pdfPosts';

const root = path.resolve(import.meta.dirname, '..');
const posts = new Map<
  string,
  {
    slug: string;
    title: string;
    date: string;
    category: string;
    summary: string;
    cover?: string;
    pdfUrl?: string;
    hasMarkdown: boolean;
  }
>();
for (const pdf of pdfPosts) {
  if (posts.has(pdf.slug)) throw new Error(`Duplicate PDF slug: ${pdf.slug}`);
  if (!fs.existsSync(path.join(root, 'public', pdf.pdfUrl)))
    throw new Error(`Missing PDF: ${pdf.pdfUrl}`);
  posts.set(pdf.slug, { ...pdf, hasMarkdown: false });
}
for (const file of fs.readdirSync(path.join(root, 'src/posts')).filter((f) => f.endsWith('.md'))) {
  const slug = file.slice(0, -3);
  const { data } = matter(fs.readFileSync(path.join(root, 'src/posts', file), 'utf8'));
  for (const key of ['title', 'date', 'category'])
    if (!data[key]) throw new Error(`${file}: missing ${key}`);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const existing = posts.get(slug);
  posts.set(slug, {
    slug,
    title: String(data.title),
    date,
    category: String(data.category),
    summary: String(data.summary || '课程笔记与学习记录。'),
    cover: data.cover ? String(data.cover) : existing?.cover,
    pdfUrl: existing?.pdfUrl,
    hasMarkdown: true,
  });
}
const result = [...posts.values()].sort(
  (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
);
for (const post of result) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(post.date)))
    throw new Error(`Invalid date: ${post.slug}`);
  if (post.cover?.startsWith('/') && !fs.existsSync(path.join(root, 'public', post.cover)))
    throw new Error(`Missing cover: ${post.cover}`);
  if (post.cover && /^[a-z]:/i.test(post.cover)) throw new Error(`Local drive URL: ${post.slug}`);
}
fs.writeFileSync(
  path.join(root, 'src/data/content.generated.json'),
  JSON.stringify(result, null, 2) + '\n',
);
console.log(`Validated ${result.length} articles; generated metadata only.`);
const site = 'https://depersona.top';
const locations = [
  '/',
  '/articles',
  '/about',
  '/collections',
  ...result.map((p) => `/article/${encodeURIComponent(p.slug)}`),
];
fs.writeFileSync(
  path.join(root, 'public/sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    locations.map((location) => `  <url><loc>${site}${location}</loc></url>`).join('\n') +
    '\n</urlset>\n',
);
