import { useMemo } from 'react';
import { parseMarkdownFrontmatter } from '@/utils/markdown';
import { pdfPosts } from '@/data/pdfPosts';
import type { Post, ArticleMeta } from '@/types';

const modules = import.meta.glob<{ default: string }>('../posts/*.md', { query: '?raw', eager: true });

function buildIndex(): { posts: Post[]; articles: ArticleMeta[] } {
  const posts: Post[] = [];
  const articles: ArticleMeta[] = [];
  const seenSlugs = new Set<string>();

  for (const path in modules) {
    const rawContent = modules[path].default;
    const { frontmatter } = parseMarkdownFrontmatter(rawContent);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    seenSlugs.add(slug);
    posts.push({
      slug,
      title: frontmatter.title || '无标题',
      date: frontmatter.date || '未知日期',
      category: frontmatter.category || '未分类',
      summary: frontmatter.summary || '暂无简介',
      cover: frontmatter.cover || undefined,
    });
    articles.push({
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || '',
      category: frontmatter.category || 'Uncategorized',
    });
  }

  for (const pdf of pdfPosts) {
    if (!seenSlugs.has(pdf.slug)) {
      posts.push({
        slug: pdf.slug,
        title: pdf.title,
        date: pdf.date,
        category: pdf.category,
        summary: pdf.summary,
        cover: pdf.cover,
      });
      articles.push({
        slug: pdf.slug,
        title: pdf.title,
        date: pdf.date,
        category: pdf.category,
      });
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { posts, articles };
}

const index = buildIndex();

export function useAllPosts() {
  return useMemo(() => index, []);
}

export function getRawMd(slug: string): string | undefined {
  return modules[`../posts/${slug}.md`]?.default;
}
