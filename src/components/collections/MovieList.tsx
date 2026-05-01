import { Calendar, Eye } from 'lucide-react';
import { movies } from '@/data/movies';
import { CollectionCard } from './CollectionCard';

export const MovieList = () => (
  <div className="space-y-6">
    {movies.map((movie) => (
      <CollectionCard
        key={movie.id}
        cover={movie.cover}
        coverAlt={movie.title}
        coverClassName="w-full aspect-[2/3] md:w-40 md:h-auto object-cover"
        hoverBorderColor="hover:border-red-500/50"
        sidebar={
          <>
            <span className="text-2xl font-bold text-red-400 mb-2">{movie.rating}</span>
            <span className="text-xs text-gray-500 text-center">导演<br />{movie.director}</span>
          </>
        }
        mobileFooter={
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">导演: {movie.director}</span>
            <span className="text-xl font-bold text-red-400">{movie.rating}</span>
          </div>
        }
      >
        <div>
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{movie.title}</h3>
              <span className="text-sm text-gray-500 font-medium">{movie.originalTitle}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {movie.tags.map((tag) => (
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
      </CollectionCard>
    ))}
  </div>
);
