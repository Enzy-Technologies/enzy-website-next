const n = [["-", "+"], ["_", "/"]];
const h = e => {
  const t = n.reduce((e, t) => e.replaceAll(t[0], t[1]), e);
  return [...Uint8Array.from(atob(t), e => e.charCodeAt(0))]
    .map(e => (e + 256).toString(16).slice(-2))
    .reduce((e, t, r) => {
      if (r === 4 || r === 6 || r === 8 || r === 10) e += "-";
      return e + t;
    }, "");
};
const d = e => parseInt(e, 36).toString();

const token = "22fhW8wvoQ6WJl5kAaV2CFA";
const formPart = token.substring(1, 23);
const portalPart = token.substring(23);

console.log("Form ID:", h(formPart));
console.log("Portal ID:", d(portalPart));
