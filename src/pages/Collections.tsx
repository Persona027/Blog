import { Link, useParams } from 'react-router-dom';
import { Gamepad2, BookOpen, Film, MonitorPlay, Music, MoreHorizontal } from 'lucide-react';
import { GameList } from '@/components/collections/GameList';
import { BookList } from '@/components/collections/BookList';
import { MovieList } from '@/components/collections/MovieList';
import { AnimeList } from '@/components/collections/AnimeList';
import { MusicList } from '@/components/collections/MusicList';
import { SocialList } from '@/components/collections/SocialList';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CATEGORY_META, type CategoryId } from '@/constants';

const CATEGORY_ICONS: Record<CategoryId, React.ReactNode> = {
  games: <Gamepad2 size={32} />,
  books: <BookOpen size={32} />,
  movies: <Film size={32} />,
  anime: <MonitorPlay size={32} />,
  music: <Music size={32} />,
  others: <MoreHorizontal size={32} />,
};

const borderColorMap: Record<string, string> = {
  purple: 'border-purple-400',
  yellow: 'border-yellow-400',
  red: 'border-red-400',
  pink: 'border-pink-400',
  green: 'border-green-400',
  gray: 'border-gray-400',
};
const textColorMap: Record<string, string> = {
  purple: 'text-purple-400',
  yellow: 'text-yellow-400',
  red: 'text-red-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  gray: 'text-gray-400',
};

const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const { copiedId, copy } = useCopyToClipboard();

  if (!category)
    return (
      <div className="site-container page-space">
        <header className="page-heading">
          <p className="section-kicker">课本以外</p>
          <h1>我的收藏室</h1>
          <p>玩过的世界，读过的故事，还有那些反复播放的旋律。</p>
        </header>
        <div className="collection-hub">
          {Object.entries(CATEGORY_META).map(([id, meta]) => (
            <Link key={id} to={'/collections/' + id}>
              {CATEGORY_ICONS[id as CategoryId]}
              <h2>{meta.title}</h2>
              <p>
                {
                  (
                    {
                      games: '进入不同的世界',
                      books: '在书页里停留',
                      movies: '留下光影的片段',
                      anime: '收藏想象力',
                      music: '找到自己的频率',
                      others: '在别处找到我',
                    } as Record<string, string>
                  )[id]
                }
              </p>
            </Link>
          ))}
        </div>
      </div>
    );

  const currentCategory = CATEGORY_META[category as CategoryId];
  if (!currentCategory) return <div className="text-center pt-20 text-gray-400">未找到该分类</div>;

  const renderContent = () => {
    switch (category) {
      case 'games':
        return <GameList />;
      case 'books':
        return <BookList />;
      case 'movies':
        return <MovieList />;
      case 'anime':
        return <AnimeList />;
      case 'music':
        return <MusicList />;
      case 'others':
        return <SocialList handleCopy={copy} copiedId={copiedId} />;
      default:
        return (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <p className="text-gray-400">目前这里还是空的...</p>
          </div>
        );
    }
  };

  const borderClass = borderColorMap[currentCategory.color] || 'border-gray-400';
  const textClass = textColorMap[currentCategory.color] || 'text-gray-400';

  return (
    <div className="site-container page-space">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2
          className={`text-3xl font-bold text-white border-l-4 pl-4 flex items-center gap-3 font-heading ${borderClass}`}
        >
          <span className={textClass}>{CATEGORY_ICONS[category as CategoryId]}</span>
          {currentCategory.title}
        </h2>
      </div>

      <nav className="collection-tabs" aria-label="收藏分类">
        <Link to="/collections">全部收藏</Link>
        {Object.entries(CATEGORY_META).map(([id, meta]) => (
          <Link key={id} className={category === id ? 'active' : ''} to={'/collections/' + id}>
            {meta.title}
          </Link>
        ))}
      </nav>
      {renderContent()}
    </div>
  );
};

export default Collections;
