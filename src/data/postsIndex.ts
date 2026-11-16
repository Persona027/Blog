import posts from './content.generated.json';

export type ContentPost = (typeof posts)[number];
const articles = posts.map(({ slug, title, date, category }) => ({ slug, title, date, category }));
const index = { posts, articles };
const modules = import.meta.glob<string>('../posts/*.md', { query: '?raw', import: 'default' });
export function useAllPosts() {
  return index;
}
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
export async function getRawMd(slug: string): Promise<string | undefined> {
  return modules[`../posts/${slug}.md`]?.();
}
