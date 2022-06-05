import axios from "axios";
import { END } from "redux-saga";

import Home from "../index";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_DIR_REQUEST } from "../../reducers/directory";
import { LOAD_FAV_POST_REQUEST, LOAD_POST_REQUEST } from "../../reducers/post";

const Favorite = () => {
  const type = "fav";
  return <Home type={type} />;
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
      type: LOAD_FAV_POST_REQUEST,
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
          destination: "/login",
        },
      };
    }
  },
);

export default Favorite;
