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
import { PAGE_LOGIN, PAGE_HELP, PAGE_ABOUT_WINE } from "../../app/store/page";
import useAuthLogout from "../../src/hooks/use-auth-logout";

import { useAuth } from "../../app/store";
//
//
const GuestNavigation = ({ ...rest }) => {
  const { setPage } = usePages();
  const { user } = useAuth();
  const [logout] = useAuthLogout();
  return (
    <div {...rest}>
      <div className="space-y-8 w-full h-full flex flex-col items-center justify-end py-6">
        <FaStar className="mb-auto text-yellow-400 text-5xl opacity-80 hover:opacity-90 active:opacity-100 cursor-pointer hover:-rotate-2 hover:scale-125 transition-transform" />
        <img
          src={iconSearch.src}
          alt=""
          width={32}
          className="opacity-50 hover:opacity-80 active:opacity-100 cursor-pointer shadow-sm hover:scale-110 transition-transform"
        />
        <FaRegComments className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
        <MdCreate className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
        <HiOutlineBookOpen
          onClick={prevent(setPage.bind(null, PAGE_ABOUT_WINE))}
          className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer"
        />
        <FiShare2 className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />
        <RiGithubLine className="text-white text-4xl opacity-25 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer" />

        {user ? (
          <IoMdPower
            onClick={logout}
            className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer"
          />
        ) : (
          <BiUserCircle
            onClick={prevent(setPage.bind(null, PAGE_LOGIN))}
            className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer"
          />
        )}
        <FaHome
          onClick={prevent(setPage.bind(null, PAGE_HELP))}
          className="text-white text-4xl opacity-50 hover:scale-110 transition-transform hover:opacity-80 active:opacity-100 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default GuestNavigation;