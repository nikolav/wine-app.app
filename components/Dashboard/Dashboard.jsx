import React from "react";
import { useAuth } from "../../app/store";
import { useArticles, useWineReview } from "../../app/store";
import { sortByTimestampDesc, postType } from "../../src/util";
import useStateSwitch from "../../src/hooks/use-state-switch";
import {
  useGlobals,
  DASHBOARD_ENTRY_ACTIVE_POST,
} from "../../src/hooks/use-globals";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  MdDeleteOutline,
  BiShow,
  MdCreate,
  BiRefresh,
  AiOutlineLink,
  IoHelp,
} from "../icons";

////
////
const Dashboard = () => {
  const { user } = useAuth();
  const { articles, query: qArticles } = useArticles();
  const { winereview, query: qWR } = useWineReview();
  const userData = [...(articles ?? []), ...(winereview ?? [])]
    .filter((node) => node.author === user?.uid)
    .sort(sortByTimestampDesc("updatedAt"));
  ////
  ////
  return user ? (
    <>
      <div className="relative">
        <DashboardToolbar className="shadow-lg !sticky z-10 inset-x-0 top-0 bg-gradient-to-b from-black to-slate-900/95" />
        <div className="py-4 bg-gradient-to-r from-black/50 to-black/80">
          {userData ? (
            0 < userData.length ? (
              <section>
                {userData.map((post, i) => (
                  <DashboardEntry i={i} key={post._id} post={post} />
                ))}
              </section>
            ) : (
              <p>no posts</p>
            )
          ) : (
            <small>loading...</small>
          )}
        </div>
      </div>
    </>
  ) : (
    <DashboardNotAuthenticated />
  );
};

export default Dashboard;

function DashboardEntryRadio({
  isActive,
  onClick,
  size = 32,
  className = "",
  ...rest
}) {
  //

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="flex items-center justify-center"
      onClick={onClick}
    >
      {isActive ? (
        <RiCheckboxCircleFill
          className={`!text-white scale-110 cursor-pointer w-full h-full ${className}`}
          {...rest}
        />
      ) : (
        <RiCheckboxBlankCircleLine
          className={`hover:scale-110 transition-transform duration-75 cursor-pointer w-full h-full ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}

function DashboardEntry({ post }) {
  const globals = useGlobals();
  const isActive = post._id === globals(DASHBOARD_ENTRY_ACTIVE_POST)?._id;
  const setActive = () => globals.set(DASHBOARD_ENTRY_ACTIVE_POST, post);
  //
  return (
    <>
      <div
        onClick={setActive}
        className={`cursor-default ${
          isActive ? "bg-slate-50/10" : ""
        } hover:bg-slate-50/10 py-2 flex flex-row items-center justify-between`}
      >
        <div className="px-4">
          <DashboardEntryRadio
            size={24}
            className="text-white/50 hover:text-white"
            isActive={isActive}
            onClick={setActive}
          />
        </div>
        <div
          className={`grow truncate text-sm ${
            isActive ? "text-white" : "text-white/60"
          }`}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </>
  );
}

const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES =
  "cursor-pointer active:opacity-100 opacity-50 hover:opacity-80 hover:scale-110 transition-transform duration-75";
const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE = "opacity-10";
//
function DashboardToolbar({ size = 28, className = "", ...rest }) {
  const globals = useGlobals();
  const isActiveToolbar = null != globals(DASHBOARD_ENTRY_ACTIVE_POST);
  //
  return (
    <div
      className={`flex flex-row items-center justify-between gap-x-4 px-4 py-1 ${className}`}
      {...rest}
    >
      <BiShow
        className={
          isActiveToolbar
            ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
      <MdCreate
        className={
          isActiveToolbar
            ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
      <AiOutlineLink
        className={
          isActiveToolbar
            ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
      <BiRefresh
        className={
          isActiveToolbar
            ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
      <MdDeleteOutline
        className={
          isActiveToolbar
            ? "cursor-pointer text-red-500 opacity-30 hover:opacity-80 active:opacity-100"
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
      <IoHelp
        className={
          isActiveToolbar
            ? `${DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES} opacity-20`
            : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
        }
        style={{ width: size, height: size }}
      />
    </div>
  );
}
function DashboardNotAuthenticated() {
  return <div>dashboard-not-authenticated</div>;
}

/**
 * {
  "_id": "62a12f28e478d1707f64f170",
  "wine": "w ---",
  "author": "BK12mKglBvX8eVYtiPydALqSVRR2",
  "aromaBerries": true,
  "aromaVanilla": true,
  "color": "red",
  "image": "https://firebasestorage.googleapis.com/v0/b/test-wine-online.appspot.com/o/wr%2F1654730534669.24.jerez-bodega-sharry-andalucia.jpg?alt=media&token=8b5fb99b-e281-4a2f-864c-e24492435b12",
  "isClear": true,
  "levelAcid": 2,
  "levelAlc": 2,
  "levelTannin": 2,
  "levelFinish": 2,
  "wineRating": 1,
  "createdAt": "2022-06-08T23:22:17.097Z",
  "updatedAt": "2022-06-08T23:22:17.097Z",
  "__v": 0
}
{
  "_id": "62a0cfb3e478d1707f64ef16",
  "title": "Vinogorja: Ključko, Brzopalanačko, Mihajlovačko, Negotinsko i Rogljevačko-Rajačko.",
  "slug": "Vinogorja: Ključko, Brzopalanačko, Mihajlovačko, Negotinsko i Rogljevačko-Rajačko._1654706099241",
  "body": "{\"children\":[{\"type\":\"paragraph\",\"children\":[{\"text\":\"Sorte: kaberne, game, prokupac, začinak, kaberne fran, merlo, crna tamjanika, sovinjon, šardone, plovdina, smederevka, semijon, pino blan.\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}],\"operations\":[],\"selection\":{\"anchor\":{\"path\":[1,0],\"offset\":0},\"focus\":{\"path\":[1,0],\"offset\":0}},\"marks\":null}",
  "image": "https://firebasestorage.googleapis.com/v0/b/test-wine-online.appspot.com/o/etc%2F1654706099241.10.crianza-rioja.jpg?alt=media&token=5c799bff-4bf4-4e62-8a50-201da1e05249",
  "author": "BK12mKglBvX8eVYtiPydALqSVRR2",
  "createdAt": "2022-06-08T16:34:59.833Z",
  "updatedAt": "2022-06-08T16:34:59.833Z",
  "__v": 0
}

 */
