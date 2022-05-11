export function arrayRand(ls) {
  let l = ls.length;
  return 0 < l ? ls[Math.floor(l * Math.random())] : null;
}
