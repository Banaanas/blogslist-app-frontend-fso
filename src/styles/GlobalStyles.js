import React from "react";
import { css, Global } from "@emotion/core";
import { useTheme } from "emotion-theming";
import NormalizeCSS from "./normalize.css";

// Emotion Global Styles - With Materialize
const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      // CSS Format
      styles={css`
        ${NormalizeCSS}
        *,*::before,*::after {
          box-sizing: inherit;
        }
        html {
          box-sizing: border-box;
          height: 100%;
          font-size: 62.5%;
        }
        body {
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
        }

        #root {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 100%;
          color: ${theme.palette.secondary.main};
          background-color: ${theme.palette.primary.main};
        }
      `}
    />
  );
};

export default GlobalStyles;
