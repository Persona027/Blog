import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import 'katex/dist/katex.min.css';

export default function MarkdownReader({ raw }: { raw: string }) {
  const content = raw.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  const [active, setActive] = useState('');
  const toc = useMemo(() => {
    const slugger = new GithubSlugger();
    const tree = unified().use(remarkParse).use(remarkMath).use(remarkGfm).parse(content);
    return tree.children
      .filter((n) => n.type === 'heading')
      .map((n) => ({
        text: toString(n),
        id: slugger.slug(toString(n)),
        level: n.type === 'heading' ? n.depth : 2,
      }));
  }, [content]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    document
      .querySelectorAll('.reading-body :is(h1,h2,h3,h4,h5,h6)')
      .forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [content]);
  return (
    <div className="reading-layout">
      <article className="reading-body prose prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeSlug]}
        >
          {content}
        </ReactMarkdown>
      </article>
      <aside className="reading-toc">
        <details open>
          <summary>本文目录</summary>
          <nav aria-label="本文目录">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                style={{ paddingLeft: `${Math.min(item.level - 1, 3) * 12}px` }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </details>
      </aside>
    </div>
  );
}
