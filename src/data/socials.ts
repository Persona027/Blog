import type { SocialAccount } from '@/types';
export type { SocialAccount };

export const socials: SocialAccount[] = [
    // Section A (链接)
    {
        id: 'github',
        name: '@Persona',
        platform: 'GitHub',
        icon: 'github.svg',
        value: 'https://github.com/Persona027',
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
    {
        id: 'steam-link',
        name: 'Holy Moly',
        platform: 'Steam',
        icon: 'steam.svg',
        value: 'https://steamcommunity.com/profiles/76561198849238130/',
        type: 'link',
        color: 'text-blue-400',
        group: 1
    },
    {
        id: 'zhihu',
        name: '知乎主页',
        platform: 'Zhihu',
        icon: 'zhihu.svg',
        value: 'https://www.zhihu.com/people/qing-ge-liu-huan-64-90',
        type: 'link',
        color: 'text-blue-600',
        group: 1
    },
    
    // Section B (ID)
    {
        id: 'battlenet',
        name: 'sneaker#51195',
        platform: 'Battle.net',
        icon: 'battlenet.svg',
        value: 'sneaker#51195',
        type: 'copy',
        color: 'text-blue-300',
        group: 2
    },
    {
        id: 'arknights',
        name: 'Persona#1234',
        platform: 'Arknights',
        icon: 'arknights.svg',
        value: 'Persona#1234',
        type: 'copy',
        color: 'text-yellow-500',
        group: 2
    },
    {
        id: 'valorant',
        name: '金玟池#12866',
        platform: 'Valorant',
        icon: 'valorant.svg',
        value: '金玟池#12866',
        type: 'copy',
        color: 'text-red-500',
        group: 2
    }
];
