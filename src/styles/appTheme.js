import { extendTheme } from "@chakra-ui/react";

const appTheme = extendTheme({
  colors: {
    primary: {
      light: "#959bea",
      main: "#434cd6",
      dark: "#1f2793",
    },
    secondary: {
      light: "#ffe4af",
      main: "#ffc04d",
      dark: "#e69405",
    },
  },
});

export default appTheme;
