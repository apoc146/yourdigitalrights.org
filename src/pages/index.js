import Head from "next/head";
import { Component } from "react";
import RedirectOverlay from "../components/RedirectOverlay";
import Donations from "../components/Donations";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Nav from "../components/Nav";
import PersonalInfoForm from "../components/PersonalInfoForm";
import SearchForm from "../components/SearchForm";
import Social from "../components/Social";
import fetchSheetData from "../utils/sheets";
import pageWithIntl from "../components/PageWithIntl";
import tracking from "../utils/tracking";
import withRoot from "../withRoot";
import { withStyles } from "@material-ui/core/styles";
import { DOMAIN } from "../utils/domain";

const styles = (theme) => ({
  topOfPagePlaceholder: {
    height: "72px",
  },
  mainContainer: {
    position: "relative",
  },
  desktopSearchbar: {
    display: "block",
  },
});

const tabletBreakpoint = 960;

class Index extends Component {
  constructor(props) {
    super(props);
    this.searchForm = React.createRef();
    // this.infoForm = React.createRef();

    this.state = {
      selectedCompany: null,
      manualCompanyEntryEnabled: false,
      screenWidth: null,
      showRedirectOverlay: false,
    };

    if (typeof window !== "undefined" && window.location.hash !== "") {
      let hash = window.location.hash;

      setTimeout(() => {
        window.location.hash = "";
        window.location.hash = hash;
      }, 500);
    }

    if (
      typeof window !== "undefined" &&
      window.location.search.includes("source=optouteu")
    ) {
      this.state.showRedirectOverlay = true;
    }
  }

  static async getInitialProps({ query }) {
    if (query.company) {
      const companies = await fetchSheetData();
      const deeplinkedCompany = companies.find(
        ({ url }) => query.company === url
      );
      return { deeplinkedCompany };
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.setState({ screenWidth: window.innerWidth });
      window.addEventListener("resize", this.onScreenResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onScreenResize);
    }
  }

  componentDidUpdate() {
    if (typeof window !== "undefined" && this.infoForm) {
      let scrollTop =
        this.infoForm.getBoundingClientRect().top + window.pageYOffset - 122;
      window.scrollTo({ top: scrollTop });
    }
  }

  onScreenResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  onCompanySelected = (selectedCompany) => {
    if (selectedCompany.name) {
      this.updateQueryParams(selectedCompany.url);
      this.setState({
        selectedCompany,
        manualCompanyEntryEnabled: false,
      });
      tracking.trackSelectedCompany(selectedCompany.url);
    } else {
      this.setState({
        selectedCompany: null,
        manualCompanyEntryEnabled: true,
      });
    }
  };

  updateQueryParams(companyName) {
    if ("URLSearchParams" in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("company", companyName);
      history.pushState(null, null, "?" + searchParams.toString());
    }
  }

  focusSearch() {
    let state = Object.assign({}, this.state);
    state.selectedCompany = null;
    this.setState(state);
    window.location.hash = "hero";
    this.searchForm.current.focus();
  }

  closeRedirectOverlay() {
    window.history.replaceState("home", "Home", "/");
    this.setState({ ...this.state, showRedirectOverlay: false });
  }

  render() {
    const { deeplinkedCompany, classes } = this.props;
    const { selectedCompany, screenWidth } = this.state;
    const company = deeplinkedCompany || selectedCompany;

    // TODO: Make these string translatable
    const Title = deeplinkedCompany
      ? "Opt-out of " + deeplinkedCompany.name + " | Your Digital Rights"
      : "Your Digital Rights";
    const Description = deeplinkedCompany
      ? "Get " + deeplinkedCompany.name + " to erase your personal data."
      : "Get thousands of organizations to erase your personal data.";
    const Canonical = deeplinkedCompany
      ? "https://" + DOMAIN + "/?company=" + deeplinkedCompany.url
      : "https://" + DOMAIN + "/";
    const URL = "https://" + DOMAIN + "/";
    const searchURL = "https://" + DOMAIN + "/?company={search_term_string}";

    return (
      <div>
        <Nav>
          {screenWidth !== null && screenWidth < tabletBreakpoint && (
            <SearchForm
              onCompanySelected={this.onCompanySelected}
              innerRef={this.searchForm}
            />
          )}
        </Nav>
        <div className={classes.mainContainer}>
          <div className={classes.scrollableContainer}></div>
          <Head>
            <title>{Title}</title>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html:
                  '{"@context": "https://schema.org", "@type": "WebSite", "url": "' +
                  URL +
                  '", "potentialAction": { "@type": "SearchAction", "target": "' +
                  searchURL +
                  '", "query-input": "required name=search_term_string" }}',
              }}
            />
            <link rel="canonical" href={Canonical} />
            <link href="src/styles/hamburgers.css" rel="stylesheet" />
            <meta name="description" content={Description} />
            <meta property="og:description" content={Description} />
            <meta property="og:title" content={Title} />
            <meta name="twitter:title" content={Title} />
            <meta name="twitter:description" content={Description} />
          </Head>
          <input
            id="topOfPage"
            className={classes.topOfPagePlaceholder}
            onFocus={() => {
              this.focusSearch();
            }}
          />
          <Hero>
            {screenWidth !== null && screenWidth >= tabletBreakpoint && (
              <div className={classes.desktopSearchbar}>
                <SearchForm
                  onCompanySelected={this.onCompanySelected}
                  innerRef={this.searchForm}
                />
              </div>
            )}
          </Hero>
          {(company || this.state.manualCompanyEntryEnabled) && (
            <PersonalInfoForm
              selectedCompany={company}
              focusSearch={this.focusSearch.bind(this)}
              containerRef={(el) => (this.infoForm = el)}
            />
          )}
          <HowItWorks />
          <FAQ />
          <Social offset={true} sourcePage="homepage" />
          <Donations />
          <Footer />
          {this.state.showRedirectOverlay && (
            <RedirectOverlay close={() => this.closeRedirectOverlay()} />
          )}
        </div>
      </div>
    );
  }
}

export default withRoot(pageWithIntl(withStyles(styles)(Index)));
