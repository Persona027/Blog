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
    studio: string; // 制作公司
}

export const animes: Anime[] = [
    {
        id: 1,
        title: "风之谷",
        originalTitle: "風の谷のナウシカ",
        cover: "/anime/nausicaa.jpg",
        watchDate: "2024-01-15",
        releaseDate: "1984-03-11",
        tags: ["奇幻", "冒险", "科幻"],
        review: "宫崎骏史诗的开端，对人与自然的思考振聋发聩。",
        rating: "9.2/10",
        studio: "Topcraft"
    },
    {
        id: 2,
        title: "天空之城",
        originalTitle: "天空の城ラピュタ",
        cover: "/anime/laputa.jpg",
        watchDate: "2024-02-20",
        releaseDate: "1986-08-02",
        tags: ["冒险", "奇幻", "蒸汽朋克"],
        review: "那个关于飞行的梦想，以及巴鲁和希达纯真的羁绊。",
        rating: "9.1/10",
        studio: "Studio Ghibli"
    },
    {
        id: 3,
        title: "龙猫",
        originalTitle: "となりのトトロ",
        cover: "/anime/totoro.jpg",
        watchDate: "2024-03-10",
        releaseDate: "1988-04-16",
        tags: ["奇幻", "童年", "治愈"],
        review: "只有孩子纯净的眼睛才能看到的奇迹。",
        rating: "9.4/10",
        studio: "Studio Ghibli"
    },
    {
        id: 4,
        title: "魔女宅急便",
        originalTitle: "魔女の宅急便",
        cover: "/anime/kiki.jpg",
        watchDate: "2024-04-05",
        releaseDate: "1989-07-29",
        tags: ["成长", "奇幻", "生活"],
        review: "关于成长带来的阵痛与失去魔法的恐慌，每个人都有过的经历。",
        rating: "8.9/10",
        studio: "Studio Ghibli"
    },
    {
        id: 5,
        title: "红猪",
        originalTitle: "紅の豚",
        cover: "/anime/porco-rosso.jpg",
        watchDate: "2024-05-12",
        releaseDate: "1992-07-18",
        tags: ["飞行", "浪漫", "喜剧"],
        review: "不会飞的猪只是普通的猪。属于成年人的浪漫。",
        rating: "9.0/10",
        studio: "Studio Ghibli"
    },
    {
        id: 6,
        title: "幽灵公主",
        originalTitle: "もののけ姫",
        cover: "/anime/mononoke.jpg",
        watchDate: "2024-06-01",
        releaseDate: "1997-07-12",
        tags: ["奇幻", "战争", "自然"],
        review: "吉卜力最宏大、最深刻的作品之一，活下去。",
        rating: "9.5/10",
        studio: "Studio Ghibli"
    },
    {
        id: 7,
        title: "千与千寻",
        originalTitle: "千と千尋の神隠し",
        cover: "/anime/spirited-away.jpg",
        watchDate: "2024-07-20",
        releaseDate: "2001-07-20",
        tags: ["奇幻", "成长", "冒险"],
        review: "不要吃太胖，会被杀掉的！找回名字的旅程。",
        rating: "9.7/10",
        studio: "Studio Ghibli"
    },
    {
        id: 8,
        title: "哈尔的移动城堡",
        originalTitle: "ハウルの動く城",
        cover: "/anime/howl.jpg",
        watchDate: "2024-08-15",
        releaseDate: "2004-11-20",
        tags: ["奇幻", "爱情", "反战"],
        review: "世界这么大，人生这么长，总会有这么一个人，让你想要温柔的对待。",
        rating: "9.3/10",
        studio: "Studio Ghibli"
    },
    {
        id: 9,
        title: "崖上的波妞",
        originalTitle: "崖の上のポニョ",
        cover: "/anime/ponyo.jpg",
        watchDate: "2024-09-10",
        releaseDate: "2008-07-19",
        tags: ["奇幻", "童真", "家庭"],
        review: "波妞喜欢宗介，我也喜欢你。",
        rating: "8.8/10",
        studio: "Studio Ghibli"
    },
    {
        id: 10,
        title: "起风了",
        originalTitle: "風立ちぬ",
        cover: "/anime/wind-rises.jpg",
        watchDate: "2024-10-01",
        releaseDate: "2013-07-20",
        tags: ["传记", "历史", "爱情"],
        review: "起风了，唯有努力生存。",
        rating: "9.1/10",
        studio: "Studio Ghibli"
    },
    {
        id: 11,
        title: "你想活出怎样的人生",
        originalTitle: "君たちはどう生きるか",
        cover: "/anime/boy-and-heron.jpg",
        watchDate: "2024-12-25",
        releaseDate: "2023-07-14",
        tags: ["奇幻", "冒险", "哲学"],
        review: "宫崎骏的人生谢幕思考，略显晦涩但余味悠长。",
        rating: "8.5/10",
        studio: "Studio Ghibli"
    }
];
