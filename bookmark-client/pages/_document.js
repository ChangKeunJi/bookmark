import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="세상에서 가장 심플한 북마크 관리 서비스"
          />
          <meta name="author" content="Pickle" />
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <meta
            property="og:title"
            content="Pickle | 심플하게 북마크 관리하세요"
          />
          <meta
            property="og:description"
            content="세상에서 가장 심플한 북마크 관리 서비스"
          />
          <meta property="og:site_name" content="Pickle" />
          <meta property="og:url" content="https://www.pickle-pickle.kr" />
          <meta
            name="twitter:title"
            content="Pickle | 심플하게 북마크 관리하세요"
          />
          <meta
            property="twitter:description"
            content="세상에서 가장 심플한 북마크 관리 서비스"
          />
          <meta name="twitter:url" cotent="https://www.pickle-pickle.kr" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
