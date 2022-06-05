import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import Router from "next/router";
import PropTypes from "prop-types";

import { ChevronLeftIcon } from "@heroicons/react/outline";
import Directory from "../component/Directory";
import AddDirModal from "../utility/Modal/AddDirModal";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORDER_REQUEST } from "../../reducers/directory";

const DirectoryBar = ({ setOpenMenu }) => {
  const dispatch = useDispatch();
  const { allDirs } = useSelector((state) => state.directory);
  const [state, setState] = useState(allDirs);

  const onClickFav = useCallback(() => {
    Router.push("/directory/favorite");
  }, []);

  const onClickAll = useCallback(() => {
    Router.push("/");
  }, []);

  useEffect(() => {
    setState(allDirs);
  }, [allDirs]);

  useEffect(() => {
    // 카테고리 추가 시 상태 업데이트 위해서
    if (state.length !== allDirs.length) {
      setState(allDirs);
    }
  }, [allDirs, state]);

  // 카테고리 이동이 완료될 때 호출되는 함수
  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

      // 컴포넌트가 영역 밖으로 Drag 되었을 때
      if (!result.destination) {
        return;
      }

      // 움직임이 있었지만 이전과 순서가 변하지 않았을 때
      if (
        destination.draggableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // 기존 순서 객체를 복사한 뒤 새로운 순서 객체를 만들어 컴포넌트 상태를 업데이트 해준다
      const newAllDirs = Array.from(state);
      const exOrder = Array.from(state);
      const [before] = newAllDirs.splice(source.index, 1);
      newAllDirs.splice(destination.index, 0, before);

      // 바뀐 순서를 API 요청을 통해 DB 에 저장한다
      for (let i = 0; i < exOrder.length; i++) {
        if (exOrder[i].order !== newAllDirs[i].order) {
          dispatch({
            type: UPDATE_ORDER_REQUEST,
            data: { id: newAllDirs[i].id, order: exOrder[i].order },
          });
        }
      }

      setState(newAllDirs);
    },
    [state, allDirs],
  );

  resetServerContext();

  return (
    <div>
      <div className="min-h-screen pl-4 py-12 relative dark:text-dark-font dark:bg-dark-bg">
        <div
          onClick={() => {
            setOpenMenu(false);
          }}
          className="absolute top-6 left-12 p-1 cursor-pointer w-8 h-8 hover:bg-gray-dark dark:hover:bg-dark-black-light rounded-2xl active:-translate-y-0.5 md:hidden"
        >
          <ChevronLeftIcon />
        </div>
        <div
          onClick={onClickAll}
          className="dir-item mt-8 dark:hover:bg-dark-black-light"
        >
          <p>모두보기</p>
        </div>
        <div
          onClick={onClickFav}
          className="border-b border-gray-dark dir-item dark:hover:bg-dark-black-light dark:border-dark-black-light"
        >
          <p>즐겨찾기</p>
        </div>
        <div className="w-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dirs">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {state.length > 0
                    ? state.map((dir, index) => {
                        return (
                          <Directory
                            key={dir.id}
                            dir={dir}
                            index={index}
                            setOpenMenu={setOpenMenu}
                          />
                        );
                      })
                    : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="w-full flex-center py-3">
          <AddDirModal setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </div>
  );
};

export default DirectoryBar;

DirectoryBar.propTypes = {
  setOpenMenu: PropTypes.func,
};
