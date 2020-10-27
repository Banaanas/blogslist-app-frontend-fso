import { extendTheme } from "@chakra-ui/core";

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
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});

export default appTheme;
