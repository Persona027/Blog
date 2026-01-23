// filepath: D:/myWebsite/personal-site/src/pages/ArticleList.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover?: string; // 可选封面图
}

const ArticleList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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

        // 生成 slug (从文件名获取)
        // path 类似于 "../posts/my-first-post.md"
        // 我们需要提取 "my-first-post"
        const fileName = path.split('/').pop()?.replace('.md', '') || '';

        loadedPosts.push({
          slug: fileName,
          title: metadata.title || '无标题',
          date: metadata.date || '未知日期',
          summary: metadata.summary || '暂无简介',
          cover: metadata.cover || null
        });
      }
    }

    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(loadedPosts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-10 pb-20">
        <div className="grid gap-8">
            {posts.map((post) => (
                <Link to={`/article/${post.slug}`} key={post.slug} className="group block">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        {/* 如果有封面，显示封面区域 (这里用颜色块暂代，也可以放图) */}
                        <div className="h-48 w-full bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
                             {/* 如果有真实图片链接，可以在这里放 img 标签 */}
                             <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-black select-none group-hover:scale-110 transition duration-700">
                                POST
                             </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex items-center text-cyan-400 text-sm mb-3">
                                <span>{post.date}</span>
                                <span className="mx-2">•</span>
                                <span>文章</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition">
                                {post.title}
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {post.summary}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default ArticleList;
