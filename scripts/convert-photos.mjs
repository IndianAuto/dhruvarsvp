import sharp from "sharp";
import heicConvert from "heic-convert";
import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PHOTOS_DIR = join(__dirname, "..", "Photos");
const OUTPUT_DIR = join(__dirname, "..", "public", "photos");

async function convertPhotos() {
  const files = await readdir(PHOTOS_DIR);
  let converted = 0;
  let copied = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const name = basename(file, extname(file));
    const inputPath = join(PHOTOS_DIR, file);
    const outputPath = join(OUTPUT_DIR, `${name}.jpg`);

    if (ext === ".heif" || ext === ".heic") {
      try {
        const inputBuffer = await readFile(inputPath);
        const jpegBuffer = await heicConvert({
          buffer: inputBuffer,
          format: "JPEG",
          quality: 0.85,
        });
        // Use sharp to resize
        await sharp(Buffer.from(jpegBuffer))
          .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${name}.jpg`);
        converted++;
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err.message);
      }
    } else if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      try {
        await sharp(inputPath)
          .jpeg({ quality: 85 })
          .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .toFile(outputPath);
        console.log(`Optimized: ${file} -> ${name}.jpg`);
        copied++;
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err.message);
      }
    }
  }

  console.log(`\nDone! Converted: ${converted}, Optimized: ${copied}`);
}

convertPhotos().catch(console.error);
