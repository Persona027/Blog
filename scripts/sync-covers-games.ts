import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bangumi API 配置
const BANGUMI_API_BASE = 'https://api.bgm.tv/v0';
const USERNAME = '1219779';
const ACCESS_TOKEN = 'VAtAtX29uD98TkxDsmklUVIqPPGcZxabBZZwBEjO';

// 确保目标目录存在
const gameDirectory = path.join(__dirname, '../public/games');
if (!fs.existsSync(gameDirectory)) {
    fs.mkdirSync(gameDirectory, { recursive: true });
}

// 辅助方法：休眠防封
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function cleanTitle(title: string): string {
    return title.replace(/（.*?）|\(.*?\)|：.*|:.*|·|\/|\\|\?|\*|<|>|\||"/g, '').trim();
}

// 从 infobox 提取工作室信息（游戏可能无）
function extractStudio(infobox: any[]): string {
    const studioItem = infobox.find(item => item.key === '开发' || item.key === '发行' || item.key === '製作');
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
        fs.writeFileSync(path.join(gameDirectory, filename), Buffer.from(buffer));
        console.log(`✅ 下载封面: ${filename}`);
    } catch (error) {
        console.error(`❌ 下载封面失败 ${filename}:`, error);
    }
}

// 获取用户收藏列表
async function fetchUserCollections(offset: number = 0): Promise<any> {
    const url = `${BANGUMI_API_BASE}/users/${USERNAME}/collections?subject_type=4&type=2&limit=20&offset=${offset}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'User-Agent': 'personal-site-sync/1.0'
        }
    });
    if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
    }
    return await response.json();
}

// 主函数
async function syncGames() {
    console.log('🚀 开始同步 Bangumi 游戏收藏...');

    // 删除旧封面
    const files = fs.readdirSync(gameDirectory);
    for (const file of files) {
        if (file.endsWith('.jpg')) {
            fs.unlinkSync(path.join(gameDirectory, file));
            console.log(`🗑️ 删除旧封面: ${file}`);
        }
    }

    const games: any[] = [];
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
                const game = {
                    id: subject.id,
                    title: subject.name,
                    cover: `/games/${filename}`,
                    review: item.comment || '',
                    rating: item.rate ? `${item.rate}/10` : '',
                    tags: item.tags || [],
                    link: `https://bgm.tv/subject/${subject.id}`
                };
                games.push(game);

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

    // 生成 games.ts 文件
    const tsContent = `export interface Game {
    id: number;
    title: string;
    cover: string;
    review: string;
    rating: string;
    tags: string[];
    link: string;
}

export const games: Game[] = ${JSON.stringify(games, null, 4)};
`;

    const gamesFilePath = path.join(__dirname, '../src/data/games.ts');
    fs.writeFileSync(gamesFilePath, tsContent, 'utf-8');

    console.log(`✅ 同步完成，共 ${games.length} 部游戏`);
}

syncGames().catch(console.error);