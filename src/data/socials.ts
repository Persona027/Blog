export interface SocialAccount {
    id: string;
    name: string;      // 展示的 ID 或 昵称
    platform: string;  // 平台名
    icon: string;      // 对应 public/other/ 下的文件名
    value: string;     // 链接或要复制的内容
    type: 'link' | 'copy';
    color: string;     // Tailwind 颜色类 (text-类名)
    group: number;     // 1 或 2，对应分区
}

export const socials: SocialAccount[] = [
    // Section A (占位符标题)
    {
        id: 'github',
        name: '@Persona-Dev',
        platform: 'GitHub',
        icon: 'github.svg',
        value: 'https://github.com',
        type: 'link',
        color: 'text-gray-100',
        group: 1
    },
    {
        id: 'bilibili',
        name: 'Persona的动态',
        platform: 'Bilibili',
        icon: 'bilibili.svg',
        value: 'https://space.bilibili.com/279658155',
        type: 'link',
        color: 'text-pink-400',
        group: 1
    },
    {
        id: 'douban',
        name: '影评集',
        platform: 'Douban',
        icon: 'douban.svg',
        value: 'https://www.douban.com/people/221447107',
        type: 'link',
        color: 'text-green-500',
        group: 1
    },
    {
        id: 'cloudmusic',
        name: '我的歌单',
        platform: 'NetEase Music',
        icon: 'cloudmusic.svg',
        value: 'https://music.163.com/#/user/home?id=622659989',
        type: 'link',
        color: 'text-red-500',
        group: 1
    },
    
    // Section B (占位符标题)
    {
        id: 'steam',
        name: 'Persona_Gamer',
        platform: 'Steam',
        icon: 'steam.svg',
        value: '123456789', // 模拟好友代码
        type: 'copy',
        color: 'text-blue-400',
        group: 2
    },
    {
        id: 'discord',
        name: 'persona#0001',
        platform: 'Discord',
        icon: 'discord.svg',
        value: 'persona#0001',
        type: 'copy',
        color: 'text-indigo-400',
        group: 2
    }
];
