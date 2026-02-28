import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { books } from '../src/data/books.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保目标目录存在
const targetDirectory = path.join(__dirname, '../public/books');
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function cleanTitle(title: string): string {
    return title.replace(/（.*?）|\(.*?\)|：.*|:.*|·/g, '').trim();
}

function cleanAuthor(author: string): string {
    return author.replace(/\[.*?\]|【.*?】|\(.*?\)|（.*?）/g, '').trim();
}

/**
 * 方案B：Bing 搜图法 (由于 DuckDuckGo 现在的图片搜索大多被 JS 动态渲染了，Bing 的 HTML 降级页面更容易用 Cheerio 抓取纯图片)
 */
async function fetchBookPosterFromSearch(title: string, author: string): Promise<string | null> {
    const safeTitle = cleanTitle(title);
    const safeAuthor = cleanAuthor(author);
    
    // 强制加入关键词以提高书籍封面命中率
    const keyword = `${safeTitle} ${safeAuthor} 豆瓣 图书 封面`;
    const searchUrl = `https://cn.bing.com/images/search?q=${encodeURIComponent(keyword)}&first=1&FORM=IARRTH`;

    try {
        const response = await fetch(searchUrl, {
            headers: {
                // 伪装成普通流量
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'zh-CN,zh;q=0.9',
            }
        });

        if (!response.ok) {
            throw new Error(`Bing 请求失败: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Bing 图片搜索页中，每张图片信息通常储存在带有 'musi' 类或 a 标签自带的 m 属性里的 json 中
        let firstImageUrl: string | null = null;

        $('a.iusc').first().each((i, el) => {
            const mData = $(el).attr('m');
            if (mData) {
                try {
                    const parsed = JSON.parse(mData);
                    if (parsed && parsed.murl) {
                         firstImageUrl = parsed.murl; // 取高清大图的直链
                    }
                } catch(e) {
                   // ignor parse error
                }
            }
        });
        
        // 保底逻辑如果是不同UI：找最大的 img src
        if (!firstImageUrl) {
            const img = $('img.mimg').first();
            if (img.length > 0) {
               firstImageUrl = img.attr('src') || img.attr('data-src') || null;
            }
        }

        return firstImageUrl;

    } catch (error: any) {
        console.error(`  [!] 搜图请求错误: ${error.message}`);
        return null;
    }
}

async function downloadImage(url: string, filename: string) {
    const filePath = path.join(targetDirectory, filename);
    
    if (fs.existsSync(filePath)) {
        return; 
    }

    try {
        // 请求真实图片时也要带上UA防止防盗链机制拦截
        const response = await fetch(url, {
             headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Referer': 'https://cn.bing.com/'
             }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const buffer = await response.arrayBuffer();

        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`✅ 已下载并保存: ${filename}`);
    } catch (err: any) {
        console.error(`❌ 下载图片失败 ${filename} [URL: ${url}]:`, err.message);
    }
}

async function runSync() {
    console.log(`📚 开始通过搜图引擎同步图书封面，共 ${books.length} 本书...`);
    let downloadedCount = 0;
    let skippedCount = 0;
    let notFoundCount = 0;

    for (const book of books) {
        const filename = book.cover.split('/').pop();
        if (!filename) continue;

        const expectedFilePath = path.join(targetDirectory, filename);

        if (fs.existsSync(expectedFilePath)) {
            skippedCount++;
            continue;
        }

        console.log(`🔍 正在利用搜图引擎检索: ${book.title} ...`);
        const posterUrl = await fetchBookPosterFromSearch(book.title, book.author);
        
        if (posterUrl) {
            await downloadImage(posterUrl, filename);
            downloadedCount++;
        } else {
            console.log(`⚠️ 未找到可用结果: ${book.title}`);
            notFoundCount++;
        }

        // 给足爬虫冷却时间
        await sleep(1500); 
    }

    console.log("-----------------------------------------");
    console.log(`🎉 图书扫描完毕！本轮共下载: ${downloadedCount}`);
}

runSync().catch(console.error);
