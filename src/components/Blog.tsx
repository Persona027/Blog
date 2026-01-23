import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    // 1. 使用 Vite 的功能一次性读取 posts 文件夹下所有的 .md 文件
    // ?raw 表示以纯文本字符串形式读取
    const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });

    const loadedPosts: Post[] = [];

    for (const path in modules) {
      // @ts-ignore
      const rawContent = modules[path].default;
      
      // 2. 简单的手动解析 Frontmatter (--- ... ---)
      // 我们把文件切分成三部分：空、头部信息、正文
      const parts = rawContent.split('---');
      
      if (parts.length >= 3) {
        const metadataString = parts[1]; // 中间那部分
        const content = parts.slice(2).join('---'); // 剩下的部分是正文

        // 提取 title, date, summary
        const metadata: any = {};
        metadataString.split('\n').forEach((line: string) => {
          const [key, ...value] = line.split(':');
          if (key && value) {
            metadata[key.trim()] = value.join(':').trim();
          }
        });

        loadedPosts.push({
          slug: path,
          title: metadata.title || '无标题',
          date: metadata.date || '未知日期',
          summary: metadata.summary || '无简介',
          content: content
        });
      }
    }

    // 按日期排序 (新的在前)
    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(loadedPosts);
  }, []);

  return (
    <section className="bg-slate-50 py-20 px-8" id="blog">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">
            {selectedPost ? '文章详情' : '最新文章'}
        </h2>

        {/* 如果选中了文章，显示详情 */}
        {selectedPost ? (
           <div className="bg-white p-8 rounded-lg shadow-sm">
             <button 
                onClick={() => setSelectedPost(null)}
                className="text-blue-500 mb-4 hover:underline"
             >
                ← 返回列表
             </button>
             <h1 className="text-3xl font-bold mb-2 text-slate-900">{selectedPost.title}</h1>
             <div className="text-slate-400 text-sm mb-6">{selectedPost.date}</div>
             {/* markdown 渲染区域 */}
             <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
             </div>
           </div>
        ) : (
            // 否则显示列表
            <div className="grid gap-6">
            {posts.map((post) => (
                <div 
                    key={post.slug} 
                    onClick={() => setSelectedPost(post)}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                    <div className="text-sm text-slate-500 mb-2">{post.date}</div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{post.title}</h3>
                    <p className="text-slate-600">{post.summary}</p>
                </div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
