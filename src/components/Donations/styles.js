import { container } from "../../styles/layout";
import { theme } from "../../styles/theme";

const Theme = (theme) => ({
  donate: {
    backgroundColor: "#f2f2f2",
  },
  heading: {
    maxWidth: "850px !important",
    margin: "auto auto",

    [theme.breakpoints.down("sm")]: {
      marginTop: "-140px",
      paddingTop: "150px",
    },
  },
  container: {
    padding: "30px",
    boxSizing: "border-box",
    ...container,
    [theme.breakpoints.up("md")]: {
      padding: "76px 30px",
      backgroundImage: "url('/images/QR.svg')",
      backgroundPosition: "right 130px top 120px",
      backgroundRepeat: "no-repeat",
    },
  },
  donateBTCButton: {
    marginTop: "-25px",
    borderRadius: "24px 24px 24px 24px",
    color: "white",
    fontWeight: "600",
    padding: "10px 20px",
    "&:hover": {
      background: "#04487B",
    },
  },
  donateLPButton: {
    marginTop: "-25px",
    marginRight: "10px",
    borderRadius: "24px 24px 24px 24px",
    color: "white",
    fontWeight: "600",
    padding: "10px 20px",
    "&:hover": {
      background: "#04487B",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: '35px',
    },
  },
  intro: {
    marginBottom: "50px",
    maxWidth: "570px",
  },
  titleImg: {
    width: "300px",
    maxWidth: "75%",
  },
  title: {
    marginBottom: 0,
  },
  buttons: {
    textAlign: "center",
    marginBottom: "30px",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
  },
});

export default Theme;