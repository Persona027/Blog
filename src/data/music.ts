export interface Album {
    id: number;
    title: string;
    artist: string;
    year: string;
    genre: string;
    cover: string;     // 图片路径，建议放在 /public/music/
    review: string;    // 我的评价
    rating: string;    // 评分
    tags: string[];    // 标签
    link?: string;     // 详情链接
}

export const albums: Album[] = [
    {
        id: 1,
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        year: "1973",
        genre: "Progressive Rock",
        cover: "/music/dark-side.jpg",
        review: "摇滚史上最伟大的专辑之一，概念完整，混音极其超前。月之暗面，也是人心之暗面。",
        rating: "10/10",
        tags: ["Classic Rock", "Psychedelic"],
        link: "https://music.163.com/#/album?id=141838"
    },
    {
        id: 2,
        title: "Jay",
        artist: "周杰伦",
        year: "2000",
        genre: "C-Pop / R&B",
        cover: "/music/jay.jpg",
        review: "华语乐坛新纪元的开端，即使是在今天听依然不过时。每首歌都是经典。",
        rating: "9.8/10",
        tags: ["Mandopop", "R&B"],
        link: "https://music.163.com/#/album?id=18896"
    }
];
