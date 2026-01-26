export interface Book {
    id: number;
    title: string;
    cover: string;     
    author: string;    
    publisher: string; // 出版社
    review: string;    // 短评
    rating: string;    // 评分 (暂留空)
}

export const books: Book[] = [
    {
        id: 1,
        title: "哈利·波特（全7册）",
        cover: "/books/harry-potter.jpg",
        author: "[英] J.K.罗琳",
        publisher: "人民文学出版社",
        review: "霍格沃茨赶紧把我的通知书发给我",
        rating: "" 
    },
    {
        id: 2,
        title: "德米安 : 彷徨少年时",
        cover: "/books/demian.jpg",
        author: "赫尔曼·黑塞",
        publisher: "上海人民出版社",
        review: "充满了理想，充满了坚定的意志，德米安就在每个人的心中",
        rating: ""
    },
    {
        id: 3,
        title: "人间失格·斜阳",
        cover: "/books/no-longer-human.jpg",
        author: "[日] 太宰治",
        publisher: "上海译文出版社",
        review: "自杀之前写的书总让人看起来觉得无病呻吟，但是你的艺术确实是成功的，太宰治",
        rating: ""
    },
    {
        id: 4,
        title: "追风筝的人",
        cover: "/books/kite-runner.jpg",
        author: "[美] 卡勒德·胡赛尼",
        publisher: "上海人民出版社",
        review: "精巧，不像是这些年写出来的书，读完令人动容。高飞的风筝就像灵魂，追到风筝了才算拥有灵魂。",
        rating: ""
    },
    {
        id: 5,
        title: "麦田里的守望者",
        cover: "/books/catcher-in-the-rye.jpg",
        author: "[美] J.D.塞林格",
        publisher: "译林出版社",
        review: "写给垮掉的一代的书。全文像是磕了lsd一样的文笔，叙事节奏极快，浮光掠影走马观花。看不惯社会，适应社会，守望着社会。这大概就是一个男孩的一生吧。",
        rating: ""
    },
    {
        id: 6,
        title: "荒原狼",
        cover: "/books/steppenwolf.jpg",
        author: "[德] 赫尔曼·黑塞",
        publisher: "上海译文出版社",
        review: "千千万万个棋子，千千万万种人生，何必成为一个唯一的人呢？只要下棋的是优秀的棋手，得到的就会是千古名局",
        rating: ""
    },
    {
        id: 7,
        title: "雪国",
        cover: "/books/snow-country.jpg",
        author: "[日] 川端康成",
        publisher: "南海出版公司",
        review: "三个人的悲剧，写的有点无病呻吟",
        rating: ""
    },
    {
        id: 8,
        title: "狼与香辛料 01",
        cover: "/books/spice-and-wolf.jpg",
        author: "[日] 支仓冻砂",
        publisher: "南海出版公司",
        review: "平淡的旅程，温馨的马车",
        rating: ""
    },
    {
        id: 9,
        title: "海边的卡夫卡",
        cover: "/books/kafka-on-the-shore.jpg",
        author: "[日] 村上春树",
        publisher: "上海译文出版社",
        review: "五星好评，剩下的两颗被村上春树的隐喻隐藏住了",
        rating: ""
    },
    {
        id: 10,
        title: "太阳照常升起",
        cover: "/books/sun-also-rises.jpg",
        author: "[美] 欧内斯特·海明威",
        publisher: "上海译文出版社",
        review: "迷惘的一代是孤独的一代",
        rating: ""
    },
    {
        id: 11,
        title: "霍乱时期的爱情",
        cover: "/books/love-in-time-of-cholera.jpg",
        author: "[哥伦比亚] 加西亚·马尔克斯",
        publisher: "南海出版公司",
        review: "充满污秽的河上，长出了纯洁又不忠贞的爱",
        rating: ""
    },
    {
        id: 12,
        title: "八月之光",
        cover: "/books/light-in-august.jpg",
        author: "[美] 威廉·福克纳",
        publisher: "译林出版社",
        review: "精巧的瓦匠，建出精妙的文学大厦",
        rating: ""
    },
    {
        id: 13,
        title: "霍比特人",
        cover: "/books/hobbit.jpg",
        author: "[英] J.R.R.托尔金",
        publisher: "四川文艺出版社",
        review: "炉火旁口口相传的温馨故事，吟游诗人笔下的传奇曲目",
        rating: ""
    },
    {
        id: 14,
        title: "罗杰疑案",
        cover: "/books/rogert-ackroyd.jpg",
        author: "[英] 阿加莎·克里斯蒂",
        publisher: "新星出版社",
        review: "打开书本，浸入故事",
        rating: ""
    },
    {
        id: 15,
        title: "窄门",
        cover: "/books/strait-is-the-gate.jpg",
        author: "[法] 安德烈·纪德",
        publisher: "天津人民出版社",
        review: "想起了我的高中生活，明明过了没多久，感觉恍如隔世",
        rating: ""
    },
    {
        id: 16,
        title: "额尔古纳河右岸",
        cover: "/books/argun-river.jpg",
        author: "迟子建",
        publisher: "北京十月文艺出版社",
        review: "神秘的大地，孕育了这样的故事",
        rating: ""
    },
    {
        id: 17,
        title: "少年维特的烦恼",
        cover: "/books/werther.jpg",
        author: "[德] 歌德",
        publisher: "人民文学出版社",
        review: "奇特绚丽，热情四溢",
        rating: ""
    },
    {
        id: 18,
        title: "失明症漫记",
        cover: "/books/blindness.jpg",
        author: "[葡] 若泽·萨拉马戈",
        publisher: "河南文艺出版社",
        review: "把美好的都打碎",
        rating: ""
    },
    {
        id: 19,
        title: "分成两半的子爵",
        cover: "/books/cloven-viscount.jpg",
        author: "[意] 伊塔洛·卡尔维诺",
        publisher: "译林出版社",
        review: "朴实，有思想",
        rating: ""
    },
    {
        id: 20,
        title: "白夜行",
        cover: "/books/white-night.jpg",
        author: "[日] 东野圭吾",
        publisher: "南海出版公司",
        review: "眉毛胡子一把乱抓",
        rating: ""
    },
    {
        id: 21,
        title: "且听风吟",
        cover: "/books/hear-the-wind-sing.jpg",
        author: "[日] 村上春树",
        publisher: "上海译文出版社",
        review: "独属于年轻的村上春树的一份才气与忧伤",
        rating: ""
    },
    {
        id: 22,
        title: "了不起的盖茨比",
        cover: "/books/gatsby.jpg",
        author: "（美）F.S. 菲茨杰拉德",
        publisher: "上海译文出版社",
        review: "美国梦那虚无缥缈的绿灯，笼罩在美国头上",
        rating: ""
    },
    {
        id: 23,
        title: "在轮下",
        cover: "/books/beneath-the-wheel.jpg",
        author: "[德] 赫尔曼·黑塞",
        publisher: "译林出版社",
        review: "因何上学？因为没有因为",
        rating: ""
    },
    {
        id: 24,
        title: "挪威的森林",
        cover: "/books/norwegian-wood.jpg",
        author: "[日] 村上春树",
        publisher: "上海译文出版社",
        review: "相爱，存在，死亡 迷惘，寻找，拥抱",
        rating: ""
    },
    {
        id: 25,
        title: "猎人笔记",
        cover: "/books/sportsmans-sketches.jpg",
        author: "屠格涅夫",
        publisher: "译林出版社",
        review: "安逸，平淡，生活",
        rating: ""
    },
    {
        id: 26,
        title: "百年孤独",
        cover: "/books/one-hundred-years.jpg",
        author: "[哥伦比亚] 加西亚·马尔克斯",
        publisher: "南海出版公司",
        review: "魔幻又现实，才是真正的现实",
        rating: ""
    },
    {
        id: 27,
        title: "树上的男爵",
        cover: "/books/baron-in-the-trees.jpg",
        author: "[意大利] 伊塔洛·卡尔维诺",
        publisher: "译林出版社",
        review: "翠绿的高树上，住着一个理想的国家",
        rating: ""
    },
    {
        id: 28,
        title: "喧哗与骚动",
        cover: "/books/sound-and-fury.jpg",
        author: "[美] 威廉·福克纳",
        publisher: "时代文艺出版社",
        review: "形式的文学，形式的思想，艺术的表达",
        rating: ""
    },
    {
        id: 29,
        title: "魔山",
        cover: "/books/magic-mountain.jpg",
        author: "[德] 托马斯·曼",
        publisher: "上海译文出版社",
        review: "资本主义的挽歌，精妙的交响乐，在高山上的舞台上演出了一幕幕华丽的舞台剧",
        rating: ""
    },
    {
        id: 30,
        title: "卡拉马佐夫兄弟",
        cover: "/books/karamazov.jpg",
        author: "[俄] 陀思妥耶夫斯基",
        publisher: "译林出版社",
        review: "平白的文字构造出深刻的对话，体现出深邃的思考",
        rating: ""
    },
    {
        id: 31,
        title: "安娜·卡列尼娜",
        cover: "/books/anna-karenina.jpg",
        author: "[俄] 列夫·托尔斯泰",
        publisher: "译林出版社",
        review: "从中看穿人心，从中看透人生",
        rating: ""
    },
    {
        id: 32,
        title: "西线无战事",
        cover: "/books/all-quiet-western-front.jpg",
        author: "[德国] 埃里希·玛丽亚·雷马克",
        publisher: "译林出版社",
        review: "战争没有赢家可言",
        rating: ""
    },
    {
        id: 33,
        title: "兩人距離的概算",
        cover: "/books/approximate-distance.jpg",
        author: "米澤穗信",
        publisher: "獨步文化",
        review: "精巧，严谨，心思细腻",
        rating: ""
    },
    {
        id: 34,
        title: "嫌疑人X的献身",
        cover: "/books/suspect-x.jpg",
        author: "[日] 东野圭吾",
        publisher: "南海出版公司",
        review: "唯一值得一读的东野圭吾的悬疑小说",
        rating: ""
    },
    {
        id: 35,
        title: "魔戒",
        cover: "/books/lord-of-the-rings.jpg",
        author: "[英] J.R.R.托尔金",
        publisher: "上海人民出版社",
        review: "几十个小时的阅读，仿佛亲身经历了中土世界这几年的种种纠纷，我与护戒使者们共同旅行的那段路，会成为我往后最美妙的回忆",
        rating: ""
    }
];
