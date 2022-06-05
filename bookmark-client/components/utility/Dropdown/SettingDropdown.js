import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CogIcon, InformationCircleIcon } from "@heroicons/react/outline";

import { LOG_OUT_REQUEST } from "../../../reducers/user";
import { useClose } from "../../../hooks/useClose";
import DarkmodeToggle from "../Toggle/DarkmodeToggle";

const SettingDropdown = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  // 설정 아이콘 클릭하면 모달을 보여준다
  const onClickIcon = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, [openModal]);

  // esc 누르거나 모달 바깥 클릭하면 닫아준다.
  useClose(setOpenModal, ref);

  const renderModal = useCallback(() => {
    return (
      <div className="overflow-hidden absolute w-36 z-50 rounded-2xl shadow-2xl h-44 grid grid-rows-3 right-0 bg-gray cursor-pointer dark:bg-dark-bg dark:border dark:border-dark-black-light">
        <div className="flex items-center pl-4 hover:bg-gray-dark dark:hover:bg-dark-black-light">
          <DarkmodeToggle />
        </div>
        <div
          onClick={() =>
            window.open(
              "https://pickle-pickle.notion.site/pickle-pickle/P-I-C-K-L-E-15bb7bc5c886487cb976a9a88d4410c7",
              "_blank",
            )
          }
          className="flex-center hover:bg-gray-dark dark:hover:bg-dark-black-light"
        >
          <InformationCircleIcon className="w-5 h-5 mr-1" />
          정보
        </div>
        <div
          onClick={onLogout}
          className="flex-center hover:bg-gray-dark dark:hover:bg-dark-black-light"
        >
          로그아웃
        </div>
      </div>
    );
  }, []);

  return (
    <div ref={ref} className="mx-3 relative" onClick={onClickIcon}>
      <div className="w-10 h-10 p-1 cursor-pointer rounded-2xl active:-translate-y-0.5 hover:bg-gray-dark dark:hover:bg-dark-black-light">
        <CogIcon />
      </div>
      {openModal ? renderModal() : null}
    </div>
  );
};

export default SettingDropdown;
