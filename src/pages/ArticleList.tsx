import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CoverImage } from '@/components/CoverImage';
import { Archive, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { parseMarkdownFrontmatter } from '@/utils/markdown';
import type { Post } from '@/types';

const ArticleList = () => {
  const [searchParams] = useSearchParams();
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const view = searchParams.get('view') || 'grid';

  const posts = useMemo(() => {
    const modules = import.meta.glob<{ default: string }>('../posts/*.md', { query: '?raw', eager: true });
    const loadedPosts: Post[] = [];

    for (const path in modules) {
      const rawContent = modules[path].default;
      const { frontmatter } = parseMarkdownFrontmatter(rawContent);
      const fileName = path.split('/').pop()?.replace('.md', '') || '';

      loadedPosts.push({
        slug: fileName,
        title: frontmatter.title || '无标题',
        date: frontmatter.date || '未知日期',
        category: frontmatter.category || '未分类',
        summary: frontmatter.summary || '暂无简介',
        cover: frontmatter.cover || undefined,
      });
    }

    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return loadedPosts;
  }, []);

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link to={`/article/${post.slug}`} key={post.slug} className="group block">
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            {post.cover ? (
              <CoverImage src={post.cover} alt={post.title} className="w-full aspect-square" />
            ) : (
              <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                <span className="text-4xl text-gray-500">📄</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-cyan-400 text-sm mb-3">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition">{post.title}</h2>
              <p className="text-gray-300 leading-relaxed line-clamp-2">{post.summary}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderArchiveView = () => {
    const years = Array.from(new Set(posts.map((p) => p.date.split('-')[0]))).sort((a, b) => b.localeCompare(a));
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">归档</h2>
          <p className="text-gray-400">目前共计 {posts.length} 篇文章</p>
        </div>
        {years.map((year) => (
          <div key={year} className="mb-10">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <Archive size={24} /> {year}
            </h3>
            <div className="space-y-4 border-l-2 border-white/10 ml-3 pl-6">
              {posts.filter((p) => p.date.startsWith(year)).map((post) => (
                <Link to={`/article/${post.slug}`} key={post.slug} className="flex items-center group">
                  <span className="text-gray-500 text-sm mr-6 font-mono">{post.date.substring(5)}</span>
                  <span className="text-gray-200 group-hover:text-cyan-300 transition-colors uppercase tracking-wide">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCategoryView = () => {
    const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

    const toggleCategory = (cat: string) => {
      setExpandedCats((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      );
    };

    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {categories.map((cat) => {
          const catPosts = posts.filter((p) => p.category === cat);
          const isExpanded = expandedCats.includes(cat);

          return (
            <div key={cat} className="relative z-10">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between py-4 px-2 hover:bg-white/5 active:bg-white/10 transition-all group cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-cyan-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500 group-hover:text-cyan-400" />
                  )}
                  <span className={`text-xl font-bold transition-colors ${isExpanded ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {cat}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                  <FileText size={16} />
                  <span>{catPosts.length}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="mt-1 ml-9 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  {catPosts.length > 0 ? catPosts.map((post) => (
                    <Link
                      to={`/article/${post.slug}`}
                      key={post.slug}
                      className="block py-3 px-4 text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all"
                    >
                      {post.title}
                    </Link>
                  )) : (
                    <div className="py-3 px-4 text-gray-600 italic text-sm">暂无文章</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 px-6">
      {view === 'archive' ? renderArchiveView() : view === 'category' ? renderCategoryView() : renderGridView()}
    </div>
  );
};

export default ArticleList;
