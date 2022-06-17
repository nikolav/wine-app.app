import React, { useState } from "react";
import {
  iconSearch,
  HiOutlineBookOpen,
  FiShare2,
  FaRegComments,
  FaStar,
  RiGithubLine,
  BiUserCircle,
  MdCreate,
  IoMdPower,
  FaHome,
} from "../icons";

import { prevent } from "../../src/util";
import { usePages } from "../../app/store";
import {
  PAGE_LOGIN,
  PAGE_HELP,
  PAGE_ABOUT_WINE,
  PAGE_ARTICLE_CREATE,
  PAGE_CHAT,
  PAGE_WINE_REVIEW,
  PAGE_SEARCH,
} from "../../app/store/page";
import useAuthLogout from "../../src/hooks/use-auth-logout";

import { useAuth } from "../../app/store";
import { preload } from "nikolav-q";
//
import {
  useFlags,
  IS_ACTIVE_SHARING,
  IS_ACTIVE_ARTICLE_COMMANDS,
  IS_ACTIVE_WINE_REVIEW_TOOLBAR,
} from "../../src/hooks/use-flags-global";
//
import useStateSwitch from "../../src/hooks/use-state-switch";
import Tooltip from "../Tooltip/Tooltip";
//
//
const GuestNavigation = ({ ...rest }) => {
  const { setPage } = usePages();
  const { user } = useAuth();
  const [logout] = useAuthLogout();
  //
  const { toggle } = useFlags();
  const openSharing = () => toggle.on(IS_ACTIVE_SHARING);
  const openArticleCommands = () => toggle.on(IS_ACTIVE_ARTICLE_COMMANDS);
  const openWineReviewToolbar = () => toggle.on(IS_ACTIVE_WINE_REVIEW_TOOLBAR);
  //
  // tooltip controlls
  const [refWineReview, setRefWineReview] = useState(null);
  const [refSearch, setRefSearch] = useState(null);
  const [refChat, setRefChat] = useState(null);
  const [refArticle, setRefArticle] = useState(null);
  const [refAboutWine, setRefAboutWine] = useState(null);
  const [refAboutShare, setRefAboutShare] = useState(null);
  const [refAboutGit, setRefAboutGit] = useState(null);
  const [refAboutAuth, setRefAboutAuth] = useState(null);
  const [refAboutHome, setRefAboutHome] = useState(null);
  // tooltip switches
  const { isOn: isActiveWineReview, toggle: toggleIsActiveWineReview } =
    useStateSwitch();
  const { isOn: isActiveSearch, toggle: toggleIsActiveSearch } =
    useStateSwitch();
  const { isOn: isActiveChat, toggle: toggleIsActiveChat } = useStateSwitch();
  const { isOn: isActiveArticle, toggle: toggleIsActiveArticle } =
    useStateSwitch();
  const { isOn: isActiveAboutWine, toggle: toggleIsActiveAboutWine } =
    useStateSwitch();
  const { isOn: isActiveShare, toggle: toggleIsActiveShare } = useStateSwitch();
  const { isOn: isActiveGit, toggle: toggleIsActiveGit } = useStateSwitch();
  const { isOn: isActiveAuth, toggle: toggleIsActiveAuth } = useStateSwitch();
  const { isOn: isActiveHome, toggle: toggleIsActiveHome } = useStateSwitch();
  //
  return (
    <div {...rest}>
      <div className="flex flex-col items-center justify-between w-full h-full py-4 ***space-y-8">
        {/* wrap incons.svg in <strong> make them fixed-size */}
        {/* @@winereview */}
        <strong
          style={{
            fontSize: 48,
          }}
          ref={setRefWineReview}
          onMouseOver={toggleIsActiveWineReview.on}
          onMouseLeave={toggleIsActiveWineReview.off}
        >
          <FaStar
            onClick={prevent(() => {
              setPage(PAGE_WINE_REVIEW);
              openWineReviewToolbar();
            })}
            className="text-yellow-400 transition-transform cursor-pointer opacity-80 hover:opacity-90 active:opacity-100 hover:-rotate-2 hover:scale-125"
          />
        </strong>
        <Tooltip
          isActive={isActiveWineReview}
          refElement={refWineReview}
          offset={[0, 15]}
        >
          🍸🤩 nova ocena vina
        </Tooltip>
        {/* @@search */}
        <img
          onClick={prevent(() => {
            setPage(PAGE_SEARCH);
          })}
          src={iconSearch.src}
          alt=""
          width={32}
          className="transition-transform shadow-sm opacity-50 cursor-pointer hover:opacity-80 active:opacity-100 hover:scale-110"
          ref={setRefSearch}
          onMouseOver={toggleIsActiveSearch.on}
          onMouseLeave={toggleIsActiveSearch.off}
        />
        <Tooltip
          refElement={refSearch}
          isActive={isActiveSearch}
          offset={[0, 23]}
        >
          🔎 pretraga sadržaja
        </Tooltip>

        {/* @@chat */}
        <strong
          style={{ fontSize: 36 }}
          ref={setRefChat}
          onMouseOver={toggleIsActiveChat.on}
          onMouseLeave={toggleIsActiveChat.off}
        >
          <FaRegComments
            onClick={prevent(() => {
              setPage(PAGE_CHAT);
            })}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        <Tooltip refElement={refChat} isActive={isActiveChat} offset={[0, 23]}>
          💬 poruke
        </Tooltip>

        {/* @@article */}
        <strong
          style={{ fontSize: 36 }}
          ref={setRefArticle}
          onMouseOver={toggleIsActiveArticle.on}
          onMouseLeave={toggleIsActiveArticle.off}
        >
          <MdCreate
            onClick={prevent(() => {
              setPage(PAGE_ARTICLE_CREATE);
              openArticleCommands();
            })}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        <Tooltip
          refElement={refArticle}
          isActive={isActiveArticle}
          offset={[0, 23]}
        >
          ✍🏼 napiši članak o vinu
        </Tooltip>
        {/* @@about-wine */}
        <strong
          style={{ fontSize: 36 }}
          onMouseOver={toggleIsActiveAboutWine.on}
          onMouseLeave={toggleIsActiveAboutWine.off}
          ref={setRefAboutWine}
        >
          <HiOutlineBookOpen
            onClick={prevent(setPage.bind(null, PAGE_ABOUT_WINE))}
            onMouseOver={(evt) =>
              preload(
                "regions02.jpg",
                "srbija3.jpg",
                "tech03.jpg",
                "tasting01.jpg"
              )
            }
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        <Tooltip
          refElement={refAboutWine}
          isActive={isActiveAboutWine}
          offset={[0, 23]}
        >
          🎓 saznaj više o vinu
        </Tooltip>

        {/* @@share */}
        <strong
          style={{ fontSize: 36 }}
          ref={setRefAboutShare}
          onMouseOver={toggleIsActiveShare.on}
          onMouseLeave={toggleIsActiveShare.off}
        >
          <FiShare2
            onClick={prevent(openSharing)}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        <Tooltip
          refElement={refAboutShare}
          isActive={isActiveShare}
          offset={[0, 23]}
        >
          📱 deli na društvenim mrežama
        </Tooltip>

        {/* @@git; sizes ok */}
        <a
          href="https://github.com/nikolav/wine-app.app"
          target="_blank"
          rel="noreferrer noopener"
          ref={setRefAboutGit}
          onMouseOver={toggleIsActiveGit.on}
          onMouseLeave={toggleIsActiveGit.off}
        >
          <RiGithubLine className="text-4xl text-white transition-transform opacity-25 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
        </a>
        <Tooltip
          refElement={refAboutGit}
          isActive={isActiveGit}
          offset={[0, 23]}
        >
          🛠 doprinos projektu{" "}
          <small className="italic opacity-50">@github.com</small>
        </Tooltip>

        {/* @@auth */}
        <strong
          style={{ fontSize: 36 }}
          ref={setRefAboutAuth}
          onMouseOver={toggleIsActiveAuth.on}
          onMouseLeave={toggleIsActiveAuth.off}
          onClick={toggleIsActiveAuth.off}
        >
          {user ? (
            <IoMdPower
              onClick={logout}
              className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
            />
          ) : (
            <BiUserCircle
              onClick={prevent(setPage.bind(null, PAGE_LOGIN))}
              className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
            />
          )}
        </strong>
        <Tooltip
          refElement={refAboutAuth}
          isActive={isActiveAuth}
          offset={[0, 23]}
        >
          {null != user ? (
            "⛔ odjava"
          ) : (
            <span>
              👥 prijava
              <span className="opacity-50">, registracija</span>
            </span>
          )}
        </Tooltip>

        {/* @@help/dashboard */}
        <strong
          style={{ fontSize: 36 }}
          ref={setRefAboutHome}
          onMouseOver={toggleIsActiveHome.on}
          onMouseLeave={toggleIsActiveHome.off}
        >
          <FaHome
            onClick={prevent(setPage.bind(null, PAGE_HELP))}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        <Tooltip
          refElement={refAboutHome}
          isActive={isActiveHome}
          offset={[0, 23]}
        >
          🏠 početna strana, <small className="opacity-50">dashboard</small>
        </Tooltip>
      </div>
    </div>
  );
};

export default GuestNavigation;
