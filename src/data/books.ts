export interface Book {
    id: number;
    title: string;
    cover: string;     // 例如 '/books/1984.jpg'
    author: string;    // 例如 '乔治·奥威尔'
    info: string;      // 例如 '[英] 20世纪' (国籍/时代)
    review: string;    // 短评
    rating: string;    // 评分
}

export const books: Book[] = [
    {
        id: 1,
        title: "三体",
        cover: "/books/three-body.jpg", 
        author: "刘慈欣",
        info: "[中] 当代",
        review: "它不仅仅是一部科幻小说，更是一部关于文明兴衰的史诗。黑暗森林法则让人不寒而栗，却又逻辑自洽得令人绝望。",
        rating: "10/10"
    },
    {
        id: 2,
        title: "百年孤独",
        cover: "/books/100-years.jpg", 
        author: "加西亚·马尔克斯",
        info: "[哥伦比亚] 20世纪",
        review: "魔幻现实主义的巅峰，布恩迪亚家族七代人的孤独。读完后仿佛做了一场漫长而湿热的梦，梦里一直在下这雨。",
        rating: "9.5/10"
    }
];
