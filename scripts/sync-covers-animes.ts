import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Bangumi API 配置
const BANGUMI_API_BASE = 'https://api.bgm.tv/v0';
const BANGUMI_USERNAME = process.env.BANGUMI_USERNAME;
const BANGUMI_ACCESS_TOKEN = process.env.BANGUMI_ACCESS_TOKEN;

if (!BANGUMI_USERNAME || !BANGUMI_ACCESS_TOKEN) {
    console.error('❌ BANGUMI_USERNAME 或 BANGUMI_ACCESS_TOKEN 未找到。请检查 .env.local 设定。');
    process.exit(1);
}

// 确保目标目录存在
const animeDirectory = path.join(__dirname, '../public/anime');
if (!fs.existsSync(animeDirectory)) {
    fs.mkdirSync(animeDirectory, { recursive: true });
}

// 辅助方法：休眠防封
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function cleanTitle(title: string): string {
    return title.replace(/（.*?）|\(.*?\)|：.*|:.*|·|\/|\\|\?|\*|<|>|\||"/g, '').trim();
}

// 从 infobox 提取工作室信息
function extractStudio(infobox: any[]): string {
    const studioItem = infobox.find(item => item.key === '动画制作' || item.key === '製作' || item.key === '制作');
    return studioItem ? studioItem.value : '';
}

// 下载封面图片
async function downloadCover(imageUrl: string, filename: string): Promise<void> {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`下载失败: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(path.join(animeDirectory, filename), Buffer.from(buffer));
        console.log(`✅ 下载封面: ${filename}`);
    } catch (error) {
        console.error(`❌ 下载封面失败 ${filename}:`, error);
    }
}

// 获取用户收藏列表
async function fetchUserCollections(offset: number = 0): Promise<any> {
    const url = `${BANGUMI_API_BASE}/users/${BANGUMI_USERNAME}/collections?subject_type=2&type=2&limit=20&offset=${offset}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${BANGUMI_ACCESS_TOKEN}`,
            'User-Agent': 'personal-site-sync/1.0'
        }
    });
    if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
    }
    return await response.json();
}

// 主函数
async function syncAnimes() {
    console.log('🚀 开始同步 Bangumi 动画收藏...');

    // 删除旧封面
    const fs = await import('fs');
    const files = fs.readdirSync(animeDirectory);
    for (const file of files) {
        if (file.endsWith('.jpg')) {
            fs.unlinkSync(path.join(animeDirectory, file));
            console.log(`🗑️ 删除旧封面: ${file}`);
        }
    }

    const animes: any[] = [];
    let offset = 0;
    let total = 0;

    while (true) {
        console.log(`📄 获取第 ${Math.floor(offset / 20) + 1} 页...`);
        const data = await fetchUserCollections(offset);

        if (data.data && data.data.length > 0) {
            total = data.total || total;
            for (const item of data.data) {
                const subject = item.subject;
                const cleanName = cleanTitle(subject.name);
                const filename = `${subject.id}-${cleanName}.jpg`;
                const anime = {
                    id: subject.id,
                    title: subject.name,
                    originalTitle: subject.name_cn || subject.name,
                    cover: `/anime/${filename}`,
                    watchDate: '', // API 不提供观看日期
                    releaseDate: subject.air_date || '',
                    tags: item.tags || [],
                    review: item.comment || '', // 评论作为review
                    rating: item.rate ? `${item.rate}/10` : '',
                    studio: extractStudio(subject.infobox || [])
                };
                animes.push(anime);

                // 下载封面
                if (subject.images && subject.images.large) {
                    await downloadCover(subject.images.large, filename);
                    await sleep(500); // 防封
                }
            }
            offset += 20;
            if (offset >= total) break;
        } else {
            break;
        }
    }

    // 生成 animes.ts 文件
    const tsContent = `export interface Anime {
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

export const animes: Anime[] = ${JSON.stringify(animes, null, 4)};
`;

    const animesFilePath = path.join(__dirname, '../src/data/animes.ts');
    fs.writeFileSync(animesFilePath, tsContent, 'utf-8');

    console.log(`✅ 同步完成，共 ${animes.length} 部动画`);
}

syncAnimes().catch(console.error);