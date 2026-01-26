// filepath: D:/myWebsite/personal-site/src/pages/Collections.tsx
import { useParams } from 'react-router-dom';
import { Gamepad2, BookOpen, Film, MonitorPlay, Music, MoreHorizontal, Link2, ExternalLink } from 'lucide-react';
import { games } from '../data/games';
import { books } from '../data/books';
import { CoverImage } from '../components/CoverImage';

const Collections = () => {
    const { category } = useParams<{ category: string }>();

    // 每一个分类的配置
    const CATEGORIES: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
        games: { title: '我的游戏库', icon: <Gamepad2 size={32} />, color: 'text-purple-400' },
        books: { title: '阅读书单', icon: <BookOpen size={32} />, color: 'text-yellow-400' },
        movies: { title: '影视收藏', icon: <Film size={32} />, color: 'text-red-400' },
        anime: { title: '番剧列表', icon: <MonitorPlay size={32} />, color: 'text-pink-400' },
        music: { title: '音乐歌单', icon: <Music size={32} />, color: 'text-green-400' },
        others: { title: '其他收藏', icon: <MoreHorizontal size={32} />, color: 'text-gray-400' },
    };

    const defaultItems = [
        { id: 1, title: 'React 官方文档', desc: '最好的 React 学习资料', link: 'https://react.dev' },
        { id: 2, title: 'Tailwind CSS', desc: '原子化 CSS 框架手册', link: 'https://tailwindcss.com' },
        { id: 3, title: 'Vercel', desc: '我的部署平台', link: 'https://vercel.com' },
        { id: 4, title: 'GitHub', desc: '代码托管仓库', link: 'https://github.com' },
    ];

    // 如果没有 category 参数，说明访问的是 /collections 根路由，展示默认内容
    if (!category) {
        return (
            <div className="max-w-5xl mx-auto pt-10 px-6">
                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4 flex items-center gap-3">
                    <Link2 size={32} />
                    我的数字花园
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {defaultItems.map(item => (
                        <a 
                            key={item.id} 
                            href={item.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">
                                {item.title} ↗
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {item.desc}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    const currentCategory = CATEGORIES[category];

    // 如果是非法 category（比如 /collections/unknown），显示 404
    if (!currentCategory) {
        return <div className="text-center pt-20 text-gray-400">未找到该分类</div>;
    }

    return (
        <div className="max-w-5xl mx-auto pt-10 px-6 pb-20">
            <h2 className={`text-3xl font-bold text-white mb-8 border-l-4 pl-4 flex items-center gap-3 ${currentCategory.color.replace('text-', 'border-')}`}>
                <span className={currentCategory.color}>{currentCategory.icon}</span>
                {currentCategory.title}
            </h2>
            
            {/* 游戏板块特定渲染逻辑 */}
            {category === 'games' ? (
                <div className="space-y-6">
                    {games.map(game => (
                        <div key={game.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300 group">
                           <div className="flex flex-col md:flex-row h-full">
                                {/* 左侧：封面 - 移动端保持高度，桌面端强制 1:1 */} 
                                <CoverImage 
                                    src={game.cover} 
                                    alt={game.title}
                                    className="w-full h-48 md:w-48 md:h-auto md:aspect-square"
                                />

                                {/* 中间：信息 */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">
                                                <a href={game.link} target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-2">
                                                    {game.title}
                                                </a>
                                            </h3>
                                            <div className="flex gap-2">
                                                {game.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                            {game.review}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between md:hidden">
                                        {/* 移动端显示的评分栏 */}
                                        <a href={game.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 flex items-center gap-1 hover:text-purple-400">
                                            <ExternalLink size={12} /> 官方链接
                                        </a>
                                        <span className="text-xl font-bold text-purple-400">{game.rating}</span>
                                    </div>
                                </div>

                                {/* 右侧：评分 (桌面端) */}
                                <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                                    <span className="text-2xl font-bold text-purple-400 mb-2">{game.rating}</span>
                                    <a 
                                        href={game.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-xs text-gray-500 hover:text-white flex flex-col items-center gap-1 transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        <span>访问详情</span>
                                    </a>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            ) : category === 'books' ? (
                <div className="space-y-6">
                    {books.map(book => (
                        <div key={book.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-colors duration-300 group">
                           <div className="flex flex-col md:flex-row h-full">
                                {/* 左侧：封面 */} 
                                <CoverImage 
                                    src={book.cover} 
                                    alt={book.title}
                                    className="w-full h-48 md:w-48 md:h-auto md:aspect-square"
                                />

                                {/* 中间：信息 */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">
                                                {book.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-yellow-500/80">
                                                <span className="font-medium">{book.author}</span>
                                                <span className="text-gray-500">•</span>
                                                <span className="text-gray-400 text-xs px-2 py-0.5 bg-white/5 rounded border border-white/10">
                                                    {book.info}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                                            "{book.review}"
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-white/5 md:hidden">
                                        <span className="text-xl font-bold text-yellow-400">{book.rating}</span>
                                    </div>
                                </div>

                                {/* 右侧：评分 (桌面端) */}
                                <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                                    <span className="text-2xl font-bold text-yellow-400">{book.rating}</span>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                    <p className="text-gray-400">目前这里还是空的...</p>
                    <p className="text-gray-600 text-sm mt-2">快去添加你的{currentCategory.title.replace('我的','').replace('列表','')}吧！</p>
                </div>
            )}
        </div>
    );
};

export default Collections;
