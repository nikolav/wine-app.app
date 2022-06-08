//
export default function arrayDivide(array, parts) {
  let res = [];
  for (let i = parts, a = [...array]; i > 0; i--) {
    res.push(a.splice(0, Math.ceil(a.length / i)));
  }
  return res;
}
