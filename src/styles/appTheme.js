import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: orange[50],
    },
    secondary: {
      main: grey.A700,
    },
  },
});

export default appTheme;
