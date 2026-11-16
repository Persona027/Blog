import { test, expect } from '@playwright/test';
test('home, navigation and no horizontal overflow', async ({ page }, info) => {
  const failures: string[] = [];
  page.on('pageerror', (e) => failures.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /把好奇心，\s*写成自己的知识。/ })).toBeVisible();
  await expect(page.getByRole('link', { name: '浏览学习笔记' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  await page.screenshot({ path: `artifacts/home-${info.project.name}.png`, fullPage: true });
  expect(failures).toEqual([]);
});
test('search, format, category and URL state survive reload', async ({ page }) => {
  await page.goto('/articles?category=科学计算与数学建模');
  await expect(page.locator('.article-row')).toHaveCount(10);
  await page.getByLabel('搜索文章').fill('自注意力');
  await expect(page.locator('.article-row')).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel('搜索文章')).toHaveValue('自注意力');
  await page.getByRole('button', { name: '课程', exact: true }).click();
  await expect(page.locator('.course-panel')).toHaveCount(1);
  await page.getByLabel('搜索文章').fill('没有这种文章xyz');
  await expect(page.getByText('没有找到匹配的内容')).toBeVisible();
});
test('dual format article loads actual markdown then local PDF worker', async ({ page }) => {
  const remoteWorkers: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('unpkg.com')) remoteWorkers.push(r.url());
  });
  await page.goto('/article/compiler-ch1-intro');
  await expect(page.locator('.reading-body')).toBeVisible();
  await expect(page.locator('.reading-toc a').first()).toBeVisible();
  await page.getByRole('link', { name: '阅读 PDF', exact: true }).click();
  await expect(page.locator('.react-pdf__Page__canvas')).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: '下一页', exact: true }).click();
  await expect(page.getByLabel('跳转到页码')).toHaveValue('2');
  await page.reload();
  await expect(page.getByLabel('跳转到页码')).toHaveValue('2', { timeout: 20000 });
  expect(remoteWorkers).toEqual([]);
});
test('collections, about and missing routes work', async ({ page }) => {
  await page.goto('/collections');
  await expect(page.getByRole('heading', { name: '我的收藏室' })).toBeVisible();
  await page.locator('.collection-hub a').first().click();
  await expect(page.locator('.collection-tabs')).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: '我是 Persona。' })).toBeVisible();
  await page.goto('/missing-route');
  await expect(page.getByRole('heading', { name: '这里还没有内容' })).toBeVisible();
});
