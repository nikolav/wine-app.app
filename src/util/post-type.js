import { has } from "./has";
const postMap = { true: "winereview", false: "articles" };
export const postType = (post) => postMap[has(post, "wineRating")];
