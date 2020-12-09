import Head from "next/head";
import { Component } from "react";
import AboutOrg from "../../components/AboutOrg";
import Donations from "../../components/Donations";
import Footer from "../../components/Footer";
import PressCoverage from "../../components/PressCoverage";
import Hero from "../../components/OrgHero";
import Nav from "../../components/Nav";
import PersonalInfoForm from "../../components/PersonalInfoForm";
import Social from "../../components/Social";
import fetchSheetData from "../../utils/sheets";
import pageWithIntl from "../../components/PageWithIntl";
import tracking from "../../utils/tracking";
import withRoot from "../../withRoot";
import { DOMAIN } from "../../utils/domain";
import Error from "next/error";

class Org extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ query, res }) {
    if (query.domain) {
      if (query.domain == 'add') {
        return { newOrg: true }
      }
      const organizations = await fetchSheetData();
      const organization = organizations.find(
        ({ url }) => query.domain === url
      );
      if ({organization}) {
        return { organization };
      }
    } 
  }

  render() {
    const { newOrg, organization, classes } = this.props;

    if (!newOrg && !organization) return <Error statusCode={404} />;

    const Title = organization ? "Opt-out of " + organization.name + " | Your Digital Rights" : "Add new organzation | Your Digital Rights";
    const Description = organization ? "Find out what personal data " + organization.name + " have on you, and get them to delete it." :
      "Find out what personal data thousands of organizations have on you, and get them to delete it.";
    "Request Whoodle Llc to delete, or send you a copy of your personal data by sending a CCPA or a GDPR data request"
    const Canonical = organization ? "https://" + DOMAIN + "/d/" + organization.url + "/": "https://" + DOMAIN + "/d/add/";

    return (
      <div>
        <Head>
          <title>{Title}</title>
          <link rel="canonical" href={Canonical} />
          <meta name="description" content={Description} />
          <meta property="og:description" content={Description} />
          <meta property="og:title" content={Title} />
          <meta name="twitter:title" content={Title} />
          <meta name="twitter:description" content={Description} />
        </Head>
        <Nav />
        <Hero 
          selectedCompany={organization}
        />
        <PersonalInfoForm
          selectedCompany={organization}
        />
        <PressCoverage />
        {organization && (
          <AboutOrg 
            selectedCompany={organization}
            canonical={Canonical}
          />
        )}
        <Donations />
        <Footer />
      </div>
    );
  }
}

export default withRoot(pageWithIntl(Org));
