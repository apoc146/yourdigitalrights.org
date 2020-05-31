import { container } from "../../styles/layout";
import { themeBg } from "../../styles/theme";

export default (theme) => ({
  hero: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    ...themeBg,
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px",
    },
  },
  orgLogo: {
    paddingTop: "15px",
    paddingRight: "25px",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  heroText: {
    flex: 1,
  },
  heading: {
    maxWidth: "100%",
    margin: "auto auto 20px",
    lineHeight: "1em",

    [theme.breakpoints.down("sm")]: {
      margin: "auto 0px 20px",
      maxWidth: "100%",
    },
  },
  container: {
    display: "flex",
    padding: "120px 30px 60px",
    maxWidth: "900px",
    display: "flex",
    boxSizing: "border-box",
    ...container,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 30px 0px",
      width: "100%",
    },
  },
  intro: {
    fontFamily: "Source Sans Pro,sans-serif",
    fontSize: "21px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "18px",
    },
  },
  domain: {
    width: "475px",
    height: "40px",
    fontFamily: "Source Sans Pro,sans-serif",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.8",
    letterSpacing: "normal",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      width: "100%",
    },
  },
  info: {
    fontFamily: "Source Sans Pro,sans-serif",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.8",
    letterSpacing: "normal",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "18px",
    },
  },
  logo: {
    width: "44px",
    outlineColor: "#e8f4f8",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  introLink: {
    fontSize: "15px",
    color: "#ffffff",
    fontWeight: "bold",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});