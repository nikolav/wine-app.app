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
    //
    wine: 1,
    author: 1,
    wineRating: 1,
    //
    // _id: 1,
    // createdAt: 1,
    // updatedAt: 1,
    // __v: 1,
  },
  strategy = strategy_
) {
  return Object.keys(payload).reduce((data, key) => {
    if (!has(ignore, key) && has(strategy.fields, key)) {
      strategy.cases[strategy.fields[key]]({ data, payload, key });
    }
    return data;
  }, data);
}

//
const cassesLoadFields_ = {
  key: (data, fields, key) => fields[key] = data[key],
  clearhazy: (_data, fields, key) => fields.clearhazy = key,
  same_kv: (_data, fields, key) => fields[key] = key,
  toInt: (data, fields, key) => fields[key] = parseInt(data[key], 10),
  toStr: (data, fields, key) => fields[key] = String(data[key]),
};
const strategyLoadFields_ = {
  // author: key => key,
  //
  image: (_data, _fields, key) => key,
  //
  // wineRating: cassesLoadFields_.toInt,
  wineRating: cassesLoadFields_.key,
  //
  aromaBerries: (_data, fields, _key) => fields["aroma.berries"] = "bobice",
  aromaCitrus: (_data, fields, _key) => fields["aroma.citrus"] = "citrusi",
  aromaFruit: (_data, fields, _key) => fields["aroma.fruit"] = "voće",
  aromaHerb: (_data, fields, _key) => fields["aroma.herb"] = "bilje",
  aromaSpice: (_data, fields, _key) => fields["aroma.spice"] = "začini",
  aromaTropical: (_data, fields, _key) => fields["aroma.tropical"] = "tropsko",
  aromaVanilla: (_data, fields, _key) => fields["aroma.vanilla"] = "vanila",
  aromaWood: (_data, fields, _key) => fields["aroma.wood"] = "drvo",
  color: cassesLoadFields_.key,
  description: cassesLoadFields_.key,
  grape: cassesLoadFields_.key,
  isClear: cassesLoadFields_.clearhazy,
  isFizzy: cassesLoadFields_.same_kv,
  isHazy: cassesLoadFields_.clearhazy,
  levelAcid: cassesLoadFields_.key,
  levelAlc: cassesLoadFields_.key,
  levelFinish: cassesLoadFields_.key,
  levelSugar: cassesLoadFields_.key,
  levelTannin: cassesLoadFields_.key,
  price: cassesLoadFields_.key,
  producer: cassesLoadFields_.key,
  wine: cassesLoadFields_.key,
  year: cassesLoadFields_.key,

};
//
export function WR_loadFieldsFromData (
  data, 
  fields = {}, 
  ignore = {
    author: 1,
  }
) {
  return Object.keys(data)
    .reduce((fields, keyData) => {
      if (!has(ignore, keyData) && has(strategyLoadFields_, keyData)) {
        strategyLoadFields_[keyData](data, fields, keyData);
      }
      //
      return fields;
    }, fields)
}

//
function formatedAroma_(aroma = "") {
  return String(aroma).replace(
    /(\.*?)\.(\w)(.*)/i,
    (_$0, $1, $2, $3) => `${$1}${$2.toUpperCase()}${$3}`
  );
}




/**


      
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


};



*/