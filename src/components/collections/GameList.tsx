import { ExternalLink } from 'lucide-react';
import { games } from '@/data/games';
import { CollectionCard } from './CollectionCard';

export const GameList = () => (
  <div className="space-y-6">
    {games.map((game) => (
      <CollectionCard
        key={game.id}
        cover={game.cover}
        coverAlt={game.title}
        coverClassName="w-full h-48 md:w-48 md:h-auto md:aspect-square"
        hoverBorderColor="hover:border-purple-500/50"
        sidebar={
          <>
            <span className="text-2xl font-bold text-purple-400 mb-2">{game.rating}</span>
            <a href={game.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-white flex flex-col items-center gap-1 transition-colors">
              <ExternalLink size={16} />
              <span>访问详情</span>
            </a>
          </>
        }
        mobileFooter={
          <div className="flex items-center justify-between">
            <a href={game.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 flex items-center gap-1 hover:text-purple-400">
              <ExternalLink size={12} /> 官方链接
            </a>
            <span className="text-xl font-bold text-purple-400">{game.rating}</span>
          </div>
        }
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">
              <a href={game.link} target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-2">
                {game.title}
              </a>
            </h3>
            <div className="flex gap-2">
              {game.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">{game.review}</p>
        </div>
      </CollectionCard>
    ))}
  </div>
);
