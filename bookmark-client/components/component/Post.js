import { useCallback, useEffect, useState } from "react";
import { TrashIcon, LinkIcon, StarIcon } from "@heroicons/react/outline";
import { StarIcon as SolidStar } from "@heroicons/react/solid";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";

import DeleteModal from "../utility/Modal/DeleteModal";
import { showAndRemovePopup, summarizeStr } from "../../hooks/helper";
import { useDispatch } from "react-redux";
import {
  ADD_REMOVE_FAV_POST_REQUEST,
  DELETE_POST_REQUEST,
} from "../../reducers/post";
import { joinClass } from "../../hooks/helper";
import {
  COPY_LINK_POPUP,
  DELETE_FAVORITE_POPUP,
  DELETE_POPUP,
  ADD_FAVORITE_POPUP,
} from "../../reducers/user";

const Post = ({ post, dirName }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // 새 탭으로 열기
  const onClick = useCallback((e) => {
    e.preventDefault();
    window.open(post.url, "_blank");
  }, []);

  // 링크 복사
  const onClickCopyUrl = useCallback((e) => {
    e.stopPropagation();
    copy(post.url); // 사용자의 컴퓨터에 텍스트가 복사됨
    showAndRemovePopup(dispatch, COPY_LINK_POPUP);
  }, []);

  // 즐겨찾기 추가 or 삭제
  const onClickAddFav = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({
        type: ADD_REMOVE_FAV_POST_REQUEST,
        data: { id: post.id, bool: post.favorite },
      });
      if (post.favorite) {
        showAndRemovePopup(dispatch, DELETE_FAVORITE_POPUP);
      } else {
        showAndRemovePopup(dispatch, ADD_FAVORITE_POPUP);
      }
    },
    [post.favorite],
  );

  // 게시글 삭제
  useEffect(() => {
    if (confirm) {
      showAndRemovePopup(dispatch, DELETE_POPUP);
      dispatch({
        type: DELETE_POST_REQUEST,
        data: post.id,
      });
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="card cursor-pointer border border-gray-dark shadow-sm hover:shadow-md rounded-2xl dark:border-dark-black-light dark:hover:border-gray-dark"
      onClick={onClick}
    >
      <div className="flex z-0 relative items-start justify-between flex-col p-4 h-full">
        {dirName && hover ? (
          <div className="absolute z-50 top-6 left-6 bg-white shadow-md py-1 px-2 rounded-full">
            <p className="tracking-widest text-lg dark:text-black">
              {summarizeStr(dirName, 15)}
            </p>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 w-full">
          <img
            src={post.thumbnail || "/img/logoNav.png"}
            className={joinClass(
              hover ? "filter brightness-50" : "",
              "card-image w-full rounded-2xl border border-gray shadow-sm object-cover dark:border-dark-black-light",
            )}
          />
          <div className="font-semibold w-full">
            {summarizeStr(post.title, 25)}
          </div>
          <div className="text-xs w-full">{summarizeStr(post.desc, 120)}</div>
        </div>
        <div className="flex justify-between w-full h-10">
          <div className="flex items-center w-7/12 h-full">
            <div className="text-sm">{summarizeStr(post.author, 20)}</div>
          </div>
          <div
            className={
              hover ? "w-5/12 block flex-center gap-2 z-20 h-full" : "hidden"
            }
          >
            <div
              onClick={onClickAddFav}
              className="post-icon dark:hover:bg-dark-black-light"
            >
              {post.favorite ? (
                <SolidStar className="post-icon-size" />
              ) : (
                <StarIcon className="post-icon-size" />
              )}
            </div>
            <div
              onClick={onClickCopyUrl}
              className="post-icon dark:hover:bg-dark-black-light"
            >
              <LinkIcon className="post-icon-size" />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setModal(true);
              }}
              className="post-icon dark:hover:bg-dark-black-light"
            >
              <TrashIcon className="post-icon-size" />
              {modal && (
                <DeleteModal setModal={setModal} setConfirm={setConfirm} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object,
  dirName: PropTypes.string,
};
