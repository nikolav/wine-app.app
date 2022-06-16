
//
import { useArticles, useWineReview, useAppData } from "./resource";
import { useAuth } from "./auth";
import { useCart } from "./cart";
import { usePages } from "./page";
import { useShop } from "./shop";
//
const APP_URL_DBKEY = "app.url";
const YT_PROMO_VIDEO_URL = "https://youtu.be/nTxyseoomgs";
//
export {
    useArticles,
    useAuth,
    useCart,
    usePages,
    useShop,
    useWineReview,
    useAppData,
    //
    APP_URL_DBKEY,
    YT_PROMO_VIDEO_URL,
};
