/**
 * Batch compress certificate images
 * Handles Windows long path issue by using short temp names
 */
import sharp from 'sharp';
import { readdir, copyFile, unlink, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

const CERT_DIR = path.resolve('public/certificates');
const TEMP_DIR = path.join(os.tmpdir(), 'cert-compress');
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function main() {
  // Create temp dir
  if (!existsSync(TEMP_DIR)) await mkdir(TEMP_DIR, { recursive: true });

  const files = (await readdir(CERT_DIR)).filter(f =>
    /\.(jpe?g|png)$/i.test(f)
  );

  console.log(`Found ${files.length} images`);
  console.log(`Temp dir: ${TEMP_DIR}`);
  console.log(`Config: max ${MAX_WIDTH}px, quality ${QUALITY}, mozjpeg\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let errors = 0;

  for (let idx = 0; idx < files.length; idx++) {
    const file = files[idx];
    const srcPath = path.join(CERT_DIR, file);
    const ext = path.extname(file).toLowerCase();
    
    // Use short temp name to avoid Windows path length issues
    const tempIn = path.join(TEMP_DIR, `in_${idx}${ext}`);
    const tempOut = path.join(TEMP_DIR, `out_${idx}${ext}`);

    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    try {
      // Copy to temp with short name
      await copyFile(srcPath, tempIn);

      // Compress
      let pipeline = sharp(tempIn);
      const metadata = await pipeline.metadata();

      pipeline = sharp(tempIn);
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      if (ext === '.png') {
        await pipeline.png({ compressionLevel: 9, effort: 7 }).toFile(tempOut);
      } else {
        await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempOut);
      }

      // Copy compressed back, overwriting original
      await copyFile(tempOut, srcPath);

      const afterSize = (await stat(srcPath)).size;
      totalAfter += afterSize;
      processed++;

      const savings = ((1 - afterSize / beforeSize) * 100).toFixed(1);
      const beforeKB = (beforeSize / 1024).toFixed(0);
      const afterKB = (afterSize / 1024).toFixed(0);
      console.log(`[${processed}/${files.length}] ${beforeKB}KB → ${afterKB}KB (${savings}%) ${file.substring(0, 60)}...`);

      // Cleanup temp
      await unlink(tempIn).catch(() => {});
      await unlink(tempOut).catch(() => {});
    } catch (err) {
      console.error(`ERROR [${idx}]: ${err.message} — ${file.substring(0, 50)}`);
      totalAfter += beforeSize;
      errors++;
      await unlink(tempIn).catch(() => {});
      await unlink(tempOut).catch(() => {});
    }
  }

  console.log('\n========== SUMMARY ==========');
  console.log(`Processed: ${processed}/${files.length} (${errors} errors)`);
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
}

main().catch(console.error);
