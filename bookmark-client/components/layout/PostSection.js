import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import FilterToggle from "../utility/Toggle/FilterToggle";
import Post from "../component/Post";
import { findDirName } from "../../hooks/helper";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const PostSection = ({ type }) => {
  const router = useRouter();
  const { allPosts, dirPosts, favPosts } = useSelector((state) => state.post);
  const { allDirs } = useSelector((state) => state.directory);
  const [dirName, setDirName] = useState("모두보기");
  const { id } = router.query;

  const [initialSort, setInitialSort] = useState(true);
  const [sort, setSort] = useState(initialSort);
  const [mounted, setMounted] = useState(false);

  // 정렬 순서를 결정한다.
  useEffect(() => {
    let boolean;
    if (
      !localStorage.hasOwnProperty("sort") ||
      JSON.parse(window.localStorage.getItem("sort"))
    ) {
      boolean = true;
      localStorage.setItem("sort", "true");
    } else {
      boolean = false;
    }
    setInitialSort(boolean);
    setSort(boolean);
    setMounted(true);
  }, []);

  // 현재 열람하는 카테고리의 제목을 결정한다.
  useEffect(() => {
    if (type === "id") {
      const dirName = allDirs.find((el) => el.id === Number(id))?.name;
      setDirName(dirName);
    } else if (type === "fav") {
      setDirName("즐겨찾기");
    }
  }, [id, allDirs]);

  // 화면에 보여 줄 리스트를 정렬 설정에 따라 변경해준다.
  const decideList = useCallback(() => {
    let list = [];
    if (type === "all") {
      list = allPosts;
    } else if (type === "id") {
      list = dirPosts.filter((el) => el.DirectoryId === Number(id));
    } else if (type === "fav") {
      list = favPosts;
    }

    const copiedList = [...list];
    if (!sort) {
      return copiedList.reverse();
    } else {
      return list;
    }
  }, [dirPosts, favPosts, allPosts, sort]);

  // 게시글의 갯수를 결정해준다.
  const renderNumber = useCallback(() => {
    if (type === "all") {
      return allPosts.length;
    } else if (type === "id") {
      return dirPosts.filter((el) => el.DirectoryId === Number(id)).length;
    } else if (type === "fav") {
      return favPosts.length;
    }
  }, [allPosts, dirPosts, favPosts]);

  // 로컬 스토리지에서 정렬 관련 정보를 얻기 위해 한번 마운트 된 뒤 렌더링한다.
  if (!mounted) return null;

  return (
    <div className="relative pt-24 grid gap-4 p-4 pb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
      <div className="absolute flex gap-8 top-12 left-12">
        <p className="text-xl sm:text-2xl tracking-widest">{dirName}</p>
        <p className="self-end hidden sm:block">
          <span className="text-orange">{renderNumber()}</span> 개의 게시물
        </p>
      </div>
      <div className="absolute top-10 right-12">
        <FilterToggle setSort={setSort} sort={sort} initialSort={initialSort} />
      </div>
      {decideList().map((post) => (
        <Post
          post={post}
          key={post.id}
          dirName={findDirName(allDirs, post.DirectoryId)}
        />
      ))}
    </div>
  );
};

export default PostSection;

PostSection.propTypes = {
  type: PropTypes.string,
};
