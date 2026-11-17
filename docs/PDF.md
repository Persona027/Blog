# PDF阅读器与字体故障

## 当前配置

react-pdf使用同一pdfjs-dist安装中的模块Worker。Vite把Worker作为本地资源输出为.js，避免EdgeOne将.mjs返回application/octet-stream后被浏览器nosniff拒绝。

PdfViewer的Document options保持模块级稳定对象：

```ts
{
  disableFontFace: true,
  cMapUrl: '/pdfjs/v1/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: '/pdfjs/v1/standard_fonts/',
  wasmUrl: '/pdfjs/v1/wasm/',
}
```

Vite插件在构建时将cmaps、standard_fonts、wasm复制到dist/pdfjs/v1；开发环境将对应路径映射到项目依赖目录。不要只改URL而漏复制资源，也不要只在本机public手工放文件而让云构建缺资源。

`disableFontFace: true`使用PDF内嵌字形路径绘制，避免浏览器字体替换引起中英混排缺字；文本层和注释层仍保留。此设置改变绘制方式，不能当作修补PDF本身缺失字体的万能方案。

## 已遇到的问题

| 表现/日志 | 原因与处理 |
|---|---|
| PDF加载失败，模块Worker MIME错误 | 保持Worker输出.js并检查生产Content-Type |
| 英文存在、中文整片消失；要求cMapUrl/cMapPacked | 缺少CMap配置或资源，检查实际网络请求 |
| unexpected EOF in bcmap，但HTTP 200 | 响应可能是SPA回退HTML、错误缓存或截断数据；核对字节与本地文件 |
| 中文恢复但英文/数字局部缺失 | 检查浏览器字体替换；当前使用嵌入字形路径方案 |
| 替换PDF后仍看到旧内容 | 比较哈希，检查Cache-Control、浏览器与边缘缓存 |
| 本地测试没反映源码变化 | Playwright使用preview；必须先重新build |

HTTP 200不代表资源正确。CMap应是实际二进制内容，不应以HTML开头；Worker应为JS；PDF应具有PDF文件头。需要时把下载样本保存到项目artifacts，比较SHA-256。

路径v1用于避开曾返回错误回退内容的旧资源缓存。以后升级pdfjs或更换资源时，评估路径版本并同步修改组件、Vite插件和测试；清理缓存必须针对实际平台与资源，不以随机查询参数代替永久修复。

## 必须怎样验证

先看独立PDF的视觉与字体，再打开网站同页。至少检查首页/第2页的中文段落、中英混排和一页公式/矩阵。canvas出现、文本层含中文、控制台没有pageerror，都不能单独证明字形已正确画出。

现有回归检查会等待CMap成功响应、确认文本层中文、捕获字体错误并保存canvas截图。仍需人工看截图：自动测试尚未逐字对照栅格图，也没有遍历全部PDF每一页。

生产示例：`/article/math-modeling-01linear-regression#page=2`。更新后确认新版阅读器chunk已加载，实际资源请求成功，截图中文、英文与数字完整。保持下载与线上PDF字节一致；不要为绕过阅读器问题把讲义栅格化为不可搜索图片。
