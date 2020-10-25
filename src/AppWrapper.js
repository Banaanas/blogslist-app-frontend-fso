import React from "react";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

import App from "./App";
import appTheme from "./styles/appTheme";
import GlobalStyles from "./styles/GlobalStyles";

const AppWrapper = () => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={appTheme}>
      <EmotionThemeProvider theme={appTheme}>
        <GlobalStyles /> {/* Apply Emotion Global Styles */}
        <App />
      </EmotionThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default AppWrapper;
