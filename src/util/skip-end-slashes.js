const reSlashes = /^(.*?)(\/*)$/;
const skip = (_$0, $1, _$2) => $1;
//
export default function skipEndSlashes(str = "") {
  return String(str).replace(reSlashes, skip);
}
