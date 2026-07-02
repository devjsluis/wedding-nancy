import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = path.join(process.cwd(), "public", "images");
const files = await fs.readdir(inputDir);

for (const file of files) {
  if (!file.endsWith(".png")) continue;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(inputDir, file.replace(".png", ".webp"));

  await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

  console.log(`Converted ${file} -> ${path.basename(outputPath)}`);
}
