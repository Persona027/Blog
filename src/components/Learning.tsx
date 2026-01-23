import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

const Learning = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    // 读取 learning 文件夹下的 markdown 文件
    const modules = import.meta.glob('../learning/*.md', { query: '?raw', eager: true });

    const loadedPosts: Post[] = [];

    for (const path in modules) {
      // @ts-ignore
      const rawContent = modules[path].default;
      
      const parts = rawContent.split('---');
      
      if (parts.length >= 3) {
        const metadataString = parts[1];
        const content = parts.slice(2).join('---');

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

    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(loadedPosts);
  }, []);

  return (
    <section className="bg-orange-50 py-20 px-8" id="learning">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-orange-800">学习记录</h2>

        {selectedPost ? (
           <div className="bg-white p-8 rounded-lg shadow-sm border border-orange-100">
             <button 
                onClick={() => setSelectedPost(null)}
                className="text-orange-500 mb-4 hover:underline"
             >
                ← 返回列表
             </button>
             <h1 className="text-3xl font-bold mb-2 text-slate-900">{selectedPost.title}</h1>
             <div className="text-slate-400 text-sm mb-6">{selectedPost.date}</div>
             <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
             </div>
           </div>
        ) : (
            <div className="space-y-4">
            {posts.map((post) => (
                <div 
                    key={post.slug} 
                    onClick={() => setSelectedPost(post)}
                    className="bg-white p-5 rounded-lg border-l-4 border-orange-400 shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">{post.title}</h3>
                        <p className="text-slate-500 text-sm mt-1">{post.summary}</p>
                    </div>
                    <div className="text-sm text-slate-400 whitespace-nowrap ml-4 font-mono bg-slate-50 px-2 py-1 rounded">
                        {post.date}
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default Learning;
