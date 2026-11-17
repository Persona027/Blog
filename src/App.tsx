import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import { ErrorBoundary } from '@/components/ErrorBoundary';
const ArticleList = lazy(() => import('@/pages/ArticleList'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const Collections = lazy(() => import('@/pages/Collections'));
const About = lazy(() => import('@/pages/About'));
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pathname === '/' ? 'Persona · 学习、代码与生活' : 'Persona · 文章与收藏';
  }, [pathname]);
  return null;
}
function Missing() {
  return (
    <div className="site-container empty-state">
      <p>404</p>
      <h1>这里还没有内容</h1>
      <p>链接可能已失效，可以返回文章中心继续阅读。</p>
      <Link className="button-primary" to="/articles">
        浏览文章
      </Link>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <div className="site-background" aria-hidden="true" />
      <RouteEffects />
      <Navbar />
      <main id="main-content">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="site-container loading-state" role="status">
                正在打开内容…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<ArticleList />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/collections/:category?" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Missing />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="site-footer site-container">
        <Link className="brand" to="/">
          Persona /
        </Link>
        <span>记录学习，也记录生活。</span>
        <Link to="/articles?view=archive">查看归档</Link>
      </footer>
    </BrowserRouter>
  );
}
