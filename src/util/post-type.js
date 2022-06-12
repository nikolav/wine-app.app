import { has } from "./has";
const postMap = { true: "winereview", false: "article" };
export const postType = (post) => postMap[has(post, "wineRating")];
