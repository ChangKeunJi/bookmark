import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import Head from "next/head";
import PropTypes from "prop-types";
import { ThemeProvider } from "next-themes";

import "../style/taillwind.css";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <title>Pickle | 심플하게 북마크 관리하세요</title>
      </Head>
      <ThemeProvider
        forcedTheme={Component.theme || undefined}
        attribute="class"
      >
        <Component />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);

App.propTypes = {
  Component: PropTypes.elementType,
};
