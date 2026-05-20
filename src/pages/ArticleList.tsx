import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CoverImage } from '@/components/CoverImage';
import { Archive, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { useAllPosts } from '@/data/postsIndex';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 9;

const ArticleList = () => {
  const [searchParams] = useSearchParams();
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const view = searchParams.get('view') || 'grid';

  const posts = useAllPosts().posts;

  useEffect(() => {
    setCurrentPage(1);
  }, [view]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const renderGridView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPosts.map((post, index) => (
          <Link to={`/article/${post.slug}`} key={post.slug} className="group block animate-fade-in-up" style={{ animationDelay: `${(index % 9) * 80}ms` }}>
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(34,211,238,0.12)]">
              {post.cover ? (
                <CoverImage src={post.cover} alt={post.title} className="w-full aspect-[3/2]" />
              ) : (
                <div className="aspect-[3/2] w-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <FileText size={48} className="text-gray-600" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-cyan-400 text-sm mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition font-heading tracking-tight line-clamp-2">{post.title}</h2>
                <p className="text-gray-300 leading-relaxed line-clamp-2">{post.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );

  const renderArchiveView = () => {
    const years = Array.from(new Set(posts.map((p) => p.date.split('-')[0]))).sort((a, b) => b.localeCompare(a));
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">归档</h2>
          <p className="text-gray-400">目前共计 {posts.length} 篇文章</p>
        </div>
        {years.map((year) => (
          <div key={year} className="mb-10">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3 font-heading">
              <span className="w-2 h-2 rounded-full bg-cyan-400 glow-dot-cyan" />
              <Archive size={24} /> {year}
            </h3>
            <div className="space-y-4 border-l-2 border-white/10 ml-3 pl-6">
              {posts.filter((p) => p.date.startsWith(year)).map((post) => (
                <Link to={`/article/${post.slug}`} key={post.slug} className="flex items-center group hover:translate-x-1 transition-transform">
                  <span className="text-gray-400 text-sm mr-6 font-mono">{post.date.substring(5)}</span>
                  <span className="text-gray-200 group-hover:text-cyan-300 transition-colors">{post.title}</span>
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
                type="button"
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
                      className="block py-3 px-4 text-gray-400 hover:text-cyan-300 hover:bg-white/[0.04] rounded-lg transition-all"
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
