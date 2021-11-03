import { container } from "../../styles/layout";
import { theme } from "../../styles/theme";

const Style = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 0px",
    },
  },
  container: {
    paddingBottom: "25px",
    paddingTop: "25px",
    maxWidth: "850px",
    boxSizing: "border-box",
    margin: "0px auto",
    width: "850px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  header: {
    fontSize: "38px",
    color: theme.palette.primary.main,
  },
  timeline: {
    display: "flex",
    listStyle: "none",
    margin: "0",
    padding: "0",
    justifyContent: "space-between",
  },
  timelineItem: {
    padding: "8px 30px",
    textAlign: "center",
    flex: "1 0 auto",
    position: "relative",
    wordWrap: "break-word",
    "&::before": {
      position: "absolute",
      top: "-12px",
      left: "50%",
      marginLeft: "-6px",
      display: "block",
      content: "'   '",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
    },
    "&::after": {
      position: "absolute",
      left: "0px",
      top: "-6px",
      display: "block",
      content: "'   '",
      width: "100%",
      borderTop: "1px solid",
      borderTopColor: theme.palette.primary.main,
    },
    "&:first-of-type::after": {
      left: "50%",
      width: "50%",
    },
    "&:last-of-type::after": {
      width: "50%",
    },
  }
});

export default Style;