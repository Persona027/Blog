import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Gamepad2, Headphones } from 'lucide-react';
import { useAllPosts } from '@/data/postsIndex';
import ArticleRow from '@/components/ArticleRow';

export default function Home() {
  const { posts } = useAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <div className="site-container">
      <section className="home-hero">
        <div>
          <p className="intro-line">
            <span className="status-dot" />
            Persona 的个人空间
          </p>
          <h1>
            把好奇心，
            <br />
            写成自己的知识。
          </h1>
          <p className="hero-description">
            在代码与课堂之间探索，也在游戏、书籍和音乐里寻找灵感。这里收录我的学习笔记、技术思考与生活收藏。
          </p>
          <div className="hero-actions">
            <Link className="button-primary" to="/articles">
              浏览学习笔记 <ArrowUpRight size={17} />
            </Link>
            <Link className="text-link" to="/about">
              认识 Persona
            </Link>
          </div>
        </div>
        <aside className="hero-notebook">
          <div className="notebook-top">
            <BookOpen size={22} />
            <span>正在整理的知识</span>
          </div>
          <Link to="/articles?category=科学计算与数学建模">
            <h2>
              从一个公式，
              <br />
              理解一个模型。
            </h2>
            <p>科学计算与数学建模</p>
            <span>
              17 篇详细笔记 <ArrowUpRight size={17} />
            </span>
          </Link>
          <div className="notebook-footer">学习是一段持续构建的过程。</div>
        </aside>
      </section>
      <section className="home-content">
        <div>
          <div className="section-heading">
            <div>
              <p className="section-kicker">持续记录</p>
              <h2>最近的笔记</h2>
            </div>
            <Link className="text-link" to="/articles">
              全部文章 <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="article-rows">
            {posts.slice(0, 5).map((post) => (
              <ArticleRow key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <aside className="home-sidebar">
          <section>
            <h2>沿着兴趣学习</h2>
            <p>按课程和主题，找到下一篇。</p>
            <div className="topic-links">
              {categories.map((cat) => (
                <Link key={cat} to={`/articles?category=${encodeURIComponent(cat)}`}>
                  <span>{cat}</span>
                  <span>{posts.filter((p) => p.category === cat).length}</span>
                </Link>
              ))}
            </div>
          </section>
          <section className="sidebar-personal">
            <h2>课本以外</h2>
            <p>那些让我愿意花时间的事。</p>
            <Link to="/collections/games">
              <Gamepad2 size={18} />
              游戏与世界
            </Link>
            <Link to="/collections/books">
              <BookOpen size={18} />
              书页之间
            </Link>
            <Link to="/collections/music">
              <Headphones size={18} />
              反复播放
            </Link>
          </section>
        </aside>
      </section>
    </div>
  );
}
