import axios from "axios";
import PropTypes from "prop-types";
import { END } from "redux-saga";
import Router from "next/router";
import PostSection from "../components/layout/PostSection";
import Nav from "../components/layout/Nav";
import DirectoryBar from "../components/layout/DirectoryBar";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LOAD_DIR_REQUEST } from "../reducers/directory";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { useClose } from "../hooks/useClose";

const Home = ({ type }) => {
  const ref = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { me } = useSelector((state) => state.user);

  // 클라이언트 상에서 유저 정보 없으면 로그인 화면으로 이동
  useEffect(() => {
    if (!me) {
      Router.push("/auth");
    }
  }, [me]);

  // 작은 화면에서 메뉴 버튼 클릭하면 사이드바 보여줌
  useEffect(() => {
    const refNode = ref.current;
    if (!openMenu) {
      refNode.classList.add("-translate-x-full");
    } else {
      refNode.classList.remove("-translate-x-full");
    }
  }, [openMenu]);

  // 사이드바 바깥을 클릭하면 닫아주는 커스텀 훅
  useClose(setOpenMenu, ref);

  return (
    <div className="overflow-x-hidden h-screen min-h-full relative dark:text-dark-font dark:bg-dark-bg">
      <div className="fixed w-screen z-20 bg-white">
        <Nav setOpenMenu={setOpenMenu} />
      </div>
      <div className="w-screen flex mt-12 overflow-y-hidden">
        <div
          ref={ref}
          className="absolute z-20 bg-white md:z-10 pt-0 inset-y-0 left-0 w-72 transform -translate-x-full transition duration-200 ease-in-out overflow-y-hidden md:translate-x-0 "
        >
          <DirectoryBar setOpenMenu={setOpenMenu} />
        </div>
        <div className="flex-1 min-h-screen md:ml-80 md:mr-8 border-l border-gray dark:border-dark-black-light">
          <PostSection type={type || "all"} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  type: PropTypes.string,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (req, res, next) => {
    const cookie = req.req ? req.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (req.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    store.dispatch({
      type: LOAD_DIR_REQUEST,
    });

    store.dispatch({
      type: LOAD_POST_REQUEST,
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();

    const { user } = store.getState();
    if (!user.me) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth",
        },
      };
    }
  },
);

export default Home;
