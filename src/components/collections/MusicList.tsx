import { albums } from '@/data/music';
import { CollectionCard } from './CollectionCard';

export const MusicList = () => (
  <div className="space-y-6">
    {albums.map((album) => (
      <CollectionCard
        key={album.id}
        cover={album.cover}
        coverAlt={album.title}
        coverClassName="w-full h-48 md:w-48 md:h-auto md:aspect-square"
        hoverBorderColor="hover:border-green-500/50"
        sidebar={
          <span className="text-2xl font-bold text-green-400">{album.rating}</span>
        }
        mobileFooter={
          <span className="text-xl font-bold text-green-400">{album.rating}</span>
        }
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                {album.title}
              </h3>
              <span className="text-sm text-green-500/80 font-medium">{album.artist}</span>
            </div>
            <div className="flex gap-2">
              {album.tags.map((tag) => (
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
          <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">&ldquo;{album.review}&rdquo;</p>
        </div>
      </CollectionCard>
    ))}
  </div>
);
