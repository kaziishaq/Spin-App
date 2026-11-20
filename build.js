// Build a ready-to-publish copy in ./dist   ->   node build.js
// Inlines style.css and app.js into index.html so the site is one fast page.
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

const minCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .trim();

let html = read("index.html");
const cssTag = '<link rel="stylesheet" href="style.css" />';
const jsTag = '<script src="app.js"></script>';
if (!html.includes(cssTag) || !html.includes(jsTag)) {
  throw new Error("index.html no longer has the expected style.css / app.js tags");
}
html = html.replace(cssTag, () => `<style>${minCss(read("style.css"))}</style>`);
html = html.replace(jsTag, () => `<script>\n${read("app.js")}\n</script>`);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);
fs.writeFileSync(path.join(dist, "index.html"), html);
for (const f of ["favicon.svg", "manifest.webmanifest"]) fs.copyFileSync(path.join(root, f), path.join(dist, f));

const kb = (f) => (fs.statSync(path.join(dist, f)).size / 1024).toFixed(1) + " KB";
console.log("Build complete -> dist/");
for (const f of fs.readdirSync(dist)) console.log("  " + f.padEnd(22) + kb(f));
