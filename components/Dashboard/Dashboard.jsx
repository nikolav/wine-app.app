import React, { useState, useEffect } from "react";
import { useAuth, useArticles, useWineReview, usePages } from "../../app/store";
import { PAGE_ARTICLE_EDIT, PAGE_WINE_REVIEW } from "../../app/store/page";
import { sortByTimestampDesc, postType, noop } from "../../src/util";
import useStateSwitch from "../../src/hooks/use-state-switch";
import {
  useGlobals,
  DASHBOARD_ENTRY_ACTIVE_POST,
  DASHBOARD_ENTRY_ACTIVE_POST_EDIT,
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
import { useQueryClient } from "react-query";
import cli from "../../src/feathers";
import Panel from "../Panel";
import { useRouter } from "next/router";
// https://github.com/sudodoki/copy-to-clipboard
import copyToClipboard from "copy-to-clipboard";
import Tooltip from "../Tooltip/Tooltip";
import useGetPostLink from "../../src/hooks/use-post-link";
import {
  useFlags,
  IS_ACTIVE_ARTICLE_COMMANDS,
  IS_ACTIVE_WINE_REVIEW_TOOLBAR,
} from "../../src/hooks/use-flags-global";
import DrawerBox from "../DrawerBox/DrawerBox";
//
//
const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES =
  "cursor-pointer active:opacity-100 opacity-50 hover:opacity-80 hover:scale-110 transition-transform duration-75";
const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE = "opacity-10";
////
////
const Dashboard = () => {
  const { user } = useAuth();
  const { articles, query: qArticles } = useArticles();
  const { winereview, query: qWR } = useWineReview();
  const userData = user
    ? [...(articles ?? []), ...(winereview ?? [])]
        .filter((node) => node.author === user.uid)
        .sort(sortByTimestampDesc("updatedAt"))
    : [];
  //
  const { isOn: isActiveDashboardHelp, toggle: toggleIsActiveDashboardHelp } =
    useStateSwitch();
  ////
  ////
  return (
    <>
      {user ? (
        <div className="relative">
          <DashboardToolbar
            onHelp={toggleIsActiveDashboardHelp.on}
            className="shadow !sticky z-10 inset-x-0 top-0 bg-gradient-to-b from-black to-slate-900/95"
          />
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
      ) : (
        <DashboardNotAuthenticated />
      )}
      <DrawerBox
        isActive={isActiveDashboardHelp}
        onClose={toggleIsActiveDashboardHelp.off}
      >
        <section className="flex items-center justify-center h-full text-center">
          <div className="w-1/2 max-w-full">
            <h2>🚧 help.dashboard</h2>
            <p>
              @todo; Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laborum alias beatae quisquam ipsam sequi sit obcaecati dolorum
              amet aut, possimus explicabo fugit? Voluptates nam, explicabo
              consequatur esse nostrum itaque quod.
            </p>
          </div>
        </section>
      </DrawerBox>
    </>
  );
};
//
function DashboardToolbar({
  iconSize = 28,
  className = "",
  onHelp = noop,
  ...rest
}) {
  // Get QueryClient from the context
  const globals = useGlobals();
  const activePost = globals(DASHBOARD_ENTRY_ACTIVE_POST);
  const isActiveToolbar = null != activePost;
  //
  const queryClient = useQueryClient();
  const qRefresh = () => {
    queryClient.invalidateQueries("articles");
    queryClient.invalidateQueries("winereview");
  };
  //
  const [refPopperOnDelete, setRefPopperOnDelete] = useState(null);
  const { isOn: isActiveOnDelete, toggle: toggleIsActiveOnDelete } =
    useStateSwitch();
  const deletePost = () => {
    if (activePost) {
      cli
        .service(postType(activePost))
        .remove(activePost._id)
        .then((_payload) => {
          // post removed
          // reload data
          // null active post
          qRefresh();
          globals.set(DASHBOARD_ENTRY_ACTIVE_POST, null);
        });
    }
  };
  //
  const router = useRouter();
  const onShowPost = () => {
    if (activePost) router.push(`${postType(activePost)}/${activePost._id}`);
  };
  //@@
  const [copiedLink, setCopiedLink] = useState(null);
  const DEFAULT_TOOLTIP_MESSAGE_COPY_LINK = "📋 kopiraj link";
  const DEFAULT_TOOLTIP_MESSAGE_COPY_LINK_SUCCESS = "✅ kopirali ste link";
  const [tooltipBodyCopyLink, setTooltipBodyCopyLink] = useState(
    DEFAULT_TOOLTIP_MESSAGE_COPY_LINK
  );
  const getPostLink = useGetPostLink();
  const onCopyLink = () => {
    if (activePost) {
      copyToClipboard(getPostLink(activePost), {
        format: "text/plain",
        onCopy: setCopiedLink,
      });
    }
  };
  useEffect(() => {
    if (copiedLink) {
      setTooltipBodyCopyLink(DEFAULT_TOOLTIP_MESSAGE_COPY_LINK_SUCCESS);
    }
  }, [copiedLink]);
  const [refPopperCopyLink, setRefPopperCopyLink] = useState(null);
  const { isOn: isActivePopperCopyLink, toggle: toggleIsActivePopperCopyLink } =
    useStateSwitch();
  const resetCopyLink = () => {
    toggleIsActivePopperCopyLink.off();
    setTooltipBodyCopyLink(DEFAULT_TOOLTIP_MESSAGE_COPY_LINK);
  };
  //
  const [refPopperPreviewPost, setRefPopperPreviewPost] = useState(null);
  const { isOn: isActivePreviewPost, toggle: toggleIsActivePreviewPost } =
    useStateSwitch();
  //
  const [refPopperRefreshPosts, setRefPopperRefreshPosts] = useState(null);
  const { isOn: isActiveRefreshPosts, toggle: toggleIsActiveRefreshPosts } =
    useStateSwitch();
  //
  const [refPopperTrash, setRefPopperTrash] = useState(null);
  const { isOn: isActiveTrash, toggle: toggleisActiveTrash } = useStateSwitch();
  //
  const [refPopperInfo, setRefPopperInfo] = useState(null);
  const { isOn: isActiveInfo, toggle: toggleIsActiveInfo } = useStateSwitch();
  //
  const [refPopperEditPost, setRefPopperEditPost] = useState(null);
  const { isOn: isActiveEditPost, toggle: toggleIsActiveEditPost } =
    useStateSwitch();
  //
  const { toggle: toggleFlags } = useFlags();
  const { setPage } = usePages();
  const openArticleCommands = () => toggleFlags.on(IS_ACTIVE_ARTICLE_COMMANDS);
  const openWineReviewToolbar = () =>
    toggleFlags.on(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  // { key: string.unique, post: object }
  const editPostData = globals(DASHBOARD_ENTRY_ACTIVE_POST_EDIT);
  useEffect(() => {
    if (editPostData?.post) {
      if ("winereview" === postType(editPostData.post)) {
        setPage(PAGE_WINE_REVIEW);
        openWineReviewToolbar();
        return;
      }
      setPage(PAGE_ARTICLE_EDIT);
      openArticleCommands();
    }
  }, [editPostData?.key]);
  //
  return (
    <div
      className={`flex flex-row items-center justify-between gap-x-4 px-4 py-1 ${className}`}
      {...rest}
    >
      <span ref={setRefPopperCopyLink}>
        <AiOutlineLink
          onClick={() => isActiveToolbar && onCopyLink()}
          onMouseOver={toggleIsActivePopperCopyLink.on}
          onMouseLeave={resetCopyLink}
          className={
            isActiveToolbar
              ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
              : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </span>
      <Tooltip
        isActive={isActivePopperCopyLink}
        refElement={refPopperCopyLink}
        placement="top"
      >
        {tooltipBodyCopyLink}
      </Tooltip>
      <span ref={setRefPopperPreviewPost}>
        <BiShow
          onClick={() => isActiveToolbar && onShowPost()}
          onMouseOver={toggleIsActivePreviewPost.on}
          onMouseLeave={toggleIsActivePreviewPost.off}
          className={
            isActiveToolbar
              ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
              : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </span>
      <Tooltip
        isActive={isActivePreviewPost}
        refElement={refPopperPreviewPost}
        placement="top"
      >
        📰 pogledaj stranu
      </Tooltip>
      <span ref={setRefPopperEditPost}>
        <MdCreate
          onClick={() =>
            isActiveToolbar &&
            globals.set(DASHBOARD_ENTRY_ACTIVE_POST_EDIT, {
              key: Date.now(),
              post: activePost,
            })
          }
          onMouseOver={toggleIsActiveEditPost.on}
          onMouseLeave={toggleIsActiveEditPost.off}
          className={
            isActiveToolbar
              ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
              : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </span>
      <Tooltip
        isActive={isActiveEditPost}
        refElement={refPopperEditPost}
        placement="top"
      >
        📐 uredi
      </Tooltip>
      <span ref={setRefPopperRefreshPosts}>
        <BiRefresh
          onClick={() => isActiveToolbar && qRefresh()}
          onMouseOver={toggleIsActiveRefreshPosts.on}
          onMouseLeave={toggleIsActiveRefreshPosts.off}
          className={
            isActiveToolbar
              ? DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES
              : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </span>
      <Tooltip
        isActive={isActiveRefreshPosts}
        refElement={refPopperRefreshPosts}
        placement="top"
      >
        ✨ osveži listu
      </Tooltip>
      <span ref={setRefPopperOnDelete}>
        <span ref={setRefPopperTrash}>
          <MdDeleteOutline
            onClick={() => isActiveToolbar && toggleIsActiveOnDelete.on()}
            onMouseOver={toggleisActiveTrash.on}
            onMouseLeave={toggleisActiveTrash.off}
            className={
              isActiveToolbar
                ? "cursor-pointer text-red-500 opacity-30 hover:opacity-80 active:opacity-100"
                : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
            }
            style={{ width: iconSize * 0.72, height: iconSize * 0.72 }}
          />
        </span>
      </span>
      <Tooltip
        refElement={refPopperTrash}
        isActive={isActiveTrash}
        placement="top"
      >
        🚫 obriši
      </Tooltip>
      <Panel.Appear
        effect="slideUp"
        refElement={refPopperOnDelete}
        isActive={isActiveOnDelete}
        className="!p-4 flex justify-center items-center text-center z-10 bg-slate-100/95 w-64 min-h-[124px] rounded-xl shadow text-sm"
        placement="left"
      >
        <div className="space-y-6">
          <div>
            <p>
              <strong className="text-lg">Obriši,</strong>
            </p>
            <p>{activePost?.wine || activePost?.title || ""}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              className="w-12 button px-0 rounded-r-none bg-red-600 hover:bg-red-700"
              onClick={() => {
                deletePost();
                toggleIsActiveOnDelete.off();
              }}
            >
              da
            </button>
            <button
              className="w-16 button rounded-l-none font-bold"
              onClick={toggleIsActiveOnDelete.off}
            >
              ne
            </button>
          </div>
        </div>
      </Panel.Appear>
      <span ref={setRefPopperInfo}>
        <IoHelp
          onClick={() => isActiveToolbar && onHelp()}
          onMouseOver={toggleIsActiveInfo.on}
          onMouseLeave={toggleIsActiveInfo.off}
          className={
            isActiveToolbar
              ? `${DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES} opacity-20`
              : DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE
          }
          style={{ width: iconSize, height: iconSize }}
        />
      </span>
      <Tooltip
        isActive={isActiveInfo}
        refElement={refPopperInfo}
        placement="top"
      >
        ⛑ pomoć
      </Tooltip>
    </div>
  );
}

////
////
export default Dashboard;
//
//
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
        <div className="flex items-center justify-center">
          <DashboardEntryPostType
            className="text-xl mr-4"
            post={post}
            isActive={isActive}
          />
        </div>
        <div
          className={`grow truncate text-sm ${
            isActive ? "text-white" : "text-white/30"
          }`}
        >
          {post.wine || post.title}
        </div>
      </div>
    </>
  );
}
//
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
//
function DashboardEntryPostType({ post, isActive, className = "", ...rest }) {
  return (
    <strong
      className={`${isActive ? "" : "opacity-30"} ${className}`}
      {...rest}
    >
      {"winereview" === postType(post) ? "⭐" : "📃"}
    </strong>
  );
}
//
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
