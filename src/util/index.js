import { prevent } from "./prevent";
import { isEmail } from "./is-email";
import { arrayRand } from "./array-rand";
import { noop } from "./noop";
import { has } from "./has";
import dateFormated from "./date-formated";
import WR_InitRecord from "./wr-init-record";
import escapeHtml from "escape-html";
import stripEndSlashes from "./strip-end-slashes";
import arrayDivide from "./array-divide";
import sortByTimestampDesc from "./sort-by-timestamp-desc";
//
import q from "nikolav-q";
import shuffle from "lodash/shuffle";
//
const debounce = q.func.debounce;
const paste = q.object.paste;
const escapeHTML = escapeHtml;
//
export {
  arrayDivide,
  arrayRand,
  dateFormated,
  debounce,
  escapeHtml,
  escapeHTML,
  has,
  isEmail,
  noop,
  paste,
  prevent,
  shuffle,
  sortByTimestampDesc,
  stripEndSlashes,
  WR_InitRecord,
};
