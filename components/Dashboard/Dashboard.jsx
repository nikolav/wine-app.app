import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import cli from "../../src/feathers";
import copyToClipboard from "copy-to-clipboard";
import {
  useAuth,
  useArticles,
  useWineReview,
  usePages,
  YT_PROMO_VIDEO_URL,
} from "../../app/store";
import useFancyboxGallery from "../../src/hooks/use-fancybox-galery";
import {
  PAGE_ARTICLE_EDIT,
  PAGE_WINE_REVIEW_EDIT,
  PAGE_LOGIN,
  PAGE_ARTICLE_CREATE,
  PAGE_WINE_REVIEW,
} from "../../app/store/page";
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
  BsPlayFill,
} from "../icons";
import { bgNoAuth, bgTumbYTPromo } from "./Dashboard.module.css";
import Panel from "../Panel";
// https://github.com/sudodoki/copy-to-clipboard
import Tooltip from "../Tooltip/Tooltip";
import useGetPostLink from "../../src/hooks/use-post-link";
import {
  useFlags,
  IS_ACTIVE_ARTICLE_COMMANDS,
  IS_ACTIVE_WINE_REVIEW_TOOLBAR,
} from "../../src/hooks/use-flags-global";
import DrawerBox from "../DrawerBox/DrawerBox";
import { useLike, useComments } from "../social";
//
//
const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES =
  "cursor-pointer active:opacity-100 opacity-50 hover:opacity-80 hover:scale-110 transition-transform duration-75";
