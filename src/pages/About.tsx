import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, BookOpen, Headphones } from 'lucide-react';
import avatar from '@/assets/avatar.png';
export default function About() {
  return (
    <div className="site-container page-space about-page">
      <header className="about-intro">
        <img src={avatar} alt="Persona 的头像" width="112" height="112" />
        <div>
          <p className="section-kicker">关于本站</p>
          <h1>我是 Persona。</h1>
          <p>一个喜欢写代码、玩游戏，也喜欢把问题想清楚的人。</p>
        </div>
      </header>
      <section className="about-statement">
        <h2>这个小站。</h2>
        <p>
          这个网站是我的学习记录，也是我的数字书架。在这里，我把课堂里的知识整理成可以回看的笔记，把技术探索写成文章，也收藏那些值得反复体验的作品。
        </p>
      </section>
      <div className="about-paths">
        {[
          {
            icon: Code2,
            title: '代码与实践',
            text: '从 Unity 到 Web，在实践中建立理解。',
            to: '/articles?category=Unity',
          },
          {
            icon: BookOpen,
            title: '学习与积累',
            text: '用公式、例题和自己的解释串起知识。',
            to: '/articles?view=category',
          },
          {
            icon: Headphones,
            title: '生活与兴趣',
            text: '游戏、书籍、影视和音乐，各有各的世界。',
            to: '/collections',
          },
        ].map(({ icon: Icon, title, text, to }) => (
          <Link key={to} to={to}>
            <Icon size={25} />
            <h2>{title}</h2>
            <p>{text}</p>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </div>
      <a
        className="text-link"
        href="https://github.com/Persona027"
        target="_blank"
        rel="noreferrer"
      >
        在 GitHub 上找到我 <ArrowUpRight size={17} />
      </a>
    </div>
  );
}
