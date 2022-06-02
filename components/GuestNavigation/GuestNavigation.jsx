import React from "react";
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
  return (
    <div {...rest}>
      <div className="flex flex-col items-center justify-between w-full h-full py-4 ***space-y-8">
        {/* wrap incons.svg in <strong> make them fixed-size */}
        {/* @@winereview */}
        <strong
          style={{
            fontSize: 48,
          }}
        >
          <FaStar
            onClick={prevent(() => {
              setPage(PAGE_WINE_REVIEW);
              openWineReviewToolbar();
            })}
            className="text-yellow-400 transition-transform cursor-pointer opacity-80 hover:opacity-90 active:opacity-100 hover:-rotate-2 hover:scale-125"
          />
        </strong>
        {/* @@search */}
        <img
          onClick={prevent(() => {
            setPage(PAGE_SEARCH);
          })}
          src={iconSearch.src}
          alt=""
          width={32}
          className="transition-transform shadow-sm opacity-50 cursor-pointer hover:opacity-80 active:opacity-100 hover:scale-110"
        />
        {/* @@chat */}
        <strong style={{ fontSize: 36 }}>
          <FaRegComments
            onClick={prevent(() => {
              setPage(PAGE_CHAT);
            })}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        {/* @@article */}
        <strong style={{ fontSize: 36 }}>
          <MdCreate
            onClick={prevent(() => {
              setPage(PAGE_ARTICLE_CREATE);
              openArticleCommands();
            })}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        {/* @@about-wine */}
        <strong style={{ fontSize: 36 }}>
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
        {/* @@share */}
        <strong style={{ fontSize: 36 }}>
          <FiShare2
            onClick={prevent(openSharing)}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
        {/* @@git; sizes ok */}
        <a
          href="https://github.com/nikolav/wine-app.app"
          target="_blank"
          rel="noreferrer noopener"
        >
          <RiGithubLine className="text-4xl text-white transition-transform opacity-25 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100" />
        </a>
        {/* @@auth */}
        <strong style={{ fontSize: 36 }}>
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
        {/* @@help/dashboard */}
        <strong style={{ fontSize: 36 }}>
          <FaHome
            onClick={prevent(setPage.bind(null, PAGE_HELP))}
            className="***text-4xl text-white transition-transform opacity-50 cursor-pointer hover:scale-110 hover:opacity-80 active:opacity-100"
          />
        </strong>
      </div>
    </div>
  );
};

export default GuestNavigation;
