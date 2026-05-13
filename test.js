const css = require('css');
const ast = css.parse('.test1 { background: radial-gradient(ellipse 120% 90% at 50% -28%, red, transparent 52%); }');
console.log(ast);
