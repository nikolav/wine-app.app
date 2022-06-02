//
import { has } from "./has";
//
const strategy_ = {
  cases: {
    _default: ({ data, payload, key }) => {
      if (payload[key]) data[key] = payload[key];
    },
    clearhazy: ({ data, payload }) => {
      data[payload.clearhazy] = true;
    },
    isNotNull: ({ data, payload, key }) => {
      if (null != payload[key]) data[key] = true;
    },
    aroma: ({ data, payload, key }) => {
      if (null != payload[key]) data[formatedAroma_(key)] = true;
    },
  },
  fields: {
    "aroma.berries": "aroma",
    "aroma.citrus": "aroma",
    "aroma.fruit": "aroma",
    "aroma.herb": "aroma",
    "aroma.spice": "aroma",
    "aroma.tropical": "aroma",
    "aroma.vanilla": "aroma",
    "aroma.wood": "aroma",
    clearhazy: "clearhazy",
    color: "_default",
    description: "_default",
    grape: "_default",
    isFizzy: "isNotNull",
    levelAcid: "_default",
    levelAlc: "_default",
    levelFinish: "_default",
    levelSugar: "_default",
    levelTannin: "_default",
    price: "_default",
    producer: "_default",
    year: "_default",
  },
};
//
export default function WR_InitRecord(
  data,
  payload,
  ignore = {
    wine: 1,
    author: 1,
    wineRating: 1,
  },
  strategy = strategy_
) {
  return Object.keys(payload).reduce((data, key) => {
    if (!has(ignore, key))
      strategy.cases[strategy.fields[key]]({ data, payload, key });
    return data;
  }, data);
}

//
function formatedAroma_(aroma = "") {
  return String(aroma).replace(
    /(\.*?)\.(\w)(.*)/i,
    (_, $1, $2, $3) => `${$1}${$2.toUpperCase()}${$3}`
  );
}
