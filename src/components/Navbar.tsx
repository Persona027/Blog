// filepath: D:/myWebsite/personal-site/src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // 根据当前路径判断激活状态
    const isActive = (path: string) => {
        return location.pathname === path ? "text-white font-bold border-b-2 border-cyan-400" : "text-gray-300 hover:text-white transition";
    };

    // 获取当前页面标题
    const getPageName = () => {
        if (location.pathname === '/') return '文章列表';
        if (location.pathname === '/about') return '关于我';
        if (location.pathname === '/collections') return '我的收藏';
        if (location.pathname.startsWith('/article/')) return '阅读文章';
        return '首页';
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-10">
            {/* 左上角：当前页面名称 */}
            <div className="text-xl font-bold tracking-wider text-cyan-400">
                {getPageName()}
            </div>

            {/* 右上角：导航菜单 */}
            <div className="flex space-x-8 text-sm md:text-base">
                <Link to="/" className={isActive('/')}>文章</Link>
                <Link to="/about" className={isActive('/about')}>关于</Link>
                <Link to="/collections" className={isActive('/collections')}>收藏</Link>
            </div>
        </nav>
    );
};

export default Navbar;
