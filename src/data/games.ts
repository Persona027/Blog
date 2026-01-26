export interface Game {
    id: number;
    title: string;
    cover: string;     // 图片路径，如 '/games/zelda.jpg' 或者 import 进来的变量
    review: string;    // 我的短评
    rating: string;    // 评分，如 '9.5/10'
    tags: string[];    // 标签，如 ['RPG', 'Open World']
    link: string;      // 官方链接或详情页
}

// 示例数据 - 您可以直接在这里修改
export const games: Game[] = [
    {
        id: 1,
        title: "上古卷轴5：天际",
        cover: "/games/ElderScrolls.jpg", // 暂时使用占位，请后续替换
        review: "开放世界的高峰，极佳的沉浸感和角色扮演体验。完美的开放世界rpg教科书。",
        rating: "10/10",
        tags: ["RPG", "Open World", "Bethesda"],
        link: "https://elderscrolls.bethesda.net/en/skyrim"
    },
    {
        id: 2,
        title: "炉石传说",
        cover: "/games/HearthStone.jpg",
        review: "Tcg的完美答案，精美的ui，完美的视觉体验以及温暖的社区，王朝还未衰微。",
        rating: "9.5/10",
        tags: ["Cards", "Tcg", "Blizzard"],
        link: "https://playhearthstone.com/"
    },
    {
        id: 3,
        title: "塞尔达传说：旷野之息",
        cover: "/games/Zelda.png", // 暂时使用占位，请后续替换
        review: "重新定义了开放世界。在这片海拉鲁大陆上，每一次翻山越岭都是一次未知的冒险。物理引擎与化学引擎的交互令人惊叹。",
        rating: "9/10",
        tags: ["RPG", "Open World", "Nintendo"],
        link: "https://www.zelda.com/breath-of-the-wild/"
    },
];
