import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowUpRight } from 'lucide-react';
import { useAllPosts } from '@/data/postsIndex';
import ArticleRow from '@/components/ArticleRow';
import Pagination from '@/components/Pagination';

export default function ArticleList() {
  const { posts } = useAllPosts();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '',
    category = params.get('category') || '',
    format = params.get('format') || '',
    view = params.get('view') || 'list';
  const categories = [...new Set(posts.map((p) => p.category))];
  const filtered = posts.filter(
    (p) =>
      (!category || p.category === category) &&
      (!format || (format === 'pdf' ? !!p.pdfUrl : p.hasMarkdown)) &&
      `${p.title} ${p.summary} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const page = Math.min(pages, Math.max(1, Number(params.get('page')) || 1));
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: key === 'q' });
  };
  return (
    <div className="site-container page-space">
      <header className="page-heading">
        <p className="section-kicker">学习与思考</p>
        <h1>{category || '文章与笔记'}</h1>
        <p>
          {category
            ? '按章节继续阅读，建立属于自己的知识脉络。'
            : '将零散的理解串起来，让每一次学习都有迹可循。'}
        </p>
      </header>
      <div className="article-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label="搜索文章"
            placeholder="搜索标题、摘要或课程…"
            value={query}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>
        <select
          aria-label="课程分类"
          value={category}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">全部分类</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="阅读格式"
          value={format}
          onChange={(e) => update('format', e.target.value)}
        >
          <option value="">全部格式</option>
          <option value="markdown">在线文章</option>
          <option value="pdf">PDF 笔记</option>
        </select>
      </div>
      <div className="view-bar">
        <span>{filtered.length} 篇内容</span>
        <div>
          {[
            ['list', '列表'],
            ['category', '课程'],
            ['archive', '归档'],
          ].map(([id, label]) => (
            <button key={id} aria-pressed={view === id} onClick={() => update('view', id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {view === 'category' ? (
        <div className="course-grid">
          {categories
            .filter((c) => !category || c === category)
            .map((c) => {
              const entries = filtered.filter((p) => p.category === c);
              return (
                entries.length > 0 && (
                  <section className="course-panel" key={c}>
                    <div>
                      <h2>{c}</h2>
                      <span>{entries.length} 篇</span>
                    </div>
                    <ol>
                      {entries.map((p) => (
                        <li key={p.slug}>
                          <Link to={`/article/${p.slug}`}>
                            {p.title}
                            <ArrowUpRight size={15} />
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </section>
                )
              );
            })}
        </div>
      ) : view === 'archive' ? (
        <div className="archive-list">
          {[...new Set(filtered.map((p) => p.date.slice(0, 4)))].map((year) => (
            <section key={year}>
              <h2>{year}</h2>
              {filtered
                .filter((p) => p.date.startsWith(year))
                .map((p) => (
                  <Link key={p.slug} to={`/article/${p.slug}`}>
                    <time>{p.date.slice(5)}</time>
                    <span>{p.title}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
            </section>
          ))}
        </div>
      ) : (
        <>
          <div className="article-rows">
            {filtered.slice((page - 1) * 10, page * 10).map((p) => (
              <ArticleRow key={p.slug} post={p} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={(n) => update('page', String(n))}
          />
        </>
      )}
      {!filtered.length && (
        <div className="empty-state">
          <h2>没有找到匹配的内容</h2>
          <p>换一个关键词，或清除筛选后再看看。</p>
          <button className="button-primary" onClick={() => setParams({})}>
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}
