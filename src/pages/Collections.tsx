// filepath: D:/myWebsite/personal-site/src/pages/Collections.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { 
    Gamepad2, BookOpen, Film, MonitorPlay, Music, MoreHorizontal, 
    Link2, ExternalLink, Calendar, Eye, Check, Copy 
} from 'lucide-react';
import { games } from '../data/games';
import { books } from '../data/books';
import { movies } from '../data/movies';
import { animes } from '../data/animes';
import { socials } from '../data/socials';
import { albums } from '../data/music';
import { CoverImage } from '../components/CoverImage';

// --- 子组件：游戏列表 ---
const GameList = () => (
    <div className="space-y-6">
        {games.map(game => (
            <div key={game.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row h-full">
                    <CoverImage 
                        src={game.cover} 
                        alt={game.title}
                        className="w-full h-48 md:w-48 md:h-auto md:aspect-square"
                    />
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
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{game.review}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between md:hidden">
                            <a href={game.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 flex items-center gap-1 hover:text-purple-400">
                                <ExternalLink size={12} /> 官方链接
                            </a>
                            <span className="text-xl font-bold text-purple-400">{game.rating}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                        <span className="text-2xl font-bold text-purple-400 mb-2">{game.rating}</span>
                        <a href={game.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-white flex flex-col items-center gap-1 transition-colors">
                            <ExternalLink size={16} />
                            <span>访问详情</span>
                        </a>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// --- 子组件：音乐列表 ---
const MusicList = () => (
    <div className="space-y-6">
        {albums.map(album => (
            <div key={album.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/50 transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row h-full">
                    <CoverImage 
                        src={album.cover} 
                        alt={album.title}
                        className="w-full h-48 md:w-48 md:h-auto md:aspect-square"
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                        {album.title}
                                    </h3>
                                    <span className="text-sm text-green-500/80 font-medium">{album.artist}</span>
                                </div>
                                <div className="flex gap-2">
                                    {album.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-300 border border-green-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-500 mb-3 font-mono">
                                <span>发行于: {album.year}</span>
                                <span>流派: {album.genre}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">"{album.review}"</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 md:hidden">
                            <span className="text-xl font-bold text-green-400">{album.rating}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                        <span className="text-2xl font-bold text-green-400 mb-2">{album.rating}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// --- 更多子组件（简化以减小文件量，实际项目中可拆分文件） ---
const BookList = () => (
    <div className="space-y-6">
        {books.map(book => (
            <div key={book.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row h-full">
                    <CoverImage src={book.cover} alt={book.title} className="w-full h-48 md:w-48 md:h-auto md:aspect-square" />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{book.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-yellow-500/80">
                                    <span className="font-medium">{book.author}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-400 text-xs px-2 py-0.5 bg-white/5 rounded border border-white/10">{book.publisher}</span>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">"{book.review}"</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 md:hidden">
                            <span className="text-xl font-bold text-yellow-400">{book.rating}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                        <span className="text-2xl font-bold text-yellow-400">{book.rating}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const MovieList = () => (
    <div className="space-y-6">
        {movies.map(movie => (
            <div key={movie.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row h-full">
                    <CoverImage src={movie.cover} alt={movie.title} className="w-full aspect-[2/3] md:w-40 md:h-auto object-cover" />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col gap-1 mb-3">
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{movie.title}</h3>
                                    <span className="text-sm text-gray-500 font-medium">{movie.originalTitle}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {movie.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-300 border border-red-500/10">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                                <div className="flex items-center gap-1.5"><Calendar size={14} className="text-red-400/70" /><span>上映: {movie.releaseDate}</span></div>
                                <div className="flex items-center gap-1.5"><Eye size={14} className="text-red-400/70" /><span>观看: {movie.watchDate}</span></div>
                            </div>
                            {movie.review && <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-red-500/20 pl-3 italic">{movie.review}</p>}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between md:hidden">
                            <span className="text-xs text-gray-500">导演: {movie.director}</span>
                            <span className="text-xl font-bold text-red-400">{movie.rating}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                        <span className="text-2xl font-bold text-red-400 mb-2">{movie.rating}</span>
                        <span className="text-xs text-gray-500 text-center">导演<br/>{movie.director}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const AnimeList = () => (
    <div className="space-y-6">
        {animes.map(anime => (
            <div key={anime.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row h-full">
                    <CoverImage src={anime.cover} alt={anime.title} className="w-full aspect-[2/3] md:w-40 md:h-auto object-cover" />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col gap-1 mb-3">
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">{anime.title}</h3>
                                    <span className="text-sm text-gray-500 font-medium">{anime.originalTitle}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {anime.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-pink-500/10 text-pink-300 border border-pink-500/10">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                                <div className="flex items-center gap-1.5"><Calendar size={14} className="text-pink-400/70" /><span>放送: {anime.releaseDate}</span></div>
                                <div className="flex items-center gap-1.5"><Eye size={14} className="text-pink-400/70" /><span>观看: {anime.watchDate}</span></div>
                            </div>
                            {anime.review && <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-pink-500/20 pl-3 italic">{anime.review}</p>}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between md:hidden">
                            <span className="text-xs text-gray-500">制作: {anime.studio}</span>
                            <span className="text-xl font-bold text-pink-400">{anime.rating}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-black/20">
                        <span className="text-2xl font-bold text-pink-400 mb-2">{anime.rating}</span>
                        <span className="text-xs text-gray-500 text-center">制作<br/>{anime.studio}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const SocialList = ({ handleCopy, copiedId }: { handleCopy: any, copiedId: string | null }) => (
    <div className="space-y-12">
        <section>
            <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-cyan-400 rounded-full"></span>链接
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socials.filter(s => s.group === 1).map(item => (
                    <a key={item.id} href={item.value} target="_blank" rel="noreferrer" className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
                        <div className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: 'currentColor', WebkitMaskImage: `url(/other/${item.icon})`, maskImage: `url(/other/${item.icon})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
                        <div><h4 className="text-white font-bold group-hover:text-cyan-300 transition-colors">{item.platform}</h4><p className="text-gray-500 text-sm">{item.name}</p></div>
                        <ExternalLink size={14} className="ml-auto text-gray-600 group-hover:text-cyan-400" />
                    </a>
                ))}
            </div>
        </section>
        <section>
            <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-400 rounded-full"></span>ID
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socials.filter(s => s.group === 2).map(item => (
                    <button key={item.id} onClick={() => handleCopy(item.value, item.id)} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 text-left w-full">
                        <div className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: 'currentColor', WebkitMaskImage: `url(/other/${item.icon})`, maskImage: `url(/other/${item.icon})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
                        <div className="flex-1"><h4 className="text-white font-bold group-hover:text-purple-300 transition-colors">{item.platform}</h4><p className="text-gray-500 text-sm">ID: {item.name}</p></div>
                        <div className="text-gray-600 group-hover:text-purple-400 transition-colors">{copiedId === item.id ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}</div>
                    </button>
                ))}
            </div>
        </section>
    </div>
);

// --- 主组件 ---
const Collections = () => {
    const { category } = useParams<{ category: string }>();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const CATEGORIES: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
        games: { title: '我的游戏库', icon: <Gamepad2 size={32} />, color: 'text-purple-400' },
        books: { title: '阅读书单', icon: <BookOpen size={32} />, color: 'text-yellow-400' },
        movies: { title: '影视收藏', icon: <Film size={32} />, color: 'text-red-400' },
        anime: { title: '番剧列表', icon: <MonitorPlay size={32} />, color: 'text-pink-400' },
        music: { title: '专辑收藏', icon: <Music size={32} />, color: 'text-green-400' },
        others: { title: '其他收藏', icon: <MoreHorizontal size={32} />, color: 'text-gray-400' },
    };

    if (!category) {
        return (
            <div className="max-w-5xl mx-auto pt-10 px-6">
                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4 flex items-center gap-3">
                    <Link2 size={32} />我的数字花园
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { id: 1, title: 'React 官方文档', desc: '最好的 React 学习资料', link: 'https://react.dev' },
                        { id: 2, title: 'Tailwind CSS', desc: '原子化 CSS 框架手册', link: 'https://tailwindcss.com' },
                    ].map(item => (
                        <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">{item.title} ↗</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    const currentCategory = CATEGORIES[category];
    if (!currentCategory) return <div className="text-center pt-20 text-gray-400">未找到该分类</div>;

    const renderContent = () => {
        switch (category) {
            case 'games': return <GameList />;
            case 'books': return <BookList />;
            case 'movies': return <MovieList />;
            case 'anime': return <AnimeList />;
            case 'music': return <MusicList />;
            case 'others': return <SocialList handleCopy={handleCopy} copiedId={copiedId} />;
            default: return (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                    <p className="text-gray-400">目前这里还是空的...</p>
                </div>
            );
        }
    };

    return (
        <div className="max-w-5xl mx-auto pt-10 px-6 pb-20 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className={`text-3xl font-bold text-white border-l-4 pl-4 flex items-center gap-3 ${currentCategory.color.replace('text-', 'border-')}`}>
                    <span className={currentCategory.color}>{currentCategory.icon}</span>
                    {currentCategory.title}
                </h2>
            </div>
            
            {renderContent()}
        </div>
    );
};

export default Collections;
