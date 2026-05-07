import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { List, Menu, X, ChevronRight, Hash } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import type { TocItem, ArticleMeta, Frontmatter } from '@/types';
import { parseMarkdownFrontmatter, slugify, flattenChildren } from '@/utils/markdown';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(contentRef, 'h2, h3', 160);

  const { content, metadata, toc, relatedArticles } = useMemo(() => {
    const modules = import.meta.glob<{ default: string }>('../posts/*.md', { query: '?raw', eager: true });
    const allArticles: ArticleMeta[] = [];

    for (const path in modules) {
      const fileSlug = path.split('/').pop()?.replace('.md', '') || '';
      const raw = modules[path].default;
      const { frontmatter } = parseMarkdownFrontmatter(raw);
      allArticles.push({
        slug: fileSlug,
        title: frontmatter.title || fileSlug,
        date: frontmatter.date || '',
        category: frontmatter.category || 'Uncategorized',
      });
    }

    const targetPath = `../posts/${slug}.md`;
    if (modules[targetPath]) {
      const rawContent = modules[targetPath].default;
      const { frontmatter, content: mdContent } = parseMarkdownFrontmatter(rawContent);

      const tocItems: TocItem[] = [];
      const lines = mdContent.split('\n');
      lines.forEach((line: string) => {
        const match = line.match(/^(##|###)\s+(.*)/);
        if (match) {
          const level = match[1].length;
          const text = match[2].trim();
          const id = slugify(text);
          tocItems.push({ id, text, level });
        }
      });

      return {
        content: mdContent,
        metadata: frontmatter,
        toc: tocItems,
        relatedArticles: allArticles.filter((a) => a.category === frontmatter.category),
      };
    }

    return {
      content: '# 404 文章未找到\n或许它已经迷失在宇宙中了。',
      metadata: {} as Frontmatter,
      toc: [] as TocItem[],
      relatedArticles: [] as ArticleMeta[],
    };
  }, [slug]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLeftOpen(false);
    setIsRightOpen(false);
  }, [slug]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsRightOpen(false);
    }
  };

  const MarkdownComponents = {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
      const id = slugify(flattenChildren(children));
      return <h2 id={id} {...props} className="scroll-mt-24" />;
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
      const id = slugify(flattenChildren(children));
      return <h3 id={id} {...props} className="scroll-mt-24" />;
    },
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-200">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between sticky top-0 z-30 bg-black/20 backdrop-blur-md border-b border-white/5 lg:hidden">
        <button onClick={() => setIsLeftOpen(true)} className="p-2 text-gray-400 hover:text-cyan-400" title="打开侧边栏" aria-label="打开侧边栏"><List size={24} /></button>
        <Link to="/collections/music" className="font-bold text-cyan-400">文章详情</Link>
        <button onClick={() => setIsRightOpen(true)} className="p-2 text-gray-400 hover:text-cyan-400" title="打开目录" aria-label="打开目录"><Menu size={24} /></button>
      </div>

      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-0 lg:gap-4 px-0 lg:px-2">

        {/* --- 左侧侧边栏：同分类文章 --- */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 lg:bg-transparent border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 lg:border-none
          ${isLeftOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6 overflow-y-auto lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <span className="font-bold text-white">分类文章</span>
              <button onClick={() => setIsLeftOpen(false)} title="关闭侧边栏" aria-label="关闭侧边栏"><X size={20} /></button>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-cyan-400 rounded-full"></span>
              {metadata.category} 杂谈 ({relatedArticles.length})
            </h3>
            <nav className="space-y-1">
              {relatedArticles.map((art) => (
                <Link
                  key={art.slug}
                  to={`/article/${art.slug}`}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    slug === art.slug
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full transition-transform group-hover:scale-150 ${slug === art.slug ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`}></span>
                  <span className="text-sm font-medium line-clamp-2 leading-snug">{art.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- 中间：正文内容 --- */}
        <main className="flex-1 min-w-0 py-8 lg:py-12 px-6 lg:px-4">
          <div className="">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-cyan-500 text-sm font-bold mb-4 uppercase tracking-wider">
                <span>{metadata.category}</span>
                <ChevronRight size={14} />
                <span className="text-gray-500">{metadata.date}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                {metadata.title || 'Loading...'}
              </h1>
              <div className="h-1 w-20 bg-cyan-500/50 rounded-full"></div>
            </div>

            <article ref={contentRef} className="bg-black/40 rounded-3xl p-8 lg:p-12 border border-white/5 backdrop-blur-md shadow-2xl">
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4 prose-h2:mt-12
                prose-a:text-cyan-400 hover:prose-a:text-cyan-300 transition-colors
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-blockquote:border-cyan-500/50 prose-blockquote:bg-cyan-500/5 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={MarkdownComponents}
                >{content}</ReactMarkdown>
              </div>
            </article>

            <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
              <Link to="/" className="text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-2">
                ← 回到首页
              </Link>
              <span className="text-gray-600 text-sm italic">End of Article</span>
            </div>
          </div>
        </main>

        {/* --- 右侧侧边栏：目录 (TOC) --- */}
        <aside className={`
          fixed inset-y-0 right-0 z-50 w-72 bg-zinc-900 lg:bg-transparent border-l border-white/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 lg:border-none
          ${isRightOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6 overflow-y-auto lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <span className="font-bold text-white">目录</span>
              <button onClick={() => setIsRightOpen(false)} title="关闭目录" aria-label="关闭目录"><X size={20} /></button>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Hash size={16} className="text-cyan-500" />
              目录索引
            </h3>
            <nav className="flex flex-col gap-1">
              {toc.length > 0 ? toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToAnchor(item.id)}
                  className={`text-left transition-all duration-200 py-1.5 px-3 rounded-md text-sm group ${
                    activeId === item.id
                    ? 'text-cyan-400 bg-cyan-400/5 translate-x-1 font-bold'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  } ${
                    item.level === 3 ? 'ml-3' : ''
                  }`}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 transition-transform ${activeId === item.id ? 'bg-cyan-400 scale-125' : 'bg-gray-700 opacity-0 group-hover:opacity-100'}`}></span>
                  {item.text}
                </button>
              )) : (
                <span className="text-xs text-gray-600 italic">暂无目录内容</span>
              )}
            </nav>
          </div>
        </aside>
      </div>

      {(isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => { setIsLeftOpen(false); setIsRightOpen(false); }}
        ></div>
      )}
    </div>
  );
};

export default ArticleDetail;
