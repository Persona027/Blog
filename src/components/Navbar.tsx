import { NavLink, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function Navbar() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <header className="site-header">
        <nav className="site-container nav-inner" aria-label="主导航">
          <Link className="brand" to="/">
            Persona<span className="brand-mark">/</span>
          </Link>
          <div className="nav-links">
            {[
              ['/', '首页'],
              ['/articles', '文章'],
              ['/collections', '收藏'],
              ['/about', '关于'],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <a
            className="nav-github"
            href="https://github.com/Persona027"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
    </>
  );
}
