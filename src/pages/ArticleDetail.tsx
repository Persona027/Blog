// filepath: D:/myWebsite/personal-site/src/pages/ArticleDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ArticleDetail = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState<any>({});

    useEffect(() => {
        // 动态导入指定的 markdown 文件
        // 注意：Vite 的 import.meta.glob 是静态分析的，不能直接用变量拼路径
        // 所以我们需要先读所有，再在内存里找 (对于个人博客这种小体量完全没问题)
        const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });
        
        const targetPath = `../posts/${slug}.md`;
        
        if (modules[targetPath]) {
            // @ts-ignore
            const rawContent = modules[targetPath].default;
            const parts = rawContent.split('---');
            if (parts.length >= 3) {
                const metadataString = parts[1];
                const mdContent = parts.slice(2).join('---');
                
                const meta: any = {};
                metadataString.split('\n').forEach((line: string) => {
                  const [key, ...value] = line.split(':');
                  if (key && value) {
                    meta[key.trim()] = value.join(':').trim();
                  }
                });

                setContent(mdContent);
                setMetadata(meta);
            }
        } else {
            setContent('# 404 文章未找到\n或许它已经迷失在宇宙中了。');
        }
    }, [slug]);

    return (
        <div className="max-w-3xl mx-auto pt-10 pb-20 px-6">
            <div className="mb-8">
                <Link to="/" className="text-cyan-400 hover:text-white transition flex items-center mb-4 text-sm font-medium">
                    ← 返回列表
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {metadata.title || 'Loading...'}
                </h1>
                <div className="text-gray-400 flex items-center gap-4 text-sm">
                    <span>{metadata.date}</span>
                </div>
            </div>

            {/* 内容区：原本是 prose-slate (浅色)，现在改成 prose-invert (深色模式适配) */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 md:p-10 border border-white/5">
                <div className="prose prose-invert prose-lg max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
