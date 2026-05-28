/**
 * Remap Figma-exported font-family strings to fonts we actually have loaded
 * in this Next.js project.
 *
 *   Figma name            ->  what we serve
 *   --------------------------------------
 *   'Baskervville:*'      ->  'IvyOra Text', serif       (already loaded)
 *   'Roboto_Mono:*'       ->  ui-monospace, monospace    (system stack)
 *   'Inter:*'             ->  'Inter'                    (already loaded)
 */
const fs = require("fs");
const path = require("path");

const ROOTS = [
  path.resolve(__dirname, "..", "src/app/playground/interactive"),
  path.resolve(__dirname, "..", "src/app/playground/interactive-imports"),
];

const REPLACEMENTS = [
  // Tailwind arbitrary value form: font-['Baskervville:Medium',sans-serif]
  {
    from: /font-\['Baskervville:[^']+',sans-serif\]/g,
    to: "font-['IvyOra_Text',serif]",
  },
  {
    from: /font-\['Roboto_Mono:[^']+',sans-serif\]/g,
    to: "font-[ui-monospace,'SF_Mono','Menlo',monospace]",
  },
  {
    from: /font-\['Inter:[^']+',sans-serif\]/g,
    to: "font-['Inter',sans-serif]",
  },
];

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
    let updated = original;
    for (const { from, to } of REPLACEMENTS) updated = updated.replace(from, to);
    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      console.log(`fixed: ${path.relative(process.cwd(), file)}`);
      touched++;
    }
  }
}
console.log(`done. ${touched} files updated.`);
