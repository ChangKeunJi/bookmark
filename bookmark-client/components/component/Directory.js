import { useCallback, useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector } from "react-redux";

import { summarizeStr } from "../../hooks/helper";
import UpdateAndDeleteDir from "../utility/Modal/UpdateAndDeleteDir";

const Directory = ({ dir, index, setOpenMenu }) => {
  const ref = useRef(null);
  const { allPosts } = useSelector((state) => state.post);

  // 설정 아이콘은 Directory 컴포넌트가 호버 될 때만 보여준다.
  const [hover, setHover] = useState(false);

  // 카테고리를 클릭하면 카테고리에 포함된 게시물만 보여준다.
  const onClickDir = useCallback((e) => {
    if (!ref.current.contains(e.target)) {
      setOpenMenu(false);
      Router.push(`/directory/${dir.id}`);
    }
  }, []);

  // 사이드바의 바깥을 클릭하면 사이드바를 닫아준다.(작은 화면)
  const handleClickOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setHover(false);
    }
  }, []);

  // 카테고리 이름 옆 게시글의 갯수를 나타내준다.
  const renderNumber = useCallback(() => {
    const arr = allPosts.filter((el) => el.DirectoryId === dir.id);
    return arr.length;
  }, [allPosts]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [hover]);

  return (
    <Draggable key={dir.id} index={index} draggableId={String(dir.id)}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={onClickDir}
          className="dir-item border-b border-gray-dark dark:hover:bg-dark-black-light dark:border-dark-black-light"
        >
          <div className="flex">
            <span> &gt; </span>
            <p className="ml-2">{summarizeStr(dir.name, 15)}</p>
          </div>

          <div ref={ref} className={hover ? "block" : "hidden"}>
            <UpdateAndDeleteDir
              id={dir.id}
              name={dir.name}
              setOpenMenu={setOpenMenu}
            />
          </div>
          <div className={hover ? "hidden" : "block"}>
            <p className="mr-2 text-sm text-orange">{renderNumber()}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Directory;

Directory.propTypes = {
  dir: PropTypes.object,
  index: PropTypes.number,
  setOpenMenu: PropTypes.func,
};
