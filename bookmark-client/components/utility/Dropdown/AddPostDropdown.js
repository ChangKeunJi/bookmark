import { PlusSmIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useRef, useState } from "react";

import PickDirDropdown from "./PickDirDropdown";
import { joinClass } from "../../../hooks/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POST_DIR_REQUEST,
  ADD_POST_REQUEST,
  AFTER_ADD_POST,
  AFTER_ADD_POST_FAIL,
} from "../../../reducers/post";
import useInput from "../../../hooks/useInput";
import { useClose } from "../../../hooks/useClose";
import { showAndRemovePopup } from "../../../hooks/helper";
import { ADD_POST_POPUP, ADD_POST_FAIL_POPUP } from "../../../reducers/user";

const AddPostDropdown = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { allDirs } = useSelector((state) => state.directory);
  const { addPostDone, addPostError } = useSelector((state) => state.post);
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState(null);
  const [url, onChangeUrl, setUrl] = useInput("");
  const [newDir, onChangeNewDir, setNewDir] = useInput("");

  const onClick = useCallback(() => {
    setOpen((prev) => !prev);
    setUrl("");
    setNewDir("");
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimedUrl = url.trim();

      if (newDir && url && !dir) {
        // 1. 카테고리를 새로 생성한 경우
        dispatch({
          type: ADD_POST_DIR_REQUEST,
          data: { url: trimedUrl, dirName: newDir },
        });
      } else if (dir && url && !newDir) {
        // 2. 카테고리를 지정했을 경우
        dispatch({
          type: ADD_POST_REQUEST,
          data: { url: trimedUrl, dirId: dir.id },
        });
      } else if (url && !dir && !newDir) {
        // 3. 카테고리를 생성하지도 지정하지도 않았을 경우
        dispatch({
          type: ADD_POST_REQUEST,
          data: { url: trimedUrl },
        });
      }

      setOpen(false);
    },
    [dir, newDir, url],
  );

  useEffect(() => {
    // 드롭다운 열면 맨 처음 url input 을 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // 기존 카테고리 중 하나를 선택하면 카테고리 생성 인풋은 비워지고 사용못하게 한다
    if (dir) {
      setNewDir("");
    }
  }, [dir]);

  useEffect(() => {
    // 포스트가 성공적으로 추가되면 Navbar 팝업을 띄운다
    if (addPostDone) {
      showAndRemovePopup(dispatch, ADD_POST_POPUP);
      dispatch({ type: AFTER_ADD_POST });
    }

    // 포스트 추가가 실패하면 Navbar 팝업을 띄운다
    if (addPostError) {
      showAndRemovePopup(dispatch, ADD_POST_FAIL_POPUP);
      dispatch({ type: AFTER_ADD_POST_FAIL });
    }
  }, [allDirs, addPostDone, addPostError]);

  useClose(setOpen, ref);

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-28 right-16 z-50">
        {open && <PickDirDropdown setDir={setDir} />}
      </div>
      <div ref={ref} onClick={onClick}>
        <PlusSmIcon className="w-10 h-10 cursor-pointer p-1 active:-translate-y-0.5 hover:bg-gray-dark dark:hover:bg-dark-black-light rounded-2xl" />
      </div>
      <div
        className={joinClass(
          open ? "block" : "hidden",
          "absolute rounded-2xl overflow-hidden top-12 w-48 h-60 bg-gray z-20 shadow-xl right-12 dark:bg-dark-bg dark:border dark:border-dark-black-light",
        )}
      >
        <form onSubmit={onSubmit} className=" w-full h-full grid grid-rows-4">
          <div className="flex-center px-4">
            <input
              required
              ref={inputRef}
              value={url}
              onChange={onChangeUrl}
              placeholder="URL을 입력해주세요."
              className="text-sm w-full rounded-md px-4 h-10 mx-auto focus:outline-none tracking-wider dark:bg-dark-black-light"
            />
          </div>
          <div></div>
          <div className=" px-4 flex-center">
            <input
              readOnly={dir}
              value={newDir}
              onChange={onChangeNewDir}
              placeholder="카테고리 추가하기"
              className="text-sm w-full rounded-md px-4 h-10 mx-auto focus:outline-none tracking-wider dark:bg-dark-black-light "
            />
          </div>
          <div className="flex-center">
            <button
              type="submit"
              className="px-4 py-2 shadow-sm rounded-full bg-gray-dark dark:bg-dark-black-light"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostDropdown;
