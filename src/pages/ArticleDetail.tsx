import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import { getPost, getRawMd, useAllPosts } from '@/data/postsIndex';
const PdfViewer = lazy(() => import('@/components/PdfViewer'));
const MarkdownReader = lazy(() => import('@/features/reader/MarkdownReader'));

export default function ArticleDetail() {
  const { slug = '' } = useParams();
  const [params] = useSearchParams();
  const post = getPost(slug);
  const [loaded, setLoaded] = useState<{ slug: string; raw?: string; failed?: boolean }>({
    slug: '',
  });
  const isPdf = !!post?.pdfUrl && (!post.hasMarkdown || params.get('format') === 'pdf');
  useEffect(() => {
    let active = true;
    if (post?.hasMarkdown && !isPdf)
      getRawMd(slug)
        .then((raw) => {
          if (active) setLoaded({ slug, raw });
        })
        .catch(() => {
          if (active) setLoaded({ slug, failed: true });
        });
    if (post) document.title = `${post.title} · Persona`;
    return () => {
      active = false;
    };
  }, [slug, post, isPdf]);
  const related = useAllPosts().posts.filter((p) => p.category === post?.category);
  if (!post)
    return (
      <div className="site-container empty-state">
        <h1>文章未找到</h1>
        <Link to="/articles">返回文章中心</Link>
      </div>
    );
  return (
    <div className={`site-container reader-page ${isPdf ? 'reader-pdf' : ''}`}>
      <Link className="back-link" to={`/articles?category=${encodeURIComponent(post.category)}`}>
        <ArrowLeft size={16} />
        {post.category}
      </Link>
      <header className="reader-heading">
        <div className="article-row-meta">
          <time dateTime={post.date}>{post.date}</time>
          <span>{isPdf ? 'PDF 学习笔记' : '在线文章'}</span>
        </div>
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
        <div className="reader-actions">
          {post.hasMarkdown && post.pdfUrl && (
            <Link className="button-secondary" to={`/article/${slug}${isPdf ? '' : '?format=pdf'}`}>
              <BookOpen size={16} />
              {isPdf ? '阅读在线正文' : '阅读 PDF'}
            </Link>
          )}
          {post.pdfUrl && (
            <a className="text-link" href={post.pdfUrl} download>
              <Download size={16} />
              下载 PDF
            </a>
          )}
        </div>
      </header>
      <Suspense
        fallback={
          <p className="loading-state" role="status">
            正在载入阅读器…
          </p>
        }
      >
        {isPdf ? (
          <PdfViewer key={slug} pdfUrl={post.pdfUrl!} title={post.title} />
        ) : loaded.slug !== slug ? (
          <p className="loading-state" role="status">
            正在载入正文…
          </p>
        ) : loaded.failed || !loaded.raw ? (
          <div className="empty-state">
            <h2>正文暂时无法加载</h2>
            <p>请刷新重试，或返回文章中心。</p>
          </div>
        ) : (
          <MarkdownReader key={slug} raw={loaded.raw} />
        )}
      </Suspense>
      <section className="reader-related">
        <div className="section-heading">
          <h2>继续学习</h2>
          <Link
            className="text-link"
            to={`/articles?category=${encodeURIComponent(post.category)}`}
          >
            查看整个专题
          </Link>
        </div>
        <div>
          {related
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => (
              <Link key={p.slug} to={`/article/${p.slug}`}>
                {p.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
