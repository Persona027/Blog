import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '../public');
let before = 0,
  after = 0,
  changed = 0;
for (const folder of ['anime', 'games', 'movies', 'books', 'music']) {
  const directory = path.join(root, folder);
  if (!(await fs.stat(directory).catch(() => null))?.isDirectory()) continue;
  for (const name of await fs.readdir(directory)) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    const file = path.join(directory, name);
    const original = await fs.readFile(file);
    let image = sharp(original)
      .rotate()
      .resize({ width: 960, height: 1200, fit: 'inside', withoutEnlargement: true });
    image = /\.png$/i.test(name)
      ? image.png({ compressionLevel: 9, palette: true, quality: 90 })
      : image.jpeg({ quality: 80, mozjpeg: true });
    const optimized = await image.toBuffer();
    before += original.length;
    if (optimized.length < original.length * 0.85) {
      await fs.writeFile(file, optimized);
      after += optimized.length;
      changed++;
    } else after += original.length;
  }
}
console.log(JSON.stringify({ changed, beforeBytes: before, afterBytes: after }));
