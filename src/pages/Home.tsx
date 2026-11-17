import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Gamepad2, Headphones } from 'lucide-react';
import { useAllPosts } from '@/data/postsIndex';
import ArticleRow from '@/components/ArticleRow';
import avatar from '@/assets/avatar.png';

export default function Home() {
  const { posts } = useAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <div className="site-container">
      <section className="home-hero">
        <div>
          <p className="intro-line">
            <img className="home-avatar" src={avatar} alt="Persona 的头像" />
            Persona / 个人主页
          </p>
          <h1>
            Persona’s
            <br />
            little corner.
          </h1>
          <p className="hero-description">
            这里放着我的课程笔记、代码记录，
            <br />
            还有玩过的游戏、读过的书。
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
              科学计算与
              <br />
              数学建模
            </h2>
            <p>李宏毅深度学习教程 · 原书版</p>
            <span>
              17 讲 / 推导、例题与自测 <ArrowUpRight size={17} />
            </span>
          </Link>
          <div className="notebook-footer">按课堂范围整理，附原书页码。</div>
        </aside>
      </section>
      <section className="home-content">
        <div>
          <div className="section-heading">
            <div>
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
            <h2>课程目录</h2>
            <p>按课查找笔记。</p>
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
            <Link className="shelf-preview" to="/collections/games" aria-label="查看游戏收藏">
              <img
                src="/games/216896-Ori and the Will of the Wisps.jpg"
                alt="Ori and the Will of the Wisps 封面"
                loading="lazy"
              />
              <img src="/games/283730-Outer Wilds.jpg" alt="Outer Wilds 封面" loading="lazy" />
              <img src="/games/236561-Celeste.jpg" alt="Celeste 封面" loading="lazy" />
            </Link>
            <h2>课本以外</h2>
            <p>游戏、阅读和音乐的收藏。</p>
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