const DEFAULT_DASHBOARD_TOOLBAR_ICON_CLASSES_INACTIVE = "opacity-10";
////
////
const Dashboard = () => {
  const { user } = useAuth();
  const { articles } = useArticles();
  const { winereview } = useWineReview();
  // * articles + wr
  const userData = user
    ? [...(articles ?? []), ...(winereview ?? [])]
        .filter((node) => node.author === user.uid)
        .sort(sortByTimestampDesc("updatedAt"))
    : [];
  //
  const { isOn: isActiveDashboardHelp, toggle: toggleIsActiveDashboardHelp } =
    useStateSwitch();
  //
  ////
  ////
  return (
    <>
      <div className="h-full relative">
        <DashboardToolbar
          onHelp={toggleIsActiveDashboardHelp.on}
          className="shadow !sticky z-10 inset-x-0 top-0 bg-gradient-to-b from-black to-slate-900/95"
        />
        <div className="h-full py-2 bg-gradient-to-r from-black/50 to-black/80">
          {user ? (
            0 < userData.length ? (
              <section>
                {userData.map((post, i) => (
                  <DashboardEntry
                    i={i}
                    key={post._id}
                    post={post}
                    type={postType(post)}
                    ID={post._id}
                  />
                ))}
              </section>
            ) : (
              <DashboardNoPostsAvailable />
            )
          ) : (
            <DashboardNotAuthenticated />
          )}
        </div>
      </div>
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
  const { user } = useAuth();
  const activePost = globals(DASHBOARD_ENTRY_ACTIVE_POST);
  const isActiveToolbar = null != user && null != activePost;
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
        setPage(PAGE_WINE_REVIEW_EDIT);
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
function DashboardEntry({ ID, post, type }) {
  const globals = useGlobals();
  const isActive = ID === globals(DASHBOARD_ENTRY_ACTIVE_POST)?._id;
  const setActive = () => globals.set(DASHBOARD_ENTRY_ACTIVE_POST, post);
  //
  const comments = useComments(`${type}--${ID}`);
  const { likeCount } = useLike(`${type}--${ID}`);
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
        <div className="space-x-2 text-white pr-2">
          <small>
            <span className="opacity-20 text-xs">💬</span>{" "}
            <span className={isActive ? "" : "opacity-20"}>
              {" "}
              {comments.len()}
            </span>
          </small>
          <small>
            {" "}
            <span className="opacity-20 text-xs">♥</span>{" "}
            <span className={isActive ? "" : "opacity-20"}> {likeCount}</span>
          </small>
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
  const { setPage } = usePages();
  const goToAuth = () => setPage(PAGE_LOGIN);

  const { toggle: toggleFlags } = useFlags();
  const goToArticleCreate = () => {
    setPage(PAGE_ARTICLE_CREATE);
    toggleFlags.on(IS_ACTIVE_ARTICLE_COMMANDS);
  };
  const goToWRCreate = () => {
    setPage(PAGE_WINE_REVIEW);
    toggleFlags.on(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  };

  //
  //
  //
  return (
    <section
      id="--acdzidbyqqx"
      className={`${bgNoAuth} pt-6 h-full text-sm flex flex-row items-start justify-between`}
    >
      <div className="px-1 grow prose text-white/50 text-xs text-center">
        <p>Pozdrav 👋🏻</p>
        <p>Aplikacija vam pomaže da otkrijete svet vina.</p>
        <p>
          Edukujte se ili ostavite{" "}
          <strong onClick={goToArticleCreate} className="link-red-wine">
            svoju priču
          </strong>
          .
        </p>
        <p>
          {" "}
          <strong onClick={goToWRCreate} className="link-red-wine">
            Podelite utiske
          </strong>{" "}
          o vinu sa drugima.
        </p>
        <p>
          <strong onClick={goToAuth} className="link-red-wine">
            Prijavite se
          </strong>{" "}
          ako želite da koristite sve usluge.
        </p>
      </div>
      <div className="w-1/3 pl-2">
        <YTPromoVideo />
      </div>
    </section>
  );
}

function DashboardNoPostsAvailable() {
  //
  const { user } = useAuth();
  const { setPage } = usePages();
  const globals = useGlobals();
  const { toggle: toggleFlags } = useFlags();
  //
  const goToArticleCreate = () => {
    setPage(PAGE_ARTICLE_CREATE);
    toggleFlags.on(IS_ACTIVE_ARTICLE_COMMANDS);
  };
  const goToWRCreate = () => {
    setPage(PAGE_WINE_REVIEW);
    toggleFlags.on(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  };

  //
  // no posts at this point
  // ..deactivate toolbar
  useEffect(() => globals.set(DASHBOARD_ENTRY_ACTIVE_POST, null), []);
  //
  return (
    <section
      id="--fxrdkvkpbjt"
      className={`${bgNoAuth} pt-6 h-full text-sm flex flex-row items-start justify-between`}
    >
      <div className="px-1 grow prose text-white/50 text-xs text-center">
        <p>
          Dobrodošli {user?.displayName ? <em>{user.displayName}</em> : ""}
          {" !"}
        </p>
        <p>Pregled objavljenog sadržaja...</p>
        <p>
          <strong className="text-white/80">
            Trenutno nemate postavljen materijal.
          </strong>
        </p>
        <p>Strane koje napravite biće izlistane ovde.</p>
        <p>
          {" "}
          <strong className="link-red-wine" onClick={goToArticleCreate}>
            Napiši članak
          </strong>{" "}
          , ili{" "}
          <strong className="link-red-wine" onClick={goToWRCreate}>
            oceni vino
          </strong>{" "}
          ...
        </p>
      </div>
      <div className="w-1/3 pl-2">
        <YTPromoVideo />
      </div>
    </section>
  );
}

export function YTPromoVideo() {
  const [refElementYtPromoVideo, setRefElementYtPromoVideo] = useState(null);
  const { isOn: isActiveTooltipYT, toggle: toggleIsActiveTooltipYT } =
    useStateSwitch();
  const { openGallery } = useFancyboxGallery();

  return (
    <>
      <div
        ref={setRefElementYtPromoVideo}
        onMouseOver={toggleIsActiveTooltipYT.on}
        onMouseLeave={toggleIsActiveTooltipYT.off}
        onClick={() => openGallery([{ src: YT_PROMO_VIDEO_URL }])}
        className={`p-6 flex items-center justify-center mt-2 cursor-pointer border border-slate-100/50 shadow opacity-50 max-w-[128px] h-32 rounded-2xl hover:opacity-80 hover:-translate-y-[2px] transition-transform ${bgTumbYTPromo}`}
      >
        <BsPlayFill className="w-full h-full !text-white" />
      </div>
      <Tooltip
        refElement={refElementYtPromoVideo}
        isActive={isActiveTooltipYT}
        placement="left"
        offset={[0, 12]}
      >
        🎥 Pogledaj prezentaciju
      </Tooltip>
    </>
  );
}
