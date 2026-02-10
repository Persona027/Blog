import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import Collections from './pages/Collections';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-100 relative selection:bg-cyan-500 selection:text-white">
        
        {/* 1. 背景层：全屏固定，z-index 为负值 */}
        <div className="fixed inset-0 w-full h-full z-[-1] site-background">
            {/* 2. 遮罩层：确保背景不抢文字的风头 */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 3. 导航栏 */}
        <Navbar />

        {/* 4. 内容区域：由于导航栏 fixed 高度约 64px(h-16)，首页由 Home 处理 padding，其他页面维持原样 */}
        <main className="pb-12">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<div className="pt-20 px-4"><ArticleList /></div>} />
                <Route path="/article/:slug" element={<div className="pt-20 px-4"><ArticleDetail /></div>} />
                <Route path="/about" element={<div className="pt-20 px-4"><About /></div>} />
                <Route path="/collections/:category?" element={<div className="pt-20 px-4"><Collections /></div>} />
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

