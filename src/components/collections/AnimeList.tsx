import { useState } from 'react';
import { Calendar, Eye } from 'lucide-react';
import { animes } from '@/data/animes';
import { CollectionCard } from './CollectionCard';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 10;

export const AnimeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(animes.length / ITEMS_PER_PAGE);
  const paginatedAnimes = animes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <div className="space-y-6">
        {paginatedAnimes.map((anime) => (
          <CollectionCard
            key={anime.id}
            cover={anime.cover}
            coverAlt={anime.title}
            coverClassName="w-full aspect-[2/3] md:w-40 md:h-auto object-cover"
            hoverBorderColor="hover:border-pink-500/50"
            sidebar={
              <>
                <span className="text-2xl font-bold text-pink-400 mb-2">{anime.rating}</span>
                <span className="text-xs text-gray-500 text-center">制作<br />{anime.studio}</span>
              </>
            }
            mobileFooter={
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">制作: {anime.studio}</span>
                <span className="text-xl font-bold text-pink-400">{anime.rating}</span>
              </div>
            }
          >
            <div>
              <div className="flex flex-col gap-1 mb-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">{anime.originalTitle}</h3>
                  <span className="text-sm text-gray-500 font-medium">{anime.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {anime.tags.map((tag) => (
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
          </CollectionCard>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};
