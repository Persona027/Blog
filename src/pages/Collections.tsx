import { useParams } from 'react-router-dom';
import {
  Gamepad2, BookOpen, Film, MonitorPlay, Music, MoreHorizontal,
  Link2,
} from 'lucide-react';
import { GameList } from '@/components/collections/GameList';
import { BookList } from '@/components/collections/BookList';
import { MovieList } from '@/components/collections/MovieList';
import { AnimeList } from '@/components/collections/AnimeList';
import { MusicList } from '@/components/collections/MusicList';
import { SocialList } from '@/components/collections/SocialList';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CATEGORY_META, type CategoryId } from '@/constants';

const CATEGORY_ICONS: Record<CategoryId, React.ReactNode> = {
  games:  <Gamepad2 size={32} />,
  books:  <BookOpen size={32} />,
  movies: <Film size={32} />,
  anime:  <MonitorPlay size={32} />,
  music:  <Music size={32} />,
  others: <MoreHorizontal size={32} />,
};

const borderColorMap: Record<string, string> = {
  purple: 'border-purple-400', yellow: 'border-yellow-400', red: 'border-red-400',
  pink: 'border-pink-400', green: 'border-green-400', gray: 'border-gray-400',
};
const textColorMap: Record<string, string> = {
  purple: 'text-purple-400', yellow: 'text-yellow-400', red: 'text-red-400',
  pink: 'text-pink-400', green: 'text-green-400', gray: 'text-gray-400',
};

const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const { copiedId, copy } = useCopyToClipboard();

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto pt-10 px-6">
        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4 flex items-center gap-3 font-heading">
          <Link2 size={32} />我的数字花园
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, title: 'React 官方文档', desc: '最好的 React 学习资料', link: 'https://react.dev' },
            { id: 2, title: 'Tailwind CSS', desc: '原子化 CSS 框架手册', link: 'https://tailwindcss.com' },
          ].map((item, index) => (
            <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">{item.title} ↗</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    );
  }

  const currentCategory = CATEGORY_META[category as CategoryId];
  if (!currentCategory) return <div className="text-center pt-20 text-gray-400">未找到该分类</div>;

  const renderContent = () => {
    switch (category) {
      case 'games':  return <GameList />;
      case 'books':  return <BookList />;
      case 'movies': return <MovieList />;
      case 'anime':  return <AnimeList />;
      case 'music':  return <MusicList />;
      case 'others': return <SocialList handleCopy={copy} copiedId={copiedId} />;
      default: return (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
          <p className="text-gray-400">目前这里还是空的...</p>
        </div>
      );
    }
  };

  const borderClass = borderColorMap[currentCategory.color] || 'border-gray-400';
  const textClass = textColorMap[currentCategory.color] || 'text-gray-400';

  return (
    <div className="max-w-5xl mx-auto pt-10 px-6 pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className={`text-3xl font-bold text-white border-l-4 pl-4 flex items-center gap-3 font-heading ${borderClass}`}>
          <span className={textClass}>{CATEGORY_ICONS[category as CategoryId]}</span>
          {currentCategory.title}
        </h2>
      </div>

      {renderContent()}
    </div>
  );
};

export default Collections;
