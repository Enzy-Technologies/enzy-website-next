/**
 * Walks Figma-exported .tsx files and rewrites `src={imgVar}` usages of PNG
 * import variables to `src={imgVar.src}`, since Next.js webpack returns a
 * StaticImageData object (with a `.src` URL) from PNG imports rather than a
 * raw URL string like Vite does.
 */
const fs = require("fs");
const path = require("path");

const ROOTS = [
  path.resolve(__dirname, "..", "src/app/playground/interactive"),
  path.resolve(__dirname, "..", "src/app/playground/interactive-imports"),
];

const IMPORT_RE = /^import\s+(\w+)\s+from\s+["'][^"']+\.(png|jpg|jpeg|gif|webp|avif)["'];?$/gm;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && /\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

let touched = 0;
for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const original = fs.readFileSync(file, "utf8");
    const imageImportNames = [];
    let m;
    IMPORT_RE.lastIndex = 0;
    while ((m = IMPORT_RE.exec(original)) !== null) {
      imageImportNames.push(m[1]);
    }
    if (imageImportNames.length === 0) continue;

    let updated = original;
    for (const name of imageImportNames) {
      const usage = new RegExp(`(\\bsrc=\\{)${name}(\\})`, "g");
      updated = updated.replace(usage, `$1${name}.src$2`);
      const bg = new RegExp(`\\$\\{${name}\\}`, "g");
      updated = updated.replace(bg, `\${${name}.src}`);
    }

    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      console.log(`fixed: ${path.relative(process.cwd(), file)}`);
      touched++;
    }
  }
}
console.log(`done. ${touched} files updated.`);
