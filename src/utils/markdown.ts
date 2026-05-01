import type { Frontmatter } from '@/types';

/** 解析 Markdown 文件的 YAML frontmatter 和正文内容 */
export function parseMarkdownFrontmatter(raw: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  const parts = raw.split('---');
  if (parts.length < 3) {
    return { frontmatter: {}, content: raw };
  }
  const frontmatter = parseYamlLines(parts[1]);
  const content = parts.slice(2).join('---').trim();
  return { frontmatter, content };
}

function parseYamlLines(yamlString: string): Frontmatter {
  const result: Frontmatter = {};
  yamlString.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      if (key) result[key] = value;
    }
  });
  return result;
}

/** 将标题文本转换为 URL 友好的 ID（支持中英文） */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-龥-]+/g, '')
    .replace(/--+/g, '-');
}

/** 从 React 子组件树中递归提取纯文本 */
export function flattenChildren(children: unknown): string {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(flattenChildren).join('');
  if (
    typeof children === 'object' &&
    children !== null &&
    'props' in children &&
    typeof (children as Record<string, unknown>).props === 'object' &&
    (children as Record<string, { children?: unknown }>).props.children
  ) {
    return flattenChildren(
      (children as Record<string, { children: unknown }>).props.children
    );
  }
  return '';
}
