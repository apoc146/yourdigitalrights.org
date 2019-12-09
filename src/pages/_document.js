import Document, { Head, Main, NextScript } from "next/document";
import { FormattedMessage } from "react-intl";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import flush from "styled-jsx/server";
import getPageContext from "../getPageContext";
import { DOMAIN } from "../utils/domain";

const dev = process.env.NODE_ENV !== "production";
const tag_manager = dev ? "var _mtm = _mtm || [];_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://cdn.innocraft.cloud/optout.innocraft.cloud/container_5NUlTe8T_dev_fb89c2b21d286532e8419d7d.js'; s.parentNode.insertBefore(g,s);" : "var _mtm = _mtm || [];_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://cdn.innocraft.cloud/optout.innocraft.cloud/container_5NUlTe8T.js'; s.parentNode.insertBefore(g,s);"

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.

export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const pageContext = getPageContext();
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript }
    } = context;
    
    const page = context.renderPage(Component => props => (
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <Component pageContext={pageContext} {...props} />
      </JssProvider>
    ));

    return {
      ...props,
      ...page,
      locale,
      localeDataScript,
      pageContext,

      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`;
    const { pageContext } = this.props;
    const { deeplinkedCompany } = this.props;

    return (
      <html>
        <Head>
          <meta
            property="og:image"
            content={"https://" + DOMAIN + "/static/opt-out-share.jpg?v=2"}
          />
          <meta
            property="og:image:width"
            content="898"
          />
          <meta
            property="og:image:height"
            content="680"
          />
          <meta
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            name="twitter:site"
            content="@OptoutEU"
          />

          <meta
            name="twitter:image"
            content={"https://" + DOMAIN + "/static/opt-out-share.jpg?v=2"}
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="stylesheet" href="/static/mobile.css" />
          <link rel="stylesheet" media="only screen and (min-width: 600px)" href="/static/desktop.css" />
          <link rel="icon" href="/static/favicon.ico" />
          <script
            dangerouslySetInnerHTML={{
              __html: tag_manager
            }}
          />
          <script
            src="//d.bablic.com/snippet/5b7e74c02615ef00013b76b9.js?version=3.9"
          />
        </Head>
        <body>
          <style dangerouslySetInnerHTML={{ __html: "a { color: #005ea5;}" }} />
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
