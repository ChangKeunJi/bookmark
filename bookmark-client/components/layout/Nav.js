import { useCallback } from "react";
import Image from "next/image";
import Router from "next/router";
import { useSelector } from "react-redux";
import { MenuIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

import NavModal from "../utility/Modal/NavModal";
import { joinClass } from "../../hooks/helper";
import AddPostDropdown from "../utility/Dropdown/AddPostDropdown";
import SettingDropdown from "../utility/Dropdown/SettingDropdown";
import Logo from "../../public/favicon.png";

const Nav = ({ setOpenMenu }) => {
  const {
    addPostPopup,
    addPostFailPopup,
    copyLinkPopup,
    deletePopup,
    addFavPopup,
    deleteFavPopup,
  } = useSelector((state) => state.user);

  const renderText = useCallback(() => {
    if (copyLinkPopup) {
      return <NavModal text={" 링크가 복사되었습니다."} emoji={"👏👏"} />;
    }
    if (deletePopup) {
      return <NavModal text={"북마크가 삭제되었습니다."} emoji={"❌❌"} />;
    }
    if (addFavPopup) {
      return <NavModal text={"즐겨찾기에 추가되었습니다."} emoji={"👏👏"} />;
    }
    if (deleteFavPopup) {
      return <NavModal text={"즐겨찾기에서 삭제되었습니다."} emoji={"❌❌"} />;
    }
    if (addPostPopup) {
      return (
        <NavModal text={"새로운 북마크가 추가되었습니다."} emoji={"👏👏"} />
      );
    }
    if (addPostFailPopup) {
      return <NavModal text={"올바른 URL을 입력해주세요."} emoji={" ❌❌"} />;
    }

    return null;
  }, [
    copyLinkPopup,
    deletePopup,
    addFavPopup,
    deleteFavPopup,
    addPostPopup,
    addPostFailPopup,
  ]);

  const onClickMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  return (
    <div className="border-b border-gray shadow-md dark:text-dark-font dark:bg-dark-bg dark:border-dark-black-light">
      <div className="flex justify-between h-16 items-center w-full px-4">
        <div className="flex-center py-0 mx-5 h-12">
          <div
            onClick={onClickMenu}
            className="block md:hidden rounded-2xl p-2 cursor-pointer hover:bg-gray-dark dark:hover:bg-dark-black-light"
          >
            <MenuIcon className="w-8 h-8" />
          </div>
          <Image
            src={Logo}
            width={50}
            height={50}
            onClick={() => Router.push("/")}
            className="invisible md:visible cursor-pointer"
          />
        </div>
        <div
          className={joinClass(
            copyLinkPopup ||
              deletePopup ||
              addFavPopup ||
              deleteFavPopup ||
              addPostPopup ||
              addPostFailPopup
              ? "translate-y-0"
              : "-translate-y-24",
            "transition text-center w-max duration-200 rounded-full bg-light-nav py-2 px-4 shadow-lg dark:bg-dark-black-light",
          )}
        >
          {renderText()}
        </div>
        <div className="flex-center">
          <AddPostDropdown />
          <SettingDropdown />
        </div>
      </div>
    </div>
  );
};

export default Nav;

Nav.propTypes = {
  setOpenMenu: PropTypes.func,
};
