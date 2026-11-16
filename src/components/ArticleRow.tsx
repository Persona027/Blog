import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { ContentPost } from '@/data/postsIndex';

export default function ArticleRow({ post }: { post: ContentPost }) {
  return (
    <Link className="article-row" to={`/article/${post.slug}`}>
      <div className="article-row-meta">
        <span>{post.category}</span>
        <time dateTime={post.date}>{post.date}</time>
      </div>
      <div className="article-row-body">
        <div>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
        <ArrowUpRight size={22} aria-hidden="true" />
      </div>
      <span className="article-format">
        <FileText size={13} />
        {post.hasMarkdown ? '在线文章' : 'PDF 笔记'}
        {post.hasMarkdown && post.pdfUrl ? ' / 附 PDF' : ''}
      </span>
    </Link>
  );
}
