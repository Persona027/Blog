// filepath: D:/myWebsite/personal-site/src/pages/ArticleList.tsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CoverImage } from '../components/CoverImage';
import { Archive, LayoutGrid, Layers, FileText } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  cover?: string;
}

const ArticleList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'grid';

  useEffect(() => {
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });
    const loadedPosts: Post[] = [];

    for (const path in modules) {
      // @ts-ignore
      const rawContent = modules[path].default;
      const parts = rawContent.split('---');
      
      if (parts.length >= 3) {
        const metadataString = parts[1];
        const metadata: any = {};
        metadataString.split('\n').forEach((line: string) => {
          const [key, ...value] = line.split(':');
          if (key && value) {
            metadata[key.trim()] = value.join(':').trim();
          }
        });

        const fileName = path.split('/').pop()?.replace('.md', '') || '';

        loadedPosts.push({
          slug: fileName,
          title: metadata.title || '无标题',
          date: metadata.date || '未知日期',
          category: metadata.category || '未分类',
          summary: metadata.summary || '暂无简介',
          cover: metadata.cover || null
        });
      }
    }

    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(loadedPosts);
  }, []);

  // 渲染卡片网格
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

  // 渲染归档视图
  const renderArchiveView = () => {
    const years = Array.from(new Set(posts.map(p => p.date.split('-')[0]))).sort((a, b) => b.localeCompare(a));
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">归档</h2>
            <p className="text-gray-400">目前共计 {posts.length} 篇文章</p>
        </div>
        {years.map(year => (
          <div key={year} className="mb-10">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <Archive size={24} /> {year}
            </h3>
            <div className="space-y-4 border-l-2 border-white/10 ml-3 pl-6">
              {posts.filter(p => p.date.startsWith(year)).map(post => (
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

  // 渲染分类视图
  const renderCategoryView = () => {
    const categories = Array.from(new Set(posts.map(p => p.category)));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map(cat => {
            const catPosts = posts.filter(p => p.category === cat);
            return (
                <div key={cat} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Layers className="text-cyan-400" /> {cat}</span>
                        <span className="text-sm font-mono text-gray-500 flex items-center gap-1"><FileText size={14}/> {catPosts.length}</span>
                    </h3>
                    <div className="space-y-3">
                        {catPosts.map(post => (
                            <Link to={`/article/${post.slug}`} key={post.slug} className="block text-gray-400 hover:text-cyan-300 transition-colors py-1 pl-4 border-l border-white/5 hover:border-cyan-400/50">
                                {post.title}
                            </Link>
                        ))}
                    </div>
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
