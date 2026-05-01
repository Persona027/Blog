import { books } from '@/data/books';
import { CollectionCard } from './CollectionCard';

export const BookList = () => (
  <div className="space-y-6">
    {books.map((book) => (
      <CollectionCard
        key={book.id}
        cover={book.cover}
        coverAlt={book.title}
        coverClassName="w-full h-48 md:w-48 md:h-auto md:aspect-square"
        hoverBorderColor="hover:border-yellow-500/50"
        sidebar={
          <span className="text-2xl font-bold text-yellow-400">{book.rating}</span>
        }
        mobileFooter={
          <span className="text-xl font-bold text-yellow-400">{book.rating}</span>
        }
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{book.title}</h3>
            <div className="flex items-center gap-2 text-sm text-yellow-500/80">
              <span className="font-medium">{book.author}</span>
              <span className="text-gray-500">&bull;</span>
              <span className="text-gray-400 text-xs px-2 py-0.5 bg-white/5 rounded border border-white/10">{book.publisher}</span>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">&ldquo;{book.review}&rdquo;</p>
        </div>
      </CollectionCard>
    ))}
  </div>
);
