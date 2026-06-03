import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const assetsDir = path.join(distDir, "assets");
const portableDir = path.resolve("portable");
const portablePath = path.join(portableDir, "hpc-learning-studio.html");

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  /<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/,
  (_match, assetPath) => {
    const source = fs.readFileSync(path.join(distDir, assetPath), "utf8");
    return `<script type="module">${source.replaceAll("</script>", "<\\/script>")}</script>`;
  }
);

html = html.replace(
  /<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/,
  (_match, assetPath) => {
    const source = fs.readFileSync(path.join(distDir, assetPath), "utf8");
    return `<style>${source.replaceAll("</style>", "<\\/style>")}</style>`;
  }
);

fs.writeFileSync(indexPath, html);
fs.mkdirSync(portableDir, { recursive: true });
fs.writeFileSync(portablePath, html);

if (fs.existsSync(assetsDir)) {
  fs.rmSync(assetsDir, { recursive: true, force: true });
}

console.log("Created portable single-file builds at dist/index.html and portable/hpc-learning-studio.html");
