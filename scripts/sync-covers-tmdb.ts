import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { movies } from '../src/data/movies.js';

// 初始化环境变量
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

if (!TMDB_API_KEY) {
    console.error("❌ TMDB API 密钥未找到。请检查 .env.local 设定的 TMDB_API_KEY。");
    process.exit(1);
}

// 确保 public 下的 movies 目录存在
const targetDirectory = path.join(__dirname, '../public/movies');
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
}

// 辅助方法：休眠防封
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取 TMDB 的最高清海报 URL
 */
async function fetchMoviePoster(title: string, year?: string): Promise<string | null> {
    try {
        let url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=zh-CN`;
        if (year) {
            url += `&year=${year}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
           throw new Error(`API 返回状态码异常: ${response.status}`);
        }
        
        const data = await response.json() as any;

        if (data.results && data.results.length > 0) {
            // 优先匹配，如果有海报的且排第一的
            const resultWithPoster = data.results.find((m: any) => m.poster_path);
            if (resultWithPoster) {
                return `${TMDB_IMAGE_BASE_URL}${resultWithPoster.poster_path}`;
            }
        }
        return null;
    } catch (error) {
        console.error(`❌ 查询 ${title} ${year ? `(${year}) ` : ''}时出错:`, error);
        return null;
    }
}

/**
 * 将获取到的 URL 流下载并写入到本地 FileSystem 中
 */
async function downloadImage(url: string, filename: string) {
    const filePath = path.join(targetDirectory, filename);
    
    // 我们再次安全校验一次（上层也会校验，做双保险）
    if (fs.existsSync(filePath)) {
        return; 
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const buffer = await response.arrayBuffer();

        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`✅ 已下载并保存: ${filename}`);
    } catch (err: any) {
        console.error(`❌ 下载失败 ${filename} [URL: ${url}]:`, err.message);
    }
}

async function runSync() {
    console.log(`🚀 开始扫描并同步 TMDB 电影封面，共 ${movies.length} 条数据记录...`);
    let downloadedCount = 0;
    let skippedCount = 0;
    let notFoundCount = 0;

    for (const movie of movies) {
        // 从 "/movies/12-angry-men.jpg" 提取出 "12-angry-men.jpg"
        const filename = movie.cover.split('/').pop();
        if (!filename) {
            console.error(`⚠️ 数据异常: [${movie.title}] 的封面路径 (${movie.cover}) 无法解析文件名。`);
            continue;
        }

        const expectedFilePath = path.join(targetDirectory, filename);

        // 核心增量逻辑：如果本地已经存在图片，跳过请求。节约时间并防 API IP 限制。
        if (fs.existsSync(expectedFilePath)) {
            skippedCount++;
            continue;
        }

        // 提取前四位年份，比如 "2006-12-17" 提取出 "2006"
        const specificYear = movie.releaseDate ? movie.releaseDate.substring(0, 4) : undefined;
        
        console.log(`🔍 正在向 TMDB 请求: ${movie.title} ${specificYear ? `(${specificYear})` : ''}...`);
        
        const posterUrl = await fetchMoviePoster(movie.originalTitle || movie.title, specificYear);
        
        if (posterUrl) {
            await downloadImage(posterUrl, filename);
            downloadedCount++;
        } else {
            console.log(`⚠️ 无法找到有效的高清海报: ${movie.title} [原始名: ${movie.originalTitle}]`);
            notFoundCount++;
        }

        // 短暂延迟防止 API 超频 (TMDB 限速目前是 50次/秒，这里设置 100ms 休眠比较保守)
        await sleep(100);
    }

    console.log("-----------------------------------------");
    console.log(`🎉 任务完毕！总共条目: ${movies.length}`);
    console.log(`📥 新增下载: ${downloadedCount}`);
    console.log(`⏩ 跳过已存在: ${skippedCount}`);
    console.log(`❌ 无法找到: ${notFoundCount}`);
    if (notFoundCount > 0) {
        console.log("👉 提示：未找到海报的电影可以检查 originalTitle 或 releaseDate 拼写是否有误。");
    }
}

// 启动
runSync().catch(console.error);
