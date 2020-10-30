import React from "react";
import { ChakraProvider as ChakraUIThemeProvider } from "@chakra-ui/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import GlobalStyles from "./styles/GlobalStyles";
import appTheme from "./styles/appTheme";
import App from "./App";

const AppWrapper = () => (
  <ChakraUIThemeProvider theme={appTheme}>
    <EmotionThemeProvider theme={appTheme}>
      <GlobalStyles /> Apply Emotion Global Styles
      <App />
    </EmotionThemeProvider>
  </ChakraUIThemeProvider>
);

export default AppWrapper;
