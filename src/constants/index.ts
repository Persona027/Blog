// 全局常量 —— 分类名称、视图类型、路由路径

export const CATEGORY_IDS = ['games', 'books', 'movies', 'anime', 'music', 'others'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORY_META: Record<CategoryId, { title: string; color: string }> = {
  games:  { title: '我的游戏库', color: 'purple' },
  books:  { title: '阅读书单',   color: 'yellow' },
  movies: { title: '影视收藏',   color: 'red' },
  anime:  { title: '番剧列表',   color: 'pink' },
  music:  { title: '专辑收藏',   color: 'green' },
  others: { title: '其他收藏',   color: 'gray' },
};

export const ROUTES = {
  HOME: '/',
  ARTICLES: '/articles',
  ARTICLE: '/article/:slug',
  ABOUT: '/about',
  COLLECTIONS: '/collections/:category?',
} as const;
