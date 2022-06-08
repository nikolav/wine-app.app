import { prevent } from "./prevent";
import { isEmail } from "./is-email";
import { arrayRand } from "./array-rand";
import { noop } from "./noop";
import { has } from "./has";
import dateFormated from "./date-formated";
import WR_InitRecord from "./wr-init-record";
import escapeHTML from "escape-html";
import stripEndSlashes from "./strip-end-slashes";
import q from "nikolav-q";
//
const debounce = q.func.debounce;
//
export {
  arrayRand,
  dateFormated,
  debounce,
  escapeHTML,
  has,
  isEmail,
  noop,
  prevent,
  stripEndSlashes,
  WR_InitRecord,
};
