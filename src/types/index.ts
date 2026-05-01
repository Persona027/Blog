// 统一类型定义 —— 所有接口的单一来源

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  cover?: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Frontmatter {
  title?: string;
  date?: string;
  summary?: string;
  cover?: string;
  category?: string;
  [key: string]: string | undefined;
}

export interface Game {
  id: number;
  title: string;
  cover: string;
  review: string;
  rating: string;
  tags: string[];
  link: string;
}

export interface Book {
  id: number;
  title: string;
  cover: string;
  author: string;
  publisher: string;
  review: string;
  rating: string;
}

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  cover: string;
  watchDate: string;
  releaseDate: string;
  tags: string[];
  review: string;
  rating: string;
  director: string;
}

export interface Anime {
  id: number;
  title: string;
  originalTitle: string;
  cover: string;
  watchDate: string;
  releaseDate: string;
  tags: string[];
  review: string;
  rating: string;
  studio: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  year: string;
  genre: string;
  cover: string;
  review: string;
  rating: string;
  tags: string[];
  link?: string;
}

export interface SocialAccount {
  id: string;
  name: string;
  platform: string;
  icon: string;
  value: string;
  type: 'link' | 'copy';
  color: string;
  group: number;
}

export interface CoverImageProps {
  src?: string;
  alt: string;
  className?: string;
  hoverEffect?: boolean;
}
